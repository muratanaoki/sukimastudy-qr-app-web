import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createSoundHandle } from '@/shared/utils/audio/soundHandle';

const SOUND_SOURCES = {
  correct: '/sounds/maru.mp3',
  incorrect: '/sounds/batu.mp3',
  high: '/sounds/highScore.mp3',
  middle: '/sounds/middleScore.mp3',
  low: '/sounds/lowScore.mp3',
} as const;

type ResultTier = 'perfect' | 'great' | 'nice';

type SoundKey = keyof typeof SOUND_SOURCES;

type BeforePlayListener = () => void;

export type PlaybackFailureHandler = (context: string) => void;

const SOUND_KEYS = Object.keys(SOUND_SOURCES) as SoundKey[];

type AlertCapableWindow = Pick<Window, 'alert'>;

export const createAlertPlaybackFailureHandler = (
  targetWindow?: AlertCapableWindow | null
): PlaybackFailureHandler => {
  const resolvedWindow =
    targetWindow ?? (typeof window !== 'undefined' ? (window as AlertCapableWindow) : undefined);

  return (context: string) => {
    if (!resolvedWindow?.alert) return;
    resolvedWindow.alert(
      `${context}の効果音を再生できませんでした。音量やサイレントモードを確認してください。`
    );
  };
};

export type SoundPlayerMap = Record<SoundKey, () => Promise<boolean>>;

export const createSoundPlayerMap = (play: (key: SoundKey) => Promise<boolean>): SoundPlayerMap =>
  SOUND_KEYS.reduce<SoundPlayerMap>((acc, key) => {
    acc[key] = () => play(key);
    return acc;
  }, {} as SoundPlayerMap);

export type SoundEffectManager = {
  ensureInitialized: () => Promise<void>;
  enable: () => Promise<boolean>;
  play: (key: SoundKey) => Promise<boolean>;
  setBeforePlay: (listener: BeforePlayListener | null) => void;
  dispose: () => void;
  isEnabled: () => boolean;
};

type SoundEffectManagerOptions = {
  soundSources?: typeof SOUND_SOURCES;
  createHandle?: typeof createSoundHandle;
  unlockAudioContext?: () => Promise<boolean>;
};

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

export const createSoundEffectManager = ({
  soundSources = SOUND_SOURCES,
  createHandle = createSoundHandle,
  unlockAudioContext: unlockAudio = unlockAudioContext,
}: SoundEffectManagerOptions = {}): SoundEffectManager => {
  const soundKeys = Object.keys(soundSources) as SoundKey[];
  const handles = new Map<SoundKey, ReturnType<typeof createHandle>>(
    soundKeys.map((key) => [key, createHandle(soundSources[key])])
  );

  let beforePlay: BeforePlayListener | null = null;
  let initializedPromise: Promise<void> | null = null;
  let enabled = false;

  const ensureInitialized = async () => {
    if (!initializedPromise) {
      initializedPromise = Promise.all(
        soundKeys.map(async (key) => {
          const handle = handles.get(key);
          if (!handle) return;
          try {
            await handle.ensureLoaded();
          } catch (error) {
            console.warn('音声初期化待機中にエラー:', error);
          }
        })
      )
        .then(() => undefined)
        .catch((error) => {
          console.warn('音声初期化全体でエラー:', error);
          throw error;
        });
    }

    try {
      await initializedPromise;
    } catch {
      /* noop: エラーは上でログ済み */
    }
  };

  const play = async (key: SoundKey) => {
    const handle = handles.get(key);
    if (!handle) return false;

    beforePlay?.();
    return handle.playFromStart();
  };

  const enable = async () => {
    // プリロードは並行で進める。Safari 等で canplay イベントが発火しないケースでも
    // ユーザー操作直後の play をブロックしないよう await しない。
    void ensureInitialized();
    if (enabled) return true;

    const sampleHandle = handles.values().next().value;
    if (sampleHandle) {
      try {
        const samplePlayed = await sampleHandle.playFromStart({ volume: 0 });
        sampleHandle.reset();
        if (samplePlayed) {
          enabled = true;
          return true;
        }
      } catch (error) {
        console.warn('無音サンプル再生失敗:', error);
        sampleHandle.reset();
      }
    }

    const unlocked = await unlockAudio();
    if (unlocked) {
      enabled = true;
      return true;
    }

    return false;
  };

  const setBeforePlay = (listener: BeforePlayListener | null) => {
    beforePlay = listener;
  };

  const dispose = () => {
    handles.forEach((handle) => {
      handle.cleanup();
    });
    beforePlay = null;
    enabled = false;
    initializedPromise = null;
  };

  const isEnabled = () => enabled;

  return {
    ensureInitialized,
    enable,
    play,
    setBeforePlay,
    dispose,
    isEnabled,
  };
};

export const useSoundEffects = () => {
  const managerRef = useRef<SoundEffectManager>();
  if (!managerRef.current) {
    managerRef.current = createSoundEffectManager();
  }

  const manager = managerRef.current;
  const [isAudioEnabled, setIsAudioEnabled] = useState(manager.isEnabled());
  const fallbackPlaybackFailureHandler = useMemo(() => createAlertPlaybackFailureHandler(), []);
  const playbackFailureHandlerRef = useRef<PlaybackFailureHandler>(fallbackPlaybackFailureHandler);

  useEffect(() => {
    manager.ensureInitialized().catch(() => {
      /* エラーはマネージャがログする */
    });

    return () => {
      manager.dispose();
    };
  }, [manager]);

  const enableAudio = useCallback(async (): Promise<boolean> => {
    const enabled = await manager.enable();
    if (enabled) {
      setIsAudioEnabled(true);
    }
    return enabled;
  }, [manager]);

  const playManagedSound = useCallback(
    (key: SoundKey) => {
      return manager.play(key);
    },
    [manager]
  );

  const soundPlayers = useMemo(() => createSoundPlayerMap(playManagedSound), [playManagedSound]);

  const {
    correct: playCorrectSound,
    incorrect: playIncorrectSound,
    high: playHighScoreSound,
    middle: playMiddleScoreSound,
    low: playLowScoreSound,
  } = soundPlayers;

  const setBeforePlay = useCallback(
    (callback: (() => void) | null) => {
      manager.setBeforePlay(callback);
    },
    [manager]
  );

  const notifyPlaybackFailure = useCallback((context: string) => {
    playbackFailureHandlerRef.current?.(context);
  }, []);

  const setPlaybackFailureHandler = useCallback(
    (handler: PlaybackFailureHandler | null | undefined) => {
      playbackFailureHandlerRef.current = handler ?? fallbackPlaybackFailureHandler;
    },
    [fallbackPlaybackFailureHandler]
  );

  const playResultSound = useCallback(
    (tier: ResultTier) => {
      const map: Record<ResultTier, () => Promise<boolean>> = {
        perfect: playHighScoreSound,
        great: playMiddleScoreSound,
        nice: playLowScoreSound,
      };

      return map[tier]();
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
    playManagedSound,
    setBeforePlay,
    notifyPlaybackFailure,
    setPlaybackFailureHandler,
  };
};

export type UseSoundEffectsReturn = ReturnType<typeof useSoundEffects>;
