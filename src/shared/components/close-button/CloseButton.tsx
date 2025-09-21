import { X } from 'lucide-react';
import styles from './closeButton.module.css';

export type CloseButtonProps = {
  onClose: () => void;
};

export const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClose}
      aria-label="閉じる"
      title="閉じる"
    >
      <X strokeWidth={2.2} className={styles.icon} aria-hidden="true" />
    </button>
  );
};
