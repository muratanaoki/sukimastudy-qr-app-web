import { useCallback, useEffect, useRef } from 'react';

type Params = {
  open: boolean;
  audioSrc?: string;
  onComplete?: () => void;
};

export const useTestStartup = ({ open, audioSrc, onComplete }: Params) => {
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (open) {
      completedRef.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

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
  }, [open, audioSrc, finish]);
  // 以前は UI ブロック用の戻り値/isBlocking があったが表示抑止を廃止したため何も返さない
};

export default useTestStartup;
