import styles from './testDialog.module.css';
import { useEscapeKey } from '../hooks/useEscapeKey';
import type { PosGroup, PronounGroup } from '../utils/type';
import { useSpeech } from '../hooks/useSpeech';
import { useAutoPronounce } from '../hooks/useAutoPronounce';
import { JUDGEMENT_BUTTON_TYPE } from '../utils/const';
import QuestionContent from './internal/QuestionContent';
import TestControls from './internal/TestControls';
import TestResult from './internal/TestResult';
import { useTestDialogState } from '../hooks/useTestDialogState';
import { useJudgementHandler } from '../hooks/useJudgementHandler';
import { useTestDialogHandlers } from '../hooks/useTestDialogHandlers';
import { useCallback, useMemo } from 'react';
import { DialogHeader } from './internal/DialogHeader';
import { ConfirmCloseDialog } from './internal/ConfirmCloseDialog';
import { usePauseManager } from '../hooks/usePauseManager';
import { resolveDialogPhase, TestDialogPhase } from '../utils/dialogPhase';
import { useTestStartup } from '../hooks/useTestStartup';
import { useConfirmCloseState } from '../hooks/internal/useConfirmCloseState';
import { buildTestDialogView } from '../utils/testDialogView';

const STARTUP_AUDIO_SRC = '/sounds/startTest.wav';

export type TestDialogProps = {
  open: boolean;
  onClose: () => void;
  pos: PosGroup; // 上位の品詞グループ（単数）
  group: PronounGroup; // 現在テスト中の下位グループ
  initializing?: boolean;
  onStartupComplete?: () => void;
};

export const TestDialog = ({
  open,
  onClose,
  pos,
  group,
  initializing = false,
  onStartupComplete,
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

  const { settings, progress, results, choices, meta, actions, feedback, display } =
    useTestDialogState({
      open,
      group,
      paused: isPaused,
    });

  const { choiceView, answerMode } = settings;
  const { total, current, timeLeftPct, item, isCompleted, hasItems } = progress;
  const { correctAnswers, scorePercentage, answerHistory } = results;
  const { options: choiceOptions } = choices;
  const { questionKey } = meta;
  const { advance, reset } = actions;

  const handleTestComplete = useCallback(() => {
    closeConfirm();
  }, [closeConfirm]);

  const advanceForJudgement = useCallback(
    (isCorrect?: boolean) => {
      advance({ isCorrect, onComplete: handleTestComplete });
    },
    [advance, handleTestComplete]
  );

  const { selectedJudgement, handleJudgementAnswer, isFlashing, cancelFlash } = useJudgementHandler(
    choiceView,
    advanceForJudgement,
    questionKey
  );

  const { handleDialogClose, handleChoiceAnswer, handleSkip, handleRevealWord } =
    useTestDialogHandlers({
      answerMode,
      revealed: display.revealed,
      reveal: display.reveal,
      feedback,
      setShowTranslation: display.setShowTranslation,
      reset,
      onClose,
      cancelFlash,
    });

  const { isBlocking: isStartupBlocking } = useTestStartup({
    open,
    active: initializing,
    audioSrc: STARTUP_AUDIO_SRC,
    onComplete: onStartupComplete,
    addPauseReason: addReason,
    removePauseReason: removeReason,
  });

  const dialogPhase = resolveDialogPhase(hasItems, isCompleted);

  const handleCloseClick = useCallback(() => {
    if (dialogPhase === TestDialogPhase.Completed) {
      closeConfirm();
      handleDialogClose();
      return;
    }
    openConfirm();
  }, [dialogPhase, closeConfirm, handleDialogClose, openConfirm]);

  const handleConfirmClose = useCallback(() => {
    closeConfirm();
    handleDialogClose();
  }, [closeConfirm, handleDialogClose]);

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
  useAutoPronounce({ open, term, speakWord, cancel, paused: isPaused });

  const view = useMemo(
    () =>
      buildTestDialogView({
        phase: dialogPhase,
        isStartupBlocking,
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
      isStartupBlocking,
      choiceView,
      answerMode,
      term,
      display.displayTerm,
      isFlashing,
      display.showTranslation,
      hasTranslation,
    ]
  );

  const controlsDisabled = feedback.disabled || isStartupBlocking;
  const judgementDisabled = selectedJudgement !== null || isStartupBlocking;

  const handleDontKnow = useCallback(() => {
    handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.DONT_KNOW);
  }, [handleJudgementAnswer]);

  const handleKnow = useCallback(() => {
    handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.KNOW);
  }, [handleJudgementAnswer]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="テスト" className={styles.dialog}>
      <DialogHeader
        phase={dialogPhase}
        posTitle={pos.title}
        groupTitle={group.title}
        timeLeftPct={timeLeftPct}
        onClose={handleCloseClick}
        questionKey={questionKey}
      />

      {view.showQuestion && (
        <QuestionContent
          current={current}
          total={total}
          displayWord={view.displayWord}
          translation={translation}
          showTranslation={view.showTranslation}
          onWordClick={handleWordClick}
        />
      )}

      {view.showResult && hasItems && (
        <TestResult
          total={total}
          correctAnswers={correctAnswers}
          scorePercentage={scorePercentage}
          answerHistory={answerHistory}
          onClose={handleDialogClose}
        />
      )}

      {view.showEmpty && (
        <div className={styles.noItemsLabel} aria-live="polite">
          問題がありません
        </div>
      )}

      {view.showQuestion && (
        <TestControls
          choiceView={choiceView}
          isCompleted={false}
          hasItems={hasItems}
          choices={choiceOptions}
          shouldShowRevealButton={display.shouldShowRevealButton}
          onReveal={display.reveal}
          isRevealed={display.revealed}
          onSkip={handleSkip}
          disabled={controlsDisabled}
          getIndexDisplay={feedback.getIndexDisplay}
          isCorrectHighlight={feedback.isCorrectHighlight}
          isWrongSelected={feedback.isWrongSelected}
          isDim={feedback.isDim}
          showGoodAt={feedback.showGoodAt}
          onAnswer={handleChoiceAnswer}
          showTranslation={display.showTranslation}
          onRevealWord={handleRevealWord}
          onDontKnow={handleDontKnow}
          onKnow={handleKnow}
          revealButtonText={view.revealButtonText}
          judgementDisabled={judgementDisabled}
          selectedButton={selectedJudgement}
        />
      )}

      <ConfirmCloseDialog
        open={isConfirmOpen}
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
      />

      {isStartupBlocking && (
        <div className={styles.loadingOverlay} role="status" aria-live="polite">
          <div className={styles.loadingSpinner} aria-hidden="true" />
          <span className={styles.loadingLabel}>準備中...</span>
        </div>
      )}
    </div>
  );
};
export default TestDialog;
