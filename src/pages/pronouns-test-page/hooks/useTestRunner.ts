import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PronounItem } from '../utils/type';
import { useCountdown } from './useCountdown';

export type TestRunnerState = {
  index: number; // 0-based
  total: number;
  current: number; // 1-based
  timeLeftPct: number; // 0-100 (10秒カウントダウンの残量)
  item: PronounItem | undefined;
  isCompleted: boolean; // テスト完了状態
};

export const useTestRunner = (open: boolean, items: PronounItem[]) => {
  const hasItems = items && items.length > 0;
  const total = hasItems ? items.length : 1;
  const [index, setIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const current = index + 1;
  // timeLeftPct は useCountdown に委譲
  const item = hasItems ? items[index] : undefined;

  // countdown は useCountdown に委譲
  const { timeLeftPct: countdownPct, reset: resetCountdown } = useCountdown(open, index, 10_000);
  // 再オープン時は最初の問題から再スタート
  useEffect(() => {
    if (open) {
      setIndex(0);
      setIsCompleted(false);
    }
  }, [open]);

  // countdownPct を内部 state として扱う（直接使用）

  const goNext = useCallback(
    (onFinish?: () => void) => {
      if (index + 1 >= total) {
        setIsCompleted(true);
      } else {
        setIndex((v) => v + 1);
      }
    },
    [index, total]
  );

  const state: TestRunnerState = useMemo(
    () => ({ index, total, current, timeLeftPct: countdownPct, item, isCompleted }),
    [index, total, current, countdownPct, item, isCompleted]
  );

  const reset = useCallback(() => {
    setIndex(0);
    setIsCompleted(false);
    resetCountdown();
  }, [resetCountdown]);

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
