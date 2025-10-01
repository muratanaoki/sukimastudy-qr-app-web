import type { PlaybackFailureHandler } from './soundEffectManager';

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
};

export type PlaybackRetrier = (request: PlaybackRequest) => Promise<boolean>;

export const DEFAULT_PLAYBACK_ATTEMPTS = 2;

export const createPlaybackRetrier = ({
  enableAudio,
  notifyPlaybackFailure,
  logger = console,
  defaultAttempts = DEFAULT_PLAYBACK_ATTEMPTS,
}: PlaybackRetrierOptions): PlaybackRetrier => {
  return async ({ play, failureContext, logLabel, attempts }: PlaybackRequest) => {
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
          return true;
        }
      } catch (error) {
        logger.warn(`Playback attempt threw (${logLabel ?? failureContext})`, error);
      }
    }

    logger.warn(`${logLabel ?? failureContext} sound failed to play`);
    notifyPlaybackFailure(failureContext);
    return false;
  };
};
