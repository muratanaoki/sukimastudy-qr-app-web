import { useEffect, useRef } from 'react';

type Params = {
  open: boolean;
  term?: string | null;
  speakWord: (text: string) => void;
  cancel: () => void;
  paused?: boolean;
};

/**
 * 問題表示時に単語を自動読み上げし、ダイアログが閉じたら停止する副作用を内包。
 * - 同一語の二重発音を回避（lastKey ガード）
 * - 閉時/アンマウントで cancel 実行
 */
export const useAutoPronounce = ({ open, term, speakWord, cancel, paused = false }: Params) => {
  const lastSpokenKeyRef = useRef<string | null>(null);
  const cancelRef = useRef(cancel);
  const scheduledTermRef = useRef<string | null>(null);

  useEffect(() => {
    cancelRef.current = cancel;
  }, [cancel]);

  // ダイアログ再オープン時は履歴をリセット
  useEffect(() => {
    if (open) {
      lastSpokenKeyRef.current = null;
      scheduledTermRef.current = null;
    }
  }, [open]);

  // 出題時に即時発音（重複ガード）
  useEffect(() => {
    if (!open || paused || !term) return;
    if (lastSpokenKeyRef.current === term) return;
    if (scheduledTermRef.current === term) return;

    const delay = lastSpokenKeyRef.current === null ? 300 : 0;
    scheduledTermRef.current = term;
    const timeoutId = window.setTimeout(() => {
      lastSpokenKeyRef.current = term;
      scheduledTermRef.current = null;
      speakWord(term);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (scheduledTermRef.current === term) {
        scheduledTermRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, term, paused]); // speakWordを意図的に依存配列から除外（無限ループ回避）

  // 閉時に停止、アンマウント保険
  useEffect(() => {
    if (!open || paused) cancelRef.current();
  }, [open, paused]);

  useEffect(() => () => cancelRef.current(), []);
};

export default useAutoPronounce;
