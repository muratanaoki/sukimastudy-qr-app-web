import styles from './testDialog.module.css';
import { CloseButton } from '@/shared/components/close-button/CloseButton';
import { useEscapeKey } from '../hooks/useEscapeKey';

export type TestDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const TestDialog = ({ open, onClose }: TestDialogProps) => {
  useEscapeKey(onClose, open);
  if (!open) return null;

  // UI 固定値（とりあえずデータ連携なし）
  const current = 2;
  const total = 10;
  const progress = (current / total) * 100;

  return (
    <div role="dialog" aria-modal="true" aria-label="テスト" className={styles.dialog}>
      {/* ヘッダー + 進捗バー */}
      <div className={styles.topBar}>
        <div className={styles.left}>
          <CloseButton onClose={onClose} />
        </div>
        <div className={styles.progressTrack} aria-label="進捗">
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* 中央の問題表示 */}
      <div className={styles.content}>
        <p className={styles.counter}>
          {current} / {total}
        </p>
        <h1 className={styles.word}>proposal</h1>
      </div>

      {/* 下部の操作/選択肢 */}
      <div className={styles.bottom}>
        <button type="button" className={styles.skipButton} aria-label="スキップ">
          SKIP
        </button>

        <div className={styles.choices}>
          <button type="button" className={styles.choiceButton}>
            <span className={styles.choiceIndex}>1</span>
            <span className={styles.choiceLabel}>提案、提案書</span>
          </button>
          <button type="button" className={styles.choiceButton}>
            <span className={styles.choiceIndex}>2</span>
            <span className={styles.choiceLabel}>改良、アップグレード</span>
          </button>
          <button type="button" className={styles.choiceButton}>
            <span className={styles.choiceIndex}>3</span>
            <span className={styles.choiceLabel}>供給業者、販売業者</span>
          </button>
          <button type="button" className={styles.choiceButton}>
            <span className={styles.choiceIndex}>4</span>
            <span className={styles.choiceLabel}>交換、交換品、後任</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestDialog;
