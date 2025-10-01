import { useEffect } from 'react';
import { PauseReason } from '../../gameplay/usePauseManager';

/**
 * 指定した条件が true の間だけ、一時停止理由を追加し、解除時に自動削除するヘルパー。
 * - effect のクリーンアップでも remove を呼ぶことで、依存が変わった際の取りこぼしを防ぐ。
 */

export type UsePauseReasonEffectParams = {
  active: boolean;
  reason: PauseReason;
  addReason: (reason: PauseReason) => void;
  removeReason: (reason: PauseReason) => void;
};

export const usePauseReasonEffect = ({
  active,
  reason,
  addReason,
  removeReason,
}: UsePauseReasonEffectParams) => {
  useEffect(() => {
    if (active) {
      addReason(reason);
    } else {
      removeReason(reason);
    }

    return () => {
      removeReason(reason);
    };
  }, [active, reason, addReason, removeReason]);
};

export default usePauseReasonEffect;
