import { useCallback, useEffect, useState } from 'react';
import { PauseReason } from '../../gameplay/usePauseManager';

/**
 * 中断確認ダイアログの開閉を管理し、開いている間はゲームを一時停止理由に追加する。
 * - `PauseManager` と連動させることで、タイマー系ロジックが自然に停止する。
 * - 単純な boolean state をラップし、親側は `open/close` を呼ぶだけで済むようにする。
 */

type Params = {
  addPauseReason: (reason: PauseReason) => void;
  removePauseReason: (reason: PauseReason) => void;
};

type UseConfirmCloseStateResult = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (value: boolean) => void;
};

export const useConfirmCloseState = ({
  addPauseReason,
  removePauseReason,
}: Params): UseConfirmCloseStateResult => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      addPauseReason(PauseReason.Confirm);
    } else {
      removePauseReason(PauseReason.Confirm);
    }
  }, [isOpen, addPauseReason, removePauseReason]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const setOpen = useCallback((value: boolean) => {
    setIsOpen(value);
  }, []);

  return {
    isOpen,
    open,
    close,
    setOpen,
  };
};

export default useConfirmCloseState;
