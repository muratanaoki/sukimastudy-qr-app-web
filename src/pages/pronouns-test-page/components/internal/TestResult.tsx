import styles from './testResult.module.css';
import clsx from 'clsx';
import { ThumbsUp, TrendingUp, CircleCheck } from 'lucide-react';
import { PrimaryButton } from '@/shared/components/primary-button/PrimaryButton';
import { EnglishWord } from '../EnglishWord';
import type { AnswerRecord } from '../../hooks/useTestRunner';
import { useSpeech } from '../../hooks/useSpeech';
import { useMemo } from 'react';

type TestResultProps = {
  total: number;
  correctAnswers: number;
  scorePercentage: number;
  answerHistory: AnswerRecord[];
  onClose: () => void;
};

const getScoreInfo = (percentage: number): { rating: string; className: string } => {
  if (percentage === 100) return { rating: 'Perfect!', className: 'perfect' };
  if (percentage >= 60) return { rating: 'Great!', className: 'great' };
  return { rating: 'Nice', className: 'nice' };
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
  answerHistory,
  onClose,
}: TestResultProps) => {
  const { rating, className: ratingClass } = getScoreInfo(scorePercentage);
  const IconComponent = getRatingIcon(scorePercentage);

  // 正解・不正解の単語を分離（スキップした単語も不正解としてカウント）
  const { correctWords, incorrectWords } = useMemo(() => {
    const correct = answerHistory.filter((record) => record.isCorrect).map((record) => record.item);
    const incorrect = answerHistory
      .filter((record) => !record.isCorrect)
      .map((record) => record.item);
    return { correctWords: correct, incorrectWords: incorrect };
  }, [answerHistory]);

  // useSpeechフックを作成（EnglishWordコンポーネントが必要とする）
  const speech = useSpeech();

  return (
    <div className={styles.testResult}>
      <IconComponent size={64} className={clsx(styles.resultRating, styles[ratingClass])} />
      <h2 className={clsx(styles.resultRating, styles[ratingClass])}>{rating}</h2>
      <div className={styles.resultStats}>
        {correctAnswers} / {total} 問正解
      </div>

      <PrimaryButton className={styles.actionsButton} onClick={onClose}>
        終了
      </PrimaryButton>

      {/* 不正解した単語 */}
      {incorrectWords.length > 0 && (
        <div className={styles.wordSection}>
          <h3 className={styles.sectionTitle}>間違えた単語</h3>
          <EnglishWord items={incorrectWords} speech={speech} />
        </div>
      )}

      {/* 正解した単語 */}
      {correctWords.length > 0 && (
        <div className={styles.wordSection}>
          <h3 className={styles.sectionTitle}>正解した単語</h3>
          <EnglishWord items={correctWords} speech={speech} />
        </div>
      )}
    </div>
  );
};

export default TestResult;
