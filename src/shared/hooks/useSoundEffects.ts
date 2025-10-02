import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  PlaybackFailureHandler,
  RESULT_TIER_TO_SOUND_KEY,
  SoundEffectManager,
  SoundKey,
  createAlertPlaybackFailureHandler,
  createSoundEffectManager,
  createSoundPlayerMap,
} from '@/shared/utils/audio/soundEffectManager';
import type { PlaybackFailureInfo } from '@/shared/utils/audio/playbackDiagnostics';
import { ResultTier } from '@/pages/pronouns-test-page/utils/enum';

/**
 * 効果音の再生・初期化・失敗ハンドリングを集約するアプリ全体向けフック。
 * - `SoundEffectManager` の単一インスタンスを保持し、同じ音源の多重ロードを防ぐ。
 * - 再生前のユーザー操作要求（enableAudio）や失敗ダイアログへの通知もここで定義。
 */

export type { PlaybackFailureHandler } from '@/shared/utils/audio/soundEffectManager';
export type { PlaybackFailureInfo } from '@/shared/utils/audio/playbackDiagnostics';

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

  // ブラウザの音声再生制限を解除するためのユーザーアクションを促す
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
    (callback: (() => void | Promise<void>) | null) => {
      manager.setBeforePlay(callback);
    },
    [manager]
  );

  const notifyPlaybackFailure = useCallback((context: string, info?: PlaybackFailureInfo) => {
    playbackFailureHandlerRef.current?.(context, info);
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
