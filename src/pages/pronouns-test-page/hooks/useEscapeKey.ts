import { useEffect } from 'react';

/**
 * Escape キーで callback を呼び出すシンプルなフック。
 * active=false の間はリスナーを張らない。
 */
export function useEscapeKey(callback: () => void, active: boolean = true) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback, active]);
}
