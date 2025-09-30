import { useCallback, useEffect, useRef } from 'react';
import type { UseSoundEffectsReturn } from '@/shared/hooks/useSoundEffects';
import { resolveScoreTier } from '../../utils/score';

export type UseResultSoundEffectParams = {
  hasItems: boolean;
  scorePercentage: number;
  playResultSound: UseSoundEffectsReturn['playResultSound'];
  closeConfirm: () => void;
  isCompleted: boolean;
  questionKey: string | number;
  open: boolean;
};

export const useResultSoundEffect = ({
  hasItems,
  scorePercentage,
  playResultSound,
  closeConfirm,
  isCompleted,
  questionKey,
  open,
}: UseResultSoundEffectParams) => {
  const resultSoundPlayedRef = useRef(false);

  const handleTestComplete = useCallback(() => {
    closeConfirm();
    if (!hasItems || resultSoundPlayedRef.current) return;

    resultSoundPlayedRef.current = true;
    const tier = resolveScoreTier(scorePercentage);
    playResultSound(tier);
  }, [closeConfirm, hasItems, playResultSound, scorePercentage]);

  useEffect(() => {
    if (!isCompleted) {
      resultSoundPlayedRef.current = false;
    }
  }, [isCompleted, questionKey]);

  useEffect(() => {
    if (!open) {
      resultSoundPlayedRef.current = false;
    }
  }, [open]);

  return {
    handleTestComplete,
  };
};
