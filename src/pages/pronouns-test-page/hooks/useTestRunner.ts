import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PronounItem } from '../utils/type';

export type TestRunnerState = {
  index: number; // 0-based
  total: number;
  current: number; // 1-based
  timeLeftPct: number; // 0-100 (10秒カウントダウンの残量)
  item: PronounItem | undefined;
};

export const useTestRunner = (open: boolean, items: PronounItem[]) => {
  const hasItems = items && items.length > 0;
  const total = hasItems ? items.length : 1;
  const [index, setIndex] = useState(0);
  const current = index + 1;
  // 残り時間のパーセンテージ（各問題 10 秒で 100 -> 0）
  const [timeLeftPct, setTimeLeftPct] = useState(100);
  const item = hasItems ? items[index] : undefined;

  // 10秒のカウントダウン（視覚のみ / アクション無し）
  const intervalRef = useRef<number | null>(null);
  // 再オープン時は最初の問題から再スタート
  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  // タイマーの初期化/再スタート（オープン時および問題切替時）
  useEffect(() => {
    if (!open) return;
    setTimeLeftPct(100);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    const start = Date.now();
    const DURATION = 10_000; // 10s
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / DURATION) * 100);
      setTimeLeftPct(pct);
      if (elapsed >= DURATION && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 50);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [open, index]);

  const goNext = useCallback(
    (onFinish?: () => void) => {
      if (index + 1 >= total) {
        onFinish?.();
      } else {
        setIndex((v) => v + 1);
      }
    },
    [index, total]
  );

  const state: TestRunnerState = useMemo(
    () => ({ index, total, current, timeLeftPct, item }),
    [index, total, current, timeLeftPct, item]
  );

  const reset = useCallback(() => {
    setIndex(0);
    setTimeLeftPct(100);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return { state, goNext, hasItems, reset } as const;
};

export const useChoices = (item: PronounItem | undefined) => {
  return useMemo(() => {
    if (!item) return [] as string[];
    const base = [item.jp, ...item.choices.enToJp];
    for (let i = base.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }
    return base;
  }, [item]);
};
