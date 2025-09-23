import styles from '../testDialog.module.css';
import { X } from 'lucide-react';

export type ChoiceListProps = {
  choices: string[];
  disabled: boolean;
  getIndexDisplay: (i: number) => string | number;
  isCorrectHighlight: (i: number) => boolean;
  isWrongSelected: (i: number) => boolean;
  isDim: (i: number) => boolean;
  showGoodAt: (i: number) => boolean;
  onAnswer: (label: string, i: number) => void;
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
      {choices.map((label, i) => (
        <button
          key={i}
          type="button"
          className={`${styles.choiceButton} ${isCorrectHighlight(i) ? styles.choiceButtonCorrect : ''} ${isWrongSelected(i) ? styles.choiceButtonWrong : ''} ${isDim(i) ? styles.choiceButtonDim : ''}`}
          onClick={() => onAnswer(label, i)}
          disabled={disabled}
        >
          <span className={styles.choiceIndex}>
            {isWrongSelected(i) ? (
              <X aria-label="wrong" width={16} height={16} strokeWidth={3} />
            ) : (
              (getIndexDisplay(i) as any)
            )}
          </span>
          <span className={styles.choiceLabel}>{label}</span>
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
