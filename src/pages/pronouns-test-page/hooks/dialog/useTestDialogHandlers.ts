import { useCallback } from 'react';
import { AnswerMode } from '../../utils/enum';

/**
 * ダイアログに渡す UI ハンドラ群をまとめて生成するフック。
 * - リスニングモードでは解答時に自動開示するなど、モードごとの分岐をここで吸収。
 * - Button コンポーネント側は純粋にコールバックを呼ぶだけでよくなる。
 */

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
  // 選択肢クリック: リスニングモードでは先に単語を表示し、その後フィードバックを進める
  const handleChoiceAnswer = useCallback(
    (choiceId: string, i: number) => {
      if (answerMode === AnswerMode.Listening && !revealed) reveal();
      feedback.handleAnswerById(choiceId, i);
    },
    [answerMode, revealed, reveal, feedback]
  );

  // スキップ操作: リスニングモードでは reveal を挟み、次へ進める
  const handleSkip = useCallback(() => {
    if (answerMode === AnswerMode.Listening && !revealed) reveal();
    feedback.handleSkipAsCorrect();
  }, [answerMode, revealed, reveal, feedback]);

  // 和訳表示ボタンのトグル
  const handleRevealWord = useCallback(() => {
    setShowTranslation((prev) => !prev);
  }, [setShowTranslation]);

  return {
    handleChoiceAnswer,
    handleSkip,
    handleRevealWord,
  };
};
