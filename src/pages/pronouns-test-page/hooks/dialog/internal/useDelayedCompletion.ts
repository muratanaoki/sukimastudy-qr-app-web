import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_DELAY = 600;

type Params = {
  isCompletedImmediate: boolean;
  delayMs?: number;
};

type UseDelayedCompletionResult = {
  isTransitioning: boolean;
  isCompleted: boolean;
  reset: () => void;
};

export const useDelayedCompletion = ({
  isCompletedImmediate,
  delayMs = DEFAULT_DELAY,
}: Params): UseDelayedCompletionResult => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef<number | null>(null);
  const delayRef = useRef(delayMs);

  useEffect(() => {
    delayRef.current = delayMs;
  }, [delayMs]);

  useEffect(() => {
    if (!isCompletedImmediate) {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setIsTransitioning(false);
      setIsCompleted(false);
      return;
    }

    if (delayRef.current <= 0) {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setIsCompleted(true);
      setIsTransitioning(false);
      return;
    }

    setIsTransitioning(true);

    if (timerRef.current) return;

    timerRef.current = window.setTimeout(() => {
      setIsCompleted(true);
      setIsTransitioning(false);
      timerRef.current = null;
    }, delayRef.current);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isCompletedImmediate]);

  const reset = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsTransitioning(false);
    setIsCompleted(false);
  }, []);

  return {
    isTransitioning,
    isCompleted,
    reset,
  };
};

export default useDelayedCompletion;
