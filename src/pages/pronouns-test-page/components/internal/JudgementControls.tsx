import { ThumbsUp } from 'lucide-react';
import clsx from 'clsx';
import styles from './judgementControls.module.css';

export type JudgementControlsProps = {
  showTranslation: boolean;
  isFlashing?: boolean;
  onReveal: () => void;
  onKnow: () => void; // 正解として次へ
  onDontKnow: () => void; // 不正解として次へ
  revealButtonText?: string; // リスニングモード用にテキスト変更可能
  disabled?: boolean;
  selectedButton?: 'know' | 'dontKnow' | null;
};

export const JudgementControls = ({
  showTranslation,
  isFlashing = false,
  onReveal,
  onKnow,
  onDontKnow,
  revealButtonText = '和訳表示',
  disabled = false,
  selectedButton = null,
}: JudgementControlsProps) => {
  return (
    <>
      <button
        type="button"
        className={clsx(styles.revealButton, {
          [styles.revealButtonHidden]: showTranslation,
          [styles.revealButtonDim]: disabled && selectedButton !== null,
        })}
        onClick={onReveal}
        aria-pressed={showTranslation}
        aria-label={revealButtonText}
        disabled={showTranslation}
        aria-hidden={showTranslation || undefined}
        tabIndex={showTranslation ? -1 : 0}
      >
        {revealButtonText}
      </button>

      <div className={styles.actionsRow}>
        <button
          type="button"
          className={clsx(styles.circleButton, styles.gray, {
            [styles.circleButtonDim]: disabled && selectedButton === 'know',
          })}
          onClick={onDontKnow}
          aria-label="知らない"
          disabled={false}
        >
          <span className={styles.question}>？</span>
          <span className={styles.circleLabel}>知らない</span>
        </button>

        <button
          type="button"
          className={clsx(styles.circleButton, styles.green, {
            [styles.circleButtonDim]: disabled && selectedButton === 'dontKnow',
          })}
          onClick={onKnow}
          aria-label="知ってる"
          disabled={false}
        >
          <ThumbsUp aria-hidden className={styles.know} />
          <span className={styles.circleLabel}>知ってる</span>
        </button>
      </div>
    </>
  );
};

export default JudgementControls;
