import type { JudgementButtonType } from '../domain/type';

/**
 * フィードバック状態や回答済み状態から、操作ボタンの活性/非活性を導出する純粋関数。
 * - ここで boolean を計算しておくと描画側が条件分岐で煩雑にならない。
 */

export type ControlStateInput = {
  isFeedbackDisabled: boolean;
  isCompleted: boolean;
  selectedJudgement: JudgementButtonType | null;
};

export type ControlState = {
  controlsDisabled: boolean;
  judgementDisabled: boolean;
};

export const deriveControlState = ({
  isFeedbackDisabled,
  isCompleted,
  selectedJudgement,
}: ControlStateInput): ControlState => {
  const controlsDisabled = isFeedbackDisabled || isCompleted;
  const hasJudgement = selectedJudgement !== null;
  const judgementDisabled = hasJudgement || isCompleted;

  return {
    controlsDisabled,
    judgementDisabled,
  } as const;
};
