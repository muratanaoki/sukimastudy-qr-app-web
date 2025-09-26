import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { JudgementButtonType } from '../utils/type';
import { ChoiceView } from '../utils/type';
import { shouldFlash } from '../utils/function';
import { useFlashDisplay } from './useFlashDisplay';
import { FLASH_DURATION_MS, JUDGEMENT_BUTTON_TYPE } from '../utils/const';
import { useSoundEffects } from '@/shared/hooks/useSoundEffects';

type AdvanceHandler = (isCorrect?: boolean) => void;

const SOUND_SYNC_DELAY_MS = 60;

export const useJudgementHandler = (
  choiceView: ChoiceView,
  advance: AdvanceHandler,
  questionKey: string | number
) => {
  const [selectedJudgement, setSelectedJudgement] = useState<JudgementButtonType | null>(null);
  const { isFlashing, startFlash, cancelFlash: cancelFlashInternal } = useFlashDisplay();
  const { playCorrectSound, playIncorrectSound, enableAudio } = useSoundEffects();
  const advanceTimerRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);

  const judgementMeta = useMemo<
    Record<JudgementButtonType, { isCorrect: boolean; playSound: () => void }>
  >(
    () => ({
      [JUDGEMENT_BUTTON_TYPE.KNOW]: {
        isCorrect: true,
        playSound: playCorrectSound,
      },
      [JUDGEMENT_BUTTON_TYPE.DONT_KNOW]: {
        isCorrect: false,
        playSound: playIncorrectSound,
      },
    }),
    [playCorrectSound, playIncorrectSound]
  );
  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  const scheduleAdvance = useCallback(
    (isCorrect: boolean) => {
      clearAdvanceTimer();
      if (cancelledRef.current) return;
      advanceTimerRef.current = window.setTimeout(() => {
        advance(isCorrect);
        advanceTimerRef.current = null;
      }, SOUND_SYNC_DELAY_MS);
    },
    [advance, clearAdvanceTimer]
  );

  const finalizeJudgement = useCallback(
    (isCorrect: boolean) => {
      if (cancelledRef.current) return;
      setSelectedJudgement(null);
      scheduleAdvance(isCorrect);
    },
    [scheduleAdvance]
  );

  const handleJudgementAnswer = useCallback(
    (buttonType: JudgementButtonType) => {
      const meta = judgementMeta[buttonType];
      if (!meta) return;

      cancelledRef.current = false;
      clearAdvanceTimer();
      clearFallbackTimer();
      setSelectedJudgement(buttonType);

      // 最初のクリックで音声を有効化
      enableAudio();

      meta.playSound();

      if (shouldFlash(choiceView)) {
        fallbackTimerRef.current = window.setTimeout(() => {
          fallbackTimerRef.current = null;
          finalizeJudgement(meta.isCorrect);
        }, FLASH_DURATION_MS + SOUND_SYNC_DELAY_MS);
        startFlash(() => {
          clearFallbackTimer();
          finalizeJudgement(meta.isCorrect);
        });
      } else {
        finalizeJudgement(meta.isCorrect);
      }
    },
    [
      choiceView,
      startFlash,
      clearAdvanceTimer,
      clearFallbackTimer,
      finalizeJudgement,
      enableAudio,
      judgementMeta,
    ]
  );

  useEffect(() => {
    setSelectedJudgement(null);
    cancelledRef.current = false;
    clearAdvanceTimer();
    clearFallbackTimer();
  }, [questionKey, clearAdvanceTimer, clearFallbackTimer]);

  useEffect(() => {
    return () => {
      clearAdvanceTimer();
      clearFallbackTimer();
    };
  }, [clearAdvanceTimer, clearFallbackTimer]);

  const cancelFlashWithTimers = useCallback(() => {
    cancelledRef.current = true;
    clearAdvanceTimer();
    clearFallbackTimer();
    setSelectedJudgement(null);
    cancelFlashInternal();
  }, [clearAdvanceTimer, clearFallbackTimer, cancelFlashInternal]);

  return {
    selectedJudgement,
    handleJudgementAnswer,
    isFlashing,
    cancelFlash: cancelFlashWithTimers,
  };
};
