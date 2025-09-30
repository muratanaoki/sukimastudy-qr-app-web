import { useCallback, useEffect, useRef, useState } from 'react';

type AudioRef = React.MutableRefObject<HTMLAudioElement | null>;

const SOUND_SOURCES = {
  correct: '/sounds/maru.wav',
  incorrect: '/sounds/batu.wav',
  high: '/sounds/highScore.wav',
  middle: '/sounds/middleScore.wav',
  low: '/sounds/lowScore.wav',
} as const;

type ResultTier = 'perfect' | 'great' | 'nice';

// 音声ファイルのプリロード処理
const createPreloadedAudio = async (src: string): Promise<HTMLAudioElement> => {
  const audio = new Audio();
  audio.volume = 0.5;
  audio.preload = 'auto';
  audio.src = src;
  audio.load();

  return new Promise<HTMLAudioElement>((resolve) => {
    const cleanup = () => {
      audio.removeEventListener('canplaythrough', handleReady);
      audio.removeEventListener('error', handleError);
    };

    const handleReady = () => {
      cleanup();
      resolve(audio);
    };

    const handleError = (e: Event) => {
      cleanup();
      console.warn(`音声読み込みエラー: ${src}`, e);
      resolve(audio);
    };

    audio.addEventListener('canplaythrough', handleReady);
    audio.addEventListener('error', handleError);
  });
};

// 音声の安全な再生処理
const playAudioSafely = async (audioRef: AudioRef, onError: () => void) => {
  const audio = audioRef.current;
  if (!audio || audio.readyState < 2) {
    console.warn('音声が準備完了していません');
    return;
  }

  try {
    if (!audio.paused) audio.pause();
    audio.currentTime = 0;
    await audio.play();
  } catch (error) {
    console.warn('音声再生エラー:', error);
    onError();
  }
};

// 音声リソースのクリーンアップ
const cleanupAudio = (audio: HTMLAudioElement | null) => {
  if (audio) {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
  }
};

// ブラウザの音声制限を解除する処理
const unlockAudioContext = async (): Promise<boolean> => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContextClass();
    await audioContext.resume();
    return true;
  } catch (error) {
    console.warn('AudioContext初期化失敗:', error);
    return false;
  }
};

export const useSoundEffects = () => {
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);
  const highScoreAudioRef = useRef<HTMLAudioElement | null>(null);
  const middleScoreAudioRef = useRef<HTMLAudioElement | null>(null);
  const lowScoreAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  // 音声ファイルの初期化
  useEffect(() => {
    let isMounted = true;

    const initializeAudio = async () => {
      const [correctAudio, incorrectAudio, highScoreAudio, middleScoreAudio, lowScoreAudio] =
        await Promise.all([
          createPreloadedAudio(SOUND_SOURCES.correct),
          createPreloadedAudio(SOUND_SOURCES.incorrect),
          createPreloadedAudio(SOUND_SOURCES.high),
          createPreloadedAudio(SOUND_SOURCES.middle),
          createPreloadedAudio(SOUND_SOURCES.low),
        ]);

      if (!isMounted) return;

      correctAudioRef.current = correctAudio;
      incorrectAudioRef.current = incorrectAudio;
      highScoreAudioRef.current = highScoreAudio;
      middleScoreAudioRef.current = middleScoreAudio;
      lowScoreAudioRef.current = lowScoreAudio;
    };

    initializeAudio();

    return () => {
      isMounted = false;
      cleanupAudio(correctAudioRef.current);
      cleanupAudio(incorrectAudioRef.current);
      cleanupAudio(highScoreAudioRef.current);
      cleanupAudio(middleScoreAudioRef.current);
      cleanupAudio(lowScoreAudioRef.current);
    };
  }, []);

  // 音声有効化（スマホ対応）
  const enableAudio = useCallback(() => {
    if (isAudioEnabled) return;

    const attemptEnable = async () => {
      const audio =
        correctAudioRef.current ||
        incorrectAudioRef.current ||
        highScoreAudioRef.current ||
        middleScoreAudioRef.current ||
        lowScoreAudioRef.current;

      if (!audio) return;

      try {
        audio.volume = 0;
        await audio.play();
        audio.volume = 0.5;
        setIsAudioEnabled(true);
      } catch {
        const success = await unlockAudioContext();
        if (success) setIsAudioEnabled(true);
      }
    };

    attemptEnable();
  }, [isAudioEnabled]);

  const playCorrectSound = useCallback(() => {
    playAudioSafely(correctAudioRef, enableAudio);
  }, [enableAudio]);

  const playIncorrectSound = useCallback(() => {
    playAudioSafely(incorrectAudioRef, enableAudio);
  }, [enableAudio]);

  const playHighScoreSound = useCallback(() => {
    playAudioSafely(highScoreAudioRef, enableAudio);
  }, [enableAudio]);

  const playMiddleScoreSound = useCallback(() => {
    playAudioSafely(middleScoreAudioRef, enableAudio);
  }, [enableAudio]);

  const playLowScoreSound = useCallback(() => {
    playAudioSafely(lowScoreAudioRef, enableAudio);
  }, [enableAudio]);

  const playResultSound = useCallback(
    (tier: ResultTier) => {
      const map = {
        perfect: playHighScoreSound,
        great: playMiddleScoreSound,
        nice: playLowScoreSound,
      } as const;

      map[tier]();
    },
    [playHighScoreSound, playMiddleScoreSound, playLowScoreSound]
  );

  const playSound = useCallback((soundFile: string) => {
    try {
      const audio = new Audio(soundFile);
      audio.volume = 0.5;
      audio.play().catch((error) => {
        console.warn('音声再生失敗:', error);
      });
    } catch (error) {
      console.warn('音声読み込み失敗:', error);
    }
  }, []);

  return {
    playCorrectSound,
    playIncorrectSound,
    playHighScoreSound,
    playMiddleScoreSound,
    playLowScoreSound,
    playResultSound,
    playSound,
    enableAudio,
    isAudioEnabled,
  };
};

export type UseSoundEffectsReturn = ReturnType<typeof useSoundEffects>;
