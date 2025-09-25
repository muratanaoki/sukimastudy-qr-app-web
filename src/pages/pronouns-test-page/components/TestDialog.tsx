import styles from './testDialog.module.css';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import type { PosGroup, PronounGroup } from '../utils/type';
import { AnswerMode, ChoiceView } from '../utils/type';
import { useChoices, useTestRunner } from '../hooks/useTestRunner';
import { useAnswerFeedback } from '../hooks/useAnswerFeedback';
import { useTestSettings } from '../hooks/useTestSettings';
import { useSpeech } from '../hooks/useSpeech';
import { useAutoPronounce } from '../hooks/useAutoPronounce';
import { useOrderedItems } from '../hooks/useOrderedItems';
import TopBar from './internal/TopBar';
import { useTestDisplay } from '../hooks/useTestDisplay';
import ChoiceArea from './internal/ChoiceArea';
import JudgementArea from './internal/JudgementArea';

export type TestDialogProps = {
  open: boolean;
  onClose: () => void;
  pos: PosGroup; // 上位の品詞グループ（単数）
  group: PronounGroup; // 現在テスト中の下位グループ
};

export const TestDialog = ({ open, onClose, pos, group }: TestDialogProps) => {
  useEscapeKey(onClose, open);

  const { choiceView, questionOrder, answerMode } = useTestSettings();
  const { speakWord, cancel } = useSpeech();

  // 出題順序の再構築（再オープン含む）
  const orderedItems = useOrderedItems(open, group.items, questionOrder);

  const { state, goNext, hasItems, reset } = useTestRunner(open, orderedItems);
  const { total, current, timeLeftPct, item } = state;
  const choices = useChoices(item);
  const correctIndex = useMemo(
    () => (item ? choices.findIndex((c) => c === item.jp) : -1),
    [item, choices]
  );
  const questionKey = item?.term ?? current;

  const goNextOrClose = useCallback(() => goNext(onClose), [goNext, onClose]);

  const feedback = useAnswerFeedback({
    isCorrect: (label) => !!item && label === item.jp,
    onNext: goNextOrClose,
    choices,
    correctIndex: correctIndex >= 0 ? correctIndex : undefined,
    currentKey: questionKey, // 問題切替キー
  });

  const { displayTerm, showTranslation, setShowTranslation, shouldShowRevealButton, reveal } =
    useTestDisplay({
      open,
      answerMode,
      choiceView,
      itemTerm: item?.term ?? null,
      currentKey: questionKey,
    });

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleAnswer = useCallback(
    (_: string, i: number) => {
      if (answerMode === AnswerMode.Listening) reveal();
      feedback.handleAnswerIndex(i);
    },
    [answerMode, reveal, feedback]
  );

  // 自動発音の副作用を専用フックに集約
  useAutoPronounce({ open, term: item?.term ?? null, speakWord, cancel, skipFirstOnOpen: true });

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="テスト" className={styles.dialog}>
      <TopBar
        posTitle={pos.title}
        groupTitle={group.title}
        timeLeftPct={timeLeftPct}
        onClose={handleClose}
        resetKey={questionKey}
      />

      {/* 中央の問題表示 */}
      <div className={styles.content}>
        <p className={styles.counter}>
          {current} / {total}
        </p>
        <h1 className={styles.word}>{displayTerm}</h1>
        <p
          className={clsx(
            styles.translation,
            (!showTranslation || !item?.jp) && styles.translationHidden
          )}
          aria-live={showTranslation && item?.jp ? 'polite' : undefined}
        >
          {item?.jp ?? ''}
        </p>
      </div>

      {/* 下部の操作/選択肢 */}
      <div className={choiceView === ChoiceView.None ? styles.bottomNone : styles.bottom}>
        {choiceView === ChoiceView.Bottom4 && (
          <ChoiceArea
            showReveal={shouldShowRevealButton}
            onReveal={reveal}
            onSkip={feedback.handleSkipAsCorrect}
            choices={choices}
            disabled={feedback.disabled}
            getIndexDisplay={feedback.getIndexDisplay}
            isCorrectHighlight={feedback.isCorrectHighlight}
            isWrongSelected={feedback.isWrongSelected}
            isDim={feedback.isDim}
            showGoodAt={feedback.showGoodAt}
            onAnswer={handleAnswer}
          />
        )}

        {choiceView === ChoiceView.None && hasItems && (
          <JudgementArea
            showTranslation={showTranslation}
            onReveal={() => setShowTranslation(true)}
            onDontKnow={() => goNextOrClose()}
            onKnow={() => goNextOrClose()}
          />
        )}

        {!hasItems && (
          <div className={styles.noItemsLabel} aria-live="polite">
            問題がありません
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDialog;
