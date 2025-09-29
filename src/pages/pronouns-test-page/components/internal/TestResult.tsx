import styles from './testResult.module.css';
import clsx from 'clsx';
import { Player as LordiconPlayer } from '@lordicon/react';
import { PrimaryButton } from '@/shared/components/primary-button/PrimaryButton';
import { EnglishWord } from '../EnglishWord';
import type { AnswerRecord } from '../../hooks/useTestRunner';
import { useSpeech } from '../../hooks/useSpeech';
import type { UseSpeech } from '../../hooks/useSpeech';
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import prizeIcon from '@/shared/loadicon/prize.json';

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

const SCORE_MEDAL_COLORS = {
  gold: 'var(--medal-gold-color)',
  silver: 'var(--medal-silver-color)',
  bronze: 'var(--medal-bronze-color)',
} as const;

type ScoreMeta = {
  rating: string;
  medalColor: string;
};

const getScoreMeta = (percentage: number): ScoreMeta => {
  if (percentage === 100) {
    return { rating: 'Perfect!', medalColor: SCORE_MEDAL_COLORS.gold };
  }

  if (percentage >= 60) {
    return { rating: 'Great!', medalColor: SCORE_MEDAL_COLORS.silver };
  }

  return { rating: 'Nice!', medalColor: SCORE_MEDAL_COLORS.bronze };
};

const createInitialWordGroups = (): WordGroups => ({
  [ResultSectionVariant.Correct]: [],
  [ResultSectionVariant.Incorrect]: [],
});

const RESULT_ICON_SIZE_REM = 9.375; // 150px based on 16px root font-size

const groupAnswerHistory = (history: AnswerRecord[]): WordGroups =>
  history.reduce<WordGroups>((acc, record) => {
    const bucket = record.isCorrect ? ResultSectionVariant.Correct : ResultSectionVariant.Incorrect;
    acc[bucket].push(record.item);
    return acc;
  }, createInitialWordGroups());

const RESULT_SECTION_ORDER: ResultSectionVariant[] = [
  ResultSectionVariant.Incorrect,
  ResultSectionVariant.Correct,
];

const RESULT_SECTION_LABELS: Record<ResultSectionVariant, string> = {
  [ResultSectionVariant.Correct]: 'わかった',
  [ResultSectionVariant.Incorrect]: 'わからなかった',
};

const convertRemToPixels = (rem: number): number => {
  if (typeof window === 'undefined') {
    return rem * 16;
  }

  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const baseFontSize = Number.isNaN(rootFontSize) ? 16 : rootFontSize;

  return rem * baseFontSize;
};

const useResponsiveRemSize = (remSize: number): number => {
  const calculateSize = useCallback(() => convertRemToPixels(remSize), [remSize]);

  const [size, setSize] = useState<number>(calculateSize);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setSize(calculateSize());

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateSize]);

  return size;
};

type ResultSectionDefinition = {
  variant: ResultSectionVariant;
  label: string;
  items: WordItem[];
};

type ResultWordSectionsProps = {
  sections: ResultSectionDefinition[];
  speech: UseSpeech;
};

type ResultWordSectionProps = {
  variant: ResultSectionVariant;
  label: string;
  items: WordItem[];
  speech: UseSpeech;
};

const ResultWordSection = ({ variant, label, items, speech }: ResultWordSectionProps) => {
  const countClassName = clsx(styles.sectionCount, SECTION_COUNT_CLASS_NAMES[variant]);

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

const ResultWordSections = ({ sections, speech }: ResultWordSectionsProps) => (
  <div className={styles.resultBody}>
    {sections.map(({ variant, label, items }) => (
      <ResultWordSection
        key={variant}
        variant={variant}
        label={label}
        items={items}
        speech={speech}
      />
    ))}
  </div>
);

type ResultSummaryProps = {
  rating: string;
  medalColor: string;
  iconSize: number;
  playerRef: RefObject<InstanceType<typeof LordiconPlayer>>;
};

const ResultSummary = ({ rating, medalColor, iconSize, playerRef }: ResultSummaryProps) => (
  <div className={styles.resultBox}>
    <div className={styles.resultIcon}>
      <LordiconPlayer ref={playerRef} icon={prizeIcon} size={iconSize} colorize={medalColor} />
    </div>
    <h2 className={styles.resultRating}>{rating}</h2>
  </div>
);

type ResultStatsProps = {
  total: number;
  correctAnswers: number;
};

const ResultStats = ({ total, correctAnswers }: ResultStatsProps) => (
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

type ResultActionsProps = {
  onClose: () => void;
};

const ResultActions = ({ onClose }: ResultActionsProps) => (
  <div className={styles.actionsButtonBox}>
    <PrimaryButton className={styles.actionsButton} onClick={onClose}>
      終了
    </PrimaryButton>
  </div>
);

export const TestResult = ({
  total,
  correctAnswers,
  scorePercentage,
  answerHistory,
  onClose,
}: TestResultProps) => {
  const { rating, medalColor } = getScoreMeta(scorePercentage);
  const playerRef = useRef<InstanceType<typeof LordiconPlayer> | null>(null);
  const iconSize = useResponsiveRemSize(RESULT_ICON_SIZE_REM);

  // 正解・不正解の単語を分離（スキップした単語も不正解としてカウント）
  const sections = useMemo(() => {
    const groupedWords = groupAnswerHistory(answerHistory);

    return RESULT_SECTION_ORDER.map((variant) => ({
      variant,
      label: RESULT_SECTION_LABELS[variant],
      items: groupedWords[variant],
    })).filter(({ items }) => items.length > 0);
  }, [answerHistory]);

  // useSpeechフックを作成（EnglishWordコンポーネントが必要とする）
  const speech = useSpeech();

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, [scorePercentage]);

  return (
    <div className={styles.testResult}>
      <ResultSummary
        rating={rating}
        medalColor={medalColor}
        iconSize={iconSize}
        playerRef={playerRef}
      />

      <ResultStats total={total} correctAnswers={correctAnswers} />

      <ResultActions onClose={onClose} />

      <ResultWordSections sections={sections} speech={speech} />
    </div>
  );
};

export default TestResult;
