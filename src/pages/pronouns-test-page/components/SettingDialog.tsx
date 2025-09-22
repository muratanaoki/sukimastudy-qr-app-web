import styles from './testIntroDialog.module.css';
import { Settings } from 'lucide-react';
import { CloseButton } from '@/shared/components/close-button/CloseButton';

export type SettingDialogProps = {
  onClose: () => void;
};

// 外観のみのシンプルな設定ダイアログ（中身はダミー）
export const SettingDialog = ({ onClose }: SettingDialogProps) => {
  return (
    <div
      className={styles.testOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div className={styles.testDialog}>
        <div className={styles.testDialogIconWrap}>
          <Settings className={styles.testDialogIcon} />
        </div>
        <div className={styles.testDialogInner}>
          <div className={styles.testDialogHeaderRightRow}>
            <CloseButton onClose={onClose} />
          </div>
          <h2 id="settings-title" className={styles.testDialogHeader}>
            設定
          </h2>
          {/* ここに設定項目を追加予定 */}
        </div>
      </div>
    </div>
  );
};

export default SettingDialog;
