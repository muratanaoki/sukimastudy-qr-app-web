import styles from '../testDialog.module.css';
import { CloseButton } from '@/shared/components/close-button/CloseButton';
import clsx from 'clsx';
import { useProgressNoAnim } from '../../hooks/useProgressNoAnim';

export const TestHeader = ({
  timeLeftPct,
  onClose,
  resetKey,
}: {
  timeLeftPct: number;
  onClose: () => void;
  resetKey: string | number;
}) => {
  const noAnim = useProgressNoAnim(resetKey, timeLeftPct);

  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <CloseButton onClose={onClose} />
      </div>
      <div className={styles.progressTrack} aria-label="制限時間">
        <div
          className={clsx(styles.progressFill, noAnim && styles.progressNoAnim)}
          style={{ width: `${timeLeftPct}%` }}
        />
      </div>
    </div>
  );
};
