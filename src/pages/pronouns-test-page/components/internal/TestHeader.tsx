import styles from '../testDialog.module.css';
import { CloseButton } from '@/shared/components/close-button/CloseButton';

export const TestHeader = ({
  timeLeftPct,
  onClose,
}: {
  timeLeftPct: number;
  onClose: () => void;
}) => {
  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <CloseButton onClose={onClose} />
      </div>
      <div className={styles.progressTrack} aria-label="制限時間">
        <div className={styles.progressFill} style={{ width: `${timeLeftPct}%` }} />
      </div>
    </div>
  );
};
