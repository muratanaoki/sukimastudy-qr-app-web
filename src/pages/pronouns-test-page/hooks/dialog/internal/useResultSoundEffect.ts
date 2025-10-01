import { useCallback, useEffect, useRef } from 'react';
import type { UseSoundEffectsReturn } from '@/shared/hooks/useSoundEffects';
import { resolveScoreTier } from '../../../utils/score/score';

const RESULT_SOUND_DELAY_MS = 300;

export type UseResultSoundEffectParams = {
  hasItems: boolean;
  scorePercentage: number;
  playResultSound: UseSoundEffectsReturn['playResultSound'];
  shouldPlay: boolean;
  questionKey: string | number; // 問題セットが変わったらサウンド再生フラグをリセット
  open: boolean; // ダイアログ開閉でのリセット
};

export const useResultSoundEffect = ({
  hasItems,
  scorePercentage,
  playResultSound,
  shouldPlay,
  questionKey,
  open,
}: UseResultSoundEffectParams) => {
  const resultSoundPlayedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // テスト完了を監視してサウンドを再生
  useEffect(() => {
    if (!shouldPlay) return;
    if (!hasItems) return;
    if (resultSoundPlayedRef.current) return;

    resultSoundPlayedRef.current = true;
    const tier = resolveScoreTier(scorePercentage);
    clearTimer();
    timeoutRef.current = window.setTimeout(() => {
      playResultSound(tier);
      timeoutRef.current = null;
    }, RESULT_SOUND_DELAY_MS);

    return () => {
      clearTimer();
    };
  }, [shouldPlay, hasItems, scorePercentage, playResultSound, clearTimer]);

  // questionKey 変化でリセット
  useEffect(() => {
    clearTimer();
    resultSoundPlayedRef.current = false;
  }, [questionKey, clearTimer]);

  // ダイアログが閉じたらリセット
  useEffect(() => {
    if (!open) {
      clearTimer();
      resultSoundPlayedRef.current = false;
    }
  }, [open, clearTimer]);

  useEffect(
    () => () => {
      clearTimer();
    },
    [clearTimer]
  );

  return {};
};
