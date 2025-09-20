import { useEffect } from 'react';

/**
 * 指定要素の実高さを CSS 変数（デフォルト: --header-height）に反映する。
 * - フォントロードやレスポンシブ変化にも ResizeObserver で追従
 */
export function useHeaderHeightVar(
  elRef: React.RefObject<HTMLElement | null>,
  varName: string = '--header-height'
) {
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const update = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty(varName, `${h}px`);
    };

    // 初期反映
    update();

    // サイズ監視
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => update());
      ro.observe(el);
    }

    // ビューポート変化にも追従
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      ro?.disconnect();
    };
  }, [elRef, varName]);
}
