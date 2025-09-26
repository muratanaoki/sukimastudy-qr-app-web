import { useCallback, useMemo } from 'react';
import { useTestSettings } from './useTestSettings';
import { useTestRunner, useChoices } from './useTestRunner';
import { useOrderedItems } from './useOrderedItems';
import { useAnswerFeedback } from './useAnswerFeedback';
import { useTestDisplay } from './useTestDisplay';
import type { PronounGroup } from '../utils/type';

type UseTestDialogStateParams = {
  open: boolean;
  group: PronounGroup;
  paused?: boolean;
};

export const useTestDialogState = ({ open, group, paused = false }: UseTestDialogStateParams) => {
  const { choiceView, questionOrder, answerMode } = useTestSettings();
  const orderedItems = useOrderedItems(open, group.items, questionOrder);
  const { state, goNext, hasItems, reset } = useTestRunner(open, orderedItems, paused);
  const {
    total,
    current,
    timeLeftPct,
    item,
    isCompleted,
    correctAnswers,
    scorePercentage,
    answerHistory,
  } = state;

  const choiceOptions = useChoices(item);
  const choiceLabels = useMemo(() => choiceOptions.map((option) => option.label), [choiceOptions]);
  const correctIndex = useMemo(
    () => choiceOptions.findIndex((option) => option.isCorrect),
    [choiceOptions]
  );
  const questionKey = item?.term ?? current;

  const advance = useCallback(
    (isCorrect?: boolean, onComplete?: () => void) =>
      goNext({ isCorrect: !!isCorrect, onComplete }),
    [goNext]
  );

  const feedback = useAnswerFeedback({
    isCorrect: (label) =>
      choiceOptions.some((option) => option.label === label && option.isCorrect),
    onNext: advance,
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
    settings: {
      choiceView,
      answerMode,
    },
    progress: {
      total,
      current,
      timeLeftPct,
      item,
      isCompleted,
      hasItems,
    },
    results: {
      correctAnswers,
      scorePercentage,
      answerHistory,
    },
    choices: {
      options: choiceOptions,
      labels: choiceLabels,
      correctIndex,
    },
    meta: {
      questionKey,
    },
    actions: {
      advance,
      reset,
    },
    feedback,
    display,
  } as const;
};
