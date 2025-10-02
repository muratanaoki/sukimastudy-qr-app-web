/**
 * Pronouns テスト画面のメインダイアログ。
 * - 各種カスタムフックを組み合わせて、出題ロジック・効果音・UI状態を統括的に制御する。
 * - 依存するフックが多いため、どの責務を担っているのかをコメントで明示している。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// ESCキーでダイアログを閉じるためのキーボードショートカット管理
import { useEscapeKey } from '../../hooks/dialog/useEscapeKey';
// 品詞グループや代名詞グループの型定義
import type { PosGroup, PronounGroup } from '../../utils/domain/type';
// 単語読み上げ（Web Speech API ラッパー）
import { useSpeech } from '../../hooks/audio/useSpeech';
// 自動読み上げ制御（問題表示時に自動で発話するか）
import { useAutoPronounce } from '../../hooks/audio/useAutoPronounce';
// ダイアログ全体の状態（問題、残り時間、フィードバック等）を一括管理
import { useTestDialogState } from '../../hooks/dialog/useTestDialogState';
// 判定ボタンの選択・フラッシュ制御をまとめたフック
import { useJudgementHandler } from '../../hooks/gameplay/useJudgementHandler';
// 選択肢の回答・スキップ・単語の開示など各種イベントハンドラ生成
import { useTestDialogHandlers } from '../../hooks/dialog/useTestDialogHandlers';
// 一時停止（タイマー停止）理由を積み上げ式で管理
import { usePauseManager } from '../../hooks/gameplay/usePauseManager';
// テストの進行段階（問題中／結果表示など）を計算するユーティリティ
import { resolveDialogPhase, TestDialogPhase } from '../../utils/dialog/dialogPhase';
// ダイアログ起動時のチュートリアル音など初期化処理を実行
import { useTestStartup } from '../../hooks/dialog/useTestStartup';
// 閉じる確認ダイアログの open/close 状態を管理
import { useConfirmCloseState } from '../../hooks/dialog/internal/useConfirmCloseState';
// 現在の状態から UI に渡す表示用データを構築
import { buildTestDialogView } from '../../utils/dialog/testDialogView';
// 効果音の共通フック（クリック音、正解音など）
import { useSoundEffects } from '@/shared/hooks/useSoundEffects';
import type { PlaybackFailureHandler, PlaybackFailureInfo } from '@/shared/hooks/useSoundEffects';
// 結果表示時のサウンド演出を担当
import { useResultSoundEffect } from '../../hooks/dialog/internal/useResultSoundEffect';
// 一時停止理由が発生した際に PauseManager に接続
import { usePauseReasonEffect } from '../../hooks/dialog/internal/usePauseReasonEffect';
// 一時停止理由の定義（スタートアップなど）
import { PauseReason } from '../../hooks/gameplay/usePauseManager';
// 表示中のフィードバック内容から UI の操作可否を導出
import { deriveControlState } from '../../utils/dialog/controlState';
// 実際のダイアログ UI コンポーネント
import { TestDialogContent } from './internal/TestDialogContent';
// 閉じるアニメーションや requestClose を扱うコントローラ
import { useDialogCloseController } from '../../hooks/dialog/internal/useDialogCloseController';
// スタートアップ音声のパス定数
import { STARTUP_AUDIO_SRC } from '../../utils/constants/audio';
import type { SoundHandle } from '@/shared/utils/audio/soundHandle';
// 効果音再生失敗時に表示するフォールバックダイアログ
import { PlaybackFailureDialog } from './internal/PlaybackFailureDialog';
import { JUDGEMENT_BUTTON_TYPE } from '../../utils/constants/pronounData';
import { useMedalStore } from '../../hooks/context/MedalStoreContext';
import { getMedalRank, resolveSegmentMeta, selectHigherMedal } from '../../utils/domain/medal';

const CLOSE_ANIMATION_DURATION_MS = 450;
// Web Speech API のキャンセルを待機する上限時間（ms）
const SPEECH_IDLE_TIMEOUT_MS = 480;

type PlaybackFailureState = {
  context: string;
  info?: PlaybackFailureInfo;
} | null;

// 効果音再生の失敗状態を局所管理し、テストしやすいシンプルな API で返す
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

// 効果音マネージャの before/after ハンドラ登録とクリーンアップを共通化
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
  const { getMedal, upsertMedal } = useMedalStore();
  const medalSavedRef = useRef(false);
  const segmentMeta = useMemo(() => resolveSegmentMeta(pos, group), [pos, group]);
  // Web Speech API の呼び出しをラップ。単語読み上げとキャンセルを提供
  const { speakWord, cancel, waitForIdle } = useSpeech();
  // 一時停止の原因を積み上げ式で管理して UI に反映
  const { isPaused, addReason, removeReason } = usePauseManager();
  const {
    isOpen: isConfirmOpen,
    open: openConfirm,
    close: closeConfirm,
  } = useConfirmCloseState({
    addPauseReason: addReason,
    removePauseReason: removeReason,
  });

  // ダイアログ起動時の演出（例: カウントダウン音）を管理し、完了状態を返す
  const { isStartupComplete } = useTestStartup({
    open,
    audioSrc: STARTUP_AUDIO_SRC,
    soundHandle: startupSoundHandle ?? undefined,
    startupAudioPreplayed,
  });

  // スタートアップ処理中はゲームを一時停止扱いにしてタイマー等を止める
  usePauseReasonEffect({
    active: open && !isStartupComplete,
    reason: PauseReason.Startup,
    addReason,
    removeReason,
  });

  // 効果音群（正解音／不正解音／結果音など）をまとめて取得
  const soundEffects = useSoundEffects();

  // テスト全体の状態（設定・進捗・結果・UI 表示用データなど）を取得
  const { settings, progress, results, choices, meta, actions, feedback, display } =
    useTestDialogState({
      open,
      group,
      paused: isPaused,
      soundEffects,
    });

  // 設定情報: 出題モードや選択肢表示方法
  const { choiceView, answerMode } = settings;
  // 進捗情報: 現在の問題、残り時間、問題数など
  const { total, current, timeLeftPct, item, isCompleted, hasItems } = progress;
  // 結果情報: 正解数や履歴など
  const { correctAnswers, scorePercentage, answerHistory } = results;
  // 選択肢データ
  const { options: choiceOptions } = choices;
  // メタ情報: 問題を識別するキー
  const { questionKey } = meta;
  // 進行制御: 次の問題へ進む、リセットするなど
  const { advance, reset } = actions;

  // 効果音操作を個別に取り出して使いやすくする
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

  // 効果音再生前に読み上げをキャンセルして音が重ならないようにする
  const beforePlay = useCallback(async () => {
    try {
      await waitForIdle({ forceCancel: true, timeoutMs: SPEECH_IDLE_TIMEOUT_MS });
    } catch (error) {
      console.warn('Failed to settle speech before sound effect', error);
    }
  }, [waitForIdle]);

  useSoundEffectLifecycle({
    setBeforePlay,
    setPlaybackFailureHandler,
    beforePlay,
    onPlaybackFailure: reportFailure,
  });

  // 判定ボタン操作で利用する効果音群をメモ化して渡しやすく
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

  const isResultDisplayed = isCompleted;
  const attemptMedal = useMemo(
    () => (segmentMeta ? getMedalRank(scorePercentage) : null),
    [segmentMeta, scorePercentage]
  );

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
    upsertMedal(segmentMeta.segmentId, finalMedal);
    medalSavedRef.current = true;
  }, [isResultDisplayed, hasItems, segmentMeta, attemptMedal, getMedal, upsertMedal]);

  // 結果表示に切り替わった際に結果用のサウンドを再生
  useResultSoundEffect({
    hasItems,
    scorePercentage,
    playResultSound,
    shouldPlay: isResultDisplayed,
    questionKey,
    open,
  });

  // 判定ボタン（わかる／わからない）押下時の処理をカプセル化
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

  // 選択肢回答・スキップ・単語開示など UI 操作に対応するハンドラ群
  const { handleChoiceAnswer, handleSkip, handleRevealWord } = useTestDialogHandlers({
    answerMode,
    revealed: display.revealed,
    reveal: display.reveal,
    feedback,
    setShowTranslation: display.setShowTranslation,
  });
  // ダイアログが閉じ切った瞬間に状態リセットと親コンポーネントへの通知
  const handleDialogClosed = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  // 閉じアニメーションや requestClose を制御
  const { isClosing, shouldRender, requestClose, finalizeClose } = useDialogCloseController({
    open,
    animationDurationMs: CLOSE_ANIMATION_DURATION_MS,
    onBeginClose: cancelFlash,
    onClosed: handleDialogClosed,
  });

  // 現在の状態から「出題中」「結果表示中」「問題なし」などフェーズを判定
  const dialogPhase = resolveDialogPhase(hasItems, isResultDisplayed);

  // 閉じるボタン押下時の処理。結果表示中は即閉じ、途中なら確認ダイアログを開く
  const handleCloseClick = useCallback(() => {
    if (dialogPhase === TestDialogPhase.Completed) {
      closeConfirm();
      requestClose();
      return;
    }
    openConfirm();
  }, [dialogPhase, closeConfirm, openConfirm, requestClose]);

  // 確認ダイアログで「閉じる」が押された際の処理
  const handleConfirmClose = useCallback(() => {
    closeConfirm();
    requestClose();
  }, [closeConfirm, requestClose]);

  // 「キャンセル」は単に確認ダイアログを閉じる
  const handleCancelClose = closeConfirm;

  const term = item?.term ?? null;
  const translation = item?.jp ?? '';
  const hasTranslation = translation.length > 0;

  // 単語をクリックしたときに読み上げる。単語がない場面では undefined を返してボタン非表示。
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

  // ESC キー入力をフックして閉じ動作を実行
  useEscapeKey(handleCloseClick, open);
  // 問題表示時に自動で英単語を読み上げる（結果表示中は無効）
  useAutoPronounce({
    open,
    term,
    speakWord,
    cancel,
    paused: isPaused,
    enabled: isStartupComplete && !isResultDisplayed,
  });

  // 表示用のデータモデルを作成（UI コンポーネントはこの値のみを参照して描画する）
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

  // フィードバック状態や結果表示状況から操作ボタンの活性／非活性を決定
  const { controlsDisabled, judgementDisabled } = deriveControlState({
    isFeedbackDisabled: feedback.disabled,
    isCompleted,
    selectedJudgement,
  });

  // 判定ボタンが押された際のラッパー（わからない）
  const handleDontKnow = useCallback(() => {
    handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.DONT_KNOW);
  }, [handleJudgementAnswer]);

  // 判定ボタンが押された際のラッパー（わかる）
  const handleKnow = useCallback(() => {
    handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.KNOW);
  }, [handleJudgementAnswer]);

  if (!shouldRender && !playbackFailureInfo) return null;

  return (
    <>
      {shouldRender ? (
        <TestDialogContent
          dialogPhase={dialogPhase}
          closing={isClosing}
          onCloseAnimationEnd={finalizeClose}
          header={{
            // ヘッダーには現在の品詞名・グループ名・残り時間などを表示
            posTitle: pos.title,
            groupTitle: group.title,
            timeLeftPct,
            onClose: handleCloseClick,
            questionKey,
          }}
          question={{
            // 問題エリア: 単語表示・翻訳表示・読み上げハンドラ等
            visible: view.showQuestion,
            current,
            total,
            displayWord: view.displayWord,
            translation,
            showTranslation: view.showTranslation,
            onWordClick: handleWordClick,
          }}
          result={{
            // 結果エリア: スコアと履歴をまとめて表示
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
            // 選択肢や判定ボタンを含む操作エリア
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
            // 中断確認ダイアログ（途中退出すると進捗破棄）
            open: isConfirmOpen,
            onConfirm: handleConfirmClose,
            onCancel: handleCancelClose,
          }}
        />
      ) : null}
      {playbackFailureInfo ? (
        <PlaybackFailureDialog
          // 効果音再生に失敗した場合のフォールバック UI
          info={playbackFailureInfo.info}
          fallbackContext={playbackFailureInfo.context}
          onClose={clearFailure}
        />
      ) : null}
    </>
  );
};
export default TestDialog;
