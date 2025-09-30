import { useCallback, useEffect, useRef, useState } from 'react';

type Params = {
  open: boolean;
  audioSrc?: string;
  onComplete?: () => void;
  createAudio?: (src: string) => HTMLAudioElement;
};

type UseTestStartupResult = {
  isStartupComplete: boolean;
};

const defaultCreateAudio = (src: string) => new Audio(src);

export const useTestStartup = ({
  open,
  audioSrc,
  onComplete,
  createAudio = defaultCreateAudio,
}: Params): UseTestStartupResult => {
  const completedRef = useRef(false);
  const [isStartupComplete, setIsStartupComplete] = useState(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsStartupComplete(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    completedRef.current = false;
    setIsStartupComplete(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (!audioSrc) {
      finish();
      return;
    }

    const audio = createAudio(audioSrc);
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
  }, [open, audioSrc, finish, createAudio]);

  return { isStartupComplete };
};

export default useTestStartup;
