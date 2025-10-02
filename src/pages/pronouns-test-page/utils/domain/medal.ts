import { getMedalPriority, getScoreMeta } from '../functions/score/score';
import type { MedalRank, PosGroup, PronounGroup } from '../type';

/** 採点セグメントのデフォルト幅（語数）。 */
export const DEFAULT_SEGMENT_SIZE = 10;

const padIndex = (value: number) => String(value).padStart(3, '0');

export const buildSegmentId = (
  pos: PosGroup,
  group: PronounGroup,
  start: number,
  end: number
): string => {
  const normalizedStart = Math.min(start, end);
  const normalizedEnd = Math.max(start, end);
  const rangeToken = `${padIndex(normalizedStart)}-${padIndex(normalizedEnd)}`;
  return `${pos.pos}-${group.id}-${rangeToken}`;
};

/**
 * 正答率からメダルランクを算出する純粋関数。
 * UI とは独立しているためそのまま単体テストが可能。
 */
export const getMedalRank = (scorePercentage: number): MedalRank =>
  getScoreMeta(scorePercentage).medalRank;

/**
 * 既存メダルと新メダルを比較し、優先度の高い方を返す。
 */
export const selectHigherMedal = (current: MedalRank | undefined, next: MedalRank): MedalRank => {
  if (!current) return next;
  return getMedalPriority(next) >= getMedalPriority(current) ? next : current;
};

export type SegmentMeta = {
  /** 当該セグメントの開始インデックス。 */
  start: number;
  /** 当該セグメントの終了インデックス。 */
  end: number;
  /** セグメント番号（0始まり）。 */
  segmentIndex: number;
  /** 品詞 + グループ + 範囲を組み合わせた安定 ID。 */
  segmentId: string;
};

/**
 * 品詞/グループから永続化に使うセグメント情報を導出する。
 * セグメント幅が 0 以下の場合はデフォルト値で再計算する。
 */
export const resolveSegmentMeta = (
  pos: PosGroup,
  group: PronounGroup,
  segmentSize: number = DEFAULT_SEGMENT_SIZE
): SegmentMeta | null => {
  if (!group.items.length) return null;

  const effectiveSegmentSize = segmentSize > 0 ? segmentSize : DEFAULT_SEGMENT_SIZE;

  let minIndex = Number.POSITIVE_INFINITY;
  let maxIndex = Number.NEGATIVE_INFINITY;

  for (const { index } of group.items) {
    if (index < minIndex) minIndex = index;
    if (index > maxIndex) maxIndex = index;
  }

  const segmentIndex = Math.floor((minIndex - 1) / effectiveSegmentSize);

  return {
    start: minIndex,
    end: maxIndex,
    segmentIndex,
    segmentId: buildSegmentId(pos, group, minIndex, maxIndex),
  };
};
