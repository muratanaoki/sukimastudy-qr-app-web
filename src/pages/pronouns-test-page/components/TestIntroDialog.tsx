import styles from '../index.module.css';
import { Book, Settings } from 'lucide-react';
import type { PronounData } from '../utils/type';
import { useEffect, useCallback } from 'react';

export type TestIntroDialogProps = {
  items: PronounData['items'];
  onClose: () => void;
};

export function TestIntroDialog({ items, onClose }: TestIntroDialogProps) {
  // Escape で閉じる (フォーカストラップは今後必要なら追加)
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const first = items[0]?.index ?? 0;
  const last = items[items.length - 1]?.index ?? 0;

  return (
    <div
      className={styles.testOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="test-intro-title"
    >
      <div className={styles.testDialog}>
        <div className={styles.testDialogIconWrap}>
          <Book className={styles.testDialogIcon} />
        </div>
        <div className={styles.testDialogInner}>
          <div className={styles.testDialogHeaderRow}>
            <h2 id="test-intro-title" className={styles.testDialogTitle}>{`${first}~${last}語`}</h2>
            <button type="button" className={styles.testDialogSettingButton} aria-label="設定変更">
              <Settings className={styles.testDialogSettingIcon} />
              <span className={styles.testDialogSettingText}>設定変更</span>
            </button>
          </div>
          <div className={styles.testDialogActions}>
            <button type="button" className={styles.testDialogSecondaryButton} onClick={onClose}>
              ここで中断
            </button>
            <button type="button" className={styles.testDialogPrimaryButton}>
              はじめる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
