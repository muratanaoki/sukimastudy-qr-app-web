import styles from './testIntroDialog.module.css';
import { FileCheck, Settings } from 'lucide-react';
import type { PronounGroup, Segment } from '../utils/type';
import { useCallback, useMemo } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { segmentItems } from '../utils/function';
import clsx from 'clsx';
import { PrimaryButton } from '../../../shared/components/primary-button/PrimaryButton';
import { SecondaryButton } from '../../../shared/components/secondary-button/SecondaryButton';

export type TestIntroDialogProps = {
  item: PronounGroup; // 単一グループに変更
  onClose: () => void;
  onSelectRange?: (range: RangeSelectionPayload) => void;
  onStart?: (payload: RangeSelectionPayload) => void;
  segmentSize?: number; // default 10
  selectedRange?: SelectedRange;
};

// ===== Types =====
type SelectedRange = { groupNo: number; start: number; end: number } | null | undefined;
type RangeSelectionPayload = { groupNo: number } & Segment;

// ===== Small Presentational Components =====
const GroupHeader = ({
  groupNo,
  title,
  Icon,
}: {
  groupNo: number;
  title: string;
  Icon?: React.ComponentType<any>;
}) => (
  <h2 className={styles.testDialogHeaderLeftRow}>
    <span aria-hidden="true">{String(groupNo).padStart(2, '0')}.</span>
    <span className={styles.testDialogTitle}>{title}</span>
    {Icon && <Icon className={styles.headerIcon} aria-hidden="true" />}
  </h2>
);

const RangeGrid = ({
  groupNo,
  segments,
  selectedRange,
  onSelectRange,
}: {
  groupNo: number;
  segments: Segment[];
  selectedRange: SelectedRange;
  onSelectRange?: (payload: RangeSelectionPayload) => void;
}) => {
  const isSelected = useCallback(
    (seg: Segment) =>
      !!selectedRange &&
      groupNo === selectedRange.groupNo &&
      seg.start === selectedRange.start &&
      seg.end === selectedRange.end,
    [groupNo, selectedRange]
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
          onClick={() => onSelectRange?.({ groupNo, ...seg })}
        >
          {seg.start}~{seg.end}語
        </button>
      ))}
    </div>
  );
};

// ===== Hooks =====
const useGroupWithSegments = (group: PronounGroup, segmentSize: number) =>
  useMemo(
    () => ({
      groupNo: group.groupNo,
      title: group.title,
      icon: group.icon,
      segments: segmentItems(group.items, segmentSize, { assumeSorted: false }),
    }),
    [group, segmentSize]
  );

const useSelectedSegment = (
  groupWithSegments: {
    groupNo: number;
    title: string;
    icon: any;
    segments: Segment[];
  },
  selectedRange: SelectedRange
) =>
  useMemo(() => {
    if (!selectedRange) return undefined;
    if (groupWithSegments.groupNo !== selectedRange.groupNo) return undefined;
    return groupWithSegments.segments.find(
      (s) => s.start === selectedRange.start && s.end === selectedRange.end
    );
  }, [groupWithSegments, selectedRange]);

export const TestIntroDialog = ({
  item,
  onClose,
  onSelectRange,
  onStart,
  segmentSize = 10,
  selectedRange,
}: TestIntroDialogProps) => {
  useEscapeKey(onClose, true);

  // Data derivations
  const groupWithSegments = useGroupWithSegments(item, segmentSize);
  const selectedSegment = useSelectedSegment(groupWithSegments, selectedRange);

  // Handlers
  const handleSelectRange = useCallback(
    (seg: RangeSelectionPayload) =>
      onSelectRange?.({
        groupNo: seg.groupNo,
        start: seg.start,
        end: seg.end,
        items: seg.items,
      }),
    [onSelectRange]
  );

  const handleStart = useCallback(() => {
    if (!selectedSegment || !selectedRange) return;
    onStart?.({
      groupNo: selectedRange.groupNo,
      start: selectedSegment.start,
      end: selectedSegment.end,
      items: selectedSegment.items,
    });
  }, [onStart, selectedRange, selectedSegment]);

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
                <Settings
                  strokeWidth={2.2}
                  className={styles.testDialogSettingsIcon}
                  aria-hidden="true"
                />
                <span>設定変更</span>
              </button>
            </div>
          </div>
          <h1>代名詞</h1>
          {(() => {
            const { groupNo, title, icon: Icon, segments } = groupWithSegments;
            return (
              <div key={groupNo}>
                <GroupHeader groupNo={groupNo} title={title} Icon={Icon} />
                <RangeGrid
                  groupNo={groupNo}
                  segments={segments}
                  selectedRange={selectedRange}
                  onSelectRange={handleSelectRange}
                />
              </div>
            );
          })()}
          <div className={styles.testDialogActions}>
            <SecondaryButton onClick={onClose}>閉じる</SecondaryButton>
            <PrimaryButton disabled={!selectedSegment || !selectedRange} onClick={handleStart}>
              スタート
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
