import styles from '../testDialog.module.css';
import { ThumbsUp, TrendingUp, CircleCheck } from 'lucide-react';
import { PrimaryButton } from '@/shared/components/primary-button/PrimaryButton';

type TestResultProps = {
  total: number;
  correctAnswers: number;
  scorePercentage: number;
  onClose: () => void;
};

const getScoreRating = (percentage: number): string => {
  if (percentage === 100) return 'Perfect!';
  if (percentage >= 60) return 'Great!';
  return 'Nice';
};

const getRatingClass = (percentage: number): string => {
  if (percentage === 100) return 'perfect';
  if (percentage >= 60) return 'great';
  return 'nice';
};

const getRatingIcon = (percentage: number) => {
  if (percentage === 100) return CircleCheck;
  if (percentage >= 60) return TrendingUp;
  return ThumbsUp;
};

export const TestResult = ({
  total,
  correctAnswers,
  scorePercentage,
  onClose,
}: TestResultProps) => {
  const rating = getScoreRating(scorePercentage);
  const ratingClass = getRatingClass(scorePercentage);
  const IconComponent = getRatingIcon(scorePercentage);

  return (
    <div className={styles.testResult}>
      <IconComponent size={64} className={`${styles.resultRating} ${styles[ratingClass]}`} />
      <h2 className={`${styles.resultRating} ${styles[ratingClass]}`}>{rating}</h2>
      <div className={styles.resultStats}>
        {correctAnswers} / {total} 問正解
      </div>
      <PrimaryButton className={styles.actionsButton} onClick={onClose}>
        終了
      </PrimaryButton>
    </div>
  );
};

export default TestResult;
