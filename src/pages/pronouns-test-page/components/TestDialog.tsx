import styles from './testDialog.module.css';
import { useEscapeKey } from '../hooks/useEscapeKey';
import type { PosGroup, PronounGroup } from '../utils/type';
import { useSpeech } from '../hooks/useSpeech';
import { useAutoPronounce } from '../hooks/useAutoPronounce';
import { JUDGEMENT_BUTTON_TYPE } from '../utils/const';
import { getRevealButtonText, getDisplayWord, shouldShowTranslation } from '../utils/function';
import QuestionContent from './internal/QuestionContent';
import TestControls from './internal/TestControls';
import TestResult from './internal/TestResult';
import { useTestDialogState } from '../hooks/useTestDialogState';
import { useJudgementHandler } from '../hooks/useJudgementHandler';
import { useTestDialogHandlers } from '../hooks/useTestDialogHandlers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DialogHeader } from './internal/DialogHeader';
import { ConfirmCloseDialog } from './internal/ConfirmCloseDialog';
import { usePauseManager, PauseReason } from '../hooks/usePauseManager';
import { resolveDialogPhase, TestDialogPhase } from '../utils/dialogPhase';
import { useTestStartup } from '../hooks/useTestStartup';

export type TestDialogProps = {
  open: boolean;
  onClose: () => void;
  pos: PosGroup; // 上位の品詞グループ（単数）
  group: PronounGroup; // 現在テスト中の下位グループ
  initializing?: boolean;
  onStartupComplete?: () => void;
  startupAudioSrc?: string;
};

export const TestDialog = ({
  open,
  onClose,
  pos,
  group,
  initializing = false,
  onStartupComplete,
  startupAudioSrc,
}: TestDialogProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { speakWord, cancel } = useSpeech();
  const { isPaused, addReason, removeReason } = usePauseManager();

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
    setShowConfirm(false);
  }, []);

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

  useEffect(() => {
    if (showConfirm) {
      addReason(PauseReason.Confirm);
    } else {
      removeReason(PauseReason.Confirm);
    }
  }, [showConfirm, addReason, removeReason]);

  const { isBlocking: isStartupBlocking } = useTestStartup({
    open,
    active: initializing,
    audioSrc: startupAudioSrc,
    onComplete: onStartupComplete,
    addPauseReason: addReason,
    removePauseReason: removeReason,
  });

  const dialogPhase = resolveDialogPhase(hasItems, isCompleted);

  const handleCloseClick = useCallback(() => {
    if (dialogPhase === TestDialogPhase.Completed) {
      setShowConfirm(false);
      handleDialogClose();
      return;
    }
    setShowConfirm(true);
  }, [dialogPhase, handleDialogClose]);

  const handleConfirmClose = useCallback(() => {
    setShowConfirm(false);
    handleDialogClose();
  }, [handleDialogClose]);

  const handleCancelClose = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const handleWordClick = useMemo(() => {
    if (!item?.term) return undefined;
    return () => {
      try {
        speakWord(item.term);
      } catch (error) {
        console.warn('Failed to pronounce term', error);
      }
    };
  }, [item?.term, speakWord]);

  useEscapeKey(handleCloseClick, open);
  useAutoPronounce({ open, term: item?.term ?? null, speakWord, cancel, paused: isPaused });

  const showQuestion = dialogPhase === TestDialogPhase.InProgress && !isStartupBlocking;
  const showResult = dialogPhase === TestDialogPhase.Completed;
  const showEmpty = dialogPhase === TestDialogPhase.Empty;

  const displayWord = showQuestion
    ? getDisplayWord(isFlashing, choiceView, item?.term, display.displayTerm)
    : '';
  const revealButtonText = showQuestion ? getRevealButtonText(answerMode) : '';
  const showTranslationComputed = showQuestion
    ? shouldShowTranslation(display.showTranslation, isFlashing, !!item?.jp)
    : false;

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

      {showQuestion && (
        <QuestionContent
          current={current}
          total={total}
          displayWord={displayWord}
          translation={item?.jp ?? ''}
          showTranslation={showTranslationComputed}
          onWordClick={handleWordClick}
        />
      )}

      {showResult && hasItems && (
        <TestResult
          total={total}
          correctAnswers={correctAnswers}
          scorePercentage={scorePercentage}
          answerHistory={answerHistory}
          onClose={handleDialogClose}
        />
      )}

      {showEmpty && (
        <div className={styles.noItemsLabel} aria-live="polite">
          問題がありません
        </div>
      )}

      {showQuestion && (
        <TestControls
          choiceView={choiceView}
          isCompleted={false}
          hasItems={hasItems}
          choices={choiceOptions}
          shouldShowRevealButton={display.shouldShowRevealButton}
          onReveal={display.reveal}
          isRevealed={display.revealed}
          onSkip={handleSkip}
          disabled={feedback.disabled || isStartupBlocking}
          getIndexDisplay={feedback.getIndexDisplay}
          isCorrectHighlight={feedback.isCorrectHighlight}
          isWrongSelected={feedback.isWrongSelected}
          isDim={feedback.isDim}
          showGoodAt={feedback.showGoodAt}
          onAnswer={handleChoiceAnswer}
          showTranslation={display.showTranslation}
          onRevealWord={handleRevealWord}
          onDontKnow={() => handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.DONT_KNOW)}
          onKnow={() => handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.KNOW)}
          revealButtonText={revealButtonText}
          judgementDisabled={selectedJudgement !== null || isStartupBlocking}
          selectedButton={selectedJudgement}
        />
      )}

      <ConfirmCloseDialog
        open={showConfirm}
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
