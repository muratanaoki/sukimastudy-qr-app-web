import styles from './testIntroDialog.module.css';
import { Check, Settings } from 'lucide-react';
import type { PronounGroup, Segment } from '../../utils/domain/type';
import { useCallback, useEffect, useMemo } from 'react';
import { useEscapeKey } from '../../hooks/dialog/useEscapeKey';
import { segmentItems } from '../../utils/domain/function';
import clsx from 'clsx';
import { PrimaryButton } from '@/shared/components/primary-button/PrimaryButton';
import { useInitialSelect } from '../../hooks/gameplay/useInitialSelect';
import { SelectableButton } from '@/shared/components/selectable-button/SelectableButton';
import { DialogCard } from '@/shared/components/dialog/DialogCard';
import { unlockSpeechSynthesis } from '@/shared/utils/speechUnlocker';
import type { SoundHandle } from '@/shared/utils/audio/soundHandle';
import { STARTUP_AUDIO_FADE_MS, STARTUP_AUDIO_SRC } from '../../utils/constants/audio';
import { getStartupSoundHandle } from '../../utils/audio/startupSoundHandle';

// ===== Types =====
type SelectedRange = { groupNo: number; start: number; end: number } | null | undefined;
type RangeSelectionPayload = ({ groupNo: number } & Segment) & {
  soundHandle?: SoundHandle;
  preplayed?: boolean;
};

const useStartupSoundHandle = (src?: string): SoundHandle | null => {
  const handle = useMemo(() => {
    if (!src) return null;
    return getStartupSoundHandle();
  }, [src]);

  useEffect(() => {
    if (!handle) return;
    handle
      .ensureLoaded()
      .then((audio) => {
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
      })
      .catch((error) => {
        console.warn('スタート音声の事前読み込みに失敗しました:', error);
      });
  }, [handle]);

  return handle;
};

export type TestIntroDialogProps = {
  item: PronounGroup; // 単一グループに変更
  onClose: () => void;
  onSelectRange?: (range: RangeSelectionPayload) => void;
  onStart?: (payload: RangeSelectionPayload) => void;
  segmentSize?: number; // default 10
  selectedRange?: SelectedRange;
  onOpenSettings?: () => void; // 設定ダイアログを開くトリガー
};

// ===== Presentational =====
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
  onOpenSettings,
}: TestIntroDialogProps) => {
  useEscapeKey(onClose, true);
  const startupSoundHandle = useStartupSoundHandle(STARTUP_AUDIO_SRC);

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
        soundHandle: startupSoundHandle ?? undefined,
      }),
    [onSelectRange, startupSoundHandle]
  );

  const handleStart = useCallback(() => {
    if (!selectedSegment || !selectedRange) return;
    unlockSpeechSynthesis();
    void startupSoundHandle?.playFromStart({ fadeInDurationMs: STARTUP_AUDIO_FADE_MS });
    onStart?.({
      groupNo: selectedRange.groupNo,
      start: selectedSegment.start,
      end: selectedSegment.end,
      items: selectedSegment.items,
      soundHandle: startupSoundHandle ?? undefined,
      preplayed: !!startupSoundHandle,
    });
  }, [onStart, selectedRange, selectedSegment, startupSoundHandle]);

  return (
    <DialogCard
      onClose={onClose}
      title={groupWithSegments.title}
      titleId="test-intro-title"
      Icon={Check}
      headerLeft={
        <button
          type="button"
          className={styles.testDialogSettingsButton}
          aria-label="設定を変更"
          title="設定を変更"
          onClick={onOpenSettings}
        >
          <Settings
            strokeWidth={2.2}
            className={styles.testDialogSettingsIcon}
            aria-hidden="true"
          />
          設定変更
        </button>
      }
      actions={
        <PrimaryButton
          className={styles.testDialogActionsButton}
          disabled={!selectedSegment || !selectedRange}
          onClick={handleStart}
        >
          スタート
        </PrimaryButton>
      }
    >
      <div key={groupWithSegments.groupNo}>
        <RangeGrid
          groupNo={groupWithSegments.groupNo}
          segments={groupWithSegments.segments}
          selectedRange={selectedRange}
          onSelectRange={handleSelectRange}
        />
      </div>
    </DialogCard>
  );
};
