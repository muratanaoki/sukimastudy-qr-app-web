import { useCallback, useEffect, useRef, useState } from 'react';

export type AnswerFeedbackConfig = {
  isCorrect: (label: string) => boolean;
  onNext: () => void;
  goodDurationMs?: number; // default 650
  wrongDurationMs?: number; // default 900
};

export const useAnswerFeedback = ({
  isCorrect,
  onNext,
  goodDurationMs = 650,
  wrongDurationMs = 900,
}: AnswerFeedbackConfig) => {
  const [good, setGood] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [correctIdx, setCorrectIdx] = useState<number | null>(null);

  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleAnswer = useCallback(
    (label: string, index: number, currentChoices: string[], correctLabel: string | undefined) => {
      const ok = isCorrect(label);
      if (ok) {
        setSelectedIdx(index);
        setGood(true);
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
          setGood(false);
          setSelectedIdx(null);
          onNext();
        }, goodDurationMs);
      } else {
        setWrong(true);
        setWrongIdx(index);
        if (correctLabel) {
          const ci = currentChoices.findIndex((c) => c === correctLabel);
          setCorrectIdx(ci >= 0 ? ci : null);
        }
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
          setWrong(false);
          setWrongIdx(null);
          setCorrectIdx(null);
          onNext();
        }, wrongDurationMs);
      }
    },
    [goodDurationMs, wrongDurationMs, isCorrect, onNext]
  );

  const disabled = good || wrong;

  const getIndexDisplay = useCallback(
    (i: number) => (wrong && wrongIdx === i ? '×' : i + 1),
    [wrong, wrongIdx]
  );

  const isCorrectHighlight = useCallback(
    (i: number) => (good && selectedIdx === i) || (wrong && correctIdx === i),
    [good, wrong, selectedIdx, correctIdx]
  );

  const isWrongSelected = useCallback((i: number) => wrong && wrongIdx === i, [wrong, wrongIdx]);
  const isDim = useCallback(
    (i: number) => wrong && !isCorrectHighlight(i) && !isWrongSelected(i),
    [wrong, isCorrectHighlight, isWrongSelected]
  );

  const showGoodAt = useCallback((i: number) => good && selectedIdx === i, [good, selectedIdx]);

  return {
    // state
    good,
    wrong,
    selectedIdx,
    wrongIdx,
    correctIdx,
    // helpers
    disabled,
    handleAnswer,
    getIndexDisplay,
    isCorrectHighlight,
    isWrongSelected,
    isDim,
    showGoodAt,
  } as const;
};
