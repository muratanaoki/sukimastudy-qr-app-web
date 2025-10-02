import { RESULT_TIERS } from '@/shared/constants/resultTier';
import type { MedalRank } from '../../type';
import { ResultTier } from '../../enum';

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
  tier: ResultTier;
};

/**
 * スコアレンジと見た目/メダルをまとめた定義。
 * 先頭のエントリほど高いスコア帯になるようソートしている。
 */
const SCORE_DEFINITION_CONFIG = {
  [RESULT_TIERS[0]]: {
    minPercentage: 100,
    rating: 'Perfect!',
    medalRank: 'gold' as const,
    priority: 3,
  },
  [RESULT_TIERS[1]]: {
    minPercentage: 60,
    rating: 'Great!',
    medalRank: 'silver' as const,
    priority: 2,
  },
  [RESULT_TIERS[2]]: {
    minPercentage: 0,
    rating: 'Nice!',
    medalRank: 'bronze' as const,
    priority: 1,
  },
} satisfies Record<ResultTier, Omit<ScoreDefinition, 'tier'>>;

const SCORE_DEFINITIONS: readonly ScoreDefinition[] = RESULT_TIERS.map((tier) => ({
  tier,
  ...SCORE_DEFINITION_CONFIG[tier],
}));

const SCORE_META_BY_TIER: Record<ResultTier, ScoreMeta> = SCORE_DEFINITIONS.reduce(
  (table, { tier, rating, medalRank, priority }) => {
    table[tier] = { rating, medalRank, priority };
    return table;
  },
  {} as Record<ResultTier, ScoreMeta>
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
export const resolveScoreTier = (percentage: number): ResultTier => {
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
