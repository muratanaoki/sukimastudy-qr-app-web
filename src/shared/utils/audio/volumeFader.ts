export type VolumeFadeScheduler = {
  now: () => number;
  requestAnimationFrame: (callback: FrameRequestCallback) => number;
  cancelAnimationFrame: (handle: number) => void;
};

export type VolumeFadeController = {
  enabled: boolean;
  prime: () => void;
  start: () => void;
  cancel: () => void;
};

type CreateVolumeFadeControllerParams = {
  audio: HTMLAudioElement;
  targetVolume: number;
  durationMs: number;
  scheduler?: VolumeFadeScheduler | null;
  startVolume?: number;
};

const noopController: VolumeFadeController = {
  enabled: false,
  prime: () => {
    /* noop */
  },
  start: () => {
    /* noop */
  },
  cancel: () => {
    /* noop */
  },
};

const getDefaultScheduler = (): VolumeFadeScheduler | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const { requestAnimationFrame, cancelAnimationFrame } = window;
  if (typeof requestAnimationFrame !== 'function' || typeof cancelAnimationFrame !== 'function') {
    return null;
  }

  const now =
    typeof performance !== 'undefined' && typeof performance.now === 'function'
      ? () => performance.now()
      : () => Date.now();

  return {
    now,
    requestAnimationFrame: (callback) => requestAnimationFrame(callback),
    cancelAnimationFrame: (handle) => cancelAnimationFrame(handle),
  };
};

export const createVolumeFadeController = ({
  audio,
  targetVolume,
  durationMs,
  scheduler = getDefaultScheduler(),
  startVolume = 0,
}: CreateVolumeFadeControllerParams): VolumeFadeController => {
  if (!scheduler || durationMs <= 0 || !Number.isFinite(durationMs)) {
    return noopController;
  }

  if (!(targetVolume > 0)) {
    return noopController;
  }

  let frameId: number | null = null;

  const cancel = () => {
    if (frameId !== null) {
      scheduler.cancelAnimationFrame(frameId);
      frameId = null;
    }
    audio.volume = targetVolume;
  };

  const start = () => {
    if (frameId !== null) {
      scheduler.cancelAnimationFrame(frameId);
      frameId = null;
    }

    const startedAt = scheduler.now();
    const delta = targetVolume - startVolume;

    const step = (timestamp: number) => {
      const elapsed = timestamp - startedAt;
      const progress = Math.min(Math.max(elapsed / durationMs, 0), 1);
      audio.volume = startVolume + delta * progress;

      if (progress < 1) {
        frameId = scheduler.requestAnimationFrame(step);
      } else {
        frameId = null;
      }
    };

    frameId = scheduler.requestAnimationFrame(step);
  };

  const prime = () => {
    if (frameId !== null) {
      scheduler.cancelAnimationFrame(frameId);
      frameId = null;
    }
    audio.volume = startVolume;
  };

  return {
    enabled: true,
    prime,
    start,
    cancel,
  };
};
