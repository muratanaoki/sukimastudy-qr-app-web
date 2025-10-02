import { TestDialogPhase } from '../../enum';

/**
 * 現在の進捗状態からダイアログの表示フェーズを判定する。
 * - 問題が存在しない場合は空表示。
 * - 全問終了後は結果画面、それ以外は出題中として扱う。
 */
export const resolveDialogPhase = (hasItems: boolean, isCompleted: boolean): TestDialogPhase => {
  if (!hasItems) return TestDialogPhase.Empty;
  return isCompleted ? TestDialogPhase.Completed : TestDialogPhase.InProgress;
};
