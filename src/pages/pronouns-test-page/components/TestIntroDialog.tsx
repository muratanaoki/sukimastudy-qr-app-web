import styles from '../index.module.css';
import { FileCheck, CircleCheck, Circle } from 'lucide-react';
import type { PronounData } from '../utils/type';
import { useCallback, useMemo, useState } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { segmentItems } from '../utils/function';
import clsx from 'clsx';

export type TestIntroDialogProps = {
  items: PronounData['items'];
  onClose: () => void;
  onSelectRange?: (range: { start: number; end: number; items: PronounData['items'] }) => void;
  onStart?: (range: { start: number; end: number; items: PronounData['items'] }) => void;
  segmentSize?: number; // default 10
  selectedRange?: { start: number; end: number } | null;
};

type AnswerOption = 'ari' | 'nashi';
type Segment = { start: number; end: number; items: PronounData['items'] };

function AnswerOptionSelector({
  value,
  onChange,
}: {
  value: AnswerOption;
  onChange: (v: AnswerOption) => void;
}) {
  return (
    <div className={styles.testChoiceRow} role="radiogroup" aria-label="解答の選択肢">
      <label
        htmlFor="answer-option-ari"
        className={clsx(styles.testChoiceItem, value === 'ari' && styles.testChoiceItemSelected)}
      >
        <input
          id="answer-option-ari"
          name="answer-option"
          type="radio"
          className={styles.testChoiceInput}
          checked={value === 'ari'}
          onChange={() => onChange('ari')}
        />
        {value === 'ari' ? (
          <CircleCheck
            aria-hidden="true"
            className={clsx(styles.testChoiceIcon, styles.testChoiceIconSelected)}
          />
        ) : (
          <Circle aria-hidden="true" className={styles.testChoiceIcon} />
        )}
        <span>あり</span>
      </label>
      <label
        htmlFor="answer-option-nashi"
        className={clsx(styles.testChoiceItem, value === 'nashi' && styles.testChoiceItemSelected)}
      >
        <input
          id="answer-option-nashi"
          name="answer-option"
          type="radio"
          className={styles.testChoiceInput}
          checked={value === 'nashi'}
          onChange={() => onChange('nashi')}
        />
        {value === 'nashi' ? (
          <CircleCheck
            aria-hidden="true"
            className={clsx(styles.testChoiceIcon, styles.testChoiceIconSelected)}
          />
        ) : (
          <Circle aria-hidden="true" className={styles.testChoiceIcon} />
        )}
        <span>なし</span>
      </label>
    </div>
  );
}

function RangeGrid({
  segments,
  selectedRange,
  segmentSize,
  onSelectRange,
}: {
  segments: Segment[];
  selectedRange: { start: number; end: number } | null | undefined;
  segmentSize: number;
  onSelectRange?: (seg: Segment) => void;
}) {
  const isSelected = useCallback(
    (seg: Segment) =>
      !!selectedRange && seg.start === selectedRange.start && seg.end === selectedRange.end,
    [selectedRange]
  );

  return (
    <div className={styles.testRangeGrid} role="list">
      {segments.map((seg) => (
        <button
          key={`${seg.start}-${seg.end}`}
          type="button"
          role="listitem"
          aria-pressed={isSelected(seg) ? 'true' : 'false'}
          className={clsx(
            styles.testRangeButton,
            isSelected(seg) && styles.testRangeButtonSelected
          )}
          onClick={() => onSelectRange?.(seg)}
        >
          {seg.start}~{seg.end}語
          {seg.items.length < segmentSize && seg.items.length !== 0 && (
            <span className={styles.testRangeBadge}>{seg.items.length}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function TestIntroDialog({
  items,
  onClose,
  onSelectRange,
  onStart,
  segmentSize = 10,
  selectedRange,
}: TestIntroDialogProps) {
  // Escape で閉じる
  useEscapeKey(onClose, true);

  // --- range segmentation (memoized) ---
  const segments = useMemo(
    () => segmentItems(items, segmentSize, { assumeSorted: false }),
    [items, segmentSize]
  );
  const selectedSegment = useMemo(() => {
    if (!selectedRange) return undefined;
    return segments.find((s) => s.start === selectedRange.start && s.end === selectedRange.end);
  }, [segments, selectedRange]);

  // 解答の選択肢（単一選択: あり / なし）
  const [answerOption, setAnswerOption] = useState<AnswerOption>('ari');

  const handleStart = useCallback(() => {
    if (selectedSegment) onStart?.(selectedSegment);
  }, [onStart, selectedSegment]);

  return (
    <div
      className={styles.testOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="test-intro-title"
    >
      <div className={styles.testDialog}>
        <div className={styles.testDialogIconWrap}>
          <FileCheck className={styles.testDialogIcon} />
        </div>
        <div className={styles.testDialogInner}>
          <div className={styles.testDialogHeaderLeftRow}>
            <h2 className={styles.testDialogTitle}>解答の選択肢</h2>
            <AnswerOptionSelector value={answerOption} onChange={setAnswerOption} />
          </div>
          <div className={styles.testDialogHeaderLeftRow}>
            <h2 className={styles.testDialogTitle}>出題方法</h2>
          </div>
          <div className={styles.testDialogHeaderLeftRow}>
            <h2 className={styles.testDialogTitle}>解答モード</h2>
          </div>
          <div className={styles.testDialogHeaderLeftRow}>
            <h2 className={styles.testDialogTitle}>テスト範囲を選択</h2>
          </div>
          <RangeGrid
            segments={segments}
            selectedRange={selectedRange}
            segmentSize={segmentSize}
            onSelectRange={onSelectRange}
          />
          <div className={styles.testDialogActions}>
            <button type="button" className={styles.testDialogSecondaryButton} onClick={onClose}>
              閉じる
            </button>
            <button
              type="button"
              className={styles.testDialogPrimaryButton}
              disabled={!selectedSegment}
              onClick={handleStart}
            >
              スタート
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
