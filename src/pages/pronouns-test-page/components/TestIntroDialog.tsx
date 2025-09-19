import styles from '../index.module.css';
import { FileCheck, Settings } from 'lucide-react';
import type { PronounData } from '../utils/type';
import { useMemo } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { segmentItems } from '../utils/function';

export type TestIntroDialogProps = {
  items: PronounData['items'];
  onClose: () => void;
  onSelectRange?: (range: { start: number; end: number; items: PronounData['items'] }) => void;
  onStart?: (range: { start: number; end: number; items: PronounData['items'] }) => void;
  segmentSize?: number; // default 10
  selectedRange?: { start: number; end: number } | null;
};

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
  const selectedSegment = selectedRange
    ? segments.find((s) => s.start === selectedRange.start && s.end === selectedRange.end)
    : undefined;

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
          <div className={styles.testRangeGrid} role="list">
            {segments.map((seg) => {
              const isSelected =
                selectedRange && seg.start === selectedRange.start && seg.end === selectedRange.end;
              return (
                <button
                  key={`${seg.start}-${seg.end}`}
                  type="button"
                  role="listitem"
                  aria-pressed={isSelected ? 'true' : 'false'}
                  className={
                    isSelected
                      ? `${styles.testRangeButton} ${styles.testRangeButtonSelected}`
                      : styles.testRangeButton
                  }
                  onClick={() => onSelectRange?.(seg)}
                >
                  {seg.start}~{seg.end}語
                  {seg.items.length < segmentSize && seg.items.length !== 0 && (
                    <span className={styles.testRangeBadge}>{seg.items.length}</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className={styles.testDialogActions}>
            <button type="button" className={styles.testDialogSecondaryButton} onClick={onClose}>
              閉じる
            </button>
            <button
              type="button"
              className={styles.testDialogPrimaryButton}
              disabled={!selectedSegment}
              onClick={() => selectedSegment && onStart?.(selectedSegment)}
            >
              スタート
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
