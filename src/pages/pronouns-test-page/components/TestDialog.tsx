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
import { useFlashDisplay } from '../hooks/useFlashDisplay';
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

  // 設定とメインフック群
  const { choiceView, questionOrder, answerMode } = useTestSettings();
  const { speakWord, cancel } = useSpeech();
  const { isFlashing, startFlash, cancelFlash } = useFlashDisplay();

  // テスト実行状態
  const orderedItems = useOrderedItems(open, group.items, questionOrder);
  const { state, goNext, hasItems, reset } = useTestRunner(open, orderedItems);
  const { total, current, timeLeftPct, item } = state;

  // 選択肢とUI表示関連
  const choices = useChoices(item);
  const correctIndex = useMemo(
    () => (item ? choices.findIndex((c) => c === item.jp) : -1),
    [item, choices]
  );
  const questionKey = item?.term ?? current;

  // テスト進行の基本ロジック
  const goNextOrClose = useCallback(() => goNext(onClose), [goNext, onClose]);

  // 回答フィードバック処理
  const feedback = useAnswerFeedback({
    isCorrect: (label) => !!item && label === item.jp,
    onNext: goNextOrClose,
    choices,
    correctIndex: correctIndex >= 0 ? correctIndex : undefined,
    currentKey: questionKey,
  });

  // 表示制御（問題文、翻訳など）
  const { displayTerm, showTranslation, setShowTranslation, shouldShowRevealButton, reveal } =
    useTestDisplay({
      open,
      answerMode,
      choiceView,
      itemTerm: item?.term ?? null,
      currentKey: questionKey,
    });

  // イベントハンドラー群
  const handleDialogClose = useCallback(() => {
    cancelFlash();
    reset();
    onClose();
  }, [cancelFlash, reset, onClose]);

  const handleChoiceAnswer = useCallback(
    (_: string, i: number) => {
      if (answerMode === AnswerMode.Listening) reveal();
      feedback.handleAnswerIndex(i);
    },
    [answerMode, reveal, feedback]
  );

  const handleJudgementAnswer = useCallback((isKnown: boolean) => {
    const isListeningMode = answerMode === AnswerMode.Listening && choiceView === ChoiceView.None;

    if (isListeningMode) {
      startFlash(() => goNextOrClose());
    } else {
      goNextOrClose();
    }
  }, [answerMode, choiceView, startFlash, goNextOrClose]);

  const handleRevealWord = useCallback(() => {
    setShowTranslation(true);
  }, [setShowTranslation]);

  // 副作用：自動発音
  useAutoPronounce({ open, term: item?.term ?? null, speakWord, cancel });

  // レンダリング
  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="テスト" className={styles.dialog}>
      <TopBar
        posTitle={pos.title}
        groupTitle={group.title}
        timeLeftPct={timeLeftPct}
        onClose={handleDialogClose}
        resetKey={questionKey}
      />

      {/* 問題表示エリア */}
      <div className={styles.content}>
        <p className={styles.counter}>
          {current} / {total}
        </p>
        <h1 className={styles.word}>{isFlashing ? item?.term : displayTerm}</h1>
        <p
          className={clsx(
            styles.translation,
            (!showTranslation || !item?.jp) && !isFlashing && styles.translationHidden
          )}
          aria-live={showTranslation && item?.jp ? 'polite' : undefined}
        >
          {item?.jp ?? ''}
        </p>
      </div>

      {/* 操作エリア */}
      <div className={choiceView === ChoiceView.None ? styles.bottomNone : styles.bottom}>
        {/* 4択選択肢モード */}
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
            onAnswer={handleChoiceAnswer}
          />
        )}

        {/* 知ってる/知らないモード */}
        {choiceView === ChoiceView.None && hasItems && (
          <JudgementArea
            showTranslation={showTranslation || isFlashing}
            onReveal={handleRevealWord}
            onDontKnow={() => handleJudgementAnswer(false)}
            onKnow={() => handleJudgementAnswer(true)}
            revealButtonText={answerMode === AnswerMode.Listening ? '単語表示' : '和訳表示'}
          />
        )}

        {/* 問題なしの場合 */}
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
