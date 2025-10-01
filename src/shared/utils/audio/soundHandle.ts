import { createVolumeFadeController } from './volumeFader';

export type PlayOptions = {
  volume?: number;
  startTime?: number;
  fadeInDurationMs?: number;
};

export type SoundHandle = {
  readonly src: string;
  ensureLoaded: () => Promise<HTMLAudioElement | null>;
  playFromStart: (options?: PlayOptions) => Promise<boolean>;
  reset: () => void;
  cleanup: () => void;
  getCurrent: () => HTMLAudioElement | null;
  setVolume: (volume: number) => void;
  getVolume: () => number;
};

const createAudioElement = (src: string, volume: number): HTMLAudioElement => {
  const audio = new Audio();
  audio.volume = volume;
  audio.preload = 'auto';
  audio.src = src;
  audio.load();
  return audio;
};

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

type SoundHandleDependencies = {
  createFadeController?: typeof createVolumeFadeController;
};

export const createSoundHandle = (
  src: string,
  initialVolume = 0.5,
  dependencies: SoundHandleDependencies = {}
): SoundHandle => {
  const { createFadeController = createVolumeFadeController } = dependencies;
  let audio: HTMLAudioElement | null = null;
  let currentVolume = initialVolume;
  let loadPromise: Promise<HTMLAudioElement> | null = null;

  // Audio 要素を lazily 生成し、同一インスタンスを再利用する。
  const ensureAudioElement = (): HTMLAudioElement => {
    if (!audio) {
      audio = createAudioElement(src, currentVolume);
    }
    return audio;
  };

  // canplay が発火するまでのプリロードを並列で進める。
  const primeLoad = () => {
    const element = ensureAudioElement();
    if (element.readyState >= 2) {
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

  const ensureLoaded = async (): Promise<HTMLAudioElement | null> => {
    const element = ensureAudioElement();
    if (element.readyState >= 2) {
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

  const playFromStart = async (options: PlayOptions = {}): Promise<boolean> => {
    const element = ensureAudioElement();
    if (!element) return false;

    if (element.readyState < 2) {
      primeLoad();
    }

    const previousVolume = element.volume;
    const { volume, startTime = 0, fadeInDurationMs } = options;
    const targetVolume = volume ?? previousVolume;
    const fadeDuration = typeof fadeInDurationMs === 'number' ? fadeInDurationMs : 0;
    const fadeController = createFadeController({
      audio: element,
      targetVolume,
      durationMs: fadeDuration,
    });
    const shouldFade = fadeController.enabled;

    if (!element.paused) {
      element.pause();
    }

    let seekScheduled = false;
    try {
      element.currentTime = startTime;
    } catch {
      seekScheduled = true;
    }

    if (shouldFade) {
      fadeController.prime();
    } else if (typeof targetVolume === 'number') {
      element.volume = targetVolume;
    }

    const handleCanPlay = () => {
      if (seekScheduled) {
        try {
          element.currentTime = startTime;
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

      if (element.readyState >= 2) {
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

      if (!shouldFade && typeof volume === 'number') {
        element.volume = previousVolume;
      } else if (shouldFade && typeof volume === 'number') {
        fadeController.cancel();
        element.volume = previousVolume;
      }
    }
  };

  const reset = () => {
    if (!audio) return;
    try {
      audio.pause();
    } catch {
      /* noop */
    }
    audio.currentTime = 0;
  };

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
