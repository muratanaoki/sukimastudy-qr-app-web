import { useEffect, useRef } from 'react';
import { Player as LordiconPlayer } from '@lordicon/react';

import prizePinchIcon from '@/shared/loadicon/prizePinch.json';
import prizeRevealIcon from '@/shared/loadicon/prizeReveal.json';

import styles from './resultSummary.module.css';

export type ResultSummaryProps = {
  rating: string;
  medalColor: string;
  iconSize: number;
  scorePercentage: number;
};

export const ResultSummary = ({
  rating,
  medalColor,
  iconSize,
  scorePercentage,
}: ResultSummaryProps) => {
  const playerRef = useRef<InstanceType<typeof LordiconPlayer> | null>(null);
  const icon = medalColor === 'var(--medal-gold-color)' ? prizeRevealIcon : prizePinchIcon;
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
          colorize={medalColor}
          renderMode="HARDWARE"
        />
      </div>
      <h2 className={styles.resultRating}>{rating}</h2>
    </div>
  );
};

export default ResultSummary;
