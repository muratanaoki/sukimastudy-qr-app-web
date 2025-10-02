import { Languages, List, Settings, Shuffle } from 'lucide-react';
import styles from './settingDialog.module.css';
import { PrimaryButton } from '@/shared/components/primary-button/PrimaryButton';
import { SettingSection } from './SettingSection';
import { useTestSettings } from '../../hooks/context/useTestSettings';
import { AnswerMode, ChoiceView, QuestionOrder } from '../../utils/domain/type';
import DialogCard from './dialog/DialogCard';

export type SettingDialogProps = {
  onClose: () => void;
};

// 固定候補はenumで型安全に
// 外観のみのシンプルな設定ダイアログ（中身はダミー）
export const SettingDialog = ({ onClose }: SettingDialogProps) => {
  const {
    choiceView,
    setChoiceView,
    questionOrder,
    setQuestionOrder,
    answerMode,
    setAnswerMode,
    save,
  } = useTestSettings();

  const handleSaveAndClose = () => {
    save();
    onClose();
  };

  return (
    <DialogCard
      onClose={onClose}
      title="設定"
      titleId="settings-title"
      Icon={Settings}
      actions={
        <PrimaryButton className={styles.actionsButton} onClick={handleSaveAndClose}>
          保存する
        </PrimaryButton>
      }
    >
      {/* 解答の選択肢表示 */}
      <div className={styles.sections}>
        <SettingSection
          title="解答の選択肢表示"
          Icon={List}
          options={[
            {
              label: 'あり',
              selected: choiceView === ChoiceView.Bottom4,
              onClick: () => setChoiceView(ChoiceView.Bottom4),
            },
            {
              label: 'なし',
              selected: choiceView === ChoiceView.None,
              onClick: () => setChoiceView(ChoiceView.None),
            },
          ]}
          columns={2}
        />

        {/* 出題方法 */}
        <SettingSection
          title="出題方法"
          Icon={Shuffle}
          options={[
            {
              label: '通常',
              selected: questionOrder === QuestionOrder.Standard,
              onClick: () => setQuestionOrder(QuestionOrder.Standard),
            },
            {
              label: 'ランダム',
              selected: questionOrder === QuestionOrder.Random,
              onClick: () => setQuestionOrder(QuestionOrder.Random),
            },
          ]}
          columns={2}
        />

        {/* 解答モード */}
        <SettingSection
          title="解答モード"
          Icon={Languages}
          options={[
            {
              label: '通常',
              selected: answerMode === AnswerMode.Normal,
              onClick: () => setAnswerMode(AnswerMode.Normal),
            },
            {
              label: 'リスニング',
              selected: answerMode === AnswerMode.Listening,
              onClick: () => setAnswerMode(AnswerMode.Listening),
            },
          ]}
          columns={2}
        />
      </div>
    </DialogCard>
  );
};

export default SettingDialog;
