import { PlaybackFailureHandler } from './soundEffectManager';
import type { PlaybackDiagnostics } from './playbackDiagnostics';

export const DEFAULT_PLAYBACK_AUDIBILITY_DELAY_MS = 650;
export const DEFAULT_PLAYBACK_REVERIFY_DELAY_MS = 420;

const VERIFY_PHASE_INITIAL = 'initial' as const;
const VERIFY_PHASE_POST_REPLAY = 'post-replay' as const;

type VerifyPhase = typeof VERIFY_PHASE_INITIAL | typeof VERIFY_PHASE_POST_REPLAY;

type PlaybackSnapshot = {
  currentTime: number;
  paused: boolean;
};

const resolveLabel = (label?: string, fallback?: string) => label ?? fallback ?? 'Playback';

const defaultWait = (ms: number) =>
  new Promise<void>((resolve) => {
    if (typeof window !== 'undefined') {
      window.setTimeout(resolve, ms);
    } else {
      setTimeout(resolve, ms);
    }
  });

const takeSnapshot = (element: HTMLAudioElement): PlaybackSnapshot => ({
  currentTime: element.currentTime,
  paused: element.paused,
});

const computeAudibility = (
  baseline: PlaybackSnapshot,
  sample: PlaybackSnapshot,
  thresholdSeconds: number
) => {
  const timeDelta = sample.currentTime - baseline.currentTime;
  const audible = !Number.isFinite(timeDelta)
    ? !sample.paused
    : (!sample.paused && timeDelta > thresholdSeconds) || (!baseline.paused && !sample.paused);

  return { audible, timeDelta };
};

const recordVerifyCompleted = (
  diagnostics: PlaybackDiagnostics | undefined,
  phase: VerifyPhase,
  waitMs: number,
  baseline: PlaybackSnapshot,
  sample: PlaybackSnapshot,
  result: boolean,
  timeDelta: number
) => {
  diagnostics?.record('verify:completed', {
    phase,
    waitMs,
    timeDelta,
    paused: sample.paused,
    baselinePaused: baseline.paused,
    result,
  });
};

type EvaluatePhaseParams = {
  phase: VerifyPhase;
  waitMs: number;
  baseline: PlaybackSnapshot;
  getAudioElement: () => HTMLAudioElement | null;
  fallbackElement: HTMLAudioElement;
  thresholdSeconds: number;
  wait: (ms: number) => Promise<void>;
  diagnostics?: PlaybackDiagnostics;
};

const evaluatePhase = async ({
  phase,
  waitMs,
  baseline,
  getAudioElement,
  fallbackElement,
  thresholdSeconds,
  wait,
  diagnostics,
}: EvaluatePhaseParams) => {
  await wait(waitMs);

  const element = getAudioElement() ?? fallbackElement;
  const sample = takeSnapshot(element);
  const { audible, timeDelta } = computeAudibility(baseline, sample, thresholdSeconds);
  recordVerifyCompleted(diagnostics, phase, waitMs, baseline, sample, audible, timeDelta);

  return {
    element,
    sample,
    timeDelta,
    audible,
  };
};

type ReplayAttemptContext = {
  element: HTMLAudioElement;
  diagnostics?: PlaybackDiagnostics;
};

const attemptReplay = async ({ element, diagnostics }: ReplayAttemptContext) => {
  if (typeof element.play !== 'function') {
    diagnostics?.record('verify:replay:unavailable');
    return { triggered: false } as const;
  }

  diagnostics?.record('verify:replay:play-called', {
    readyState: element.readyState,
    paused: element.paused,
    currentTime: element.currentTime,
  });

  let triggered = false;
  try {
    triggered = true;
    const playResult = element.play();
    if (playResult && typeof playResult.then === 'function') {
      await playResult;
      diagnostics?.record('verify:replay:play-resolved', {
        paused: element.paused,
        currentTime: element.currentTime,
      });
    }
  } catch (error) {
    diagnostics?.record('verify:replay:play-error', {
      message: error instanceof Error ? error.message : String(error),
    });
  }

  return { triggered } as const;
};

export type PlaybackAudibilityVerifierOptions = {
  getAudioElement: () => HTMLAudioElement | null;
  delayMs?: number;
  wait?: (ms: number) => Promise<void>;
  thresholdSeconds?: number;
  diagnostics?: PlaybackDiagnostics;
  reverifyDelayMs?: number;
};

export const createPlaybackAudibilityVerifier = ({
  getAudioElement,
  delayMs = DEFAULT_PLAYBACK_AUDIBILITY_DELAY_MS,
  wait = defaultWait,
  thresholdSeconds = 0.02,
  diagnostics,
  reverifyDelayMs,
}: PlaybackAudibilityVerifierOptions) => {
  return async () => {
    const element = getAudioElement();
    diagnostics?.record('verify:start', {
      hasElement: Boolean(element),
      delayMs,
      thresholdSeconds,
      reverifyDelayMs,
    });

    if (!element) {
      diagnostics?.record('verify:skipped', { reason: 'missing-element' });
      return true;
    }

    const baseline = takeSnapshot(element);
    const initial = await evaluatePhase({
      phase: VERIFY_PHASE_INITIAL,
      waitMs: delayMs,
      baseline,
      getAudioElement,
      fallbackElement: element,
      thresholdSeconds,
      wait,
      diagnostics,
    });

    if (initial.audible) {
      return true;
    }

    diagnostics?.record('verify:replay:attempt', {
      paused: initial.sample.paused,
      timeDelta: initial.timeDelta,
    });

    const { triggered } = await attemptReplay({ element: initial.element, diagnostics });
    if (!triggered) {
      diagnostics?.record('verify:replay:not-triggered');
    }

    const secondaryDelayMs =
      reverifyDelayMs ?? Math.max(delayMs, DEFAULT_PLAYBACK_REVERIFY_DELAY_MS);
    const postReplayBaseline = takeSnapshot(initial.element);
    const postReplay = await evaluatePhase({
      phase: VERIFY_PHASE_POST_REPLAY,
      waitMs: secondaryDelayMs,
      baseline: postReplayBaseline,
      getAudioElement,
      fallbackElement: initial.element,
      thresholdSeconds,
      wait,
      diagnostics,
    });

    if (postReplay.audible) {
      return true;
    }

    diagnostics?.record('verify:replay:failed', {
      paused: postReplay.sample.paused,
      timeDelta: postReplay.timeDelta,
    });

    return false;
  };
};

export type EnableAudioFn = () => Promise<boolean>;
export type PlaybackAttempt = () => Promise<boolean>;

export type PlaybackRetrierLogger = Pick<Console, 'warn'>;

export type PlaybackRetrierOptions = {
  enableAudio: EnableAudioFn;
  notifyPlaybackFailure: PlaybackFailureHandler;
  logger?: PlaybackRetrierLogger;
  defaultAttempts?: number;
};

export type PlaybackRequest = {
  play: PlaybackAttempt;
  failureContext: string;
  logLabel?: string;
  attempts?: number;
  verify?: () => Promise<boolean>;
  diagnostics?: PlaybackDiagnostics;
};

export type PlaybackRetrier = (request: PlaybackRequest) => Promise<boolean>;

export const DEFAULT_PLAYBACK_ATTEMPTS = 2;

const ensureAudioEnabled = async (
  enableAudio: EnableAudioFn,
  diagnostics: PlaybackDiagnostics | undefined,
  logger: PlaybackRetrierLogger
) => {
  try {
    await enableAudio();
    diagnostics?.record('retry:audio-enabled');
  } catch (error) {
    diagnostics?.record('retry:audio-enable-error', {
      message: error instanceof Error ? error.message : String(error),
    });
    logger.warn('enableAudio failed before playback retry', error);
  }
};

type PlaybackAttemptContext = {
  attemptNumber: number;
  totalAttempts: number;
  play: PlaybackAttempt;
  verify?: () => Promise<boolean>;
  diagnostics?: PlaybackDiagnostics;
  logger: PlaybackRetrierLogger;
  label: string;
};

const performPlaybackAttempt = async ({
  attemptNumber,
  totalAttempts,
  play,
  verify,
  diagnostics,
  logger,
  label,
}: PlaybackAttemptContext) => {
  diagnostics?.record('attempt:start', { attempt: attemptNumber, totalAttempts });

  let playSucceeded = false;
  try {
    playSucceeded = await play();
    diagnostics?.record('attempt:result', { attempt: attemptNumber, success: playSucceeded });
  } catch (error) {
    diagnostics?.record('attempt:error', {
      attempt: attemptNumber,
      message: error instanceof Error ? error.message : String(error),
    });
    logger.warn(`Playback attempt threw (${label})`, error);
    return false;
  }

  if (!playSucceeded) {
    return false;
  }

  if (!verify) {
    diagnostics?.record('retry:completed', { attempt: attemptNumber, verified: true });
    return true;
  }

  try {
    const verified = await verify();
    diagnostics?.record('verify:result', { attempt: attemptNumber, verified });
    if (verified) {
      diagnostics?.record('retry:completed', { attempt: attemptNumber, verified: true });
      return true;
    }

    logger.warn(`Playback verification failed (${label})`);
  } catch (error) {
    diagnostics?.record('verify:error', {
      attempt: attemptNumber,
      message: error instanceof Error ? error.message : String(error),
    });
    logger.warn(`Playback verification threw (${label})`, error);
  }

  return false;
};

export const createPlaybackRetrier = ({
  enableAudio,
  notifyPlaybackFailure,
  logger = console,
  defaultAttempts = DEFAULT_PLAYBACK_ATTEMPTS,
}: PlaybackRetrierOptions): PlaybackRetrier => {
  return async ({
    play,
    failureContext,
    logLabel,
    attempts,
    verify,
    diagnostics,
  }: PlaybackRequest) => {
    const label = resolveLabel(logLabel, failureContext);

    diagnostics?.record('retry:start', { label, requestedAttempts: attempts, defaultAttempts });
    await ensureAudioEnabled(enableAudio, diagnostics, logger);

    const totalAttempts = Math.max(1, attempts ?? defaultAttempts);
    for (let attemptNumber = 1; attemptNumber <= totalAttempts; attemptNumber += 1) {
      const succeeded = await performPlaybackAttempt({
        attemptNumber,
        totalAttempts,
        play,
        verify,
        diagnostics,
        logger,
        label,
      });

      if (succeeded) {
        return true;
      }
    }

    diagnostics?.record('retry:exhausted', { totalAttempts });
    logger.warn(`${label} sound failed to play`);

    const report = diagnostics?.report({ attempts: totalAttempts, success: false });
    notifyPlaybackFailure(failureContext, report);
    return false;
  };
};
