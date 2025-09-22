import { Languages, List, Settings, Shuffle } from 'lucide-react';
import { DialogCard } from '@/shared/components/dialog/DialogCard';
import styles from './settingDialog.module.css';
import { SelectableButton } from '@/shared/components/selectable-button/SelectableButton';
import clsx from 'clsx';
import { useState } from 'react';
import { PrimaryButton } from '@/shared/components/primary-button/PrimaryButton';

export type SettingDialogProps = {
  onClose: () => void;
};

// 固定候補はenumで型安全に
export enum ChoiceView {
  Bottom4 = 'bottom4',
  None = 'none',
}

export enum QuestionOrder {
  Standard = 'standard',
  Random = 'random',
}

export enum AnswerMode {
  Normal = 'normal',
  Listening = 'listening',
}

// 外観のみのシンプルな設定ダイアログ（中身はダミー）
export const SettingDialog = ({ onClose }: SettingDialogProps) => {
  // 内部状態（必要に応じて親にリフトアップ可能）
  const [choiceView, setChoiceView] = useState<ChoiceView>(ChoiceView.Bottom4);
  const [questionOrder, setQuestionOrder] = useState<QuestionOrder>(QuestionOrder.Standard);
  const [answerMode, setAnswerMode] = useState<AnswerMode>(AnswerMode.Normal);

  return (
    <DialogCard
      onClose={onClose}
      title="設定"
      titleId="settings-title"
      Icon={Settings}
      actions={<PrimaryButton className={styles.actionsButton}>決定する</PrimaryButton>}
    >
      {/* 解答の選択肢表示 */}
      <div className={styles.sections}>
        <div className={styles.section}>
          <h2 className={styles.settingDialogHeading}>
            <List className={styles.icon} />
            <span>解答の選択肢表示</span>
          </h2>
          <div className={clsx(styles.buttonGrid, styles.twoCols)}>
            <SelectableButton
              className={clsx(choiceView === ChoiceView.Bottom4 && styles.selected)}
              onClick={() => setChoiceView(ChoiceView.Bottom4)}
            >
              あり
            </SelectableButton>
            <SelectableButton
              className={clsx(choiceView === ChoiceView.None && styles.selected)}
              onClick={() => setChoiceView(ChoiceView.None)}
            >
              なし
            </SelectableButton>
          </div>
        </div>

        {/* 出題方法 */}
        <div className={styles.section}>
          <h2 className={styles.settingDialogHeading}>
            <Shuffle className={styles.icon} />
            <span>出題方法</span>
          </h2>
          <div className={clsx(styles.buttonGrid, styles.twoCols)}>
            <SelectableButton
              className={clsx(questionOrder === QuestionOrder.Standard && styles.selected)}
              onClick={() => setQuestionOrder(QuestionOrder.Standard)}
            >
              通常
            </SelectableButton>
            <SelectableButton
              className={clsx(questionOrder === QuestionOrder.Random && styles.selected)}
              onClick={() => setQuestionOrder(QuestionOrder.Random)}
            >
              ランダム
            </SelectableButton>
          </div>
        </div>

        {/* 解答モード */}
        <div className={styles.section}>
          <h2 className={styles.settingDialogHeading}>
            <Languages className={styles.icon} />
            <span>解答モード</span>
          </h2>
          <div className={clsx(styles.buttonGrid, styles.twoCols)}>
            <SelectableButton
              className={clsx(answerMode === AnswerMode.Normal && styles.selected)}
              onClick={() => setAnswerMode(AnswerMode.Normal)}
            >
              通常
            </SelectableButton>
            <SelectableButton
              className={clsx(answerMode === AnswerMode.Listening && styles.selected)}
              onClick={() => setAnswerMode(AnswerMode.Listening)}
            >
              リスニング
            </SelectableButton>
          </div>
        </div>
      </div>
    </DialogCard>
  );
};

export default SettingDialog;
