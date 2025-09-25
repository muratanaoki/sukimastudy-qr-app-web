import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './choiceArea.module.css';
import { ChoiceList } from './ChoiceList';

export type ChoiceAreaProps = {
  showReveal: boolean;
  onReveal: () => void;
  isRevealed?: boolean;
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
  isRevealed = false,
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
      <div className={styles.flex}>
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
            aria-label={isRevealed ? '単語を隠す' : '単語を表示'}
            disabled={disabled}
          >
            {/* disabled のときは薄くして操作不可にするだけで、EyeOff にしない */}
            {disabled ? <Eye size={20} /> : isRevealed ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

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
