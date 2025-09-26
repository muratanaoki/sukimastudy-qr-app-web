import { useCallback, useEffect, useRef, useState } from 'react';
import { useSoundEffects } from '@/shared/hooks/useSoundEffects';

export type AnswerFeedbackConfig = {
  isCorrect: (label: string) => boolean;
  onNext: (isCorrect?: boolean) => void;
  goodDurationMs?: number; // default 650
  wrongDurationMs?: number; // default 900
  choices?: string[]; // 現在の選択肢（index ベース評価用）
  correctIndex?: number; // 正解のインデックス（index ベース評価用）
  currentKey?: string | number; // 問題が切り替わった時のリセット用キー
};

export const useAnswerFeedback = ({
  isCorrect,
  onNext,
  goodDurationMs = 650,
  wrongDurationMs = 900,
  correctIndex,
  currentKey,
}: AnswerFeedbackConfig) => {
  const { playCorrectSound, playIncorrectSound } = useSoundEffects();
  const [good, setGood] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [correctIdx, setCorrectIdx] = useState<number | null>(null);
  const [skipped, setSkipped] = useState(false);

  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  // 問題が切り替わったら演出用の状態をリセット
  useEffect(() => {
    setGood(false);
    setWrong(false);
    setSelectedIdx(null);
    setWrongIdx(null);
    setCorrectIdx(null);
    setSkipped(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [currentKey]);

  // タイマー管理の共通処理
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const schedule = useCallback(
    (fn: () => void, ms: number) => {
      clearTimer();
      timerRef.current = window.setTimeout(fn, ms);
    },
    [clearTimer]
  );

  // 正解/不正解/スキップ開始時の共通処理
  const startGood = useCallback(
    (index: number | null, opts?: { skipped?: boolean }) => {
      const isSkipped = !!opts?.skipped;
      setSkipped(isSkipped);
      setGood(true);
      setSelectedIdx(isSkipped ? null : index);
      if (isSkipped && typeof correctIndex === 'number') setCorrectIdx(correctIndex);

      // 正解音を再生（スキップ時は音を出さない）
      if (!isSkipped) {
        playCorrectSound();
      }

      schedule(() => {
        setGood(false);
        setSkipped(false);
        setSelectedIdx(null);
        if (isSkipped) setCorrectIdx(null);
        onNext(isSkipped ? false : true);
      }, goodDurationMs);
    },
    [correctIndex, goodDurationMs, onNext, schedule, playCorrectSound]
  );

  const startWrong = useCallback(
    (index: number, resolvedCorrectIdx: number | null) => {
      setWrong(true);
      setWrongIdx(index);
      setCorrectIdx(resolvedCorrectIdx);

      // 不正解音を再生
      playIncorrectSound();

      schedule(() => {
        setWrong(false);
        setWrongIdx(null);
        setCorrectIdx(null);
        onNext(false);
      }, wrongDurationMs);
    },
    [onNext, schedule, wrongDurationMs, playIncorrectSound]
  );

  const handleAnswer = useCallback(
    (label: string, index: number, currentChoices: string[], correctLabel: string | undefined) => {
      const ok = isCorrect(label);
      if (ok) {
        startGood(index);
      } else {
        // 正解インデックスの解決: props の correctIndex が優先、なければ引数の correctLabel から算出
        let resolved: number | null = null;
        if (typeof correctIndex === 'number') {
          resolved = correctIndex;
        } else if (correctLabel) {
          const ci = currentChoices.findIndex((c) => c === correctLabel);
          resolved = ci >= 0 ? ci : null;
        }
        startWrong(index, resolved);
      }
    },
    [isCorrect, correctIndex, startGood, startWrong]
  );

  // index ベースの API（推奨）
  const handleAnswerIndex = useCallback(
    (index: number) => {
      const ok = typeof correctIndex === 'number' && index === correctIndex;
      if (ok) {
        startGood(index);
      } else {
        const resolved = typeof correctIndex === 'number' ? correctIndex : null;
        startWrong(index, resolved);
      }
    },
    [correctIndex, startGood, startWrong]
  );

  // SKIP を「正解時」と同じ演出で扱う（ただしトーストは出さない）
  const handleSkipAsCorrect = useCallback(() => {
    startGood(null, { skipped: true });
  }, [startGood]);

  const disabled = good || wrong;

  const getIndexDisplay = useCallback((i: number) => i + 1, []);

  const isCorrectHighlight = useCallback(
    (i: number) =>
      (good && (skipped ? correctIdx === i : selectedIdx === i)) || (wrong && correctIdx === i),
    [good, wrong, skipped, selectedIdx, correctIdx]
  );

  const isWrongSelected = useCallback((i: number) => wrong && wrongIdx === i, [wrong, wrongIdx]);
  // “その他のボタン”の薄さを統一
  // - 正解時(good):
  //    - 通常: 選択した正解以外を薄く
  //    - SKIP時: 正解（correctIdx）以外を薄く
  // - 不正解時(wrong): 正解と誤選択以外を薄く
  const isDim = useCallback(
    (i: number) => {
      if (good) {
        if (skipped && correctIdx !== null) return i !== correctIdx;
        if (!skipped && selectedIdx !== null) return i !== selectedIdx;
        return false;
      }
      if (wrong && correctIdx !== null) return i !== correctIdx && i !== wrongIdx;
      return false;
    },
    [good, wrong, skipped, selectedIdx, correctIdx, wrongIdx]
  );

  // SKIP時はトーストを抑止
  const showGoodAt = useCallback(
    (i: number) => good && !skipped && selectedIdx === i,
    [good, skipped, selectedIdx]
  );

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
    handleAnswerIndex,
    getIndexDisplay,
    isCorrectHighlight,
    isWrongSelected,
    isDim,
    showGoodAt,
    handleSkipAsCorrect,
  } as const;
};
