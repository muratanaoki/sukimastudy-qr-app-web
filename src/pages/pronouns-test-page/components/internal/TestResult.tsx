import styles from './testResult.module.css';
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

const getScoreInfo = (percentage: number): { rating: string } => {
  if (percentage === 100) return { rating: 'Perfect!' };
  if (percentage >= 60) return { rating: 'Great!' };
  return { rating: 'Nice!' };
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
  const { rating } = getScoreInfo(scorePercentage);
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
      <div className={styles.resultBox}>
        <IconComponent className={styles.resultIcon} />
        <h2 className={styles.resultRating}>{rating}</h2>
        <div className={styles.resultStats}>
          <p className={styles.resultLabel}>わかった数</p>
          <p>
            <span className={styles.correctAnswers}>{correctAnswers}</span>
            <span className={styles.totalQuestions}>/{total}</span>
          </p>
        </div>

        <PrimaryButton className={styles.actionsButton} onClick={onClose}>
          終了
        </PrimaryButton>
      </div>
      <div className={styles.resultBody}>
        {/* 不正解した単語 */}
        {incorrectWords.length > 0 && (
          <div className={styles.wordSection}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.wordLabel}>わからなかった</span>
              <span className={styles.wordIncorrectCount}>{incorrectWords.length}</span>
            </h3>
            <EnglishWord items={incorrectWords} speech={speech} />
          </div>
        )}

        {/* 正解した単語 */}
        {correctWords.length > 0 && (
          <div className={styles.wordSection}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.wordLabel}>わかった</span>
              <span className={styles.wordCorrectCount}>{correctWords.length}</span>
            </h3>
            <EnglishWord items={correctWords} speech={speech} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResult;
