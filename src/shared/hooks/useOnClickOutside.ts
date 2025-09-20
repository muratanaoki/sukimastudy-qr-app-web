import { useEffect } from 'react';

export function useOnClickOutside<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
  active: boolean,
  onOutside: () => void
) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        onOutside();
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [containerRef, active, onOutside]);
}
