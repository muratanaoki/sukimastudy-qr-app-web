import { useEffect, useMemo } from 'react';
import { PauseReason } from '../../gameplay/usePauseManager';

type Params = {
  open: boolean;
  isStartupComplete: boolean;
  isPaused: boolean;
  addReason: (reason: PauseReason) => void;
  removeReason: (reason: PauseReason) => void;
};

export const useStartupPauseControl = ({
  open,
  isStartupComplete,
  isPaused,
  addReason,
  removeReason,
}: Params) => {
  useEffect(() => {
    if (!open) {
      removeReason(PauseReason.Startup);
      return;
    }

    if (isStartupComplete) {
      removeReason(PauseReason.Startup);
    } else {
      addReason(PauseReason.Startup);
    }
  }, [open, isStartupComplete, addReason, removeReason]);

  useEffect(() => () => removeReason(PauseReason.Startup), [removeReason]);

  return useMemo(() => isPaused || !isStartupComplete, [isPaused, isStartupComplete]);
};

export default useStartupPauseControl;
