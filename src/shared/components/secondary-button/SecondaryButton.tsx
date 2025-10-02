import clsx from 'clsx';
import styles from './secondaryButton.module.css';
import { forwardRef, ReactNode, MouseEventHandler } from 'react';

export type SecondaryButtonProps = {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, children, onClick, disabled }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(styles.button, className)}
        onClick={onClick}
        disabled={disabled}
        type="button"
      >
        {children}
      </button>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';
