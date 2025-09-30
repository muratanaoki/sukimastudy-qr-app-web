import { useCallback, useEffect, useRef } from 'react';
import { PauseReason } from './usePauseManager';

type Params = {
  open: boolean;
  active: boolean;
  audioSrc?: string;
  onComplete?: () => void;
  addPauseReason: (reason: PauseReason) => void;
  removePauseReason: (reason: PauseReason) => void;
};

type UseTestStartupResult = {
  isBlocking: boolean;
};

export const useTestStartup = ({
  open,
  active,
  audioSrc,
  onComplete,
  addPauseReason,
  removePauseReason,
}: Params): UseTestStartupResult => {
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (!active) {
      removePauseReason(PauseReason.Startup);
      return;
    }

    addPauseReason(PauseReason.Startup);
    return () => {
      removePauseReason(PauseReason.Startup);
    };
  }, [active, addPauseReason, removePauseReason]);

  useEffect(() => {
    if (open && active) {
      completedRef.current = false;
    }
  }, [open, active]);

  useEffect(() => {
    if (!open || !active) return;

    if (!audioSrc) {
      finish();
      return;
    }

    const audio = new Audio(audioSrc);
    audio.preload = 'auto';
    let cancelled = false;

    const handleComplete = () => {
      if (cancelled) return;
      finish();
    };

    audio.addEventListener('ended', handleComplete);
    audio.addEventListener('error', handleComplete);

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.warn('Failed to play startup audio', error);
        handleComplete();
      }
    };

    void playAudio();

    return () => {
      cancelled = true;
      audio.removeEventListener('ended', handleComplete);
      audio.removeEventListener('error', handleComplete);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [open, active, audioSrc, finish]);

  return { isBlocking: active };
};

export default useTestStartup;
