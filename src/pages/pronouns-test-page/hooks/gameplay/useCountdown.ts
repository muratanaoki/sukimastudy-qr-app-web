import { useEffect, useRef, useState } from 'react';

/**
 * Simple countdown that updates a percentage (100 -> 0) over duration (ms).
 * - active: whether the countdown should run
 * - restartKey: when this value changes the countdown restarts
 * - paused: whether the countdown should be paused
 */
export const useCountdown = (active: boolean, restartKey: unknown, duration = 10_000, paused = false) => {
  const [pct, setPct] = useState(100);
  const rafRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pauseStartRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(paused);

  useEffect(() => {
    if (!active) return;
    setPct(100);
    pausedTimeRef.current = 0;
    pauseStartRef.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      if (pausedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startTimeRef.current - pausedTimeRef.current;
      const next = Math.max(0, 100 - (elapsed / duration) * 100);
      setPct(next);
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [active, restartKey, duration]);

  // Handle pause state changes
  useEffect(() => {
    pausedRef.current = paused;

    if (!active) return;

    if (paused) {
      pauseStartRef.current = performance.now();
    } else {
      if (pauseStartRef.current > 0) {
        const pauseDuration = performance.now() - pauseStartRef.current;
        pausedTimeRef.current += pauseDuration;
        pauseStartRef.current = 0;
      }
    }
  }, [paused, active]);

  const reset = () => {
    setPct(100);
    pausedTimeRef.current = 0;
    pauseStartRef.current = 0;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  return { timeLeftPct: pct, reset } as const;
};

export default useCountdown;
