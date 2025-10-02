/**
 * `speechSynthesis.speaking` が継続したままになっても待機し過ぎないためのデフォルト上限。
 * iOS Safari では cancel() の完了が遅れるため、ある程度の猶予を与える。
 */
export const DEFAULT_SPEECH_IDLE_TIMEOUT_MS = 400;

export type SpeechIdleOptions = {
  forceCancel?: boolean;
  timeoutMs?: number;
};

/**
 * Web Speech をアイドル状態になるまで待機する非同期関数のインターフェース。
 * 呼び出し元は `forceCancel` を指定して強制終了するか、単に speaking が終わるのを待つかを選べる。
 */
export type SpeechIdleWatcher = (options?: SpeechIdleOptions) => Promise<void>;

export type SpeechIdleWatcherDeps = {
  getSynth: () => SpeechSynthesis | null;
  requestFrame: (callback: FrameRequestCallback) => number;
  cancelFrame: (handle: number) => void;
  setTimeout: (handler: () => void, timeout: number) => number;
  clearTimeout: (handle: number) => void;
};

/**
 * オプションは全部任意なので、未指定の値に対して安全なデフォルトを割り当てる。
 */
const resolveOptions = (options: SpeechIdleOptions | undefined) => ({
  forceCancel: options?.forceCancel ?? false,
  timeoutMs: options?.timeoutMs ?? DEFAULT_SPEECH_IDLE_TIMEOUT_MS,
});

/**
 * `speechSynthesis.speaking` が `false` になるまで requestAnimationFrame 相当で監視する。
 * setTimeout のフォールバックも併用して、フレームイベントが発火しなくても確実に解放できるようにする。
 */
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

/**
 * `SpeechIdleWatcher` の具象実装。SpeechSynthesis が存在しない環境では即座に no-op で返す。
 * speaking 中で無ければそのまま resolve し、必要に応じて cancel() を安全に呼び出してから監視を開始する。
 */
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
