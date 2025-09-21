import clsx from 'clsx';
import styles from './selectableButton.module.css';
import { forwardRef, ReactNode, MouseEventHandler } from 'react';

export type SelectableButtonProps = {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const SelectableButton = forwardRef<HTMLButtonElement, SelectableButtonProps>(
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

SelectableButton.displayName = 'SelectableButton';
