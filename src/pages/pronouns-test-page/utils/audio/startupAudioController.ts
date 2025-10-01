import type { SoundHandle } from '@/shared/utils/audio/soundHandle';

export type StartupAudioController = {
  play: () => Promise<boolean>;
  adoptExistingPlayback: () => boolean;
  stop: () => void;
  dispose: () => void;
};

export type StartupAudioControllerOptions = {
  audioSrc?: string;
  soundHandle?: SoundHandle;
  createAudio?: (src: string) => HTMLAudioElement;
  onFinish: () => void;
};

type PlaybackStrategy = {
  adopt: () => HTMLAudioElement | null;
  play: () => Promise<HTMLAudioElement | null>;
  reset: (audio: HTMLAudioElement | null) => void;
};

const defaultCreateAudio = (src: string) => new Audio(src);

const createSoundHandleStrategy = (soundHandle?: SoundHandle): PlaybackStrategy | null => {
  if (!soundHandle) return null;

  const adopt = () => {
    const audio = soundHandle.getCurrent();
    if (!audio || audio.paused) return null;
    return audio;
  };

  const play = async () => {
    const audio = await soundHandle.ensureLoaded();
    if (!audio) return null;

    const started = await soundHandle.playFromStart();
    if (!started) {
      soundHandle.reset();
      return null;
    }
    return audio;
  };

  const reset = () => {
    soundHandle.reset();
  };

  return { adopt, play, reset };
};

const createDirectAudioStrategy = (
  audioSrc?: string,
  createAudio: (src: string) => HTMLAudioElement = defaultCreateAudio
): PlaybackStrategy | null => {
  if (!audioSrc) return null;

  const reset = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    try {
      audio.pause();
    } catch {
      /* noop */
    }
    audio.currentTime = 0;
    audio.removeAttribute('src');
    audio.load();
  };

  const play = async () => {
    const audio = createAudio(audioSrc);
    audio.preload = 'auto';
    try {
      await audio.play();
      return audio;
    } catch (error) {
      console.warn('Failed to play startup audio', error);
      reset(audio);
      return null;
    }
  };

  return {
    adopt: () => null,
    play,
    reset,
  };
};

const asStrategies = (
  soundHandleStrategy: PlaybackStrategy | null,
  directStrategy: PlaybackStrategy | null
): PlaybackStrategy[] => {
  const strategies: PlaybackStrategy[] = [];
  if (soundHandleStrategy) strategies.push(soundHandleStrategy);
  if (directStrategy) strategies.push(directStrategy);
  return strategies;
};

export const createStartupAudioController = ({
  audioSrc,
  soundHandle,
  createAudio = defaultCreateAudio,
  onFinish,
}: StartupAudioControllerOptions): StartupAudioController => {
  let disposed = false;
  let active: { audio: HTMLAudioElement; strategy: PlaybackStrategy } | null = null;

  const strategies = asStrategies(
    createSoundHandleStrategy(soundHandle),
    createDirectAudioStrategy(audioSrc, createAudio)
  );

  const detachListeners = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.removeEventListener('ended', handleFinished);
    audio.removeEventListener('error', handleFinished);
  };

  const clearActive = ({ reset = true }: { reset?: boolean } = {}) => {
    if (!active) return;
    const { audio, strategy } = active;
    detachListeners(audio);
    if (reset) {
      strategy.reset(audio);
    }
    active = null;
  };

  const handleFinished = () => {
    clearActive();
    onFinish();
  };

  const setActive = (audio: HTMLAudioElement, strategy: PlaybackStrategy) => {
    if (disposed) return;
    if (active) {
      if (active.audio === audio) {
        detachListeners(active.audio);
      } else {
        clearActive();
      }
    }

    active = { audio, strategy };
    audio.addEventListener('ended', handleFinished);
    audio.addEventListener('error', handleFinished);
  };

  const adoptExistingInternal = () => {
    if (disposed) return false;
    for (const strategy of strategies) {
      const audio = strategy.adopt();
      if (!audio) continue;
      setActive(audio, strategy);
      return true;
    }
    return false;
  };

  const play = async (): Promise<boolean> => {
    if (disposed) return false;

    if (adoptExistingInternal()) {
      return true;
    }

    for (const strategy of strategies) {
      const audio = await strategy.play();
      if (disposed) return false;
      if (!audio) continue;
      setActive(audio, strategy);
      return true;
    }

    clearActive();
    return false;
  };

  const adoptExistingPlayback = () => adoptExistingInternal();

  const stop = () => {
    clearActive();
  };

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    clearActive();
  };

  return {
    play,
    adoptExistingPlayback,
    stop,
    dispose,
  };
};
