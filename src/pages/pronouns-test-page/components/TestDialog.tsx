import styles from './testDialog.module.css';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useCallback, useMemo, useState, useEffect } from 'react';
import clsx from 'clsx';
import type { JudgementButtonType, PosGroup, PronounGroup } from '../utils/type';
import { AnswerMode, ChoiceView } from '../utils/type';
import { useChoices, useTestRunner } from '../hooks/useTestRunner';
import { useAnswerFeedback } from '../hooks/useAnswerFeedback';
import { useTestSettings } from '../hooks/useTestSettings';
import { useSpeech } from '../hooks/useSpeech';
import { useAutoPronounce } from '../hooks/useAutoPronounce';
import { useOrderedItems } from '../hooks/useOrderedItems';
import { useFlashDisplay } from '../hooks/useFlashDisplay';
import { JUDGEMENT_BUTTON_TYPE, BUTTON_LABELS } from '../utils/const';
import {
  isJudgementMode,
  shouldFlash,
  getRevealButtonText,
  getDisplayWord,
  shouldShowTranslation,
} from '../utils/function';
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

  // 判定ボタンの選択状態
  const [selectedJudgement, setSelectedJudgement] = useState<JudgementButtonType | null>(null);

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
    setSelectedJudgement(null);
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

  const handleJudgementAnswer = useCallback(
    (buttonType: JudgementButtonType) => {
      setSelectedJudgement(buttonType);

      if (shouldFlash(choiceView)) {
        startFlash(() => {
          setSelectedJudgement(null);
          goNextOrClose();
        });
      } else {
        setSelectedJudgement(null);
        goNextOrClose();
      }
    },
    [choiceView, startFlash, goNextOrClose]
  );

  const handleRevealWord = useCallback(() => {
    setShowTranslation(true);
  }, [setShowTranslation]);

  // 副作用：自動発音
  useAutoPronounce({ open, term: item?.term ?? null, speakWord, cancel });

  // 問題変更時に選択状態をリセット
  useEffect(() => {
    setSelectedJudgement(null);
  }, [questionKey]);

  // 計算された値
  const displayWord = getDisplayWord(isFlashing, choiceView, item?.term, displayTerm);
  const revealButtonText = getRevealButtonText(answerMode);
  const showTranslationComputed = shouldShowTranslation(showTranslation, isFlashing, !!item?.jp);

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
        <h1 className={styles.word}>{displayWord}</h1>
        <p
          className={clsx(styles.translation, !showTranslationComputed && styles.translationHidden)}
          aria-live={showTranslationComputed ? 'polite' : undefined}
        >
          {item?.jp ?? ''}
        </p>
      </div>

      {/* 操作エリア */}
      <div className={isJudgementMode(choiceView) ? styles.bottomNone : styles.bottom}>
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
        {isJudgementMode(choiceView) && hasItems && (
          <JudgementArea
            showTranslation={showTranslation}
            isFlashing={isFlashing}
            onReveal={handleRevealWord}
            onDontKnow={() => handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.DONT_KNOW)}
            onKnow={() => handleJudgementAnswer(JUDGEMENT_BUTTON_TYPE.KNOW)}
            revealButtonText={revealButtonText}
            disabled={selectedJudgement !== null}
            selectedButton={selectedJudgement}
          />
        )}

        {/* 問題なしの場合 */}
        {!hasItems && (
          <div className={styles.noItemsLabel} aria-live="polite">
            {BUTTON_LABELS.NO_ITEMS}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDialog;
