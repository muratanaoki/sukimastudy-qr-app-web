import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PronounItem } from '../utils/type';
import { useCountdown } from './useCountdown';

export type AnswerRecord = {
  item: PronounItem;
  isCorrect: boolean;
};

export type TestRunnerState = {
  index: number; // 0-based
  total: number;
  current: number; // 1-based
  timeLeftPct: number; // 0-100 (10秒カウントダウンの残量)
  item: PronounItem | undefined;
  isCompleted: boolean; // テスト完了状態
  correctAnswers: number; // 正解数
  scorePercentage: number; // 正解率 (0-100)
  answerHistory: AnswerRecord[]; // 回答履歴
};

export const useTestRunner = (open: boolean, items: PronounItem[], paused = false) => {
  const hasItems = items && items.length > 0;
  const total = hasItems ? items.length : 1;
  const [index, setIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>([]);
  const current = index + 1;
  const scorePercentage = total > 0 ? Math.round((correctAnswers / total) * 100) : 0;
  // timeLeftPct は useCountdown に委譲
  const item = hasItems ? items[index] : undefined;

  // countdown は useCountdown に委譲
  const { timeLeftPct: countdownPct, reset: resetCountdown } = useCountdown(open, index, 10_000, paused);
  // 再オープン時は最初の問題から再スタート
  useEffect(() => {
    if (open) {
      setIndex(0);
      setIsCompleted(false);
      setCorrectAnswers(0);
      setAnswerHistory([]);
    }
  }, [open]);

  // countdownPct を内部 state として扱う（直接使用）

  const goNext = useCallback(
    (onFinish?: () => void, isCorrect = false) => {
      // 現在の問題を履歴に追加
      if (item) {
        setAnswerHistory(prev => [...prev, { item, isCorrect }]);
      }

      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
      }

      if (index + 1 >= total) {
        setIsCompleted(true);
      } else {
        setIndex((v) => v + 1);
      }
    },
    [index, total, item]
  );

  const state: TestRunnerState = useMemo(
    () => ({
      index,
      total,
      current,
      timeLeftPct: countdownPct,
      item,
      isCompleted,
      correctAnswers,
      scorePercentage,
      answerHistory
    }),
    [index, total, current, countdownPct, item, isCompleted, correctAnswers, scorePercentage, answerHistory]
  );

  const reset = useCallback(() => {
    setIndex(0);
    setIsCompleted(false);
    setCorrectAnswers(0);
    setAnswerHistory([]);
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
