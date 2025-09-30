import { useEffect, useRef } from 'react';
import type { UseSoundEffectsReturn } from '@/shared/hooks/useSoundEffects';
import { resolveScoreTier } from '../../../utils/score/score';

export type UseResultSoundEffectParams = {
  hasItems: boolean;
  scorePercentage: number;
  playResultSound: UseSoundEffectsReturn['playResultSound'];
  isCompleted: boolean;
  questionKey: string | number; // 問題セットが変わったらサウンド再生フラグをリセット
  open: boolean; // ダイアログ開閉でのリセット
};

export const useResultSoundEffect = ({
  hasItems,
  scorePercentage,
  playResultSound,
  isCompleted,
  questionKey,
  open,
}: UseResultSoundEffectParams) => {
  const resultSoundPlayedRef = useRef(false);

  // テスト完了を監視してサウンドを再生
  useEffect(() => {
    if (!isCompleted) return;
    if (!hasItems) return;
    if (resultSoundPlayedRef.current) return;

    resultSoundPlayedRef.current = true;
    const tier = resolveScoreTier(scorePercentage);
    playResultSound(tier);
  }, [isCompleted, hasItems, scorePercentage, playResultSound]);

  // questionKey 変化でリセット
  useEffect(() => {
    resultSoundPlayedRef.current = false;
  }, [questionKey]);

  // ダイアログが閉じたらリセット
  useEffect(() => {
    if (!open) {
      resultSoundPlayedRef.current = false;
    }
  }, [open]);

  return {};
};
