import styles from './testFabButton.module.css';
import { Check } from 'lucide-react';

export type TestFabButtonProps = {
  hidden?: boolean;
  onClick?: () => void;
};

export function TestFabButton({ hidden, onClick }: TestFabButtonProps) {
  const wrapperClass = hidden ? `${styles.testFabWrapper} ${styles.hide}` : styles.testFabWrapper;
  return (
    <div className={wrapperClass}>
      <button
        type="button"
        className={styles.testFabButton}
        aria-label="テスト開始"
        onClick={onClick}
      >
        <Check strokeWidth={3} className={styles.testFabIcon} />
        <span className={styles.testFabText}>テスト</span>
      </button>
    </div>
  );
}
