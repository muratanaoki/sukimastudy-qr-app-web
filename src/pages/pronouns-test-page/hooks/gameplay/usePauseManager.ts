import { useCallback, useMemo, useState } from 'react';

/**
 * テスト全体の「一時停止理由」を管理するマネージャ。
 * - 複数の要因（確認ダイアログ、起動画面など）が重複して pause を要求しても、解除順が崩れないよう集合で保持。
 * - UI 側は `isPaused` フラグだけを見れば良くなるため、ロジックと描画を疎結合にできる。
 */

export enum PauseReason {
  Confirm = 'confirm',
  Startup = 'startup',
}

export const usePauseManager = () => {
  const [reasons, setReasons] = useState<PauseReason[]>([]);

  const addReason = useCallback((reason: PauseReason) => {
    setReasons((prev) => (prev.includes(reason) ? prev : [...prev, reason]));
  }, []);

  const removeReason = useCallback((reason: PauseReason) => {
    setReasons((prev) => prev.filter((entry) => entry !== reason));
  }, []);

  const clear = useCallback(() => {
    setReasons([]);
  }, []);

  const hasReason = useCallback((reason: PauseReason) => reasons.includes(reason), [reasons]);

  const isPaused = useMemo(() => reasons.length > 0, [reasons]);

  return useMemo(
    () => ({
      isPaused,
      addReason,
      removeReason,
      clear,
      hasReason,
    }),
    [isPaused, addReason, removeReason, clear, hasReason]
  );
};
