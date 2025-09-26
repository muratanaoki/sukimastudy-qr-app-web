import { TestDialogPhase } from '../../utils/dialogPhase';
import styles from '../testDialog.module.css';
import TopBar from './TopBar';
import { CloseButton } from '@/shared/components/close-button/CloseButton';

export type DialogHeaderProps = {
  phase: TestDialogPhase;
  posTitle: string;
  groupTitle: string;
  timeLeftPct: number;
  onClose: () => void;
  questionKey: string | number;
};

export const DialogHeader = ({
  phase,
  posTitle,
  groupTitle,
  timeLeftPct,
  onClose,
  questionKey,
}: DialogHeaderProps) => {
  if (phase === TestDialogPhase.Completed) {
    return (
      <div className={styles.resultHeader}>
        <div className={styles.topRight}>
          <CloseButton onClose={onClose} />
        </div>
      </div>
    );
  }

  return (
    <TopBar
      posTitle={posTitle}
      groupTitle={groupTitle}
      timeLeftPct={timeLeftPct}
      onClose={onClose}
      resetKey={questionKey}
    />
  );
};

export default DialogHeader;
