import { getDisplayWord, getRevealButtonText, shouldShowTranslation } from '../domain/function';
import { ChoiceView, AnswerMode } from '../domain/type';
import { TestDialogPhase } from './dialogPhase';

type BuildTestDialogViewParams = {
  phase: TestDialogPhase;
  choiceView: ChoiceView;
  answerMode: AnswerMode;
  term: string | null;
  displayTerm: string;
  isFlashing: boolean;
  showTranslationState: boolean;
  hasTranslation: boolean;
};

type TestDialogView = {
  showQuestion: boolean;
  showResult: boolean;
  showEmpty: boolean;
  displayWord: string;
  revealButtonText: string;
  showTranslation: boolean;
};

export const buildTestDialogView = ({
  phase,
  choiceView,
  answerMode,
  term,
  displayTerm,
  isFlashing,
  showTranslationState,
  hasTranslation,
}: BuildTestDialogViewParams): TestDialogView => {
  const showQuestion = phase === TestDialogPhase.InProgress;
  const showResult = phase === TestDialogPhase.Completed;
  const showEmpty = phase === TestDialogPhase.Empty;

  const displayWord = showQuestion
    ? getDisplayWord(isFlashing, choiceView, term ?? undefined, displayTerm)
    : '';
  const revealButtonText = showQuestion ? getRevealButtonText(answerMode) : '';
  const showTranslation = showQuestion
    ? shouldShowTranslation(showTranslationState, isFlashing, hasTranslation)
    : false;

  return {
    showQuestion,
    showResult,
    showEmpty,
    displayWord,
    revealButtonText,
    showTranslation,
  };
};

export type { TestDialogView, BuildTestDialogViewParams };
