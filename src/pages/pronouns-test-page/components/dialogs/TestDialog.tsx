/**
 * Pronouns テスト画面のメインダイアログ。
 * 依存する多数のフックを統合しつつ、可読性とテスト容易性を確保するよう小さなヘルパーへ分割している。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEscapeKey } from '../../hooks/dialog/useEscapeKey';
import type { JudgementButtonType, PosGroup, PronounGroup } from '../../utils/type';
import { useSpeech } from '../../hooks/audio/useSpeech';
import type { WaitForSpeechIdleOptions } from '../../hooks/audio/useSpeech';
import { useAutoPronounce } from '../../hooks/audio/useAutoPronounce';
import { useTestDialogState } from '../../hooks/dialog/useTestDialogState';
import { useJudgementHandler } from '../../hooks/gameplay/useJudgementHandler';
import { useTestDialogHandlers } from '../../hooks/dialog/useTestDialogHandlers';
import { usePauseManager } from '../../hooks/gameplay/usePauseManager';
import { resolveDialogPhase } from '../../utils/functions/dialog/dialogPhase';
import { useTestStartup } from '../../hooks/dialog/useTestStartup';
import { useConfirmCloseState } from '../../hooks/dialog/internal/useConfirmCloseState';
import { buildTestDialogView } from '../../utils/functions/dialog/testDialogView';
import { useSoundEffects } from '@/shared/hooks/useSoundEffects';
import type { PlaybackFailureHandler, PlaybackFailureInfo } from '@/shared/hooks/useSoundEffects';
import { useResultSoundEffect } from '../../hooks/dialog/internal/useResultSoundEffect';
import { usePauseReasonEffect } from '../../hooks/dialog/internal/usePauseReasonEffect';
import { PauseReason } from '../../hooks/gameplay/usePauseManager';
import { deriveControlState } from '../../utils/functions/dialog/controlState';
import { TestDialogContent } from './internal/TestDialogContent';
import { useDialogCloseController } from '../../hooks/dialog/internal/useDialogCloseController';
import startTestAudio from '@/shared/sounds/startTest.mp3';
import type { SoundHandle } from '@/shared/utils/audio/soundHandle';
import { PlaybackFailureDialog } from './internal/PlaybackFailureDialog';
import { JUDGEMENT_BUTTON_TYPE } from '../../utils/constants/const';
import { useMedalStore } from '../../hooks/context/MedalStoreContext';
import { isMobileUserAgent } from '@/shared/utils/device';
import {
  getMedalRank,
  resolveSegmentMeta,
  selectHigherMedal,
} from '../../utils/functions/domain/medal';
import { TestDialogPhase } from '../../utils/enum';

const CLOSE_ANIMATION_DURATION_MS = 450;
const SPEECH_IDLE_TIMEOUT_MS = 480;
const MOBILE_SPEECH_IDLE_TIMEOUT_MS = 240;
const MAX_WAIT_LOG_ENTRIES = 40;
const WAIT_LOG_TIMEOUT_GRACE_MS = 8;
const WAIT_LOG_WINDOW_KEY = '__TEST_DIALOG_WAIT_LOGS__' as const;
const WAIT_LOG_SKIP_PREFIX = '[TestDialog] waitForIdle skipped';
const WAIT_LOG_METRICS_PREFIX = '[TestDialog] waitForIdle metrics';

type WaitLogEntry = {
  timestampMs: number;
  durationMs: number;
  timeoutMs: number;
  timeoutHit: boolean;
  mobile: boolean;
  speakingBefore: boolean;
  speakingAfter: boolean;
};

type WaitLogWindow = Window &
  typeof globalThis & {
    [WAIT_LOG_WINDOW_KEY]?: WaitLogEntry[];
  };

type PlaybackFailureState = {
  context: string;
  info?: PlaybackFailureInfo;
} | null;

type SegmentMeta = ReturnType<typeof resolveSegmentMeta>;
type MedalRank = ReturnType<typeof getMedalRank>;

type SpeechWaitSkipContext = {
  speechSupported: boolean;
  synth: SpeechSynthesis | null;
  isMobile: boolean;
};

type SettleSpeechParams = {
  waitForIdle: (options?: WaitForSpeechIdleOptions) => Promise<void>;
  timeoutMs: number;
  synth: SpeechSynthesis | null;
};

type LogWaitMetricsParams = {
  elapsed: number;
  timeoutMs: number;
  timeoutHit: boolean;
  isMobile: boolean;
  speakingBefore: boolean;
  speakingAfter: boolean;
};

type UseSpeechBeforePlayParams = {
  waitForIdle: (options?: WaitForSpeechIdleOptions) => Promise<void>;
  speechSupported: boolean;
  isMobile: boolean;
};

type UseMedalAutoSaveParams = {
  open: boolean;
  isResultDisplayed: boolean;
  hasItems: boolean;
  segmentMeta: SegmentMeta | null;
  attemptMedal: MedalRank | null;
  getMedal: (segmentId: string) => MedalRank | undefined;
  upsertMedal: (segmentId: string, medal: MedalRank) => void;
};

type UseCloseBehaviorParams = {
  dialogPhase: TestDialogPhase;
  closeConfirm: () => void;
  openConfirm: () => void;
  requestClose: () => void;
};

const getTimestamp = () => {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now();
  }
  return Date.now();
};

const appendWaitLogEntry = (entry: WaitLogEntry) => {
  if (typeof window === 'undefined') return;
  const waitWindow = window as WaitLogWindow;
  const existingLogs = waitWindow[WAIT_LOG_WINDOW_KEY] ?? [];
  waitWindow[WAIT_LOG_WINDOW_KEY] = [...existingLogs, entry].slice(-MAX_WAIT_LOG_ENTRIES);
};

const getSpeechSynthesis = (): SpeechSynthesis | null => {
  if (typeof window === 'undefined') return null;
  return window.speechSynthesis ?? null;
};

const getSpeechWaitSkipReason = ({
  speechSupported,
  synth,
  isMobile,
}: SpeechWaitSkipContext): string | null => {
  if (!speechSupported) return 'supported=false';
  if (!synth) return 'synthUnavailable';
  if (!isMobile && !synth.speaking) return 'mobile=false | speaking=false';
  return null;
};

const settleSpeechBeforeAudio = async ({ waitForIdle, timeoutMs, synth }: SettleSpeechParams) => {
  const startedAt = getTimestamp();
  let timeoutHit = false;
  let timeoutHandle: number | undefined;

  if (typeof window !== 'undefined') {
    timeoutHandle = window.setTimeout(() => {
      timeoutHit = true;
    }, timeoutMs + WAIT_LOG_TIMEOUT_GRACE_MS);
  }

  try {
    await waitForIdle({ forceCancel: true, timeoutMs });
  } catch (error) {
    console.warn('Failed to settle speech before sound effect', error);
  } finally {
    if (typeof window !== 'undefined' && typeof timeoutHandle === 'number') {
      window.clearTimeout(timeoutHandle);
    }
  }

  const elapsed = Number((getTimestamp() - startedAt).toFixed(1));
  const speakingAfter = synth?.speaking ?? false;

  return { elapsed, timeoutHit, speakingAfter };
};

const logWaitMetrics = ({
  elapsed,
  timeoutMs,
  timeoutHit,
  isMobile,
  speakingBefore,
  speakingAfter,
}: LogWaitMetricsParams) => {
  appendWaitLogEntry({
    timestampMs: Date.now(),
    durationMs: elapsed,
    timeoutMs,
    timeoutHit,
    mobile: isMobile,
    speakingBefore,
    speakingAfter,
  });

  console.info(
    `${WAIT_LOG_METRICS_PREFIX} | duration=${elapsed.toFixed(1)}ms | timeoutMs=${timeoutMs} | timeoutHit=${timeoutHit} | mobile=${isMobile} | speakingBefore=${speakingBefore} | speakingAfter=${speakingAfter}`
  );
};

const useSpeechBeforePlay = ({
  waitForIdle,
  speechSupported,
  isMobile,
}: UseSpeechBeforePlayParams) =>
  useCallback(async () => {
    const synth = getSpeechSynthesis();
    const skipReason = getSpeechWaitSkipReason({ speechSupported, synth, isMobile });

    if (skipReason) {
      console.info(`${WAIT_LOG_SKIP_PREFIX} | ${skipReason}`);
      return;
    }

    const timeoutMs = isMobile ? MOBILE_SPEECH_IDLE_TIMEOUT_MS : SPEECH_IDLE_TIMEOUT_MS;
    const speakingBefore = synth?.speaking ?? false;

    const { elapsed, timeoutHit, speakingAfter } = await settleSpeechBeforeAudio({
      waitForIdle,
      timeoutMs,
      synth,
    });

    logWaitMetrics({
      elapsed,
      timeoutMs,
      timeoutHit,
      isMobile,
      speakingBefore,
      speakingAfter,
    });
  }, [waitForIdle, speechSupported, isMobile]);

/**
 * 効果音再生の失敗状態を局所管理し、フォールバック UI と連携しやすい形で提供する。
 */
const usePlaybackFailureState = () => {
  const [state, setState] = useState<PlaybackFailureState>(null);

  const reportFailure = useCallback((context: string, info?: PlaybackFailureInfo) => {
    setState({ context, info });
  }, []);

  const clearFailure = useCallback(() => {
    setState(null);
  }, []);

  return {
    state,
    reportFailure,
    clearFailure,
  } as const;
};

type SoundEffectLifecycleParams = {
  setBeforePlay: (listener: (() => void | Promise<void>) | null) => void;
  setPlaybackFailureHandler: (handler: PlaybackFailureHandler | null) => void;
  beforePlay: () => Promise<void>;
  onPlaybackFailure: PlaybackFailureHandler;
};

/**
 * 効果音マネージャに before/after のフックを登録し、ライフサイクルに合わせてクリーンアップする。
 */
const useSoundEffectLifecycle = ({
  setBeforePlay,
  setPlaybackFailureHandler,
  beforePlay,
  onPlaybackFailure,
}: SoundEffectLifecycleParams) => {
  useEffect(() => {
    setBeforePlay(beforePlay);
    setPlaybackFailureHandler(onPlaybackFailure);

    return () => {
      setBeforePlay(null);
      setPlaybackFailureHandler(null);
    };
  }, [setBeforePlay, setPlaybackFailureHandler, beforePlay, onPlaybackFailure]);
};

const useMedalAutoSave = ({
  open,
  isResultDisplayed,
  hasItems,
  segmentMeta,
  attemptMedal,
  getMedal,
  upsertMedal,
}: UseMedalAutoSaveParams) => {
  const medalSavedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      medalSavedRef.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!isResultDisplayed) {
      medalSavedRef.current = false;
      return;
    }

    if (!hasItems || !segmentMeta || !attemptMedal) return;
    if (medalSavedRef.current) return;

    const existing = getMedal(segmentMeta.segmentId);
    const finalMedal = selectHigherMedal(existing, attemptMedal);
    if (!finalMedal) return;

    upsertMedal(segmentMeta.segmentId, finalMedal);
    medalSavedRef.current = true;
  }, [isResultDisplayed, hasItems, segmentMeta, attemptMedal, getMedal, upsertMedal]);
};

const useCloseBehavior = ({
  dialogPhase,
  closeConfirm,
  openConfirm,
  requestClose,
}: UseCloseBehaviorParams) => {
  const handleCloseClick = useCallback(() => {
    if (dialogPhase === TestDialogPhase.Completed) {
      closeConfirm();
      requestClose();
      return;
    }

    openConfirm();
  }, [dialogPhase, closeConfirm, openConfirm, requestClose]);

  const handleConfirmClose = useCallback(() => {
    closeConfirm();
    requestClose();
  }, [closeConfirm, requestClose]);

  return {
    handleCloseClick,
    handleConfirmClose,
    handleCancelClose: closeConfirm,
  } as const;
};

const useJudgementButtons = (handleJudgementAnswer: (type: JudgementButtonType) => void) => {
  const handleDontKnow = useCallback(() => {
    handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.DONT_KNOW);
  }, [handleJudgementAnswer]);

  const handleKnow = useCallback(() => {
    handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.KNOW);
  }, [handleJudgementAnswer]);

  return { handleDontKnow, handleKnow } as const;
};

const useWordPronunciation = (term: string | null, speakWord: (value: string) => void) =>
  useMemo(() => {
    if (!term) return undefined;

    return () => {
      try {
        speakWord(term);
      } catch (error) {
        console.warn('Failed to pronounce term', error);
      }
    };
  }, [term, speakWord]);

export type TestDialogProps = {
  open: boolean;
  onClose: () => void;
  pos: PosGroup;
  group: PronounGroup;
  startupSoundHandle?: SoundHandle | null;
  startupAudioPreplayed?: boolean;
};

export const TestDialog = ({
  open,
  onClose,
  pos,
  group,
  startupSoundHandle,
  startupAudioPreplayed,
}: TestDialogProps) => {
  // --- Context & stores -----------------------------------------------------------
  const { getMedal, upsertMedal } = useMedalStore();
  const segmentMeta = useMemo(() => resolveSegmentMeta(pos, group), [pos, group]);
  const { speakWord, cancel, waitForIdle, supported: speechSupported } = useSpeech();
  const isMobile = useMemo(() => isMobileUserAgent(), []);
  const { isPaused, addReason, removeReason } = usePauseManager();
  const {
    isOpen: isConfirmOpen,
    open: openConfirm,
    close: closeConfirm,
  } = useConfirmCloseState({
    addPauseReason: addReason,
    removePauseReason: removeReason,
  });

  // --- Startup gating ------------------------------------------------------------
  const { isStartupComplete } = useTestStartup({
    open,
    audioSrc: startTestAudio,
    soundHandle: startupSoundHandle ?? undefined,
    startupAudioPreplayed,
  });

  usePauseReasonEffect({
    active: open && !isStartupComplete,
    reason: PauseReason.Startup,
    addReason,
    removeReason,
  });

  // --- Test state (questions, answers, feedback) ---------------------------------
  const soundEffects = useSoundEffects();
  const { settings, progress, results, choices, meta, actions, feedback, display } =
    useTestDialogState({
      open,
      group,
      paused: isPaused,
      soundEffects,
    });

  const { choiceView, answerMode } = settings;
  const { total, current, timeLeftPct, item, isCompleted, hasItems } = progress;
  const { correctAnswers, scorePercentage, answerHistory } = results;
  const { options: choiceOptions } = choices;
  const { questionKey } = meta;
  const { advance, reset } = actions;

  // --- Sound effects -------------------------------------------------------------
  const {
    playCorrectSound,
    playIncorrectSound,
    enableAudio,
    playResultSound,
    setBeforePlay,
    notifyPlaybackFailure,
    setPlaybackFailureHandler,
    getAudioElement,
  } = soundEffects;

  const { state: playbackFailureInfo, reportFailure, clearFailure } = usePlaybackFailureState();
  const beforeSoundEffect = useSpeechBeforePlay({
    waitForIdle,
    speechSupported,
    isMobile,
  });

  useSoundEffectLifecycle({
    setBeforePlay,
    setPlaybackFailureHandler,
    beforePlay: beforeSoundEffect,
    onPlaybackFailure: reportFailure,
  });

  const judgementSoundEffects = useMemo(
    () => ({
      playCorrectSound,
      playIncorrectSound,
      enableAudio,
      notifyPlaybackFailure,
      getAudioElement,
    }),
    [enableAudio, playCorrectSound, playIncorrectSound, notifyPlaybackFailure, getAudioElement]
  );

  // --- Medal persistence ---------------------------------------------------------
  const isResultDisplayed = isCompleted;
  const attemptMedal = useMemo(
    () => (segmentMeta ? getMedalRank(scorePercentage) : null),
    [segmentMeta, scorePercentage]
  );

  useMedalAutoSave({
    open,
    isResultDisplayed,
    hasItems,
    segmentMeta,
    attemptMedal,
    getMedal,
    upsertMedal,
  });

  useResultSoundEffect({
    hasItems,
    scorePercentage,
    playResultSound,
    shouldPlay: isResultDisplayed,
    questionKey,
    open,
  });

  // --- Judgement buttons ---------------------------------------------------------
  const advanceForJudgement = useCallback(
    (isCorrect?: boolean) => {
      advance({ isCorrect });
    },
    [advance]
  );

  const { selectedJudgement, handleJudgementAnswer, isFlashing, cancelFlash } = useJudgementHandler(
    choiceView,
    advanceForJudgement,
    questionKey,
    judgementSoundEffects
  );

  const { handleDontKnow, handleKnow } = useJudgementButtons(handleJudgementAnswer);

  const { handleChoiceAnswer, handleSkip, handleRevealWord } = useTestDialogHandlers({
    answerMode,
    revealed: display.revealed,
    reveal: display.reveal,
    feedback,
    setShowTranslation: display.setShowTranslation,
  });

  // --- Dialog closing ------------------------------------------------------------
  const handleDialogClosed = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const { isClosing, shouldRender, requestClose, finalizeClose } = useDialogCloseController({
    open,
    animationDurationMs: CLOSE_ANIMATION_DURATION_MS,
    onBeginClose: cancelFlash,
    onClosed: handleDialogClosed,
  });

  const dialogPhase = resolveDialogPhase(hasItems, isResultDisplayed);

  const { handleCloseClick, handleConfirmClose, handleCancelClose } = useCloseBehavior({
    dialogPhase,
    closeConfirm,
    openConfirm,
    requestClose,
  });

  // --- Derived view state --------------------------------------------------------
  const term = item?.term ?? null;
  const translation = item?.jp ?? '';
  const hasTranslation = translation.length > 0;
  const handleWordClick = useWordPronunciation(term, speakWord);

  useEscapeKey(handleCloseClick, open);
  useAutoPronounce({
    open,
    term,
    speakWord,
    cancel,
    paused: isPaused,
    enabled: isStartupComplete && !isResultDisplayed,
  });

  const view = useMemo(
    () =>
      buildTestDialogView({
        phase: dialogPhase,
        choiceView,
        answerMode,
        term,
        displayTerm: display.displayTerm,
        isFlashing,
        showTranslationState: display.showTranslation,
        hasTranslation,
      }),
    [
      dialogPhase,
      choiceView,
      answerMode,
      term,
      display.displayTerm,
      isFlashing,
      display.showTranslation,
      hasTranslation,
    ]
  );

  const { controlsDisabled, judgementDisabled } = deriveControlState({
    isFeedbackDisabled: feedback.disabled,
    isCompleted,
    selectedJudgement,
  });

  if (!shouldRender && !playbackFailureInfo) return null;

  return (
    <>
      {shouldRender ? (
        <TestDialogContent
          dialogPhase={dialogPhase}
          closing={isClosing}
          onCloseAnimationEnd={finalizeClose}
          header={{
            posTitle: pos.title,
            groupTitle: group.title,
            timeLeftPct,
            onClose: handleCloseClick,
            questionKey,
          }}
          question={{
            visible: view.showQuestion,
            current,
            total,
            displayWord: view.displayWord,
            translation,
            showTranslation: view.showTranslation,
            onWordClick: handleWordClick,
          }}
          result={{
            visible: view.showResult,
            hasItems,
            total,
            correctAnswers,
            scorePercentage,
            answerHistory,
            onClose: requestClose,
          }}
          emptyLabelVisible={view.showEmpty}
          controls={{
            visible: view.showQuestion,
            choiceView,
            isCompleted: isResultDisplayed,
            hasItems,
            choices: choiceOptions,
            shouldShowRevealButton: display.shouldShowRevealButton,
            onReveal: display.reveal,
            isRevealed: display.revealed,
            onSkip: handleSkip,
            disabled: controlsDisabled,
            getIndexDisplay: feedback.getIndexDisplay,
            isCorrectHighlight: feedback.isCorrectHighlight,
            isWrongSelected: feedback.isWrongSelected,
            isDim: feedback.isDim,
            showGoodAt: feedback.showGoodAt,
            onAnswer: handleChoiceAnswer,
            showTranslation: display.showTranslation,
            onRevealWord: handleRevealWord,
            onDontKnow: handleDontKnow,
            onKnow: handleKnow,
            revealButtonText: view.revealButtonText,
            judgementDisabled,
            selectedButton: selectedJudgement,
          }}
          confirm={{
            open: isConfirmOpen,
            onConfirm: handleConfirmClose,
            onCancel: handleCancelClose,
          }}
        />
      ) : null}
      {playbackFailureInfo ? (
        <PlaybackFailureDialog
          info={playbackFailureInfo.info}
          fallbackContext={playbackFailureInfo.context}
          onClose={clearFailure}
        />
      ) : null}
    </>
  );
};

export default TestDialog;
