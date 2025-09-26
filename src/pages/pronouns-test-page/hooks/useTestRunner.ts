import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
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
  const answerHistoryRef = useRef<AnswerRecord[]>([]);
  const [, forceHistoryUpdate] = useReducer((x: number) => x + 1, 0);
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
      answerHistoryRef.current = [];
      forceHistoryUpdate();
    }
  }, [open, forceHistoryUpdate]);

  // countdownPct を内部 state として扱う（直接使用）

  const goNext = useCallback(
    ({ isCorrect = false, onComplete }: GoNextOptions = {}) => {
      if (item) {
        answerHistoryRef.current = [...answerHistoryRef.current, { item, isCorrect }];
      }

      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
      }

      const isLastQuestion = index + 1 >= total;

      if (isLastQuestion) {
        setIsCompleted(true);
        forceHistoryUpdate();
        onComplete?.();
        return;
      }

      setIndex((v) => v + 1);
    },
    [index, total, item, forceHistoryUpdate]
  );

  const answerHistory = answerHistoryRef.current;

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
    answerHistoryRef.current = [];
    forceHistoryUpdate();
    resetCountdown();
  }, [resetCountdown, forceHistoryUpdate]);

  return { state, goNext, hasItems, reset } as const;
};

export type ChoiceOption = {
  id: string;
  label: string;
  isCorrect: boolean;
};

const createSeedFromKey = (key: string | number) => {
  const str = String(key);
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
};

const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const shuffleWithSeed = <T>(items: T[], key: string | number) => {
  const random = mulberry32(createSeedFromKey(key));
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const useChoices = (item: PronounItem | undefined, questionKey: string | number) => {
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

    return shuffleWithSeed(base, questionKey);
  }, [item, questionKey]);
};
