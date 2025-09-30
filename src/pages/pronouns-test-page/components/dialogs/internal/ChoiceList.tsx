import styles from './choiceList.module.css';
import { X, Circle } from 'lucide-react';
import clsx from 'clsx';
import type { ChoiceOption } from '../../../hooks/gameplay/useTestRunner';

export type ChoiceListProps = {
  choices: ChoiceOption[];
  disabled: boolean;
  getIndexDisplay: (i: number) => string | number;
  isCorrectHighlight: (i: number) => boolean;
  isWrongSelected: (i: number) => boolean;
  isDim: (i: number) => boolean;
  showGoodAt: (i: number) => boolean;
  onAnswer: (choiceId: string, i: number) => void;
};

export const ChoiceList = ({
  choices,
  disabled,
  getIndexDisplay,
  isCorrectHighlight,
  isWrongSelected,
  isDim,
  showGoodAt,
  onAnswer,
}: ChoiceListProps) => {
  return (
    <div className={styles.choices}>
      {choices.map((choice, i) => (
        <button
          key={choice.id}
          type="button"
          className={clsx(styles.choiceButton, {
            [styles.choiceButtonCorrect]: isCorrectHighlight(i),
            [styles.choiceButtonWrong]: isWrongSelected(i),
            [styles.choiceButtonDim]: isDim(i),
          })}
          onClick={() => onAnswer(choice.id, i)}
          disabled={disabled}
        >
          <span className={styles.choiceIndex}>
            {isWrongSelected(i) ? (
              <X aria-label="wrong" className={styles.batu} strokeWidth={2} />
            ) : isCorrectHighlight(i) ? (
              <Circle aria-label="correct" className={styles.maru} strokeWidth={2} />
            ) : (
              (getIndexDisplay(i) as any)
            )}
          </span>
          <span className={styles.choiceLabel}>{choice.label}</span>
          {showGoodAt(i) && (
            <span className={styles.goodToast} aria-live="polite">
              Good!
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
