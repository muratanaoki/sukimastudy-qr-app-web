import React from 'react';
import styles from './choiceArea.module.css';
import { ChoiceList } from './ChoiceList';

export type ChoiceAreaProps = {
  showReveal: boolean;
  onReveal: () => void;
  onSkip: () => void;
  choices: string[];
  disabled: boolean;
  getIndexDisplay: (i: number) => string | number;
  isCorrectHighlight: (i: number) => boolean;
  isWrongSelected: (i: number) => boolean;
  isDim: (i: number) => boolean;
  showGoodAt: (i: number) => boolean;
  onAnswer: (label: string, i: number) => void;
};

export const ChoiceArea: React.FC<ChoiceAreaProps> = ({
  showReveal,
  onReveal,
  onSkip,
  choices,
  disabled,
  getIndexDisplay,
  isCorrectHighlight,
  isWrongSelected,
  isDim,
  showGoodAt,
  onAnswer,
}) => {
  return (
    <>
      <button
        type="button"
        className={styles.skipButton}
        aria-label="スキップ"
        onClick={onSkip}
        disabled={disabled}
      >
        SKIP
      </button>

      {showReveal && (
        <button
          type="button"
          className={styles.revealWordButton}
          onClick={onReveal}
          aria-label="単語を表示"
        >
          単語を表示
        </button>
      )}

      <ChoiceList
        choices={choices}
        disabled={disabled}
        getIndexDisplay={getIndexDisplay}
        isCorrectHighlight={isCorrectHighlight}
        isWrongSelected={isWrongSelected}
        isDim={isDim}
        showGoodAt={showGoodAt}
        onAnswer={onAnswer}
      />
    </>
  );
};

export default ChoiceArea;
