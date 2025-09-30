export enum TestDialogPhase {
  Empty = 'empty',
  InProgress = 'in-progress',
  Transitioning = 'transitioning',
  Completed = 'completed',
}

export const resolveDialogPhase = (
  hasItems: boolean,
  isCompleted: boolean,
  isTransitioning: boolean
): TestDialogPhase => {
  if (!hasItems) return TestDialogPhase.Empty;
  if (isTransitioning) return TestDialogPhase.Transitioning;
  return isCompleted ? TestDialogPhase.Completed : TestDialogPhase.InProgress;
};
