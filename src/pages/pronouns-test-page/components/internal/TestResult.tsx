import styles from './testResult.module.css';
import { ThumbsUp, TrendingUp, CircleCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PrimaryButton } from '@/shared/components/primary-button/PrimaryButton';
import { EnglishWord } from '../EnglishWord';
import type { AnswerRecord } from '../../hooks/useTestRunner';
import { useSpeech } from '../../hooks/useSpeech';
import type { UseSpeech } from '../../hooks/useSpeech';
import { useMemo } from 'react';

type TestResultProps = {
  total: number;
  correctAnswers: number;
  scorePercentage: number;
  answerHistory: AnswerRecord[];
  onClose: () => void;
};

type WordItem = AnswerRecord['item'];

enum ResultSectionVariant {
  Correct = 'correct',
  Incorrect = 'incorrect',
}

type WordGroups = Record<ResultSectionVariant, WordItem[]>;

const SECTION_COUNT_CLASS_NAMES: Record<ResultSectionVariant, string> = {
  [ResultSectionVariant.Correct]: styles.sectionCountPositive,
  [ResultSectionVariant.Incorrect]: styles.sectionCountNegative,
};

const getScoreMeta = (percentage: number): { rating: string; Icon: LucideIcon } => {
  if (percentage === 100) return { rating: 'Perfect!', Icon: CircleCheck };
  if (percentage >= 60) return { rating: 'Great!', Icon: TrendingUp };
  return { rating: 'Nice!', Icon: ThumbsUp };
};

const createInitialWordGroups = (): WordGroups => ({
  [ResultSectionVariant.Correct]: [],
  [ResultSectionVariant.Incorrect]: [],
});

const groupAnswerHistory = (history: AnswerRecord[]): WordGroups =>
  history.reduce<WordGroups>((acc, record) => {
    const bucket = record.isCorrect ? ResultSectionVariant.Correct : ResultSectionVariant.Incorrect;
    acc[bucket].push(record.item);
    return acc;
  }, createInitialWordGroups());

type ResultWordSectionProps = {
  variant: ResultSectionVariant;
  label: string;
  items: WordItem[];
  speech: UseSpeech;
};

const ResultWordSection = ({ variant, label, items, speech }: ResultWordSectionProps) => {
  const countClassName = SECTION_COUNT_CLASS_NAMES[variant];

  return (
    <div className={styles.wordSection}>
      <h3 className={styles.sectionTitle}>
        <span className={styles.sectionLabel}>{label}</span>
        <span className={countClassName}>{items.length}</span>
      </h3>
      <EnglishWord items={items} speech={speech} />
    </div>
  );
};

export const TestResult = ({
  total,
  correctAnswers,
  scorePercentage,
  answerHistory,
  onClose,
}: TestResultProps) => {
  const { rating, Icon } = getScoreMeta(scorePercentage);

  // 正解・不正解の単語を分離（スキップした単語も不正解としてカウント）
  const groupedWords = useMemo(() => groupAnswerHistory(answerHistory), [answerHistory]);
  const correctWords = groupedWords[ResultSectionVariant.Correct];
  const incorrectWords = groupedWords[ResultSectionVariant.Incorrect];

  // useSpeechフックを作成（EnglishWordコンポーネントが必要とする）
  const speech = useSpeech();

  return (
    <div className={styles.testResult}>
      <div className={styles.resultBox}>
        <div>
          <Icon className={styles.resultIcon} />
          <h2 className={styles.resultRating}>{rating}</h2>
        </div>
      </div>

      <div className={styles.rateBox}>
        <div className={styles.resultStats}>
          <p className={styles.resultLabel}>わかった数</p>
          <p>
            <span className={styles.correctAnswers}>{correctAnswers}</span>
            <span className={styles.totalQuestions}>/{total}</span>
          </p>
        </div>
      </div>

      <div className={styles.actionsButtonBox}>
        <PrimaryButton className={styles.actionsButton} onClick={onClose}>
          終了
        </PrimaryButton>
      </div>

      <div className={styles.resultBody}>
        {/* 不正解した単語 */}
        {incorrectWords.length > 0 && (
          <ResultWordSection
            variant={ResultSectionVariant.Incorrect}
            label="わからなかった"
            items={incorrectWords}
            speech={speech}
          />
        )}

        {/* 正解した単語 */}
        {correctWords.length > 0 && (
          <ResultWordSection
            variant={ResultSectionVariant.Correct}
            label="わかった"
            items={correctWords}
            speech={speech}
          />
        )}
      </div>
    </div>
  );
};

export default TestResult;
