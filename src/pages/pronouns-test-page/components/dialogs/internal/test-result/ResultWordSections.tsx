import { useMemo } from 'react';
import clsx from 'clsx';

import { EnglishWord } from '../../../display/EnglishWord';
import type { AnswerRecord } from '../../../../hooks/gameplay/useTestRunner';
import type { UseSpeech } from '../../../../hooks/audio/useSpeech';

import styles from './resultWordSections.module.css';

type WordItem = AnswerRecord['item'];

enum ResultSectionVariant {
  Correct = 'correct',
  Incorrect = 'incorrect',
}

type WordGroups = Record<ResultSectionVariant, WordItem[]>;

const RESULT_SECTION_LABELS: Record<ResultSectionVariant, string> = {
  [ResultSectionVariant.Correct]: 'わかった',
  [ResultSectionVariant.Incorrect]: 'わからなかった',
};

const SECTION_COUNT_CLASS_NAMES: Record<ResultSectionVariant, string> = {
  [ResultSectionVariant.Correct]: styles.sectionCountPositive,
  [ResultSectionVariant.Incorrect]: styles.sectionCountNegative,
};

const RESULT_SECTION_ORDER: ResultSectionVariant[] = [
  ResultSectionVariant.Incorrect,
  ResultSectionVariant.Correct,
];

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

export type ResultSection = {
  variant: ResultSectionVariant;
  label: string;
  items: WordItem[];
};

export const useResultSections = (answerHistory: AnswerRecord[]): ResultSection[] =>
  useMemo(() => {
    const groupedWords = groupAnswerHistory(answerHistory);

    return RESULT_SECTION_ORDER.map((variant) => ({
      variant,
      label: RESULT_SECTION_LABELS[variant],
      items: groupedWords[variant],
    })).filter(({ items }) => items.length > 0);
  }, [answerHistory]);

type ResultWordSectionsProps = {
  sections: ResultSection[];
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

export const ResultWordSections = ({ sections, speech }: ResultWordSectionsProps) => (
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

export default ResultWordSections;
