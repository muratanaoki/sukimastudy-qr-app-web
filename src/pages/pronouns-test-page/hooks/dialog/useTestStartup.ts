import { useCallback, useEffect, useRef, useState } from 'react';
import type { SoundHandle } from '@/shared/utils/audio/soundHandle';
import {
  createStartupAudioController,
  type StartupAudioController,
  type StartupAudioControllerOptions,
} from '../../utils/audio/startupAudioController';
import { STARTUP_AUDIO_FADE_MS } from '../../utils/constants/audio';

type Params = {
  open: boolean;
  audioSrc?: string;
  onComplete?: () => void;
  createAudio?: (src: string) => HTMLAudioElement;
  soundHandle?: SoundHandle;
  startupAudioPreplayed?: boolean;
  controllerFactory?: (options: StartupAudioControllerOptions) => StartupAudioController;
};

type UseTestStartupResult = {
  isStartupComplete: boolean;
};

const defaultCreateAudio = (src: string) => new Audio(src);
const defaultControllerFactory = createStartupAudioController;

export const useTestStartup = ({
  open,
  audioSrc,
  onComplete,
  createAudio = defaultCreateAudio,
  soundHandle,
  startupAudioPreplayed = false,
  controllerFactory = defaultControllerFactory,
}: Params): UseTestStartupResult => {
  const controllerRef = useRef<StartupAudioController | null>(null);
  const completedRef = useRef(false);
  const [isStartupComplete, setIsStartupComplete] = useState(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsStartupComplete(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    controllerRef.current?.dispose();

    controllerRef.current = controllerFactory({
      audioSrc,
      soundHandle,
      createAudio,
      onFinish: finish,
      fadeInDurationMs: STARTUP_AUDIO_FADE_MS,
    });

    return () => {
      controllerRef.current?.dispose();
      controllerRef.current = null;
    };
  }, [audioSrc, soundHandle, createAudio, controllerFactory, finish]);

  useEffect(() => {
    const controller = controllerRef.current;

    if (!open) {
      controller?.stop();
      completedRef.current = false;
      setIsStartupComplete(false);
      return;
    }

    completedRef.current = false;
    setIsStartupComplete(false);

    if (!controller) {
      finish();
      return;
    }

    const alreadyAdopted = startupAudioPreplayed && controller.adoptExistingPlayback();
    if (alreadyAdopted) {
      return;
    }

    let cancelled = false;

    controller
      .play()
      .then((handled) => {
        if (cancelled) return;
        if (!handled) {
          finish();
        }
      })
      .catch((error) => {
        if (cancelled) return;
        console.warn('Failed to initialise startup audio', error);
        finish();
      });

    return () => {
      cancelled = true;
    };
  }, [open, audioSrc, soundHandle, createAudio, controllerFactory, finish, startupAudioPreplayed]);

  return { isStartupComplete };
};

export default useTestStartup;
