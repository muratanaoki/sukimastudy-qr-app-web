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

  const ensureLoaded = async (): Promise<HTMLAudioElement | null> => {
    if (audio && audio.readyState >= 2) {
      return audio;
    }

    if (!loadPromise) {
      const element = createAudioElement(src, currentVolume);
      loadPromise = waitForReady(element).then((readyAudio) => {
        audio = readyAudio;
        return readyAudio;
      });
    }

    try {
      await loadPromise;
    } catch (error) {
      console.warn('音声読み込み待機中にエラー:', error);
    } finally {
      loadPromise = null;
    }

    return audio;
  };

  const playFromStart = async (options: PlayOptions = {}): Promise<boolean> => {
    const element = await ensureLoaded();
    if (!element) return false;

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

    try {
      if (!element.paused) element.pause();
      element.currentTime = startTime;

      if (shouldFade) {
        fadeController.prime();
      } else if (typeof targetVolume === 'number') {
        element.volume = targetVolume;
      }

      const playPromise = element.play();

      if (shouldFade) {
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
