import { ChoiceView } from '../../utils/type';
import { isJudgementMode } from '../../utils/function';
import ChoiceArea from './ChoiceArea';
import JudgementControls from './JudgementControls';
import styles from '../testDialog.module.css';
import type { ChoiceOption } from '../../hooks/useTestRunner';

interface TestControlsProps {
  choiceView: ChoiceView;
  isCompleted: boolean;
  hasItems: boolean;

  // Choice mode props
  choices?: ChoiceOption[];
  shouldShowRevealButton?: boolean;
  onReveal?: () => void;
  isRevealed?: boolean;
  onSkip?: () => void;
  disabled?: boolean;
  getIndexDisplay?: (index: number) => number;
  isCorrectHighlight?: (index: number) => boolean;
  isWrongSelected?: (index: number) => boolean;
  isDim?: (index: number) => boolean;
  showGoodAt?: (index: number) => boolean;
  onAnswer?: (choiceId: string, index: number) => void;

  // Judgement mode props
  showTranslation?: boolean;
  onRevealWord?: () => void;
  onDontKnow?: () => void;
  onKnow?: () => void;
  revealButtonText?: string;
  judgementDisabled?: boolean;
  selectedButton?: any;
}

const TestControls = ({ choiceView, isCompleted, hasItems, ...props }: TestControlsProps) => {
  const isJudgement = isJudgementMode(choiceView);

  return (
    <div className={isJudgement ? styles.bottomNone : styles.bottom}>
      {/* 4択選択肢モード */}
      {choiceView === ChoiceView.Bottom4 && !isCompleted && (
        <ChoiceArea
          showReveal={props.shouldShowRevealButton!}
          onReveal={props.onReveal!}
          isRevealed={props.isRevealed!}
          onSkip={props.onSkip!}
          choices={props.choices!}
          disabled={props.disabled!}
          getIndexDisplay={props.getIndexDisplay!}
          isCorrectHighlight={props.isCorrectHighlight!}
          isWrongSelected={props.isWrongSelected!}
          isDim={props.isDim!}
          showGoodAt={props.showGoodAt!}
          onAnswer={props.onAnswer!}
        />
      )}

      {/* 知ってる/知らないモード */}
      {isJudgement && hasItems && !isCompleted && (
        <JudgementControls
          showTranslation={props.showTranslation!}
          onReveal={props.onRevealWord!}
          onDontKnow={props.onDontKnow!}
          onKnow={props.onKnow!}
          revealButtonText={props.revealButtonText!}
          disabled={props.judgementDisabled!}
          selectedButton={props.selectedButton}
        />
      )}
    </div>
  );
};

export default TestControls;
