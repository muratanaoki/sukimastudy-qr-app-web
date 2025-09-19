import clsx from 'clsx';
import styles from './primaryButton.module.css';
import { forwardRef, ReactNode, MouseEventHandler } from 'react';

export type PrimaryButtonProps = {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
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

PrimaryButton.displayName = 'PrimaryButton';
