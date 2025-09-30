import { useEffect } from 'react';
import { PauseReason } from '../../gameplay/usePauseManager';

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
