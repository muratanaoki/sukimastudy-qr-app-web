import { useEffect, useRef, useState } from 'react';

/**
 * Simple countdown that updates a percentage (100 -> 0) over duration (ms).
 * - active: whether the countdown should run
 * - restartKey: when this value changes the countdown restarts
 */
export const useCountdown = (active: boolean, restartKey: unknown, duration = 10_000) => {
  const [pct, setPct] = useState(100);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    setPct(100);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
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

  const reset = () => {
    setPct(100);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  return { timeLeftPct: pct, reset } as const;
};

export default useCountdown;
