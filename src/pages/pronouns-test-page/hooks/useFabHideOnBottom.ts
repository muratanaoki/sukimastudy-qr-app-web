import { useEffect, useState } from 'react';

/**
 * ビューポートがページ最下部(閾値 px)付近に到達したら true を返す。
 * FAB のフェードアウトトリガ用途。
 */
export function useFabHideOnBottom(threshold: number = 16) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handler = () => {
      const { scrollY, innerHeight } = window;
      const docHeight = document.documentElement.scrollHeight;
      setHide(scrollY + innerHeight >= docHeight - threshold);
    };
    handler(); // 初期判定
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [threshold]);

  return hide;
}
