import clsx from 'clsx';
import styles from './primaryButton.module.css';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={clsx(styles.button, className)} {...props}>
        {children}
      </button>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';
