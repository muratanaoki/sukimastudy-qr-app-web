import clsx from 'clsx';
import styles from '../testDialog.module.css';

interface QuestionContentProps {
  current: number;
  total: number;
  displayWord: string;
  translation: string;
  showTranslation: boolean;
}

const QuestionContent = ({
  current,
  total,
  displayWord,
  translation,
  showTranslation,
}: QuestionContentProps) => {
  return (
    <div className={styles.content}>
      <p className={styles.counter}>
        {current} / {total}
      </p>
      <h1 className={styles.word}>{displayWord}</h1>
      <p
        className={clsx(
          styles.translation,
          !showTranslation && styles.translationHidden
        )}
        aria-live={showTranslation ? 'polite' : undefined}
      >
        {translation}
      </p>
    </div>
  );
};

export default QuestionContent;