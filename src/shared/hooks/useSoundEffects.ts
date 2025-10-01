import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  PlaybackFailureHandler,
  RESULT_TIER_TO_SOUND_KEY,
  ResultTier,
  SoundEffectManager,
  SoundKey,
  createAlertPlaybackFailureHandler,
  createSoundEffectManager,
  createSoundPlayerMap,
} from '@/shared/utils/audio/soundEffectManager';

export type { PlaybackFailureHandler } from '@/shared/utils/audio/soundEffectManager';

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

  const playManagedSound = useCallback((key: SoundKey) => manager.play(key), [manager]);

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
      const soundKey = RESULT_TIER_TO_SOUND_KEY[tier];
      return soundPlayers[soundKey]();
    },
    [soundPlayers]
  );

  const getAudioElement = useCallback((key: SoundKey) => manager.getAudioElement(key), [manager]);

  return {
    playCorrectSound,
    playIncorrectSound,
    playHighScoreSound,
    playMiddleScoreSound,
    playLowScoreSound,
    playResultSound,
    enableAudio,
    isAudioEnabled,
    playManagedSound,
    setBeforePlay,
    notifyPlaybackFailure,
    setPlaybackFailureHandler,
    getAudioElement,
  };
};

export type UseSoundEffectsReturn = ReturnType<typeof useSoundEffects>;
