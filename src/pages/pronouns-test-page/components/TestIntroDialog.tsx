import styles from './testIntroDialog.module.css';
import { FileCheck, Settings } from 'lucide-react';
import type { PronounGroup, Segment } from '../utils/type';
import { useCallback, useMemo } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { segmentItems } from '../utils/function';
import clsx from 'clsx';
import { PrimaryButton } from '../../../shared/components/primary-button/PrimaryButton';
import { useInitialSelect } from '../hooks/useInitialSelect';
import { SelectableButton } from '@/shared/components/selectable-button/SelectableButton';
import { CloseButton } from '@/shared/components/close-button/CloseButton';

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
  title,
}: {
  groupNo: number;
  title: string;
  Icon?: React.ComponentType<any>;
}) => (
  <h2 id="test-intro-title" className={styles.testDialogHeader}>
    {title}
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
        <SelectableButton
          key={`${seg.start}-${seg.end}`}
          className={clsx(isSelected(seg) && styles.testRangeButtonSelected)}
          onClick={() => onSelectRange?.({ groupNo, ...seg })}
        >
          {seg.start}~{seg.end}語
        </SelectableButton>
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
  // 初期選択（最初のボタンを選択）
  useInitialSelect(groupWithSegments, selectedRange, onSelectRange);

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
          <div className={styles.testDialogHeaderRightRow}>
            <CloseButton onClose={onClose} />
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
              設定変更
            </button>
          </div>
          <div key={groupWithSegments.groupNo}>
            <GroupHeader
              groupNo={groupWithSegments.groupNo}
              title={groupWithSegments.title}
              Icon={groupWithSegments.icon}
            />
            <RangeGrid
              groupNo={groupWithSegments.groupNo}
              segments={groupWithSegments.segments}
              selectedRange={selectedRange}
              onSelectRange={handleSelectRange}
            />
          </div>
          <div className={styles.testDialogActions}>
            <PrimaryButton
              className={styles.testDialogActionsButton}
              disabled={!selectedSegment || !selectedRange}
              onClick={handleStart}
            >
              スタート
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
