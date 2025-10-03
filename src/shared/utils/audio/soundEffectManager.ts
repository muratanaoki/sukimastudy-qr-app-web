import { createSoundHandle } from './soundHandle';
import type { PlaybackFailureInfo } from './playbackDiagnostics';
import { ResultTier } from '@/pages/pronouns-test-page/utils/enum';
import batuSound from '@/shared/sounds/batu.mp3';
import highScoreSound from '@/shared/sounds/highScore.mp3';
import lowScoreSound from '@/shared/sounds/lowScore.mp3';
import maruSound from '@/shared/sounds/maru.mp3';
import middleScoreSound from '@/shared/sounds/middleScore.mp3';

export const SOUND_SOURCES = {
  correct: maruSound,
  incorrect: batuSound,
  high: highScoreSound,
  middle: middleScoreSound,
  low: lowScoreSound,
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

// 単一ページで使い回せる効果音マネージャを生成する。
// - 全効果音のプリロードと参照キャッシュを担当
// - `beforePlay` リスナーを挟み込むことで、呼び出し側が再生前に追加処理を差し込める
// - AudioContext 解放状態でも `enable()` が再開できるよう保険をかけている
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

  // 各サウンドの `ensureLoaded()` を一度だけ呼び出してプリロードを済ませる。
  // 失敗してもエラーは握り潰さずログし、以降の再生はハンドル側に委ねる。
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

  // `beforePlay` が指定されている場合は、再生前に await して完了を待つ。
  // 呼び出し側で async 処理を仕込んでもここで例外を握りつぶし、再生処理を継続させる。
  const invokeBeforePlay = async () => {
    if (!beforePlay) return;
    try {
      await beforePlay();
    } catch (error) {
      console.warn('beforePlay handler threw', error);
    }
  };

  // 実際のサウンド再生。ハンドルが欠落していた場合は false を返すことで呼び出し側に通知。
  const play = async (key: SoundKey) => {
    const handle = handles.get(key);
    if (!handle) return false;

    await invokeBeforePlay();
    return handle.playFromStart();
  };

  // ブラウザのオートプレイ制限解除を試みる。
  // 1) 無音再生での解錠を試し、失敗した場合は AudioContext の resume をバックアップに使う。
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

  // 呼び出し側で任意の `beforePlay` 処理を差し込めるよう登録する。
  const setBeforePlay = (listener: BeforePlayListener | null) => {
    beforePlay = listener;
  };

  // ページ離脱などで呼び出し、内部ハンドルを破棄してリソースを開放する。
  const dispose = () => {
    handles.forEach((handle) => {
      handle.cleanup();
    });
    beforePlay = null;
    enabled = false;
    initializedPromise = null;
  };

  const isEnabled = () => enabled;

  // 現在使用中の audio 要素を返し、呼び出し側で巻き取り処理を行えるようにする。
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
