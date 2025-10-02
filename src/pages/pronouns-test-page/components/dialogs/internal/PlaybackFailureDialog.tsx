import { useCallback, useMemo, useState } from 'react';

import { PrimaryButton } from '@/shared/components/primary-button/PrimaryButton';
import { SecondaryButton } from '@/shared/components/secondary-button/SecondaryButton';
import type { PlaybackFailureInfo } from '@/shared/hooks/useSoundEffects';
import styles from './playbackFailureDialog.module.css';
import DialogCard from '../dialog/DialogCard';

/**
 * 効果音再生に繰り返し失敗した際にユーザーへ状況を通知し、診断情報のコピーを促すダイアログ。
 * - `PlaybackFailureInfo` があれば詳細ログを表示し、なければフォールバック文言で説明。
 * - クリップボードコピー成功/失敗の状態をUIテキストに反映する。
 */

export type PlaybackFailureDialogProps = {
  info?: PlaybackFailureInfo;
  fallbackContext: string;
  onClose: () => void;
};

type CopyState = 'idle' | 'copied' | 'error';

export const PlaybackFailureDialog = ({
  info,
  fallbackContext,
  onClose,
}: PlaybackFailureDialogProps) => {
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const title = useMemo(() => {
    const context = info?.context ?? fallbackContext;
    return `${context}の効果音を再生できませんでした`;
  }, [fallbackContext, info?.context]);

  const metadata = info?.metadata ?? {};

  const handleCopy = useCallback(async () => {
    if (!info?.text) {
      setCopyState('error');
      return;
    }

    try {
      await navigator.clipboard.writeText(info.text);
      setCopyState('copied');
    } catch (error) {
      console.warn('Failed to copy playback diagnostics', error);
      setCopyState('error');
    }
  }, [info?.text]);

  const copyLabel = copyState === 'copied' ? 'コピーしました' : 'ログをコピー';

  return (
    <DialogCard
      onClose={onClose}
      title={title}
      closeOnEscape
      closeOnOverlay
      lockScroll
      actions={
        <>
          <PrimaryButton onClick={handleCopy} disabled={copyState === 'copied'}>
            {copyLabel}
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>閉じる</SecondaryButton>
        </>
      }
    >
      <div className={styles.content}>
        <p className={styles.summary}>
          効果音の再生に繰り返し失敗しました。サポート用に以下の情報をコピーして共有してください。
        </p>
        <div className={styles.metaList}>
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>試行回数:</span>
            <span>{info?.attempts ?? '不明'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>開始:</span>
            <span>{info?.startedAt ?? '不明'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>終了:</span>
            <span>{info?.completedAt ?? '不明'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>ブラウザ:</span>
            <span>{metadata.userAgent ?? '不明'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>言語:</span>
            <span>{metadata.language ?? '不明'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>URL:</span>
            <span>{metadata.href ?? '不明'}</span>
          </div>
        </div>
        <div>
          <div className={styles.logsLabel}>詳細ログ</div>
          <div className={styles.logsBox}>{info?.text ?? '追加情報はありません。'}</div>
        </div>
        <p className={styles.actionHint}>コピー後、チャットに貼り付けて共有してください。</p>
        {copyState === 'error' ? (
          <p className={styles.footerNote}>
            クリップボードへのコピーに失敗しました。手動で範囲選択してコピーしてください。
          </p>
        ) : null}
      </div>
    </DialogCard>
  );
};

export default PlaybackFailureDialog;
