import { useCallback, useMemo, useState } from 'react';

export const usePauseManager = () => {
  const [reasons, setReasons] = useState<string[]>([]);

  const addReason = useCallback((reason: string) => {
    setReasons((prev) => (prev.includes(reason) ? prev : [...prev, reason]));
  }, []);

  const removeReason = useCallback((reason: string) => {
    setReasons((prev) => prev.filter((entry) => entry !== reason));
  }, []);

  const isPaused = useMemo(() => reasons.length > 0, [reasons]);

  return useMemo(
    () => ({
      isPaused,
      addReason,
      removeReason,
    }),
    [isPaused, addReason, removeReason]
  );
};
