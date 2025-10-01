import { useCallback, useEffect, useRef, useState } from 'react';
import { createSoundHandle } from '@/shared/utils/audio/soundHandle';

const SOUND_SOURCES = {
  correct: '/sounds/maru.wav',
  incorrect: '/sounds/batu.wav',
  high: '/sounds/highScore.wav',
  middle: '/sounds/middleScore.wav',
  low: '/sounds/lowScore.wav',
} as const;

type ResultTier = 'perfect' | 'great' | 'nice';

type SoundKey = keyof typeof SOUND_SOURCES;

const SOUND_KEYS = Object.keys(SOUND_SOURCES) as SoundKey[];

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

const buildSoundHandles = () =>
  SOUND_KEYS.reduce<Record<SoundKey, ReturnType<typeof createSoundHandle>>>(
    (acc, key) => {
      acc[key] = createSoundHandle(SOUND_SOURCES[key]);
      return acc;
    },
    {} as Record<SoundKey, ReturnType<typeof createSoundHandle>>
  );

export const useSoundEffects = () => {
  const soundHandlesRef = useRef<Record<SoundKey, ReturnType<typeof createSoundHandle>>>();
  if (!soundHandlesRef.current) {
    soundHandlesRef.current = buildSoundHandles();
  }

  const initializationPromiseRef = useRef<Promise<void> | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  useEffect(() => {
    const handles = soundHandlesRef.current!;
    initializationPromiseRef.current = Promise.all(
      SOUND_KEYS.map((key) => handles[key].ensureLoaded())
    )
      .then(() => undefined)
      .catch((error) => {
        console.warn('音声初期化待機中にエラー:', error);
      });

    return () => {
      initializationPromiseRef.current = null;
      SOUND_KEYS.forEach((key) => {
        handles[key].cleanup();
      });
    };
  }, []);

  const awaitInitialization = useCallback(async () => {
    const promise = initializationPromiseRef.current;
    if (!promise) return;

    try {
      await promise;
    } catch (error) {
      console.warn('音声初期化待機中にエラー:', error);
    }
  }, []);

  const enableAudio = useCallback(async (): Promise<boolean> => {
    if (isAudioEnabled) return true;

    void awaitInitialization();

    const handles = soundHandlesRef.current!;
    const sampleHandle = handles[SOUND_KEYS[0]];

    const unlockWithSample = async () => {
      if (!sampleHandle) return false;

      try {
        const unlocked = await sampleHandle.playFromStart({ volume: 0 });
        sampleHandle.reset();
        return unlocked;
      } catch (error) {
        console.warn('無音サンプル再生失敗:', error);
        sampleHandle.reset();
        return false;
      }
    };

    if (await unlockWithSample()) {
      setIsAudioEnabled(true);
      return true;
    }

    const contextUnlocked = await unlockAudioContext();
    if (contextUnlocked) {
      setIsAudioEnabled(true);
      return true;
    }

    return false;
  }, [awaitInitialization, isAudioEnabled]);

  const playManagedSound = useCallback(
    async (key: SoundKey) => {
      const handles = soundHandlesRef.current!;
      const handle = handles[key];
      if (!handle) return;

      const play = async () => handle.playFromStart();

      if (await play()) return;

      const unlocked = await enableAudio();
      if (!unlocked) return;

      await play();
    },
    [enableAudio]
  );

  const playCorrectSound = useCallback(() => {
    void playManagedSound('correct');
  }, [playManagedSound]);

  const playIncorrectSound = useCallback(() => {
    void playManagedSound('incorrect');
  }, [playManagedSound]);

  const playHighScoreSound = useCallback(() => {
    void playManagedSound('high');
  }, [playManagedSound]);

  const playMiddleScoreSound = useCallback(() => {
    void playManagedSound('middle');
  }, [playManagedSound]);

  const playLowScoreSound = useCallback(() => {
    void playManagedSound('low');
  }, [playManagedSound]);

  const playResultSound = useCallback(
    (tier: ResultTier) => {
      const map: Record<ResultTier, () => void> = {
        perfect: playHighScoreSound,
        great: playMiddleScoreSound,
        nice: playLowScoreSound,
      };

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
