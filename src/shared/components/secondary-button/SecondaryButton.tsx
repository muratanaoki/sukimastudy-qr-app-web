import clsx from 'clsx';
import styles from './secondaryButton.module.css';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={clsx(styles.button, className)} {...props}>
        {children}
      </button>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';
