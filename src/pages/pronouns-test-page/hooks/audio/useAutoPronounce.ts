import { useEffect, useRef } from 'react';
import { createAutoPronounceController } from './internal/autoPronounceController';

type Params = {
  open: boolean;
  term?: string | null;
  speakWord: (text: string) => void;
  cancel: () => void;
  paused?: boolean;
  enabled?: boolean;
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
  paused = false,
  enabled = true,
}: Params) => {
  const controllerRef = useRef(createAutoPronounceController());
  const cancelRef = useRef(cancel);

  useEffect(() => {
    cancelRef.current = cancel;
  }, [cancel]);

  // ダイアログ再オープン時は履歴をリセット
  useEffect(() => {
    if (open) {
      controllerRef.current.reset();
    }
  }, [open]);

  // 出題時に即時発音（重複ガード）
  useEffect(() => {
    if (!open || paused || !enabled || !term) return;
    const controller = controllerRef.current;
    if (!controller.shouldSchedule(term)) return;

    const delay = controller.hasSpoken() ? 0 : 300;
    controller.markScheduled(term);

    const timeoutId = window.setTimeout(() => {
      controller.markSpoken(term);
      speakWord(term);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      controller.clearScheduled(term);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, term, paused, enabled]); // speakWordを意図的に依存配列から除外（無限ループ回避）

  // 閉時に停止、アンマウント保険
  useEffect(() => {
    if (!open || paused) cancelRef.current();
  }, [open, paused]);

  useEffect(() => () => cancelRef.current(), []);
};

export default useAutoPronounce;
