import clsx from 'clsx';
import styles from './selectableButton.module.css';
import { forwardRef, ReactNode, MouseEventHandler } from 'react';
import type { MedalRank } from '@/pages/pronouns-test-page/utils/domain/type';
import { PrizeIcon } from './PrizeIcon';

const MEDAL_COLOR_MAP: Record<MedalRank, string> = {
  gold: 'var(--medal-gold-color)',
  silver: 'var(--medal-silver-color)',
  bronze: 'var(--medal-bronze-color)',
};

export type SelectableButtonProps = {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  medalRank?: MedalRank | null;
};

export const SelectableButton = forwardRef<HTMLButtonElement, SelectableButtonProps>(
  ({ className, children, onClick, disabled, medalRank }, ref) => {
    const medalColor = medalRank ? MEDAL_COLOR_MAP[medalRank] : undefined;

    return (
      <button
        ref={ref}
        className={clsx(styles.button, className)}
        onClick={onClick}
        disabled={disabled}
        type="button"
      >
        <span className={styles.content}>{children}</span>
        {medalColor ? (
          <PrizeIcon className={styles.icon} aria-hidden style={{ color: medalColor }} />
        ) : null}
      </button>
    );
  }
);

SelectableButton.displayName = 'SelectableButton';
