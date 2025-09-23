import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PronounItem } from '../utils/type';

export type TestRunnerState = {
  index: number; // 0-based
  total: number;
  current: number; // 1-based
  progress: number; // 0-100
  item: PronounItem | undefined;
};

export const useTestRunner = (open: boolean, items: PronounItem[]) => {
  const hasItems = items && items.length > 0;
  const total = hasItems ? items.length : 1;
  const [index, setIndex] = useState(0);
  const current = index + 1;
  const progress = (current / total) * 100;
  const item = hasItems ? items[index] : undefined;

  // 10秒タイマー（要件: 経過時のアクション無し）
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!open) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      // no-op
    }, 10_000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
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
    () => ({ index, total, current, progress, item }),
    [index, total, current, progress, item]
  );

  return { state, goNext, hasItems } as const;
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
