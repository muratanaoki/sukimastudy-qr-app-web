import { useCallback, useEffect, useRef, useState } from 'react';

export const useSoundEffects = () => {
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  // 音声ファイルを事前に読み込み
  useEffect(() => {
    const preloadAudio = (src: string) => {
      const audio = new Audio();
      audio.volume = 0.5;
      audio.preload = 'auto';
      audio.src = src;

      // スマホ対応: loadを追加
      audio.load();

      // エラーハンドリング
      audio.addEventListener('error', (e) => {
        console.warn(`音声ファイルの読み込みエラー: ${src}`, e);
      });

      return audio;
    };

    correctAudioRef.current = preloadAudio('/sounds/maru.wav');
    incorrectAudioRef.current = preloadAudio('/sounds/batu.wav');

    return () => {
      // 適切なクリーンアップ
      if (correctAudioRef.current) {
        correctAudioRef.current.pause();
        correctAudioRef.current.removeAttribute('src');
        correctAudioRef.current.load();
      }
      if (incorrectAudioRef.current) {
        incorrectAudioRef.current.pause();
        incorrectAudioRef.current.removeAttribute('src');
        incorrectAudioRef.current.load();
      }
    };
  }, []);

  // ユーザー操作で音声を有効化（スマホ対応）
  const enableAudio = useCallback(() => {
    if (!isAudioEnabled) {
      // 無音の音声を再生してブラウザの制限を解除
      const silentAudio = correctAudioRef.current;
      if (silentAudio) {
        silentAudio.volume = 0;
        silentAudio.play().then(() => {
          silentAudio.volume = 0.5;
          setIsAudioEnabled(true);
        }).catch(() => {
          // フォールバック: Web Audio API使用
          try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioContext.resume().then(() => {
              setIsAudioEnabled(true);
            });
          } catch (error) {
            console.warn('音声の初期化に失敗:', error);
          }
        });
      }
    }
  }, [isAudioEnabled]);

  const playSound = useCallback((soundFile: string) => {
    try {
      const audio = new Audio(soundFile);
      audio.volume = 0.5;
      audio.play().catch((error) => {
        console.warn('音声の再生に失敗しました:', error);
      });
    } catch (error) {
      console.warn('音声ファイルの読み込みに失敗しました:', error);
    }
  }, []);

  const playCorrectSound = useCallback(() => {
    if (correctAudioRef.current) {
      try {
        correctAudioRef.current.currentTime = 0;
        const playPromise = correctAudioRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn('正解音の再生に失敗しました:', error);
            // 自動再生が失敗した場合は音声を有効化
            enableAudio();
          });
        }
      } catch (error) {
        console.warn('正解音の再生エラー:', error);
      }
    }
  }, [enableAudio]);

  const playIncorrectSound = useCallback(() => {
    if (incorrectAudioRef.current) {
      try {
        incorrectAudioRef.current.currentTime = 0;
        const playPromise = incorrectAudioRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn('不正解音の再生に失敗しました:', error);
            // 自動再生が失敗した場合は音声を有効化
            enableAudio();
          });
        }
      } catch (error) {
        console.warn('不正解音の再生エラー:', error);
      }
    }
  }, [enableAudio]);

  return {
    playCorrectSound,
    playIncorrectSound,
    playSound,
    enableAudio,
    isAudioEnabled,
  };
};
