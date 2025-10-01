import { useCallback } from 'react';
import { AnswerMode } from '../../utils/domain/type';

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
}

export const useTestDialogHandlers = ({
  answerMode,
  revealed,
  reveal,
  feedback,
  setShowTranslation,
}: UseTestDialogHandlersProps) => {
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
    handleChoiceAnswer,
    handleSkip,
    handleRevealWord,
  };
};
