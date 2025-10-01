import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { JudgementButtonType } from '../../utils/domain/type';
import { ChoiceView } from '../../utils/domain/type';
import { shouldFlash } from '../../utils/domain/function';
import { useFlashDisplay } from '../ui/useFlashDisplay';
import { FLASH_DURATION_MS, JUDGEMENT_BUTTON_TYPE } from '../../utils/constants/const';
import type { UseSoundEffectsReturn } from '@/shared/hooks/useSoundEffects';
import { createPlaybackRetrier } from '@/shared/utils/audio/playbackRetry';

type AdvanceHandler = (isCorrect?: boolean) => void;

const SOUND_SYNC_DELAY_MS = 60;

type SoundEffectsForJudgement = Pick<
  UseSoundEffectsReturn,
  'playCorrectSound' | 'playIncorrectSound' | 'enableAudio' | 'notifyPlaybackFailure'
>;

export const useJudgementHandler = (
  choiceView: ChoiceView,
  advance: AdvanceHandler,
  questionKey: string | number,
  soundEffects: SoundEffectsForJudgement
) => {
  const [selectedJudgement, setSelectedJudgement] = useState<JudgementButtonType | null>(null);
  const { isFlashing, startFlash, cancelFlash: cancelFlashInternal } = useFlashDisplay();
  const { playCorrectSound, playIncorrectSound, enableAudio, notifyPlaybackFailure } = soundEffects;
  const advanceTimerRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);

  const playbackRetrier = useMemo(
    () =>
      createPlaybackRetrier({
        enableAudio,
        notifyPlaybackFailure,
      }),
    [enableAudio, notifyPlaybackFailure]
  );

  const judgementMeta = useMemo<
    Record<
      JudgementButtonType,
      {
        isCorrect: boolean;
        playSound: () => Promise<boolean>;
        failureContext: string;
      }
    >
  >(
    () => ({
      [JUDGEMENT_BUTTON_TYPE.KNOW]: {
        isCorrect: true,
        playSound: () => playCorrectSound(),
        failureContext: '正解',
      },
      [JUDGEMENT_BUTTON_TYPE.DONT_KNOW]: {
        isCorrect: false,
        playSound: () => playIncorrectSound(),
        failureContext: '不正解',
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
      scheduleAdvance(isCorrect);
    },
    [scheduleAdvance]
  );

  const playJudgementSound = useCallback(
    (playFn: () => Promise<boolean>, failureContext: string) => {
      void playbackRetrier({
        play: playFn,
        failureContext,
        logLabel: 'Judgement',
      });
    },
    [playbackRetrier]
  );

  const handleJudgementAnswer = useCallback(
    (buttonType: JudgementButtonType) => {
      const meta = judgementMeta[buttonType];
      if (!meta) return;

      cancelledRef.current = false;
      clearAdvanceTimer();
      clearFallbackTimer();
      setSelectedJudgement(buttonType);

      if (!cancelledRef.current) {
        playJudgementSound(meta.playSound, meta.failureContext);
      }

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
      playJudgementSound,
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
