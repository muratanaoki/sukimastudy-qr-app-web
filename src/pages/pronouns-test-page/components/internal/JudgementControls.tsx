import { HelpCircle, ThumbsUp } from 'lucide-react';
import styles from '../testDialog.module.css';

export type JudgementControlsProps = {
  showTranslation: boolean;
  onReveal: () => void;
  onKnow: () => void; // 正解として次へ
  onDontKnow: () => void; // 不正解として次へ
};

export const JudgementControls = ({
  showTranslation,
  onReveal,
  onKnow,
  onDontKnow,
}: JudgementControlsProps) => {
  return (
    <>
      <button
        type="button"
        className={styles.revealButton}
        onClick={onReveal}
        aria-pressed={showTranslation}
        aria-label="和訳表示"
      >
        和訳表示
      </button>

      <div className={styles.actionsRow}>
        <button
          type="button"
          className={styles.circleButton}
          onClick={onDontKnow}
          aria-label="知らない"
        >
          <HelpCircle aria-hidden size={28} />
          <span className={styles.circleLabel}>知らない</span>
        </button>

        <button
          type="button"
          className={styles.circleButton}
          onClick={onKnow}
          aria-label="知ってる"
        >
          <ThumbsUp aria-hidden size={28} />
          <span className={styles.circleLabel}>知ってる</span>
        </button>
      </div>
    </>
  );
};

export default JudgementControls;
