import styles from './testDialog.module.css';
import { useEscapeKey } from '../hooks/useEscapeKey';
import type { PosGroup, PronounGroup } from '../utils/type';
import { useSpeech } from '../hooks/useSpeech';
import { useAutoPronounce } from '../hooks/useAutoPronounce';
import { JUDGEMENT_BUTTON_TYPE } from '../utils/const';
import { getRevealButtonText, getDisplayWord, shouldShowTranslation } from '../utils/function';
import TopBar from './internal/TopBar';
import QuestionContent from './internal/QuestionContent';
import TestControls from './internal/TestControls';
import { CloseButton } from '@/shared/components/close-button/CloseButton';
import { useTestDialogState } from '../hooks/useTestDialogState';
import { useJudgementHandler } from '../hooks/useJudgementHandler';
import { useTestDialogHandlers } from '../hooks/useTestDialogHandlers';
import { DialogCard } from '@/shared/components/dialog/DialogCard';
import { PrimaryButton } from '@/shared/components/primary-button/PrimaryButton';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export type TestDialogProps = {
  open: boolean;
  onClose: () => void;
  pos: PosGroup; // 上位の品詞グループ（単数）
  group: PronounGroup; // 現在テスト中の下位グループ
};

export const TestDialog = ({ open, onClose, pos, group }: TestDialogProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  useEscapeKey(onClose, open);

  const { speakWord, cancel } = useSpeech();

  const {
    choiceView,
    answerMode,
    total,
    current,
    timeLeftPct,
    item,
    isCompleted,
    hasItems,
    choices,
    questionKey,
    goNextOrClose,
    reset,
    feedback,
    display,
  } = useTestDialogState(open, group, onClose);

  const { selectedJudgement, handleJudgementAnswer, isFlashing, cancelFlash } = useJudgementHandler(
    choiceView,
    goNextOrClose,
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

  const handleCloseClick = () => {
    if (isCompleted) {
      onClose();
    } else {
      setShowConfirm(true);
    }
  };

  const handleConfirmClose = () => {
    setShowConfirm(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirm(false);
  };

  useAutoPronounce({ open, term: item?.term ?? null, speakWord, cancel });

  const displayWord = getDisplayWord(isFlashing, choiceView, item?.term, display.displayTerm);
  const revealButtonText = getRevealButtonText(answerMode);
  const showTranslationComputed = shouldShowTranslation(
    display.showTranslation,
    isFlashing,
    !!item?.jp
  );

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="テスト" className={styles.dialog}>
      {isCompleted ? (
        <div className={styles.resultHeader}>
          <div className={styles.topRight}>
            <CloseButton onClose={handleCloseClick} />
          </div>
        </div>
      ) : (
        <TopBar
          posTitle={pos.title}
          groupTitle={group.title}
          timeLeftPct={timeLeftPct}
          onClose={handleCloseClick}
          resetKey={questionKey}
        />
      )}

      {!isCompleted && (
        <QuestionContent
          current={current}
          total={total}
          displayWord={displayWord}
          translation={item?.jp ?? ''}
          showTranslation={showTranslationComputed}
        />
      )}

      {/* テスト完了または問題なしの場合 */}
      {(isCompleted || !hasItems) && (
        <div className={styles.noItemsLabel} aria-live="polite">
          テスト結果画面開発中
        </div>
      )}

      {!isCompleted && (
        <TestControls
          choiceView={choiceView}
          isCompleted={isCompleted}
          hasItems={hasItems}
          // Choice mode props
          choices={choices}
          shouldShowRevealButton={display.shouldShowRevealButton}
          onReveal={display.reveal}
          isRevealed={display.revealed}
          onSkip={handleSkip}
          disabled={feedback.disabled}
          getIndexDisplay={feedback.getIndexDisplay}
          isCorrectHighlight={feedback.isCorrectHighlight}
          isWrongSelected={feedback.isWrongSelected}
          isDim={feedback.isDim}
          showGoodAt={feedback.showGoodAt}
          onAnswer={handleChoiceAnswer}
          // Judgement mode props
          showTranslation={display.showTranslation}
          onRevealWord={handleRevealWord}
          onDontKnow={() => handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.DONT_KNOW)}
          onKnow={() => handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.KNOW)}
          revealButtonText={revealButtonText}
          judgementDisabled={selectedJudgement !== null}
          selectedButton={selectedJudgement}
        />
      )}

      {/* 確認ダイアログ */}
      {showConfirm && (
        <DialogCard
          onClose={handleCancelClose}
          title="テストを終了しますか？"
          titleId="confirm-dialog-title"
          Icon={AlertTriangle}
          actions={
            <PrimaryButton className={styles.actionsButton} onClick={handleConfirmClose}>
              終了する
            </PrimaryButton>
          }
        >
          <p className={styles.confirmText}>現在の進行状況は保存されません。</p>
        </DialogCard>
      )}
    </div>
  );
};

export default TestDialog;
