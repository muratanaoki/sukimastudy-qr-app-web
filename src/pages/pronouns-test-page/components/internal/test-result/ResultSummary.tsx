import { useEffect, useRef } from 'react';
import { Player as LordiconPlayer } from '@lordicon/react';

import prizeIcon from '@/shared/loadicon/prize.json';

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

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, [scorePercentage]);

  return (
    <div className={styles.resultBox}>
      <div className={styles.resultIcon}>
        <LordiconPlayer ref={playerRef} icon={prizeIcon} size={iconSize} colorize={medalColor} />
      </div>
      <h2 className={styles.resultRating}>{rating}</h2>
    </div>
  );
};

export default ResultSummary;
