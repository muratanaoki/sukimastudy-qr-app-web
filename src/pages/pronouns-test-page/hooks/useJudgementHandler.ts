import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const { isFlashing, startFlash, cancelFlash } = useFlashDisplay();
  const { playCorrectSound, playIncorrectSound, enableAudio } = useSoundEffects();

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

  const handleJudgementAnswer = useCallback(
    (buttonType: JudgementButtonType) => {
      const meta = judgementMeta[buttonType];
      if (!meta) return;

      setSelectedJudgement(buttonType);

      // 最初のクリックで音声を有効化
      enableAudio();

      meta.playSound();

      const scheduleAdvance = () => {
        window.setTimeout(() => advance(meta.isCorrect), SOUND_SYNC_DELAY_MS);
      };

      const finalize = () => {
        setSelectedJudgement(null);
        scheduleAdvance();
      };

      if (shouldFlash(choiceView)) {
        const fallbackId = window.setTimeout(finalize, FLASH_DURATION_MS + SOUND_SYNC_DELAY_MS);
        startFlash(() => {
          window.clearTimeout(fallbackId);
          finalize();
        });
      } else {
        finalize();
      }
    },
    [choiceView, startFlash, advance, enableAudio, judgementMeta]
  );

  useEffect(() => {
    setSelectedJudgement(null);
  }, [questionKey]);

  return {
    selectedJudgement,
    handleJudgementAnswer,
    isFlashing,
    cancelFlash,
  };
};
