import { createVolumeFadeController } from './volumeFader';

/**
 * 単一音声ソースの再生・フェード・ボリューム操作を抽象化するハンドル。
 * - Web Audio API を優先し、利用できない環境では HTMLAudioElement をフォールバック利用。
 */

export type PlayOptions = {
  volume?: number;
  startTime?: number;
  fadeInDurationMs?: number;
};

export type SoundHandle = {
  /**
   * このハンドルが参照する音源の URL。UI で識別したい場合に読み取り専用で参照する。
   */
  readonly src: string;
  /**
   * 呼び出し側: サウンドマネージャやプリロード処理。
   * 役割: 初回再生前にロード／デコードを済ませ、次回以降の遅延を減らす。
   * 成功時: HTMLAudio を返す（Web Audio 時は null）。失敗時は例外を投げずに null を返し、フォールバックに委ねる。
   */
  ensureLoaded: () => Promise<HTMLAudioElement | null>;
  /**
   * 呼び出し側: 実際に効果音を鳴らす箇所（例: ボタン押下や結果表示）。
   * 役割: 音源を頭出しし、フェードや音量指定を反映してから再生する。
   * 再生がブロックされた場合は false を返す。
   */
  playFromStart: (options?: PlayOptions) => Promise<boolean>;
  /**
   * 呼び出し側: シーン遷移やダイアログ終了など「音を止めたい」タイミング。
   * 役割: 進行中の再生やフェードを止め、再生位置を冒頭に戻す。戻り値はなく、失敗時も例外を投げない。
   */
  reset: () => void;
  /**
   * 呼び出し側: コンポーネント破棄時や音源差し替え時のクリーンアップ。
   * 役割: 内部リソース（AudioBuffer/HTMLAudio）を解放し、次回利用時は再ロードが走る。
   */
  cleanup: () => void;
  /**
   * 呼び出し側: HTMLAudio 専用の追加制御（例: 既存要素への直接アクセス）。
   * 役割: 実際の HTMLAudioElement を取得する。Web Audio では常に null。
   */
  getCurrent: () => HTMLAudioElement | null;
  /**
   * 呼び出し側: ユーザー設定やサウンドテストでボリュームを変更する UI。
   * 役割: 内部に現在音量を保持しつつ、再生中であれば即座に音量を反映。失敗時も例外を投げずに黙って無視。
   */
  setVolume: (volume: number) => void;
  /**
   * 呼び出し側: 設定 UI などで現在の音量を参照する場合。
   * 役割: Web Audio では内部にキャッシュしている値、HTMLAudio では要素実値を返す。
   */
  getVolume: () => number;
};

const READY_STATE_CAN_PLAY = 2; // HTMLMediaElement.HAVE_CURRENT_DATA
const BUFFER_START_EPSILON = 0.001;
const DEFAULT_VOLUME = 0.5;

type NormalizedPlayOptions = {
  startTime: number;
  fadeInDurationMs: number;
  volume?: number;
};

type SoundHandleDependencies = {
  createFadeController?: typeof createVolumeFadeController;
  getAudioContext?: () => AudioContext | null;
  createHtmlAudio?: (src: string, initialVolume: number) => HTMLAudioElement;
  fetchAudioBuffer?: (src: string) => Promise<ArrayBuffer>;
};

// オプション値を正規化し、欠けているパラメータには再生可能なデフォルト値を割り当てる。
const normalizePlayOptions = (options?: PlayOptions): NormalizedPlayOptions => {
  return {
    startTime: Math.max(options?.startTime ?? 0, 0),
    fadeInDurationMs: Math.max(options?.fadeInDurationMs ?? 0, 0),
    volume: options?.volume,
  };
};

// HTMLAudioElement を生成して src と初期ボリュームをセットし、事前に load して利用準備を整える。
const defaultCreateHtmlAudio = (src: string, volume: number): HTMLAudioElement => {
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = src;
  audio.volume = volume;
  audio.load();
  return audio;
};

// canplaythrough まで待機し、再生可能な状態になったら resolve する。エラー時も resolve してフォールバックを継続する。
const waitForReady = (audio: HTMLAudioElement): Promise<HTMLAudioElement> => {
  return new Promise<HTMLAudioElement>((resolve) => {
    const cleanup = () => {
      audio.removeEventListener('canplaythrough', handleReady);
      audio.removeEventListener('error', handleError);
    };

    const handleReady = () => {
      cleanup();
      resolve(audio);
    };

    const handleError = (event: Event) => {
      cleanup();
      console.warn(`音声読み込みエラー: ${audio.src}`, event);
      resolve(audio);
    };

    audio.addEventListener('canplaythrough', handleReady);
    audio.addEventListener('error', handleError);
  });
};

// Safari などで decodeAudioData が promise と callback の二形態を取るため、両方を吸収して待ち合わせする。
const decodeAudioDataWithFallback = (
  context: AudioContext,
  data: ArrayBuffer
): Promise<AudioBuffer> => {
  return new Promise<AudioBuffer>((resolve, reject) => {
    const promise = context.decodeAudioData(data, resolve, reject);
    if (promise) {
      promise.then(resolve).catch(reject);
    }
  });
};

// Web Audio 用にバイナリ取得して AudioBuffer 化するための ArrayBuffer を返す。
const defaultFetchAudioBuffer = async (src: string): Promise<ArrayBuffer> => {
  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`Failed to fetch audio: ${response.status}`);
  }
  return response.arrayBuffer();
};

let sharedAudioContext: AudioContext | null = null;

type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

// 共通 AudioContext を lazily 生成し、ブラウザが Web Audio をサポートしない場合は null を返す。
const getDefaultAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const audioWindow = window as AudioWindow;
  const AudioContextCtor = audioWindow.AudioContext ?? audioWindow.webkitAudioContext;
  if (!AudioContextCtor) {
    return null;
  }

  if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
    sharedAudioContext = new AudioContextCtor();
  }

  return sharedAudioContext;
};

// iOS などで resume が失敗するケースを考慮し、例外を握りつぶして続行する。
const safeResumeContext = async (context: AudioContext) => {
  try {
    await context.resume();
  } catch (error) {
    console.warn('AudioContext resume failed', error);
  }
};

// HTMLAudioElement ベースのサウンドハンドル。Web Audio が使えない環境向けのフォールバック実装。
const createHtmlAudioSoundHandle = (
  src: string,
  initialVolume: number,
  dependencies: SoundHandleDependencies
): SoundHandle => {
  const {
    createFadeController = createVolumeFadeController,
    createHtmlAudio = defaultCreateHtmlAudio,
  } = dependencies;

  let audio: HTMLAudioElement | null = null;
  let currentVolume = initialVolume;
  let loadPromise: Promise<HTMLAudioElement> | null = null;

  // シングルトン的に HTMLAudioElement を生成・保持し、以降の処理で共有する。
  const ensureAudioElement = (): HTMLAudioElement => {
    if (!audio) {
      audio = createHtmlAudio(src, currentVolume);
    }
    return audio;
  };

  // 再生前に canplaythrough までのロードを Prime し、待機中は Promise を共有して重複ロードを避ける。
  const primeLoad = () => {
    const element = ensureAudioElement();
    if (element.readyState >= READY_STATE_CAN_PLAY) {
      return null;
    }

    if (!loadPromise) {
      loadPromise = waitForReady(element)
        .then((readyAudio) => {
          audio = readyAudio;
          return readyAudio;
        })
        .catch((error) => {
          console.warn('音声読み込み待機中にエラー:', error);
          return element;
        })
        .finally(() => {
          loadPromise = null;
        });
    }

    return loadPromise;
  };

  // 外部から明示的にロードを要求された場合に利用。成功すれば HTMLAudioElement を返す。
  const ensureLoaded = async (): Promise<HTMLAudioElement | null> => {
    const element = ensureAudioElement();
    if (element.readyState >= READY_STATE_CAN_PLAY) {
      return element;
    }

    const promise = primeLoad();
    if (!promise) {
      return element;
    }

    try {
      await promise;
    } catch (error) {
      console.warn('音声読み込み待機中にエラー:', error);
    }

    return audio;
  };

  // HTMLAudioElement の状態を初期化し、必要ならフェードインやシークをセットしてから再生する。
  const playFromStart = async (options: PlayOptions = {}): Promise<boolean> => {
    const element = ensureAudioElement();
    if (!element) return false;

    if (element.readyState < READY_STATE_CAN_PLAY) {
      primeLoad();
    }

    const normalized = normalizePlayOptions(options);
    const previousVolume = element.volume;
    const targetVolume = normalized.volume ?? previousVolume;
    const fadeController = createFadeController({
      audio: element,
      targetVolume,
      durationMs: normalized.fadeInDurationMs,
    });
    const shouldFade = fadeController.enabled;
    // 既に再生中なら pause してから currentTime を戻す。
    if (!element.paused) {
      element.pause();
    }

    let seekScheduled = false;
    try {
      element.currentTime = normalized.startTime;
    } catch {
      seekScheduled = true;
    }

    if (shouldFade) {
      fadeController.prime();
    } else if (typeof targetVolume === 'number') {
      element.volume = targetVolume;
    }

    // ブラウザによっては currentTime セットやフェード開始が canplay 後でないと失敗するため、イベントにぶら下げる。
    const handleCanPlay = () => {
      if (seekScheduled) {
        try {
          element.currentTime = normalized.startTime;
        } catch {
          /* seek失敗時は諦める */
        }
      }

      if (shouldFade) {
        fadeController.start();
      }

      element.removeEventListener('canplay', handleCanPlay);
      element.removeEventListener('canplaythrough', handleCanPlay);
    };

    if (seekScheduled || shouldFade) {
      element.addEventListener('canplay', handleCanPlay);
      element.addEventListener('canplaythrough', handleCanPlay);

      if (element.readyState >= READY_STATE_CAN_PLAY) {
        handleCanPlay();
      }
    }

    try {
      const playPromise = element.play();

      if (!seekScheduled && shouldFade) {
        fadeController.start();
      }

      await playPromise;
      return true;
    } catch (error) {
      if (shouldFade) {
        fadeController.cancel();
        element.volume = previousVolume;
      }
      console.warn('音声再生エラー:', error);
      return false;
    } finally {
      element.removeEventListener('canplay', handleCanPlay);
      element.removeEventListener('canplaythrough', handleCanPlay);

      if (!shouldFade && typeof normalized.volume === 'number') {
        element.volume = previousVolume;
      } else if (shouldFade && typeof normalized.volume === 'number') {
        fadeController.cancel();
        element.volume = previousVolume;
      }
    }
  };

  // 再生中なら停止し、再生位置を頭に戻す。
  const reset = () => {
    if (!audio) return;
    try {
      audio.pause();
    } catch {
      /* noop */
    }
    audio.currentTime = 0;
  };

  // src を解除して GC 可能な状態に戻す。次回再生時には再ロードが走る。
  const cleanup = () => {
    if (!audio) return;
    try {
      audio.pause();
    } catch {
      /* noop */
    }
    audio.removeAttribute('src');
    audio.load();
    audio = null;
  };

  const getCurrent = () => audio;

  // 音量設定を保存しつつ、インスタンス化済みの audio にも即時反映する。
  const setVolume = (volume: number) => {
    currentVolume = volume;
    if (audio) {
      audio.volume = volume;
    }
  };

  const getVolume = () => {
    if (audio) {
      return audio.volume;
    }
    return currentVolume;
  };

  return {
    src,
    ensureLoaded,
    playFromStart,
    reset,
    cleanup,
    getCurrent,
    setVolume,
    getVolume,
  };
};

// Web Audio API ベースのサウンドハンドル。低遅延の AudioBuffer 再生とフェード制御を提供する。
const createWebAudioSoundHandle = (
  src: string,
  initialVolume: number,
  dependencies: SoundHandleDependencies
): SoundHandle | null => {
  const { getAudioContext, fetchAudioBuffer = defaultFetchAudioBuffer } = dependencies;

  const context = getAudioContext?.() ?? getDefaultAudioContext();
  if (!context || context.state === 'closed') {
    return null;
  }

  let currentVolume = initialVolume;
  let buffer: AudioBuffer | null = null;
  let loadPromise: Promise<AudioBuffer | null> | null = null;
  const gainNode = context.createGain();
  let gainConnected = false;
  gainNode.gain.value = currentVolume;

  // ガインノードは再生開始時に Destination へ接続する。複数回接続を避けるためフラグ管理する。
  const ensureGainConnected = () => {
    if (!gainConnected) {
      gainNode.connect(context.destination);
      gainConnected = true;
    }
  };

  let currentSource: AudioBufferSourceNode | null = null;

  // 同時再生を避けるため、既存の BufferSource を停止・切断する。
  const stopCurrentSource = () => {
    if (!currentSource) return;
    try {
      currentSource.stop();
    } catch {
      /* noop */
    }
    currentSource.disconnect();
    currentSource = null;
  };

  // 初回再生時に AudioBuffer を decode し、それ以降はキャッシュを再利用する。
  const ensureLoaded = async (): Promise<HTMLAudioElement | null> => {
    if (buffer) {
      return null;
    }

    if (!loadPromise) {
      loadPromise = (async () => {
        try {
          await safeResumeContext(context);
          const arrayBuffer = await fetchAudioBuffer(src);
          buffer = await decodeAudioDataWithFallback(context, arrayBuffer);
          return buffer;
        } catch (error) {
          console.warn('Web Audio 読み込みエラー:', error);
          buffer = null;
          return null;
        } finally {
          loadPromise = null;
        }
      })();
    }

    await loadPromise;
    return null;
  };

  // AudioBufferSourceNode を都度生成し、フェード・シークを設定してから start する。
  const playFromStart = async (options: PlayOptions = {}): Promise<boolean> => {
    const normalized = normalizePlayOptions(options);

    try {
      await ensureLoaded();
      if (!buffer) {
        throw new Error('AudioBuffer が初期化されていません');
      }

      await safeResumeContext(context);
      ensureGainConnected();
      stopCurrentSource();

      // BufferSource は使い捨てなので毎回生成し、再生後に onended で後片付けする。
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(gainNode);
      currentSource = source;

      const currentTime = context.currentTime;
      gainNode.gain.cancelScheduledValues(currentTime);

      const targetVolume =
        typeof normalized.volume === 'number' ? normalized.volume : currentVolume;
      const baseVolume = currentVolume;

      if (normalized.fadeInDurationMs > 0) {
        const fadeEnd = currentTime + normalized.fadeInDurationMs / 1000;
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(targetVolume, fadeEnd);
      } else {
        gainNode.gain.setValueAtTime(targetVolume, currentTime);
      }

      // startTime が duration を超えると例外になるため、末尾からわずかに余白を引いた値で clamp する。
      const maxStart = Math.max(buffer.duration - BUFFER_START_EPSILON, 0);
      const clampedStart = Math.min(Math.max(normalized.startTime, 0), maxStart);
      source.start(currentTime, clampedStart);

      source.onended = () => {
        currentSource = null;
        const endTime = context.currentTime;
        gainNode.gain.cancelScheduledValues(endTime);
        const restoreVolume = typeof normalized.volume === 'number' ? baseVolume : currentVolume;
        gainNode.gain.setValueAtTime(restoreVolume, Math.max(endTime, context.currentTime));
      };

      if (typeof normalized.volume !== 'number') {
        currentVolume = targetVolume;
      }

      return true;
    } catch (error) {
      console.warn('Web Audio 再生エラー:', error);
      stopCurrentSource();
      return false;
    }
  };

  // フェード予約をキャンセルし、現在のボリューム値だけ保持したまま停止する。
  const reset = () => {
    stopCurrentSource();
    const currentTime = context.currentTime;
    gainNode.gain.cancelScheduledValues(currentTime);
    gainNode.gain.setValueAtTime(currentVolume, currentTime);
  };

  // 参照を切って GC 可能にしつつ、ガインノードの接続も解除する。
  const cleanup = () => {
    stopCurrentSource();
    if (gainConnected) {
      gainNode.disconnect();
      gainConnected = false;
    }
    buffer = null;
  };

  const getCurrent = () => null;

  // ガイン値を即時更新し、以後の再生でも同じ音量がスタートポイントになる。
  const setVolume = (volumeValue: number) => {
    currentVolume = volumeValue;
    ensureGainConnected();
    const currentTime = context.currentTime;
    gainNode.gain.cancelScheduledValues(currentTime);
    gainNode.gain.setValueAtTime(volumeValue, currentTime);
  };

  const getVolume = () => currentVolume;

  return {
    src,
    ensureLoaded,
    playFromStart,
    reset,
    cleanup,
    getCurrent,
    setVolume,
    getVolume,
  };
};

// エントリーポイント。Web Audio が利用可能ならそちらを優先し、不可なら HTMLAudio ハンドルを返す。
export const createSoundHandle = (
  src: string,
  initialVolume = DEFAULT_VOLUME,
  dependencies: SoundHandleDependencies = {}
): SoundHandle => {
  const webAudioHandle = createWebAudioSoundHandle(src, initialVolume, dependencies);
  if (webAudioHandle) {
    return webAudioHandle;
  }

  return createHtmlAudioSoundHandle(src, initialVolume, dependencies);
};
