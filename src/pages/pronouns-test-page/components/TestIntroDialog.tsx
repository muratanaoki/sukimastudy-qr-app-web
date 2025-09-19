import styles from '../index.module.css';
import { FileCheck, CircleCheck, Circle, Settings } from 'lucide-react';
import type { PronounItem } from '../utils/type';
import { useCallback, useMemo, useState } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { segmentItems } from '../utils/function';
import clsx from 'clsx';
import { PrimaryButton } from '../../../shared/components/primary-button/PrimaryButton';
import { SecondaryButton } from '../../../shared/components/secondary-button/SecondaryButton';

export type TestIntroDialogProps = {
  items: PronounItem[];
  onClose: () => void;
  onSelectRange?: (range: { start: number; end: number; items: PronounItem[] }) => void;
  onStart?: (payload: {
    start: number;
    end: number;
    items: PronounItem[];
    questionOrder: QuestionOrder;
    answerMode: AnswerMode;
  }) => void;
  segmentSize?: number; // default 10
  selectedRange?: { start: number; end: number } | null;
};

type AnswerOption = 'ari' | 'nashi';
type QuestionOrder = 'standard' | 'random';
type AnswerMode = 'normal' | 'listening';
type Segment = { start: number; end: number; items: PronounItem[] };

function AnswerOptionSelector({
  value,
  onChange,
}: {
  value: AnswerOption;
  onChange: (v: AnswerOption) => void;
}) {
  return (
    <div className={styles.testChoiceRow} role="radiogroup" aria-label="解答の選択肢">
      <label
        htmlFor="answer-option-ari"
        className={clsx(styles.testChoiceItem, value === 'ari' && styles.testChoiceItemSelected)}
      >
        <input
          id="answer-option-ari"
          name="answer-option"
          type="radio"
          className={styles.testChoiceInput}
          checked={value === 'ari'}
          onChange={() => onChange('ari')}
        />
        {value === 'ari' ? (
          <CircleCheck
            aria-hidden="true"
            className={clsx(styles.testChoiceIcon, styles.testChoiceIconSelected)}
          />
        ) : (
          <Circle aria-hidden="true" className={styles.testChoiceIcon} />
        )}
        <span>あり</span>
      </label>
      <label
        htmlFor="answer-option-nashi"
        className={clsx(styles.testChoiceItem, value === 'nashi' && styles.testChoiceItemSelected)}
      >
        <input
          id="answer-option-nashi"
          name="answer-option"
          type="radio"
          className={styles.testChoiceInput}
          checked={value === 'nashi'}
          onChange={() => onChange('nashi')}
        />
        {value === 'nashi' ? (
          <CircleCheck
            aria-hidden="true"
            className={clsx(styles.testChoiceIcon, styles.testChoiceIconSelected)}
          />
        ) : (
          <Circle aria-hidden="true" className={styles.testChoiceIcon} />
        )}
        <span>なし</span>
      </label>
    </div>
  );
}

function RangeGrid({
  segments,
  selectedRange,
  segmentSize,
  onSelectRange,
}: {
  segments: Segment[];
  selectedRange: { start: number; end: number } | null | undefined;
  segmentSize: number;
  onSelectRange?: (seg: Segment) => void;
}) {
  const isSelected = useCallback(
    (seg: Segment) =>
      !!selectedRange && seg.start === selectedRange.start && seg.end === selectedRange.end,
    [selectedRange]
  );

  return (
    <div className={styles.testRangeGrid} role="list">
      {segments.map((seg) => (
        <button
          key={`${seg.start}-${seg.end}`}
          type="button"
          role="listitem"
          aria-pressed={isSelected(seg) ? 'true' : 'false'}
          className={clsx(
            styles.testRangeButton,
            isSelected(seg) && styles.testRangeButtonSelected
          )}
          onClick={() => onSelectRange?.(seg)}
        >
          {seg.start}~{seg.end}語
          {seg.items.length < segmentSize && seg.items.length !== 0 && (
            <span className={styles.testRangeBadge}>{seg.items.length}</span>
          )}
        </button>
      ))}
    </div>
  );
}

function QuestionOrderSelector({
  value,
  onChange,
}: {
  value: QuestionOrder;
  onChange: (v: QuestionOrder) => void;
}) {
  return (
    <div className={styles.testChoiceRow} role="radiogroup" aria-label="出題方法">
      <label
        htmlFor="question-order-standard"
        className={clsx(
          styles.testChoiceItem,
          value === 'standard' && styles.testChoiceItemSelected
        )}
      >
        <input
          id="question-order-standard"
          name="question-order"
          type="radio"
          className={styles.testChoiceInput}
          checked={value === 'standard'}
          onChange={() => onChange('standard')}
        />
        {value === 'standard' ? (
          <CircleCheck
            aria-hidden="true"
            className={clsx(styles.testChoiceIcon, styles.testChoiceIconSelected)}
          />
        ) : (
          <Circle aria-hidden="true" className={styles.testChoiceIcon} />
        )}
        <span>標準</span>
      </label>
      <label
        htmlFor="question-order-random"
        className={clsx(styles.testChoiceItem, value === 'random' && styles.testChoiceItemSelected)}
      >
        <input
          id="question-order-random"
          name="question-order"
          type="radio"
          className={styles.testChoiceInput}
          checked={value === 'random'}
          onChange={() => onChange('random')}
        />
        {value === 'random' ? (
          <CircleCheck
            aria-hidden="true"
            className={clsx(styles.testChoiceIcon, styles.testChoiceIconSelected)}
          />
        ) : (
          <Circle aria-hidden="true" className={styles.testChoiceIcon} />
        )}
        <span>ランダム</span>
      </label>
    </div>
  );
}

function AnswerModeSelector({
  value,
  onChange,
}: {
  value: AnswerMode;
  onChange: (v: AnswerMode) => void;
}) {
  return (
    <div className={styles.testChoiceRow} role="radiogroup" aria-label="解答モード">
      <label
        htmlFor="answer-mode-normal"
        className={clsx(styles.testChoiceItem, value === 'normal' && styles.testChoiceItemSelected)}
      >
        <input
          id="answer-mode-normal"
          name="answer-mode"
          type="radio"
          className={styles.testChoiceInput}
          checked={value === 'normal'}
          onChange={() => onChange('normal')}
        />
        {value === 'normal' ? (
          <CircleCheck
            aria-hidden="true"
            className={clsx(styles.testChoiceIcon, styles.testChoiceIconSelected)}
          />
        ) : (
          <Circle aria-hidden="true" className={styles.testChoiceIcon} />
        )}
        <span>通常</span>
      </label>
      <label
        htmlFor="answer-mode-listening"
        className={clsx(
          styles.testChoiceItem,
          value === 'listening' && styles.testChoiceItemSelected
        )}
      >
        <input
          id="answer-mode-listening"
          name="answer-mode"
          type="radio"
          className={styles.testChoiceInput}
          checked={value === 'listening'}
          onChange={() => onChange('listening')}
        />
        {value === 'listening' ? (
          <CircleCheck
            aria-hidden="true"
            className={clsx(styles.testChoiceIcon, styles.testChoiceIconSelected)}
          />
        ) : (
          <Circle aria-hidden="true" className={styles.testChoiceIcon} />
        )}
        <span>リスニング</span>
      </label>
    </div>
  );
}

export function TestIntroDialog({
  items,
  onClose,
  onSelectRange,
  onStart,
  segmentSize = 10,
  selectedRange,
}: TestIntroDialogProps) {
  useEscapeKey(onClose, true);

  // --- range segmentation (memoized) ---
  const segments = useMemo(
    () => segmentItems(items, segmentSize, { assumeSorted: false }),
    [items, segmentSize]
  );
  const selectedSegment = useMemo(() => {
    if (!selectedRange) return undefined;
    return segments.find((s) => s.start === selectedRange.start && s.end === selectedRange.end);
  }, [segments, selectedRange]);

  // 解答の選択肢（単一選択: あり / なし）
  const [answerOption, setAnswerOption] = useState<AnswerOption>('ari');
  // 出題方法（標準 / ランダム）
  const [questionOrder, setQuestionOrder] = useState<QuestionOrder>('standard');
  // 解答モード（通常 / リスニング）
  const [answerMode, setAnswerMode] = useState<AnswerMode>('normal');

  const handleStart = useCallback(() => {
    if (selectedSegment)
      onStart?.({
        ...selectedSegment,
        questionOrder,
        answerMode,
      });
  }, [onStart, selectedSegment, questionOrder, answerMode]);

  return (
    <div
      className={styles.testOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="test-intro-title"
    >
      <div className={styles.testDialog}>
        <div className={styles.testDialogIconWrap}>
          <FileCheck className={styles.testDialogIcon} />
        </div>
        <div className={styles.testDialogInner}>
          <div className={styles.testDialogHeader}>
            <div className={styles.testDialogHeaderRightRow}>
              <button
                type="button"
                className={styles.testDialogSettingsButton}
                aria-label="設定を変更"
                title="設定を変更"
              >
                <Settings aria-hidden="true" />
                設定
              </button>
            </div>

            <div className={styles.testDialogHeaderLeftRow}>
              <h2 className={styles.testDialogTitle}>解答の選択肢</h2>
              <AnswerOptionSelector value={answerOption} onChange={setAnswerOption} />
            </div>
            <div className={styles.testDialogHeaderLeftRow}>
              <h2 className={styles.testDialogTitle}>解答モード</h2>
              <AnswerModeSelector value={answerMode} onChange={setAnswerMode} />
            </div>
            <div className={styles.testDialogHeaderLeftRow}>
              <h2 className={styles.testDialogTitle}>出題方法</h2>
              <QuestionOrderSelector value={questionOrder} onChange={setQuestionOrder} />
            </div>
          </div>
          <div className={styles.testDialogHeaderLeftRow}>
            <h2 className={styles.testDialogTitle}>テスト範囲を選択</h2>
          </div>
          <RangeGrid
            segments={segments}
            selectedRange={selectedRange}
            segmentSize={segmentSize}
            onSelectRange={onSelectRange}
          />
          <div className={styles.testDialogActions}>
            <SecondaryButton type="button" onClick={onClose}>
              閉じる
            </SecondaryButton>
            <PrimaryButton type="button" disabled={!selectedSegment} onClick={handleStart}>
              スタート
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
