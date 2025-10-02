import { PrimaryButton } from '@/pages/pronouns-test-page/components/buttons/primary-button/PrimaryButton';

import styles from './resultActions.module.css';

export type ResultActionsProps = {
  onClose: () => void;
};

export const ResultActions = ({ onClose }: ResultActionsProps) => (
  <div className={styles.actionsButtonBox}>
    <PrimaryButton className={styles.actionsButton} onClick={onClose}>
      終了
    </PrimaryButton>
  </div>
);

export default ResultActions;
