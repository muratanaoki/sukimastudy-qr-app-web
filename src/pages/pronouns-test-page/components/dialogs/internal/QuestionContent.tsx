import clsx from 'clsx';
import styles from '../testDialog.module.css';

interface QuestionContentProps {
  current: number;
  total: number;
  displayWord: string;
  translation: string;
  showTranslation: boolean;
  onWordClick?: () => void;
}

const QuestionContent = ({
  current,
  total,
  displayWord,
  translation,
  showTranslation,
  onWordClick,
}: QuestionContentProps) => {
  return (
    <div className={styles.content}>
      <p className={styles.counter}>
        {current} / {total}
      </p>
      <button
        type="button"
        className={styles.wordButton}
        onClick={onWordClick}
        disabled={!onWordClick}
        title="単語を再生"
        aria-label={`Speak word ${displayWord}`}
      >
        {displayWord}
      </button>
      <p
        className={clsx(styles.translation, !showTranslation && styles.translationHidden)}
        aria-live={showTranslation ? 'polite' : undefined}
      >
        {translation}
      </p>
    </div>
  );
};

export default QuestionContent;
