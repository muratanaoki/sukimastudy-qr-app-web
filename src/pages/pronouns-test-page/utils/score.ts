export type ScoreTier = 'perfect' | 'great' | 'nice';

const SCORE_META: Record<ScoreTier, { rating: string; medalColor: string }> = {
  perfect: {
    rating: 'Perfect!',
    medalColor: 'var(--medal-gold-color)',
  },
  great: {
    rating: 'Great!',
    medalColor: 'var(--medal-silver-color)',
  },
  nice: {
    rating: 'Nice!',
    medalColor: 'var(--medal-bronze-color)',
  },
};

export const resolveScoreTier = (percentage: number): ScoreTier => {
  if (percentage === 100) return 'perfect';
  if (percentage >= 60) return 'great';
  return 'nice';
};

export const getScoreMeta = (percentage: number) => {
  const tier = resolveScoreTier(percentage);
  const { rating, medalColor } = SCORE_META[tier];

  return {
    tier,
    rating,
    medalColor,
  };
};
