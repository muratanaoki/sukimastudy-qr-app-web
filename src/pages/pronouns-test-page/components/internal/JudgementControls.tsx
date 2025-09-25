import { ThumbsUp } from 'lucide-react';
import clsx from 'clsx';
import styles from './judgementControls.module.css';
import { BUTTON_LABELS, JUDGEMENT_BUTTON_TYPE } from '../../utils/const';
import type { JudgementButtonType } from '../../utils/type';

export type JudgementControlsProps = {
  showTranslation: boolean;
  onReveal: () => void;
  onKnow: () => void; // 正解として次へ
  onDontKnow: () => void; // 不正解として次へ
  revealButtonText?: string; // リスニングモード用にテキスト変更可能
  disabled?: boolean;
  selectedButton?: JudgementButtonType | null;
};

export const JudgementControls = ({
  showTranslation,
  onReveal,
  onKnow,
  onDontKnow,
  revealButtonText = BUTTON_LABELS.REVEAL_TRANSLATION,
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
            [styles.circleButtonDim]: disabled && selectedButton === JUDGEMENT_BUTTON_TYPE.KNOW,
          })}
          onClick={onDontKnow}
          aria-label={BUTTON_LABELS.DONT_KNOW}
          disabled={false}
        >
          <span className={styles.question}>？</span>
          <span className={styles.circleLabel}>{BUTTON_LABELS.DONT_KNOW}</span>
        </button>

        <button
          type="button"
          className={clsx(styles.circleButton, styles.green, {
            [styles.circleButtonDim]:
              disabled && selectedButton === JUDGEMENT_BUTTON_TYPE.DONT_KNOW,
          })}
          onClick={onKnow}
          aria-label={BUTTON_LABELS.KNOW}
          disabled={false}
        >
          <ThumbsUp aria-hidden className={styles.know} />
          <span className={styles.circleLabel}>{BUTTON_LABELS.KNOW}</span>
        </button>
      </div>
    </>
  );
};

export default JudgementControls;
