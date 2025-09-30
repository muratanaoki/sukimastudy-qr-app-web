import type { ComponentProps } from 'react';
import styles from '../testDialog.module.css';
import { DialogHeader } from './DialogHeader';
import QuestionContent from './QuestionContent';
import TestControls from './TestControls';
import TestResult from './TestResult';
import { ConfirmCloseDialog } from './ConfirmCloseDialog';
import type { TestDialogPhase } from '../../../utils/dialog/dialogPhase';

export type TestDialogHeaderProps = {
  posTitle: string;
  groupTitle: string;
  timeLeftPct: number;
  questionKey: string | number;
  onClose: () => void;
};

export type TestDialogQuestionProps = {
  visible: boolean;
} & ComponentProps<typeof QuestionContent>;

export type TestDialogResultProps = {
  visible: boolean;
  hasItems: boolean;
} & ComponentProps<typeof TestResult>;

export type TestDialogControlsProps = {
  visible: boolean;
} & ComponentProps<typeof TestControls>;

export type TestDialogConfirmProps = ComponentProps<typeof ConfirmCloseDialog>;

export type TestDialogContentProps = {
  dialogPhase: TestDialogPhase;
  header: TestDialogHeaderProps;
  question: TestDialogQuestionProps;
  result: TestDialogResultProps;
  emptyLabelVisible: boolean;
  controls: TestDialogControlsProps;
  confirm: TestDialogConfirmProps;
};

export const TestDialogContent = ({
  dialogPhase,
  header,
  question,
  result,
  emptyLabelVisible,
  controls,
  confirm,
}: TestDialogContentProps) => {
  const { visible: questionVisible, ...questionProps } = question;
  const { visible: resultVisible, hasItems, ...resultProps } = result;
  const { visible: controlsVisible, ...controlsProps } = controls;

  return (
    <div role="dialog" aria-modal="true" aria-label="テスト" className={styles.dialog}>
      <DialogHeader
        phase={dialogPhase}
        posTitle={header.posTitle}
        groupTitle={header.groupTitle}
        timeLeftPct={header.timeLeftPct}
        onClose={header.onClose}
        questionKey={header.questionKey}
      />

      {questionVisible && <QuestionContent {...questionProps} />}

      {resultVisible && hasItems && <TestResult {...resultProps} />}

      {emptyLabelVisible && (
        <div className={styles.noItemsLabel} aria-live="polite">
          問題がありません
        </div>
      )}

      {controlsVisible && <TestControls {...controlsProps} />}

      <ConfirmCloseDialog {...confirm} />
    </div>
  );
};

export default TestDialogContent;
