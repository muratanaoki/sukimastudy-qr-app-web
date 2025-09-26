import { useCallback, useMemo } from 'react';
import { useTestSettings } from './useTestSettings';
import { useTestRunner } from './useTestRunner';
import { useChoices } from './useTestRunner';
import { useOrderedItems } from './useOrderedItems';
import { useAnswerFeedback } from './useAnswerFeedback';
import { useTestDisplay } from './useTestDisplay';
import type { PronounGroup } from '../utils/type';

export const useTestDialogState = (
  open: boolean,
  group: PronounGroup,
  onClose: () => void,
  paused = false
) => {
  const { choiceView, questionOrder, answerMode } = useTestSettings();
  const orderedItems = useOrderedItems(open, group.items, questionOrder);
  const { state, goNext, hasItems, reset } = useTestRunner(open, orderedItems, paused);
  const { total, current, timeLeftPct, item, isCompleted, correctAnswers, scorePercentage, answerHistory } = state;

  const choices = useChoices(item);
  const correctIndex = useMemo(
    () => (item ? choices.findIndex((c) => c === item.jp) : -1),
    [item, choices]
  );
  const questionKey = item?.term ?? current;

  const goNextOrClose = useCallback((isCorrect?: boolean) => goNext(onClose, isCorrect), [goNext, onClose]);

  const feedback = useAnswerFeedback({
    isCorrect: (label) => !!item && label === item.jp,
    onNext: goNextOrClose,
    choices,
    correctIndex: correctIndex >= 0 ? correctIndex : undefined,
    currentKey: questionKey,
  });

  const display = useTestDisplay({
    open,
    answerMode,
    choiceView,
    itemTerm: item?.term ?? null,
    currentKey: questionKey,
  });

  return {
    // Settings
    choiceView,
    answerMode,

    // State
    total,
    current,
    timeLeftPct,
    item,
    isCompleted,
    hasItems,
    correctAnswers,
    scorePercentage,
    answerHistory,

    // Derived values
    choices,
    correctIndex,
    questionKey,

    // Functions
    goNextOrClose,
    reset,

    // Sub-hooks
    feedback,
    display,
  };
};