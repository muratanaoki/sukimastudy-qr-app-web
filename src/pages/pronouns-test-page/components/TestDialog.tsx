import styles from './testDialog.module.css';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useCallback } from 'react';
import type { PronounItem } from '../utils/type';
import { useChoices, useTestRunner } from '../hooks/useTestRunner';
import { useAnswerFeedback } from '../hooks/useAnswerFeedback';
import { TestHeader } from './internal/TestHeader';
import { ChoiceList } from './internal/ChoiceList';

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
  const correctIndex = item ? choices.findIndex((c) => c === item.jp) : -1;

  const goNextOrClose = useCallback(() => goNext(onClose), [goNext, onClose]);

  const {
    disabled,
    handleAnswerIndex,
    getIndexDisplay,
    isCorrectHighlight,
    isWrongSelected,
    isDim,
    showGoodAt,
  } = useAnswerFeedback({
    isCorrect: (label) => !!item && label === item.jp,
    onNext: goNextOrClose,
    choices,
    correctIndex: correctIndex >= 0 ? correctIndex : undefined,
    currentKey: item?.term ?? current, // 問題切替キー
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
      <TestHeader
        timeLeftPct={timeLeftPct}
        onClose={handleClose}
        resetKey={item?.term ?? current}
      />

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

        <ChoiceList
          choices={choices}
          disabled={disabled}
          getIndexDisplay={getIndexDisplay}
          isCorrectHighlight={isCorrectHighlight}
          isWrongSelected={isWrongSelected}
          isDim={isDim}
          showGoodAt={showGoodAt}
          onAnswer={(_, i) => handleAnswerIndex(i)}
        />
        {!hasItems && (
          <div className={styles.choiceLabel} aria-live="polite">
            問題がありません
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDialog;
