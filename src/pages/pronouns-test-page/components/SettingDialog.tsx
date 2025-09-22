import { Settings } from 'lucide-react';
import { DialogCard } from '@/shared/components/dialog/DialogCard';

export type SettingDialogProps = {
  onClose: () => void;
};

// 外観のみのシンプルな設定ダイアログ（中身はダミー）
export const SettingDialog = ({ onClose }: SettingDialogProps) => {
  return (
    <DialogCard onClose={onClose} title="設定" titleId="settings-title" Icon={Settings}>
      {/* ここに設定項目を追加予定 */}
    </DialogCard>
  );
};

export default SettingDialog;
