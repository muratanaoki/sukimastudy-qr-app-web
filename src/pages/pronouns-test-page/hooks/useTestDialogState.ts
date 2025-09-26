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

  const questionKey = item?.term ?? current;
  const choiceOptions = useChoices(item, questionKey);
  const choiceLabels = useMemo(() => choiceOptions.map((option) => option.label), [choiceOptions]);
  const choiceIds = useMemo(() => choiceOptions.map((option) => option.id), [choiceOptions]);
  const correctIndex = useMemo(
    () => choiceOptions.findIndex((option) => option.isCorrect),
    [choiceOptions]
  );

  const advance = useCallback(
    (params?: boolean | { isCorrect?: boolean; onComplete?: () => void }) => {
      const config =
        typeof params === 'boolean' || params === undefined
          ? { isCorrect: !!params }
          : { isCorrect: !!params.isCorrect, onComplete: params.onComplete };

      goNext(config);
    },
    [goNext]
  );

  const feedback = useAnswerFeedback({
    isCorrect: (choiceId) =>
      choiceOptions.some((option) => option.id === choiceId && option.isCorrect),
    onNext: advance,
    correctIndex: correctIndex >= 0 ? correctIndex : undefined,
    choiceIds,
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
      ids: choiceIds,
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
