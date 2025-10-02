import { createSoundHandle } from './soundHandle';
import type { PlaybackFailureInfo } from './playbackDiagnostics';
import { ResultTier } from '@/pages/pronouns-test-page/utils/enum';

export const SOUND_SOURCES = {
  correct: '/sounds/maru.mp3',
  incorrect: '/sounds/batu.mp3',
  high: '/sounds/highScore.mp3',
  middle: '/sounds/middleScore.mp3',
  low: '/sounds/lowScore.mp3',
} as const;

export type SoundKey = keyof typeof SOUND_SOURCES;

export const RESULT_TIER_TO_SOUND_KEY: Record<ResultTier, SoundKey> = {
  [ResultTier.Perfect]: 'high',
  [ResultTier.Great]: 'middle',
  [ResultTier.Nice]: 'low',
};

const SOUND_KEYS = Object.keys(SOUND_SOURCES) as SoundKey[];

export type PlaybackFailureHandler = (context: string, info?: PlaybackFailureInfo) => void;

type BeforePlayListener = () => void | Promise<void>;

type AlertCapableWindow = Pick<Window, 'alert'>;

export const createAlertPlaybackFailureHandler = (
  targetWindow?: AlertCapableWindow | null
): PlaybackFailureHandler => {
  const resolvedWindow =
    targetWindow ?? (typeof window !== 'undefined' ? (window as AlertCapableWindow) : undefined);

  return (context: string, info?: PlaybackFailureInfo) => {
    if (info) {
      const groupLabel = `[SoundEffects] Playback failure: ${info.label}`;
      if (typeof console.groupCollapsed === 'function') {
        console.groupCollapsed(groupLabel);
        console.log(info);
        console.log(info.text);
        console.groupEnd();
      } else {
        console.warn(groupLabel, info);
      }
    }

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
  getAudioElement: (key: SoundKey) => HTMLAudioElement | null;
};

type SoundEffectManagerOptions = {
  soundSources?: typeof SOUND_SOURCES;
  createHandle?: typeof createSoundHandle;
  unlockAudioContext?: () => Promise<boolean>;
};

const defaultUnlockAudioContext = async (): Promise<boolean> => {
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
  unlockAudioContext = defaultUnlockAudioContext,
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

  const invokeBeforePlay = async () => {
    if (!beforePlay) return;
    try {
      await beforePlay();
    } catch (error) {
      console.warn('beforePlay handler threw', error);
    }
  };

  const play = async (key: SoundKey) => {
    const handle = handles.get(key);
    if (!handle) return false;

    await invokeBeforePlay();
    return handle.playFromStart();
  };

  const enable = async () => {
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

    const unlocked = await unlockAudioContext();
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

  const getAudioElement = (key: SoundKey) => {
    const handle = handles.get(key);
    if (!handle) return null;
    return handle.getCurrent();
  };

  return {
    ensureInitialized,
    enable,
    play,
    setBeforePlay,
    dispose,
    isEnabled,
    getAudioElement,
  };
};
