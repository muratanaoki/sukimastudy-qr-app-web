import type { MedalRank } from '../../domain/type';

export type ScoreTier = 'perfect' | 'great' | 'nice';

export type ScoreMeta = {
  /** UI 表示用の評価ラベル。 */
  rating: string;
  /** 永続化・比較に使うメダルランク。 */
  medalRank: MedalRank;
  /** メダル同士を比較するための優先度（大きいほど高ランク）。 */
  priority: number;
};

type ScoreDefinition = ScoreMeta & {
  /** 該当ティアとなるスコアの下限（パーセント）。 */
  minPercentage: number;
  tier: ScoreTier;
};

/**
 * スコアレンジと見た目/メダルをまとめた定義。
 * 先頭のエントリほど高いスコア帯になるようソートしている。
 */
const SCORE_DEFINITIONS: readonly ScoreDefinition[] = [
  {
    tier: 'perfect',
    minPercentage: 100,
    rating: 'Perfect!',
    medalRank: 'gold',
    priority: 3,
  },
  {
    tier: 'great',
    minPercentage: 60,
    rating: 'Great!',
    medalRank: 'silver',
    priority: 2,
  },
  {
    tier: 'nice',
    minPercentage: 0,
    rating: 'Nice!',
    medalRank: 'bronze',
    priority: 1,
  },
] as const;

const SCORE_META_BY_TIER: Record<ScoreTier, ScoreMeta> = SCORE_DEFINITIONS.reduce(
  (table, { tier, rating, medalRank, priority }) => {
    table[tier] = { rating, medalRank, priority };
    return table;
  },
  {} as Record<ScoreTier, ScoreMeta>
);

const MEDAL_PRIORITY: Record<MedalRank, number> = SCORE_DEFINITIONS.reduce(
  (table, { medalRank, priority }) => {
    table[medalRank] = priority;
    return table;
  },
  {
    gold: 0,
    silver: 0,
    bronze: 0,
  }
);

/**
 * メダルランク同士を比較する際の優先度を返す。
 */
export const getMedalPriority = (rank: MedalRank): number => MEDAL_PRIORITY[rank];

/**
 * 与えられた正答率からスコアティアを決定する。
 */
export const resolveScoreTier = (percentage: number): ScoreTier => {
  for (const { tier, minPercentage } of SCORE_DEFINITIONS) {
    if (percentage >= minPercentage) {
      return tier;
    }
  }

  // 範囲外になった場合は最下位ティアにフォールバック
  return SCORE_DEFINITIONS[SCORE_DEFINITIONS.length - 1].tier;
};

/**
 * スコアティアに紐づくメタ情報を返すヘルパー。
 */
export const getScoreMeta = (percentage: number) => {
  const tier = resolveScoreTier(percentage);
  const { rating, medalRank, priority } = SCORE_META_BY_TIER[tier];

  return {
    tier,
    rating,
    medalRank,
    priority,
  };
};

export { SCORE_DEFINITIONS }; // テスト等での再利用を想定して公開
