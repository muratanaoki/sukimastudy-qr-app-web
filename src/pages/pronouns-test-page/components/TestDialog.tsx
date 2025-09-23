import styles from './testDialog.module.css';
import { CloseButton } from '@/shared/components/close-button/CloseButton';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PronounItem } from '../utils/type';
import { useChoices, useTestRunner } from '../hooks/useTestRunner';

export type TestDialogProps = {
  open: boolean;
  onClose: () => void;
  items: PronounItem[]; // テスト対象（TestIntroDialogで選択された範囲）
};

export const TestDialog = ({ open, onClose, items }: TestDialogProps) => {
  useEscapeKey(onClose, open);

  const { state, goNext, hasItems } = useTestRunner(open, items);
  const { total, current, progress, item } = state;
  const choices = useChoices(item);

  const goNextOrClose = useCallback(() => goNext(onClose), [goNext, onClose]);

  // 正解時の一時的なフィードバック
  const [good, setGood] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const goodTimerRef = useRef<number | null>(null);
  const [wrong, setWrong] = useState(false);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [correctIdx, setCorrectIdx] = useState<number | null>(null);
  useEffect(() => {
    return () => {
      if (goodTimerRef.current) window.clearTimeout(goodTimerRef.current);
    };
  }, []);

  const handleAnswer = useCallback(
    (label: string, i: number) => {
      const isCorrect = item && label === item.jp;
      if (isCorrect) {
        setSelectedIdx(i);
        setGood(true);
        if (goodTimerRef.current) window.clearTimeout(goodTimerRef.current);
        goodTimerRef.current = window.setTimeout(() => {
          setGood(false);
          setSelectedIdx(null);
          goNextOrClose();
        }, 650);
      } else {
        // 間違い時: 選択肢の演出（× と ◯ を表示、他は薄く）
        setWrong(true);
        setWrongIdx(i);
        if (item) {
          const ci = choices.findIndex((c) => c === item.jp);
          setCorrectIdx(ci >= 0 ? ci : null);
        }
        if (goodTimerRef.current) window.clearTimeout(goodTimerRef.current);
        goodTimerRef.current = window.setTimeout(() => {
          setWrong(false);
          setWrongIdx(null);
          setCorrectIdx(null);
          goNextOrClose();
        }, 900);
      }
    },
    [goNextOrClose, item, choices]
  );

  const handleSkip = useCallback(() => {
    goNextOrClose();
  }, [goNextOrClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="テスト" className={styles.dialog}>
      {/* ヘッダー + 進捗バー */}
      <div className={styles.topBar}>
        <div className={styles.left}>
          <CloseButton onClose={onClose} />
        </div>
        <div className={styles.progressTrack} aria-label="進捗">
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
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
            const isCorrectHighlight = (good && selectedIdx === i) || (wrong && correctIdx === i);
            const isWrongSelected = wrong && wrongIdx === i;
            const isDim = wrong && !isCorrectHighlight && !isWrongSelected;
            const indexDisplay = isWrongSelected ? '×' : i + 1;
            return (
              <button
                key={i}
                type="button"
                className={`${styles.choiceButton} ${isCorrectHighlight ? styles.choiceButtonCorrect : ''} ${isWrongSelected ? styles.choiceButtonWrong : ''} ${isDim ? styles.choiceButtonDim : ''}`}
                onClick={() => handleAnswer(label, i)}
                disabled={good || wrong}
              >
                <span className={styles.choiceIndex}>{indexDisplay as any}</span>
                <span className={styles.choiceLabel}>{label}</span>
                {good && selectedIdx === i && (
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
