import styles from '../testDialog.module.css';
import { CloseButton } from '@/shared/components/close-button/CloseButton';
import clsx from 'clsx';
import { useProgressNoAnim } from '../../hooks/useProgressNoAnim';

export type TopBarProps = {
  posTitle: string;
  groupTitle: string;
  timeLeftPct: number;
  onClose: () => void;
  resetKey: string | number;
};

export const TopBar = ({ posTitle, groupTitle, timeLeftPct, onClose, resetKey }: TopBarProps) => {
  const noAnim = useProgressNoAnim(resetKey, timeLeftPct);

  return (
    <div className={styles.topBar}>
      <div className={styles.topRow}>
        <div className={styles.topLeft} aria-label="品詞">
          {posTitle}
        </div>
        <div className={styles.topCenter} aria-label="グループ">
          {groupTitle}
        </div>
        <div>
          <CloseButton onClose={onClose} />
        </div>
      </div>
      <div className={clsx(styles.progressTrack)} aria-label="制限時間">
        <div
          className={clsx(styles.progressFill, noAnim && styles.progressNoAnim)}
          style={{ width: `${timeLeftPct}%` }}
        />
      </div>
    </div>
  );
};

export default TopBar;
