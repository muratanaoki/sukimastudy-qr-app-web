import { useEffect, useState } from 'react';
import type { DependencyList } from 'react';

/**
 * FAB 非表示判定フック
 * - スクロール不能（コンテンツが短い）なら常に表示
 * - スクロール可能なら“画面下端付近”のみ隠す
 * - スクロール/リサイズ/コンテンツ高さ変化/依存変化で再評価
 * - rAF でハンドラをスロットルし、過剰な setState を抑制
 */
export function useFabHideOnBottom(threshold: number = 16, deps: DependencyList = []) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let raf = 0;
    let ro: ResizeObserver | null = null;

    const read = () => {
      const { innerHeight, scrollY } = window;
      const docEl = document.documentElement;
      const docHeight = docEl.scrollHeight;
      return { innerHeight, scrollY, docHeight };
    };

    const compute = ({
      innerHeight,
      scrollY,
      docHeight,
    }: {
      innerHeight: number;
      scrollY: number;
      docHeight: number;
    }) => {
      // スクロールできない（コンテンツが短い）場合は FAB を常に表示
      if (docHeight <= innerHeight + threshold) return false;
      // 画面下端付近のみ隠す
      return scrollY + innerHeight >= docHeight - threshold;
    };

    const run = () => {
      raf = 0;
      const next = compute(read());
      setHide((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(run);
    };

    // 初期/依存変化時に即時評価
    run();

    // イベント購読（スクロールはパッシブ）
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    // コンテンツ高さの変化（タブ切替など）にも追従
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => schedule());
      ro.observe(document.documentElement);
      if (document.body) ro.observe(document.body);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      ro?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, ...deps]);

  return hide;
}
