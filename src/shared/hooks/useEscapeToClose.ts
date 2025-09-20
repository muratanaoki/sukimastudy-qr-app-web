import { useEffect } from 'react';

/**
 * Escape キーで close() を呼び出し、次フレームで triggerRef にフォーカスを返す。
 */
export function useEscapeToClose(
  triggerRef: React.RefObject<HTMLElement | null>,
  active: boolean,
  close: () => void
) {
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [triggerRef, active, close]);
}
