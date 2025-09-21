import { useEffect, useRef } from 'react';
import type { Segment } from '../utils/type';

type SelectedRangeLike = { groupNo: number; start: number; end: number } | null | undefined;

type GroupWithSegments = {
  groupNo: number;
  segments: Segment[];
};

type OnSelectRange = (payload: { groupNo: number } & Segment) => void;

/**
 * ダイアログ初回表示時に、最初のセグメントを自動選択するためのフック。
 * 既に selectedRange が存在する場合は何もしない。
 */
export const useInitialSelect = (
  groupWithSegments: GroupWithSegments,
  selectedRange: SelectedRangeLike,
  onSelectRange?: OnSelectRange
) => {
  const didInitRef = useRef(false);

  useEffect(() => {
    if (didInitRef.current) return;
    if (!selectedRange && groupWithSegments.segments.length > 0) {
      const firstSeg = groupWithSegments.segments[0];
      onSelectRange?.({ groupNo: groupWithSegments.groupNo, ...firstSeg });
    }
    didInitRef.current = true;
  }, [groupWithSegments, selectedRange, onSelectRange]);
};
