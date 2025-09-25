import { useCallback, useState, useEffect } from 'react';
import type { JudgementButtonType } from '../utils/type';
import { ChoiceView } from '../utils/type';
import { shouldFlash } from '../utils/function';
import { useFlashDisplay } from './useFlashDisplay';
import { JUDGEMENT_BUTTON_TYPE } from '../utils/const';
import { useSoundEffects } from '@/shared/hooks/useSoundEffects';

export const useJudgementHandler = (
  choiceView: ChoiceView,
  goNextOrClose: () => void,
  questionKey: string | number
) => {
  const [selectedJudgement, setSelectedJudgement] = useState<JudgementButtonType | null>(null);
  const { isFlashing, startFlash, cancelFlash } = useFlashDisplay();
  const { playCorrectSound, playIncorrectSound, enableAudio } = useSoundEffects();

  const handleJudgementAnswer = useCallback(
    (buttonType: JudgementButtonType) => {
      setSelectedJudgement(buttonType);

      // 最初のクリックで音声を有効化
      enableAudio();

      // 知ってる = 正解音、知らない = 不正解音
      if (buttonType === JUDGEMENT_BUTTON_TYPE.KNOW) {
        playCorrectSound();
      } else if (buttonType === JUDGEMENT_BUTTON_TYPE.DONT_KNOW) {
        playIncorrectSound();
      }

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
    [choiceView, startFlash, goNextOrClose, playCorrectSound, playIncorrectSound, enableAudio]
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