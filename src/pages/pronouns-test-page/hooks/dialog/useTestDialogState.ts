import { useCallback, useMemo } from 'react';
import { useTestSettings } from '../context/useTestSettings';
import { useTestRunner, useChoices } from '../gameplay/useTestRunner';
import { useOrderedItems } from '../gameplay/useOrderedItems';
import { useAnswerFeedback } from '../gameplay/useAnswerFeedback';
import { useTestDisplay } from '../gameplay/useTestDisplay';
import type { PronounGroup } from '../../utils/type';
import type { UseSoundEffectsReturn } from '@/shared/hooks/useSoundEffects';

/**
 * ダイアログ全体で共有するテスト状態を組み立てるコンポジションフック。
 * - 設定、進捗、結果、フィードバック、表示制御をそれぞれ専用フックから取得。
 * - ここでまとめておくことで `TestDialog` からの props ドリリングを抑え、見通しを良くする。
 */

type UseTestDialogStateParams = {
  open: boolean;
  group: PronounGroup;
  paused?: boolean;
  soundEffects: UseSoundEffectsReturn;
};

export const useTestDialogState = ({
  open,
  group,
  paused = false,
  soundEffects,
}: UseTestDialogStateParams) => {
  // UI 設定（選択肢表示位置・出題順・モード）を取得
  const { choiceView, questionOrder, answerMode } = useTestSettings();
  // 出題順を確定（オープン時にシャッフルを行い、ダイアログ閉鎖まで維持）
  const orderedItems = useOrderedItems(open, group.items, questionOrder);
  // 実際の問題進行と結果計算を司るランナー
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

  // 進行制御: boolean と詳細オプションの両方を受け取れるようにハイブリッド引数を採用
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

  // 解答フィードバック: 正誤演出・音響・フラッシュ制御をひとまとめに返す
  const feedback = useAnswerFeedback({
    isCorrect: (choiceId) =>
      choiceOptions.some((option) => option.id === choiceId && option.isCorrect),
    onNext: advance,
    correctIndex: correctIndex >= 0 ? correctIndex : undefined,
    choiceIds,
    currentKey: questionKey,
    soundEffects,
  });

  // UI 表示状態: 現在の単語表示や翻訳の開閉状態を管理
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
