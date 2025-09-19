import styles from './testIntroDialog.module.css';
import { FileCheck, Settings } from 'lucide-react';
import type { PronounItem } from '../utils/type';
import { useCallback, useMemo } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { segmentItems } from '../utils/function';
import clsx from 'clsx';
import { PrimaryButton } from '../../../shared/components/primary-button/PrimaryButton';
import { SecondaryButton } from '../../../shared/components/secondary-button/SecondaryButton';

export type TestIntroDialogProps = {
  items: PronounItem[];
  onClose: () => void;
  onSelectRange?: (range: { start: number; end: number; items: PronounItem[] }) => void;
  onStart?: (payload: { start: number; end: number; items: PronounItem[] }) => void;
  segmentSize?: number; // default 10
  selectedRange?: { start: number; end: number } | null;
};

type Segment = { start: number; end: number; items: PronounItem[] };

function RangeGrid({
  segments,
  selectedRange,
  onSelectRange,
}: {
  segments: Segment[];
  selectedRange: { start: number; end: number } | null | undefined;
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
        </button>
      ))}
    </div>
  );
}

export function TestIntroDialog({
  items,
  onClose,
  onSelectRange,
  segmentSize = 10,
  selectedRange,
}: TestIntroDialogProps) {
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
          <div className={styles.testDialogHeader}>
            <div className={styles.testDialogHeaderRightRow}>
              <button
                type="button"
                className={styles.testDialogSettingsButton}
                aria-label="設定を変更"
                title="設定を変更"
              >
                <Settings aria-hidden="true" />
                設定
              </button>
            </div>
          </div>
          <div className={styles.testDialogHeaderLeftRow}>
            <h2 className={styles.testDialogTitle}>テスト範囲を選択</h2>
          </div>
          <RangeGrid
            segments={segments}
            selectedRange={selectedRange}
            onSelectRange={onSelectRange}
          />
          <div className={styles.testDialogActions}>
            <SecondaryButton type="button" onClick={onClose}>
              閉じる
            </SecondaryButton>
            <PrimaryButton type="button" disabled={!selectedSegment}>
              スタート
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
