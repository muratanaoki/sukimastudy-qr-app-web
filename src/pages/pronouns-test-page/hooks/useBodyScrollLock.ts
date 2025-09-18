import { useEffect } from 'react';

/**
 * アクティブな間 document.body のスクロールをロックする。
 * ネスト考慮は簡易: 併用するケースが出たら ref カウント方式に拡張。
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}
