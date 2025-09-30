import { useCallback, useEffect, useState } from 'react';
import { PauseReason } from '../usePauseManager';

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
