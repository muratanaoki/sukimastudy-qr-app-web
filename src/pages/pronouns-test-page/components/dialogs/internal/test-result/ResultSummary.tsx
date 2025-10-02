import { useEffect, useRef } from 'react';
import { Player as LordiconPlayer } from '@lordicon/react';

import prizePinchIcon from '@/shared/loadicon/prizePinch.json';
import prizeRevealIcon from '@/shared/loadicon/prizeReveal.json';

import styles from './resultSummary.module.css';
import type { ScoreTier } from '../../../../utils/score/score';

type IconAsset = typeof prizePinchIcon | typeof prizeRevealIcon;

const ICON_BY_TIER: Record<ScoreTier, IconAsset> = {
  perfect: prizeRevealIcon,
  great: prizePinchIcon,
  nice: prizePinchIcon,
};

const ICON_COLOR_BY_TIER: Record<ScoreTier, string> = {
  perfect: 'var(--medal-gold-color)',
  great: 'var(--medal-silver-color)',
  nice: 'var(--medal-bronze-color)',
};

export type ResultSummaryProps = {
  rating: string;
  iconSize: number;
  scorePercentage: number;
  tier: ScoreTier;
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
