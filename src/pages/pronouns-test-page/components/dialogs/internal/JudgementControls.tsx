import { ThumbsUp, Eye, EyeOff } from 'lucide-react';
import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './judgementControls.module.css';
import type { JudgementButtonType } from '../../../utils/type';
import {
  BUTTON_LABELS,
  JUDGEMENT_BUTTON_TYPE,
} from '@/pages/pronouns-test-page/utils/constants/const';

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
  // アイコンちらつき対策: disabled 遷移中も直前の stable state を保持
  const lastShowRef = useRef(showTranslation);
  useEffect(() => {
    lastShowRef.current = showTranslation;
  }, [showTranslation]);

  const effectiveShow = disabled ? lastShowRef.current : showTranslation;

  return (
    <>
      <button
        type="button"
        className={clsx(styles.revealButton, {
          [styles.revealButtonDim]: disabled && selectedButton !== null,
        })}
        onClick={onReveal}
        aria-pressed={effectiveShow}
        aria-label={effectiveShow ? '和訳を隠す' : revealButtonText}
        disabled={disabled}
      >
        {/* disabled 状態でも直前の表示/非表示を維持してちらつきを防ぐ */}
        {effectiveShow ? <EyeOff className={styles.icon} /> : <Eye className={styles.icon} />}
      </button>

      <div className={styles.actionsRow}>
        <button
          type="button"
          className={clsx(styles.circleButton, styles.gray, {
            [styles.circleButtonDim]: disabled && selectedButton === JUDGEMENT_BUTTON_TYPE.KNOW,
          })}
          onClick={onDontKnow}
          aria-label={BUTTON_LABELS.DONT_KNOW}
          disabled={disabled}
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
          disabled={disabled}
        >
          <ThumbsUp aria-hidden className={styles.know} />
          <span className={styles.circleLabel}>{BUTTON_LABELS.KNOW}</span>
        </button>
      </div>
    </>
  );
};

export default JudgementControls;
