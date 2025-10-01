export const DEFAULT_SPEECH_IDLE_TIMEOUT_MS = 400;

export type SpeechIdleOptions = {
  forceCancel?: boolean;
  timeoutMs?: number;
};

export type SpeechIdleWatcher = (options?: SpeechIdleOptions) => Promise<void>;

export type SpeechIdleWatcherDeps = {
  getSynth: () => SpeechSynthesis | null;
  requestFrame: (callback: FrameRequestCallback) => number;
  cancelFrame: (handle: number) => void;
  setTimeout: (handler: () => void, timeout: number) => number;
  clearTimeout: (handle: number) => void;
};

const resolveOptions = (options: SpeechIdleOptions | undefined) => ({
  forceCancel: options?.forceCancel ?? false,
  timeoutMs: options?.timeoutMs ?? DEFAULT_SPEECH_IDLE_TIMEOUT_MS,
});

const pollSpeechSynthesis = async (
  deps: SpeechIdleWatcherDeps,
  timeoutMs: number
): Promise<void> => {
  await new Promise<void>((resolve) => {
    let frameId: number | null = null;
    let timeoutId: number | null = null;

    const cleanup = () => {
      if (frameId !== null) deps.cancelFrame(frameId);
      if (timeoutId !== null) deps.clearTimeout(timeoutId);
      resolve();
    };

    const tick = () => {
      const synth = deps.getSynth();
      if (!synth || !synth.speaking) {
        cleanup();
        return;
      }
      frameId = deps.requestFrame(tick);
    };

    timeoutId = deps.setTimeout(cleanup, timeoutMs);
    tick();
  });
};

export const createSpeechIdleWatcher = (deps: SpeechIdleWatcherDeps): SpeechIdleWatcher => {
  return async (options?: SpeechIdleOptions) => {
    const synth = deps.getSynth();
    if (!synth) return;

    const { forceCancel, timeoutMs } = resolveOptions(options);

    if (!synth.speaking && !forceCancel) return;

    if (forceCancel) {
      try {
        synth.cancel();
      } catch {
        /* noop */
      }
    }

    if (!synth.speaking) return;

    await pollSpeechSynthesis(deps, timeoutMs);
  };
};
