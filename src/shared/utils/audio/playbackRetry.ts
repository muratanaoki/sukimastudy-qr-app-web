import { PlaybackFailureHandler } from './soundEffectManager';

export const DEFAULT_PLAYBACK_AUDIBILITY_DELAY_MS = 280;

const resolveLabel = (label?: string, fallback?: string) => label ?? fallback ?? 'Playback';
const defaultWait = (ms: number) =>
  new Promise<void>((resolve) => {
    if (typeof window !== 'undefined') {
      window.setTimeout(resolve, ms);
    } else {
      setTimeout(resolve, ms);
    }
  });

export type PlaybackAudibilityVerifierOptions = {
  getAudioElement: () => HTMLAudioElement | null;
  delayMs?: number;
  wait?: (ms: number) => Promise<void>;
  thresholdSeconds?: number;
};

export const createPlaybackAudibilityVerifier = ({
  getAudioElement,
  delayMs = DEFAULT_PLAYBACK_AUDIBILITY_DELAY_MS,
  wait = defaultWait,
  thresholdSeconds = 0.02,
}: PlaybackAudibilityVerifierOptions) => {
  return async () => {
    const element = getAudioElement();
    if (!element) {
      return true;
    }

    const initialTime = element.currentTime;
    const initiallyPaused = element.paused;

    await wait(delayMs);

    const refreshed = getAudioElement() ?? element;
    const timeDelta = refreshed.currentTime - initialTime;
    if (!Number.isFinite(timeDelta)) {
      return !refreshed.paused;
    }

    if (!refreshed.paused && timeDelta > thresholdSeconds) {
      return true;
    }

    if (!initiallyPaused && !refreshed.paused) {
      return true;
    }

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
};

export type PlaybackRetrier = (request: PlaybackRequest) => Promise<boolean>;

export const DEFAULT_PLAYBACK_ATTEMPTS = 2;

export const createPlaybackRetrier = ({
  enableAudio,
  notifyPlaybackFailure,
  logger = console,
  defaultAttempts = DEFAULT_PLAYBACK_ATTEMPTS,
}: PlaybackRetrierOptions): PlaybackRetrier => {
  return async ({ play, failureContext, logLabel, attempts, verify }: PlaybackRequest) => {
    try {
      await enableAudio();
    } catch (error) {
      logger.warn('enableAudio failed before playback retry', error);
    }

    const totalAttempts = Math.max(1, attempts ?? defaultAttempts);

    for (let attempt = 0; attempt < totalAttempts; attempt += 1) {
      try {
        const success = await play();
        if (success) {
          if (!verify) {
            return true;
          }

          try {
            const verified = await verify();
            if (verified) {
              return true;
            }
            logger.warn(`Playback verification failed (${resolveLabel(logLabel, failureContext)})`);
          } catch (error) {
            logger.warn(
              `Playback verification threw (${resolveLabel(logLabel, failureContext)})`,
              error
            );
          }
        }
      } catch (error) {
        logger.warn(`Playback attempt threw (${resolveLabel(logLabel, failureContext)})`, error);
      }
    }

    logger.warn(`${resolveLabel(logLabel, failureContext)} sound failed to play`);
    notifyPlaybackFailure(failureContext);
    return false;
  };
};
