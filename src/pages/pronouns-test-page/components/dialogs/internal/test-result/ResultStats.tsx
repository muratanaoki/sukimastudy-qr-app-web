import styles from './resultStats.module.css';

export type ResultStatsProps = {
  total: number;
  correctAnswers: number;
};

export const ResultStats = ({ total, correctAnswers }: ResultStatsProps) => (
  <div className={styles.rateBox}>
    <div className={styles.resultStats}>
      <p className={styles.resultLabel}>わかった数</p>
      <p>
        <span className={styles.correctAnswers}>{correctAnswers}</span>
        <span className={styles.totalQuestions}>/{total}</span>
      </p>
    </div>
  </div>
);

export default ResultStats;
