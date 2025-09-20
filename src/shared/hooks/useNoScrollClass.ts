import { useEffect } from 'react';

/**
 * active の間、<html> に no-scroll クラスを付与する。
 */
export function useNoScrollClass(active: boolean) {
  useEffect(() => {
    const root = document.documentElement;
    if (active) {
      root.classList.add('no-scroll');
    } else {
      root.classList.remove('no-scroll');
    }
    return () => root.classList.remove('no-scroll');
  }, [active]);
}
