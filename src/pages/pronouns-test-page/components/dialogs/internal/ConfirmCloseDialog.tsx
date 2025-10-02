import { PrimaryButton } from '@/shared/components/primary-button/PrimaryButton';
import { AlertTriangle } from 'lucide-react';
import styles from './confirmCloseDialog.module.css';
import DialogCard from '../dialog/DialogCard';

export type ConfirmCloseDialogProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmCloseDialog = ({ open, onConfirm, onCancel }: ConfirmCloseDialogProps) => {
  if (!open) return null;

  return (
    <DialogCard
      onClose={onCancel}
      title="テストを終了しますか？"
      titleId="confirm-dialog-title"
      Icon={AlertTriangle}
      closeOnEscape
      closeOnOverlay
      lockScroll
      actions={
        <PrimaryButton className={styles.actionsButton} onClick={onConfirm}>
          終了する
        </PrimaryButton>
      }
    >
      <p className={styles.confirmText}>現在の進行状況は保存されません。</p>
    </DialogCard>
  );
};

export default ConfirmCloseDialog;
