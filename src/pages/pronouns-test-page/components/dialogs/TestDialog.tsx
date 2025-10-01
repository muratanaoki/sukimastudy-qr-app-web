import { useCallback, useEffect, useMemo } from 'react';
import { useEscapeKey } from '../../hooks/dialog/useEscapeKey';
import type { PosGroup, PronounGroup } from '../../utils/domain/type';
import { useSpeech } from '../../hooks/audio/useSpeech';
import { useAutoPronounce } from '../../hooks/audio/useAutoPronounce';
import { JUDGEMENT_BUTTON_TYPE } from '../../utils/constants/const';
import { useTestDialogState } from '../../hooks/dialog/useTestDialogState';
import { useJudgementHandler } from '../../hooks/gameplay/useJudgementHandler';
import { useTestDialogHandlers } from '../../hooks/dialog/useTestDialogHandlers';
import { usePauseManager } from '../../hooks/gameplay/usePauseManager';
import { resolveDialogPhase, TestDialogPhase } from '../../utils/dialog/dialogPhase';
import { useTestStartup } from '../../hooks/dialog/useTestStartup';
import { useConfirmCloseState } from '../../hooks/dialog/internal/useConfirmCloseState';
import { buildTestDialogView } from '../../utils/dialog/testDialogView';
import { useSoundEffects } from '@/shared/hooks/useSoundEffects';
import { useResultSoundEffect } from '../../hooks/dialog/internal/useResultSoundEffect';
import { usePauseReasonEffect } from '../../hooks/dialog/internal/usePauseReasonEffect';
import { PauseReason } from '../../hooks/gameplay/usePauseManager';
import { deriveControlState } from '../../utils/dialog/controlState';
import { TestDialogContent } from './internal/TestDialogContent';
import { useDialogCloseController } from '../../hooks/dialog/internal/useDialogCloseController';
import { STARTUP_AUDIO_SRC } from '../../utils/constants/audio';
import type { SoundHandle } from '@/shared/utils/audio/soundHandle';

const CLOSE_ANIMATION_DURATION_MS = 450;

export type TestDialogProps = {
  open: boolean;
  onClose: () => void;
  pos: PosGroup; // 上位の品詞グループ（単数）
  group: PronounGroup; // 現在テスト中の下位グループ
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
  const { speakWord, cancel } = useSpeech();
  const { isPaused, addReason, removeReason } = usePauseManager();
  const {
    isOpen: isConfirmOpen,
    open: openConfirm,
    close: closeConfirm,
  } = useConfirmCloseState({
    addPauseReason: addReason,
    removePauseReason: removeReason,
  });

  const { isStartupComplete } = useTestStartup({
    open,
    audioSrc: STARTUP_AUDIO_SRC,
    soundHandle: startupSoundHandle ?? undefined,
    startupAudioPreplayed,
  });

  usePauseReasonEffect({
    active: open && !isStartupComplete,
    reason: PauseReason.Startup,
    addReason,
    removeReason,
  });

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

  const {
    playCorrectSound,
    playIncorrectSound,
    enableAudio,
    playResultSound,
    setBeforePlay,
    notifyPlaybackFailure,
    setPlaybackFailureHandler,
  } = soundEffects;

  const beforePlay = useCallback(() => {
    try {
      cancel();
    } catch (error) {
      console.warn('Failed to cancel speech before sound effect', error);
    }
  }, [cancel]);

  useEffect(() => {
    setBeforePlay(beforePlay);
    setPlaybackFailureHandler(null);
    return () => {
      setBeforePlay(null);
      setPlaybackFailureHandler(null);
    };
  }, [beforePlay, setBeforePlay, setPlaybackFailureHandler]);

  const judgementSoundEffects = useMemo(
    () => ({
      playCorrectSound,
      playIncorrectSound,
      enableAudio,
      notifyPlaybackFailure,
    }),
    [enableAudio, playCorrectSound, playIncorrectSound, notifyPlaybackFailure]
  );

  const isResultDisplayed = isCompleted;

  useResultSoundEffect({
    hasItems,
    scorePercentage,
    playResultSound,
    shouldPlay: isResultDisplayed,
    questionKey,
    open,
  });

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

  const { handleChoiceAnswer, handleSkip, handleRevealWord } = useTestDialogHandlers({
    answerMode,
    revealed: display.revealed,
    reveal: display.reveal,
    feedback,
    setShowTranslation: display.setShowTranslation,
  });
  const handleDialogClosed = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const { isClosing, shouldRender, requestClose, finalizeClose } = useDialogCloseController({
    open,
    animationDurationMs: CLOSE_ANIMATION_DURATION_MS,
    onBeginClose: cancelFlash,
    onClosed: handleDialogClosed,
  });

  const dialogPhase = resolveDialogPhase(hasItems, isResultDisplayed);

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

  const handleCancelClose = closeConfirm;

  const term = item?.term ?? null;
  const translation = item?.jp ?? '';
  const hasTranslation = translation.length > 0;

  const handleWordClick = useMemo(() => {
    if (!term) return undefined;
    return () => {
      try {
        speakWord(term);
      } catch (error) {
        console.warn('Failed to pronounce term', error);
      }
    };
  }, [term, speakWord]);

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

  const handleDontKnow = useCallback(() => {
    handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.DONT_KNOW);
  }, [handleJudgementAnswer]);

  const handleKnow = useCallback(() => {
    handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.KNOW);
  }, [handleJudgementAnswer]);

  if (!shouldRender) return null;

  return (
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
  );
};
export default TestDialog;
