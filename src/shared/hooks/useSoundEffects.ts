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
  const initializationPromiseRef = useRef<Promise<void> | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  // 音声ファイルの初期化
  useEffect(() => {
    let isMounted = true;

    initializationPromiseRef.current = (async () => {
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
    })();

    return () => {
      isMounted = false;
      initializationPromiseRef.current = null;
      cleanupAudio(correctAudioRef.current);
      cleanupAudio(incorrectAudioRef.current);
      cleanupAudio(highScoreAudioRef.current);
      cleanupAudio(middleScoreAudioRef.current);
      cleanupAudio(lowScoreAudioRef.current);
    };
  }, []);

  // 音声有効化（スマホ対応）
  const enableAudio = useCallback(async () => {
    if (isAudioEnabled) return;

    const attemptEnable = async () => {
      try {
        await initializationPromiseRef.current;
      } catch (error) {
        console.warn('音声初期化待機中にエラー:', error);
      }

      const audio =
        correctAudioRef.current ||
        incorrectAudioRef.current ||
        highScoreAudioRef.current ||
        middleScoreAudioRef.current ||
        lowScoreAudioRef.current;

      if (!audio) return;

      try {
        const originalVolume = audio.volume ?? 0.5;
        audio.volume = 0;
        await audio.play();
        try {
          audio.pause();
        } catch (error) {
          console.warn('音声停止に失敗:', error);
        }
        audio.currentTime = 0;
        audio.volume = originalVolume;
        setIsAudioEnabled(true);
      } catch {
        const success = await unlockAudioContext();
        if (success) setIsAudioEnabled(true);
      }
    };

    await attemptEnable();
  }, [isAudioEnabled]);

  const playSoundWithRef = useCallback(
    async (audioRef: AudioRef, src: string) => {
      const waitForInitialization = initializationPromiseRef.current;
      if (waitForInitialization) {
        try {
          await waitForInitialization;
        } catch (error) {
          console.warn('音声初期化待機中にエラー:', error);
        }
      }

      const ensureAudioReady = async (): Promise<HTMLAudioElement | null> => {
        let audio = audioRef.current;
        if (audio && audio.readyState >= 2) {
          return audio;
        }

        try {
          audio = await createPreloadedAudio(src);
          audioRef.current = audio;
          return audio;
        } catch (error) {
          console.warn('音声再読み込みに失敗:', error);
          return null;
        }
      };

      const attemptPlay = async (): Promise<boolean> => {
        const audio = await ensureAudioReady();
        if (!audio || audio.readyState < 2) {
          console.warn('音声が準備完了していません');
          return false;
        }

        try {
          if (!audio.paused) audio.pause();
          audio.currentTime = 0;
          await audio.play();
          return true;
        } catch (error) {
          console.warn('音声再生エラー:', error);
          return false;
        }
      };

      if (await attemptPlay()) return;

      await enableAudio();

      if (!(await attemptPlay())) {
        console.warn('音声再生リトライに失敗しました');
      }
    },
    [enableAudio]
  );

  const playCorrectSound = useCallback(() => {
    void playSoundWithRef(correctAudioRef, SOUND_SOURCES.correct);
  }, [playSoundWithRef]);

  const playIncorrectSound = useCallback(() => {
    void playSoundWithRef(incorrectAudioRef, SOUND_SOURCES.incorrect);
  }, [playSoundWithRef]);

  const playHighScoreSound = useCallback(() => {
    void playSoundWithRef(highScoreAudioRef, SOUND_SOURCES.high);
  }, [playSoundWithRef]);

  const playMiddleScoreSound = useCallback(() => {
    void playSoundWithRef(middleScoreAudioRef, SOUND_SOURCES.middle);
  }, [playSoundWithRef]);

  const playLowScoreSound = useCallback(() => {
    void playSoundWithRef(lowScoreAudioRef, SOUND_SOURCES.low);
  }, [playSoundWithRef]);

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
