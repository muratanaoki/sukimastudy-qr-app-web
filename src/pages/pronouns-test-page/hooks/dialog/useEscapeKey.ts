import { useEffect } from 'react';
import { Key } from '@/shared/utils/enum';

/**
 * Escape キーで callback を呼び出すシンプルなフック。
 * active=false の間はリスナーを張らない。
 */
export function useEscapeKey(callback: () => void, active: boolean = true) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === Key.Escape) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback, active]);
}
