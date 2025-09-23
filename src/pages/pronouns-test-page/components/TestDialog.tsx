import styles from './testDialog.module.css';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PronounItem } from '../utils/type';
import { ChoiceView, QuestionOrder } from '../utils/type';
import { useChoices, useTestRunner } from '../hooks/useTestRunner';
import { useAnswerFeedback } from '../hooks/useAnswerFeedback';
import { TestHeader } from './internal/TestHeader';
import { ChoiceList } from './internal/ChoiceList';
import { useTestSettings } from '../hooks/useTestSettings';
import JudgementControls from './internal/JudgementControls';
import { useSpeech } from '../hooks/useSpeech';
import { useAutoPronounce } from '../hooks/useAutoPronounce';

export type TestDialogProps = {
  open: boolean;
  onClose: () => void;
  items: PronounItem[];
};

export const TestDialog = ({ open, onClose, items }: TestDialogProps) => {
  useEscapeKey(onClose, open);

  const { choiceView, questionOrder } = useTestSettings();
  const { speakWord, cancel } = useSpeech();

  // 出題順序: ランダム設定時は Fisher-Yates でシャッフル（ダイアログ再オープンで再生成）
  const orderedItems = useMemo(() => {
    if (!items?.length) return items;
    if (questionOrder !== QuestionOrder.Random) return items;
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [items, questionOrder]);

  const { state, goNext, hasItems, reset } = useTestRunner(open, orderedItems);
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

  // 「和訳表示」ボタンの状態（問題切替でリセット）
  const [showTranslation, setShowTranslation] = useState(false);
  useEffect(() => {
    setShowTranslation(false);
  }, [item?.term, current]);

  // 自動発音の副作用を専用フックに集約
  useAutoPronounce({ open, term: item?.term ?? null, speakWord, cancel });

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
        {showTranslation && !!item?.jp && (
          <p className={styles.translation} aria-live="polite">
            {item.jp}
          </p>
        )}
      </div>

      {/* 下部の操作/選択肢 */}
      <div className={choiceView === ChoiceView.None ? styles.bottomNone : styles.bottom}>
        {choiceView === ChoiceView.Bottom4 && (
          <>
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
          </>
        )}

        {choiceView === ChoiceView.None && hasItems && (
          <JudgementControls
            showTranslation={showTranslation}
            onReveal={() => setShowTranslation(true)}
            onDontKnow={() => goNextOrClose()}
            onKnow={() => goNextOrClose()}
          />
        )}

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
