import { useCallback, useState, useEffect } from 'react';
import type { JudgementButtonType } from '../utils/type';
import { ChoiceView } from '../utils/type';
import { shouldFlash } from '../utils/function';
import { useFlashDisplay } from './useFlashDisplay';

export const useJudgementHandler = (
  choiceView: ChoiceView,
  goNextOrClose: () => void,
  questionKey: string | number
) => {
  const [selectedJudgement, setSelectedJudgement] = useState<JudgementButtonType | null>(null);
  const { isFlashing, startFlash, cancelFlash } = useFlashDisplay();

  const handleJudgementAnswer = useCallback(
    (buttonType: JudgementButtonType) => {
      setSelectedJudgement(buttonType);

      if (shouldFlash(choiceView)) {
        startFlash(() => {
          setSelectedJudgement(null);
          goNextOrClose();
        });
      } else {
        setSelectedJudgement(null);
        goNextOrClose();
      }
    },
    [choiceView, startFlash, goNextOrClose]
  );

  useEffect(() => {
    setSelectedJudgement(null);
  }, [questionKey]);

  return {
    selectedJudgement,
    handleJudgementAnswer,
    isFlashing,
    cancelFlash,
  };
};