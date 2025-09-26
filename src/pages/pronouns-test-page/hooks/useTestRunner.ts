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

type GoNextOptions = {
  isCorrect?: boolean;
  onComplete?: () => void;
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
  const { timeLeftPct: countdownPct, reset: resetCountdown } = useCountdown(
    open,
    index,
    10_000,
    paused
  );
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
    ({ isCorrect = false, onComplete }: GoNextOptions = {}) => {
      if (item) {
        setAnswerHistory((prev) => [...prev, { item, isCorrect }]);
      }

      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
      }

      const isLastQuestion = index + 1 >= total;

      if (isLastQuestion) {
        setIsCompleted(true);
        onComplete?.();
        return true;
      }

      setIndex((v) => v + 1);
      return false;
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
      answerHistory,
    }),
    [
      index,
      total,
      current,
      countdownPct,
      item,
      isCompleted,
      correctAnswers,
      scorePercentage,
      answerHistory,
    ]
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

export type ChoiceOption = {
  id: string;
  label: string;
  isCorrect: boolean;
};

export const useChoices = (item: PronounItem | undefined) => {
  return useMemo<ChoiceOption[]>(() => {
    if (!item) return [];

    const base: ChoiceOption[] = [
      {
        id: `choice-${item.term}-correct`,
        label: item.jp,
        isCorrect: true,
      },
      ...item.choices.enToJp.map((label, idx) => ({
        id: `choice-${item.term}-alt-${idx}`,
        label,
        isCorrect: false,
      })),
    ];

    for (let i = base.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }

    return base;
  }, [item]);
};
