import { useCallback } from 'react';

export const useSoundEffects = () => {
  const playSound = useCallback((soundFile: string) => {
    try {
      const audio = new Audio(soundFile);
      audio.volume = 0.5; // 音量を50%に設定
      audio.play().catch((error) => {
        console.warn('音声の再生に失敗しました:', error);
      });
    } catch (error) {
      console.warn('音声ファイルの読み込みに失敗しました:', error);
    }
  }, []);

  const playCorrectSound = useCallback(() => {
    playSound('/sounds/maru.wav');
  }, [playSound]);

  const playIncorrectSound = useCallback(() => {
    playSound('/sounds/batu.wav');
  }, [playSound]);

  return {
    playCorrectSound,
    playIncorrectSound,
    playSound,
  };
};
