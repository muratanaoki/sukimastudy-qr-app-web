import type { AnimationEvent, ComponentProps } from 'react';
import clsx from 'clsx';
import styles from '../testDialog.module.css';
import { DialogHeader } from './DialogHeader';
import QuestionContent from './QuestionContent';
import TestControls from './TestControls';
import TestResult from './TestResult';
import { ConfirmCloseDialog } from './ConfirmCloseDialog';
import type { TestDialogPhase } from '../../../utils/dialog/dialogPhase';

/**
 * テストダイアログの実際の構造を描画するコンテナコンポーネント。
 * - ヘッダー、質問、結果、操作、確認ダイアログを 1 か所でレイアウトする。
 * - 親コンポーネントから受け取った props をそのまま子コンポーネントへ渡すブリッジの役割。
 */

const CLOSE_ANIMATION_NAME = 'dialogSlideDown';

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
  closing: boolean;
  onCloseAnimationEnd: () => void;
};

export const TestDialogContent = ({
  dialogPhase,
  header,
  question,
  result,
  emptyLabelVisible,
  controls,
  confirm,
  closing,
  onCloseAnimationEnd,
}: TestDialogContentProps) => {
  const { visible: questionVisible, ...questionProps } = question;
  const { visible: resultVisible, hasItems, ...resultProps } = result;
  const { visible: controlsVisible, ...controlsProps } = controls;

  // CSS アニメーションの終了タイミングで閉じ処理を呼び出す
  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (!closing) return;
    if (event.target !== event.currentTarget) return;
    if (event.animationName !== CLOSE_ANIMATION_NAME) return;
    onCloseAnimationEnd();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="テスト"
      className={clsx(styles.dialog, closing && styles.dialogClosing)}
      onAnimationEnd={handleAnimationEnd}
    >
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
