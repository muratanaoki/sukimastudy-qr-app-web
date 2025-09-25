import { ThumbsUp } from 'lucide-react';
import clsx from 'clsx';
import styles from './judgementControls.module.css';

export type JudgementControlsProps = {
  showTranslation: boolean;
  onReveal: () => void;
  onKnow: () => void; // 正解として次へ
  onDontKnow: () => void; // 不正解として次へ
  revealButtonText?: string; // リスニングモード用にテキスト変更可能
};

export const JudgementControls = ({
  showTranslation,
  onReveal,
  onKnow,
  onDontKnow,
  revealButtonText = '和訳表示',
}: JudgementControlsProps) => {
  return (
    <>
      <button
        type="button"
        className={clsx(styles.revealButton, {
          [styles.revealButtonHidden]: showTranslation,
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
          className={clsx(styles.circleButton, styles.gray)}
          onClick={onDontKnow}
          aria-label="知らない"
        >
          <span className={styles.question}>？</span>
          <span className={styles.circleLabel}>知らない</span>
        </button>

        <button
          type="button"
          className={clsx(styles.circleButton, styles.green)}
          onClick={onKnow}
          aria-label="知ってる"
        >
          <ThumbsUp aria-hidden className={styles.know} />
          <span className={styles.circleLabel}>知ってる</span>
        </button>
      </div>
    </>
  );
};

export default JudgementControls;
