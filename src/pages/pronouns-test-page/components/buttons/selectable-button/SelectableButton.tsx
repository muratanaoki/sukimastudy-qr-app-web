import clsx from 'clsx';
import styles from './selectableButton.module.css';
import { forwardRef, ReactNode, MouseEventHandler } from 'react';

import { PrizeIcon } from './PrizeIcon';
import { MedalRank } from '@/pages/pronouns-test-page/utils/enum';

const MEDAL_COLOR_MAP: Record<MedalRank, string> = {
  [MedalRank.Gold]: 'var(--medal-gold-color)',
  [MedalRank.Silver]: 'var(--medal-silver-color)',
  [MedalRank.Bronze]: 'var(--medal-bronze-color)',
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
