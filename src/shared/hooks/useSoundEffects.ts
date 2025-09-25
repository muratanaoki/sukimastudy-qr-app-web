import { useCallback, useEffect, useRef } from 'react';

export const useSoundEffects = () => {
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);

  // 音声ファイルを事前に読み込み
  useEffect(() => {
    const preloadAudio = (src: string) => {
      const audio = new Audio();
      audio.volume = 1;
      audio.preload = 'auto';
      audio.src = src;
      return audio;
    };

    correctAudioRef.current = preloadAudio('/sounds/maru.wav');
    incorrectAudioRef.current = preloadAudio('/sounds/batu.wav');

    return () => {
      // クリーンアップ
      correctAudioRef.current = null;
      incorrectAudioRef.current = null;
    };
  }, []);

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
    if (correctAudioRef.current) {
      correctAudioRef.current.currentTime = 0; // 再生位置をリセット
      correctAudioRef.current.play().catch((error) => {
        console.warn('正解音の再生に失敗しました:', error);
      });
    }
  }, []);

  const playIncorrectSound = useCallback(() => {
    if (incorrectAudioRef.current) {
      incorrectAudioRef.current.currentTime = 0; // 再生位置をリセット
      incorrectAudioRef.current.play().catch((error) => {
        console.warn('不正解音の再生に失敗しました:', error);
      });
    }
  }, []);

  return {
    playCorrectSound,
    playIncorrectSound,
    playSound,
  };
};
