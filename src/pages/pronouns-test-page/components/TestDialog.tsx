import styles from './testDialog.module.css';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PosGroup, PronounGroup } from '../utils/type';
import { AnswerMode, ChoiceView } from '../utils/type';
import { useChoices, useTestRunner } from '../hooks/useTestRunner';
import { useAnswerFeedback } from '../hooks/useAnswerFeedback';
import { ChoiceList } from './internal/ChoiceList';
import { useTestSettings } from '../hooks/useTestSettings';
import JudgementControls from './internal/JudgementControls';
import { useSpeech } from '../hooks/useSpeech';
import { useAutoPronounce } from '../hooks/useAutoPronounce';
import { useListeningWordMask } from '../hooks/useListeningWordMask';
import { useOrderedItems } from '../hooks/useOrderedItems';
import TopBar from './internal/TopBar';

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
  const correctIndex = item ? choices.findIndex((c) => c === item.jp) : -1;

  const goNextOrClose = useCallback(() => goNext(onClose), [goNext, onClose]);

  const {
    disabled,
    handleAnswerIndex,
    getIndexDisplay,
    isCorrectHighlight,
    isWrongSelected,
    isDim,
    showGoodAt,
  } = useAnswerFeedback({
    isCorrect: (label) => !!item && label === item.jp,
    onNext: goNextOrClose,
    choices,
    correctIndex: correctIndex >= 0 ? correctIndex : undefined,
    currentKey: item?.term ?? current, // 問題切替キー
  });

  const handleSkip = useCallback(() => {
    goNextOrClose();
  }, [goNextOrClose]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  // ダイアログ再オープン時に念のため全体をリセット
  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  // 「和訳表示」ボタンの状態（問題切替でリセット）
  const [showTranslation, setShowTranslation] = useState(false);
  useEffect(() => {
    // 問題切替と再オープンの両方でリセット
    setShowTranslation(false);
  }, [item?.term, current, open]);

  // 表示用の英単語: Listening モードでは中央の英単語を「?」に置換
  const {
    displayTerm: maskedTerm,
    shouldShowRevealButton,
    reveal,
  } = useListeningWordMask({
    answerMode,
    choiceView,
    term: item?.term ?? null,
    currentIndexOrKey: item?.term ?? current,
    open,
  });
  const displayTerm = useMemo(() => {
    if (answerMode !== AnswerMode.Listening) return item?.term ?? '-';
    if (choiceView === ChoiceView.None) return showTranslation ? (item?.term ?? '-') : '?';
    return maskedTerm;
  }, [answerMode, choiceView, showTranslation, item?.term, maskedTerm]);

  // 自動発音の副作用を専用フックに集約
  useAutoPronounce({ open, term: item?.term ?? null, speakWord, cancel });

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="テスト" className={styles.dialog}>
      <TopBar
        posTitle={pos.title}
        groupTitle={group.title}
        timeLeftPct={timeLeftPct}
        onClose={handleClose}
        resetKey={item?.term ?? current}
      />

      {/* 中央の問題表示 */}
      <div className={styles.content}>
        <p className={styles.counter}>
          {current} / {total}
        </p>
        <h1 className={styles.word}>{displayTerm}</h1>
        {showTranslation && !!item?.jp && (
          <p className={styles.translation} aria-live="polite">
            {item.jp}
          </p>
        )}
      </div>

      {/* 下部の操作/選択肢 */}
      <div className={choiceView === ChoiceView.None ? styles.bottomNone : styles.bottom}>
        {choiceView === ChoiceView.Bottom4 && (
          <>
            <button
              type="button"
              className={styles.skipButton}
              aria-label="スキップ"
              onClick={handleSkip}
            >
              SKIP
            </button>

            {shouldShowRevealButton && (
              <button
                type="button"
                className={styles.revealWordButton}
                onClick={reveal}
                aria-label="単語を表示"
              >
                単語を表示
              </button>
            )}

            <ChoiceList
              choices={choices}
              disabled={disabled}
              getIndexDisplay={getIndexDisplay}
              isCorrectHighlight={isCorrectHighlight}
              isWrongSelected={isWrongSelected}
              isDim={isDim}
              showGoodAt={showGoodAt}
              onAnswer={(_, i) => {
                if (answerMode === AnswerMode.Listening) {
                  // 解答直後に単語を一瞬表示させる
                  reveal();
                }
                handleAnswerIndex(i);
              }}
            />
          </>
        )}

        {choiceView === ChoiceView.None && hasItems && (
          <JudgementControls
            showTranslation={showTranslation}
            onReveal={() => setShowTranslation(true)}
            onDontKnow={() => goNextOrClose()}
            onKnow={() => goNextOrClose()}
          />
        )}

        {!hasItems && (
          <div className={styles.choiceLabel} aria-live="polite">
            問題がありません
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDialog;
