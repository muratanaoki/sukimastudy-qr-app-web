import { useEffect, useMemo, useState } from 'react';
import { useListeningWordMask } from './useListeningWordMask';
import { AnswerMode, ChoiceView } from '../../utils/enum';

export type UseTestDisplayParams = {
  open: boolean;
  answerMode: AnswerMode;
  choiceView: ChoiceView;
  itemTerm: string | null | undefined;
  currentKey: string | number;
};

export const useTestDisplay = ({
  open,
  answerMode,
  choiceView,
  itemTerm,
  currentKey,
}: UseTestDisplayParams) => {
  const [showTranslation, setShowTranslation] = useState(false);

  // 問題切替/再オープン時に翻訳を非表示(=開いた目アイコン)へ戻す
  useEffect(() => {
    setShowTranslation(false);
  }, [itemTerm, currentKey, open]);

  const {
    displayTerm: maskedTerm,
    shouldShowRevealButton,
    reveal,
    revealed,
  } = useListeningWordMask({
    answerMode,
    choiceView,
    term: itemTerm ?? null,
    currentIndexOrKey: currentKey,
    open,
  });

  const displayTerm = useMemo(() => {
    if (answerMode !== AnswerMode.Listening) return itemTerm ?? '-';
    if (choiceView === ChoiceView.None) return showTranslation ? (itemTerm ?? '-') : '?';
    return maskedTerm;
  }, [answerMode, choiceView, showTranslation, itemTerm, maskedTerm]);

  return {
    displayTerm,
    showTranslation,
    setShowTranslation,
    shouldShowRevealButton,
    reveal,
    revealed,
  } as const;
};
