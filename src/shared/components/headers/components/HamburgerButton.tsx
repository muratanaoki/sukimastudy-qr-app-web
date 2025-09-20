import { forwardRef, memo } from 'react';
import styles from './hamburgerButton.module.css';

export type HamburgerButtonProps = {
  open: boolean;
  onToggle: () => void;
};

export const HamburgerButton = memo(
  forwardRef<HTMLButtonElement, HamburgerButtonProps>(function HamburgerButton(
    { open, onToggle },
    ref
  ) {
    return (
      <button
        type="button"
        className={styles.hamburger}
        aria-label="メインメニュー"
        aria-expanded={open}
        aria-controls="global-nav"
        data-open={open}
        onClick={onToggle}
        ref={ref}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>
    );
  })
);
