export enum ResultTier {
  Perfect = 'perfect',
  Great = 'great',
  Nice = 'nice',
}

export const RESULT_TIERS = [ResultTier.Perfect, ResultTier.Great, ResultTier.Nice] as const;
