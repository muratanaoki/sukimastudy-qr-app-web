import type { JudgementButtonType } from '../domain/type';

export type ControlStateInput = {
  isFeedbackDisabled: boolean;
  isTransitioning: boolean;
  isCompleted: boolean;
  selectedJudgement: JudgementButtonType | null;
};

export type ControlState = {
  controlsDisabled: boolean;
  judgementDisabled: boolean;
};

export const deriveControlState = ({
  isFeedbackDisabled,
  isTransitioning,
  isCompleted,
  selectedJudgement,
}: ControlStateInput): ControlState => {
  const controlsDisabled = isFeedbackDisabled || isTransitioning || isCompleted;
  const hasJudgement = selectedJudgement !== null;
  const judgementDisabled = hasJudgement || isTransitioning || isCompleted;

  return {
    controlsDisabled,
    judgementDisabled,
  } as const;
};
