import { useEffect, useRef } from 'react';

type Params = {
  open: boolean;
  term?: string | null;
  speakWord: (text: string) => void;
  cancel: () => void;
  skipFirstOnOpen?: boolean; // 追加: オープン直後の最初の出題だけ自動発音を抑止
};

/**
 * 問題表示時に単語を自動読み上げし、ダイアログが閉じたら停止する副作用を内包。
 * - 同一語の二重発音を回避（lastKey ガード）
 * - 閉時/アンマウントで cancel 実行
 */
export const useAutoPronounce = ({
  open,
  term,
  speakWord,
  cancel,
  skipFirstOnOpen = false,
}: Params) => {
  const lastSpokenKeyRef = useRef<string | null>(null);
  const shouldSkipFirstRef = useRef(false);
  const cancelRef = useRef(cancel);
  useEffect(() => {
    cancelRef.current = cancel;
  }, [cancel]);

  // ダイアログ再オープン時は抑制キーをリセット
  useEffect(() => {
    if (open) {
      lastSpokenKeyRef.current = null;
      shouldSkipFirstRef.current = !!skipFirstOnOpen; // オープン時に初回スキップフラグをセット
    }
  }, [open, skipFirstOnOpen]);

  // 出題時に即時発音（重複ガード）
  useEffect(() => {
    if (!open || !term) return;
    if (lastSpokenKeyRef.current !== term) {
      // オープン直後の最初の出題はスキップ（要求仕様）
      if (shouldSkipFirstRef.current) {
        shouldSkipFirstRef.current = false; // 一度だけスキップ
        lastSpokenKeyRef.current = term; // この語は既読として扱う
        return;
      }
      speakWord(term);
      lastSpokenKeyRef.current = term;
    }
  }, [open, term, speakWord]);

  // 閉時に停止、アンマウント保険
  useEffect(() => {
    if (!open) cancelRef.current();
  }, [open]);

  useEffect(() => () => cancelRef.current(), []);
};

export default useAutoPronounce;
