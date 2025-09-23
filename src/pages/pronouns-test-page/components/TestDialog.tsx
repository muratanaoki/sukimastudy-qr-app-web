import styles from './testDialog.module.css';
import { CloseButton } from '@/shared/components/close-button/CloseButton';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useCallback } from 'react';
import type { PronounItem } from '../utils/type';
import { useChoices, useTestRunner } from '../hooks/useTestRunner';
import { useAnswerFeedback } from '../hooks/useAnswerFeedback';

export type TestDialogProps = {
  open: boolean;
  onClose: () => void;
  items: PronounItem[];
};

export const TestDialog = ({ open, onClose, items }: TestDialogProps) => {
  useEscapeKey(onClose, open);

  const { state, goNext, hasItems, reset } = useTestRunner(open, items);
  const { total, current, timeLeftPct, item } = state;
  const choices = useChoices(item);

  const goNextOrClose = useCallback(() => goNext(onClose), [goNext, onClose]);

  const {
    disabled,
    handleAnswer,
    getIndexDisplay,
    isCorrectHighlight,
    isWrongSelected,
    isDim,
    showGoodAt,
  } = useAnswerFeedback({
    isCorrect: (label) => !!item && label === item.jp,
    onNext: goNextOrClose,
  });

  const handleSkip = useCallback(() => {
    goNextOrClose();
  }, [goNextOrClose]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="テスト" className={styles.dialog}>
      {/* ヘッダー + 進捗バー */}
      <div className={styles.topBar}>
        <div className={styles.left}>
          <CloseButton onClose={handleClose} />
        </div>
        <div className={styles.progressTrack} aria-label="制限時間">
          <div className={styles.progressFill} style={{ width: `${timeLeftPct}%` }} />
        </div>
      </div>

      {/* 中央の問題表示 */}
      <div className={styles.content}>
        <p className={styles.counter}>
          {current} / {total}
        </p>
        <h1 className={styles.word}>{item?.term ?? '-'}</h1>
      </div>

      {/* 下部の操作/選択肢 */}
      <div className={styles.bottom}>
        <button
          type="button"
          className={styles.skipButton}
          aria-label="スキップ"
          onClick={handleSkip}
        >
          SKIP
        </button>

        <div className={styles.choices}>
          {choices.map((label, i) => {
            const indexDisplay = getIndexDisplay(i);
            return (
              <button
                key={i}
                type="button"
                className={`${styles.choiceButton} ${isCorrectHighlight(i) ? styles.choiceButtonCorrect : ''} ${isWrongSelected(i) ? styles.choiceButtonWrong : ''} ${isDim(i) ? styles.choiceButtonDim : ''}`}
                onClick={() => handleAnswer(label, i, choices, item?.jp)}
                disabled={disabled}
              >
                <span className={styles.choiceIndex}>{indexDisplay as any}</span>
                <span className={styles.choiceLabel}>{label}</span>
                {showGoodAt(i) && (
                  <span className={styles.goodToast} aria-live="polite">
                    Good!
                  </span>
                )}
              </button>
            );
          })}
          {!hasItems && (
            <div className={styles.choiceLabel} aria-live="polite">
              問題がありません
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDialog;
