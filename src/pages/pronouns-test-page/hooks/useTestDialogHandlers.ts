import { useCallback } from 'react';
import { AnswerMode } from '../utils/type';

interface UseTestDialogHandlersProps {
  answerMode: AnswerMode;
  revealed: boolean;
  reveal: () => void;
  feedback: {
    handleAnswerById: (choiceId: string, index: number) => void;
    handleAnswerIndex: (index: number) => void;
    handleSkipAsCorrect: () => void;
  };
  setShowTranslation: (value: boolean | ((prev: boolean) => boolean)) => void;
  reset: () => void;
  onClose: () => void;
  cancelFlash: () => void;
}

export const useTestDialogHandlers = ({
  answerMode,
  revealed,
  reveal,
  feedback,
  setShowTranslation,
  reset,
  onClose,
  cancelFlash,
}: UseTestDialogHandlersProps) => {
  const handleDialogClose = useCallback(() => {
    cancelFlash();
    reset();
    onClose();
  }, [cancelFlash, reset, onClose]);

  const handleChoiceAnswer = useCallback(
    (choiceId: string, i: number) => {
      if (answerMode === AnswerMode.Listening && !revealed) reveal();
      feedback.handleAnswerById(choiceId, i);
    },
    [answerMode, revealed, reveal, feedback]
  );

  const handleSkip = useCallback(() => {
    if (answerMode === AnswerMode.Listening && !revealed) reveal();
    feedback.handleSkipAsCorrect();
  }, [answerMode, revealed, reveal, feedback]);

  const handleRevealWord = useCallback(() => {
    setShowTranslation((prev) => !prev);
  }, [setShowTranslation]);

  return {
    handleDialogClose,
    handleChoiceAnswer,
    handleSkip,
    handleRevealWord,
  };
};
