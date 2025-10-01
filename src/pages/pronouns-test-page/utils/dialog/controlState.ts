import type { JudgementButtonType } from '../domain/type';

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
