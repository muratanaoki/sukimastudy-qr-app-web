export enum TestDialogPhase {
  Empty = 'empty',
  InProgress = 'in-progress',
  Completed = 'completed',
}

export const resolveDialogPhase = (hasItems: boolean, isCompleted: boolean): TestDialogPhase => {
  if (!hasItems) return TestDialogPhase.Empty;
  return isCompleted ? TestDialogPhase.Completed : TestDialogPhase.InProgress;
};
