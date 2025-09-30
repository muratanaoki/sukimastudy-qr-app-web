import { BUTTON_LABELS } from '../constants/const';
import { PronounItem, ExampleEntry, Segment, ChoiceView, AnswerMode } from './type';

// PronounItem から例文配列を生成（空のものは除外）
export function buildExamples(item: PronounItem): ExampleEntry[] {
  return Array.isArray(item.examples) ? item.examples : [];
}

/**
 * items を index 昇順に  segmentSize 個ずつに分割。端数はそのまま最後のセグメント。
 * items が既に昇順なら sort コストを避けたいケースのために `assumeSorted` フラグあり。
 */
export function segmentItems(
  items: PronounItem[],
  segmentSize: number,
  { assumeSorted = false }: { assumeSorted?: boolean } = {}
): Segment[] {
  if (!items.length || segmentSize <= 0) return [];
  const src = assumeSorted ? items : [...items].sort((a, b) => a.index - b.index);
  const segments: Segment[] = [];
  for (let i = 0; i < src.length; i += segmentSize) {
    const slice = src.slice(i, i + segmentSize);
    if (!slice.length) continue;
    segments.push({ start: slice[0].index, end: slice[slice.length - 1].index, items: slice });
  }
  return segments;
}

/**
 * 判定モード（知ってる/知らない）かどうかを判定
 */
export const isJudgementMode = (choiceView: ChoiceView): boolean => {
  return choiceView === ChoiceView.None;
};

/**
 * リスニングモードかどうかを判定
 */
export const isListeningMode = (answerMode: AnswerMode): boolean => {
  return answerMode === AnswerMode.Listening;
};

/**
 * フラッシュ表示が必要かどうかを判定
 */
export const shouldFlash = (choiceView: ChoiceView): boolean => {
  return isJudgementMode(choiceView);
};

/**
 * リビールボタンのテキストを取得
 */
export const getRevealButtonText = (answerMode: AnswerMode): string => {
  return isListeningMode(answerMode) ? BUTTON_LABELS.REVEAL_WORD : BUTTON_LABELS.REVEAL_TRANSLATION;
};

/**
 * 表示する英単語を取得（フラッシュ時は元の英単語、それ以外は表示用の単語）
 */
export const getDisplayWord = (
  isFlashing: boolean,
  choiceView: ChoiceView,
  originalTerm: string | undefined,
  displayTerm: string
): string => {
  return isFlashing && isJudgementMode(choiceView) ? originalTerm || '' : displayTerm;
};

/**
 * 翻訳を表示すべきかどうかを判定
 */
export const shouldShowTranslation = (
  showTranslation: boolean,
  isFlashing: boolean,
  hasTranslation: boolean
): boolean => {
  return (showTranslation || isFlashing) && hasTranslation;
};
