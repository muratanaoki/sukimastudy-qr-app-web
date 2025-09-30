import { useCallback, useMemo, useState } from 'react';

export enum PauseReason {
  Confirm = 'confirm',
  Startup = 'startup',
}

export const usePauseManager = () => {
  const [reasons, setReasons] = useState<PauseReason[]>([]);

  const addReason = useCallback((reason: PauseReason) => {
    setReasons((prev) => (prev.includes(reason) ? prev : [...prev, reason]));
  }, []);

  const removeReason = useCallback((reason: PauseReason) => {
    setReasons((prev) => prev.filter((entry) => entry !== reason));
  }, []);

  const clear = useCallback(() => {
    setReasons([]);
  }, []);

  const hasReason = useCallback((reason: PauseReason) => reasons.includes(reason), [reasons]);

  const isPaused = useMemo(() => reasons.length > 0, [reasons]);

  return useMemo(
    () => ({
      isPaused,
      addReason,
      removeReason,
      clear,
      hasReason,
    }),
    [isPaused, addReason, removeReason, clear, hasReason]
  );
};
