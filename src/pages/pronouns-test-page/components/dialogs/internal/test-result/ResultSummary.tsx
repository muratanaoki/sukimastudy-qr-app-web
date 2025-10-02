import { useEffect, useRef } from 'react';
import { Player as LordiconPlayer } from '@lordicon/react';

import prizePinchIcon from '@/shared/loadicon/prizePinch.json';
import prizeRevealIcon from '@/shared/loadicon/prizeReveal.json';

import styles from './resultSummary.module.css';
import { ResultTier } from '@/pages/pronouns-test-page/utils/enum';

type IconAsset = typeof prizePinchIcon | typeof prizeRevealIcon;

const ICON_BY_TIER: Record<ResultTier, IconAsset> = {
  [ResultTier.Perfect]: prizeRevealIcon,
  [ResultTier.Great]: prizePinchIcon,
  [ResultTier.Nice]: prizePinchIcon,
};

const ICON_COLOR_BY_TIER: Record<ResultTier, string> = {
  [ResultTier.Perfect]: 'var(--medal-gold-color)',
  [ResultTier.Great]: 'var(--medal-silver-color)',
  [ResultTier.Nice]: 'var(--medal-bronze-color)',
};

export type ResultSummaryProps = {
  rating: string;
  iconSize: number;
  scorePercentage: number;
  tier: ResultTier;
};

export const ResultSummary = ({ rating, iconSize, scorePercentage, tier }: ResultSummaryProps) => {
  const playerRef = useRef<InstanceType<typeof LordiconPlayer> | null>(null);
  const icon = ICON_BY_TIER[tier] ?? prizePinchIcon;
  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, [scorePercentage]);

  return (
    <div className={styles.resultBox}>
      <div className={styles.resultIcon}>
        <LordiconPlayer
          ref={playerRef}
          icon={icon}
          size={iconSize}
          colorize={ICON_COLOR_BY_TIER[tier]}
          renderMode="HARDWARE"
        />
      </div>
      <h2 className={styles.resultRating}>{rating}</h2>
    </div>
  );
};

export default ResultSummary;
