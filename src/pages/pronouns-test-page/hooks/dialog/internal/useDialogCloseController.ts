import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * ダイアログの閉じアニメーションを管理し、完了時に `onClosed` を呼び出す制御フック。
 * - `prefers-reduced-motion` を検出してアニメーションをスキップする配慮も含む。
 * - `requestClose`/`finalizeClose` の二段構えにすることでアニメーション完了を待てる。
 */

type UseDialogCloseControllerOptions = {
  open: boolean;
  animationDurationMs: number;
  onBeginClose?: () => void;
  onClosed: () => void;
  detectReducedMotion?: () => boolean;
};

type UseDialogCloseControllerReturn = {
  isClosing: boolean;
  shouldRender: boolean;
  requestClose: () => void;
  finalizeClose: () => void;
};

const defaultDetectReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const noop = () => {
  /* noop */
};

export const useDialogCloseController = ({
  open,
  animationDurationMs,
  onBeginClose = noop,
  onClosed,
  detectReducedMotion = defaultDetectReducedMotion,
}: UseDialogCloseControllerOptions): UseDialogCloseControllerReturn => {
  const [isClosing, setIsClosing] = useState(false);
  const pendingCloseRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const finalizeClose = useCallback(() => {
    if (!pendingCloseRef.current) return;

    pendingCloseRef.current = false;
    clearCloseTimer();
    setIsClosing(false);
    onClosed();
  }, [clearCloseTimer, onClosed]);

  const requestClose = useCallback(() => {
    if (pendingCloseRef.current || isClosing) return;

    onBeginClose();
    pendingCloseRef.current = true;
    setIsClosing(true);

    if (detectReducedMotion()) {
      finalizeClose();
      return;
    }

    closeTimerRef.current = setTimeout(finalizeClose, animationDurationMs);
  }, [animationDurationMs, detectReducedMotion, finalizeClose, isClosing, onBeginClose]);

  useEffect(() => {
    if (!open) return;

    pendingCloseRef.current = false;
    clearCloseTimer();
    setIsClosing(false);
  }, [clearCloseTimer, open]);

  useEffect(
    () => () => {
      clearCloseTimer();
      pendingCloseRef.current = false;
    },
    [clearCloseTimer]
  );

  return {
    isClosing,
    shouldRender: open || isClosing,
    requestClose,
    finalizeClose,
  };
};

export default useDialogCloseController;
