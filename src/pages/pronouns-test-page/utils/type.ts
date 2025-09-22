import type { LucideIcon } from 'lucide-react';
export type PronounItem = {
  /** 通し番号（1〜） */
  index: number;
  /** 英語 */
  term: string;
  /** IPA（American English） */
  ipa: string;
  /** 日本語訳 */
  jp: string;
  /** 例文配列 */
  examples: ExampleEntry[];
};

export type ExampleEntry = { en?: string; jp?: string; level?: 1 | 2 | 3 };

// 単一グループ
export type PronounGroup = {
  groupNo: number; // 連番（将来複数化してもよい）
  title: string; // 日本語タイトル
  abbr: string; // タブ用の短い表示（2文字程度）
  items: PronounItem[]; // 本体
  url: string; // グループの URL
  icon: LucideIcon; // 見出し用アイコン（未指定時は既定の User）
};

// 入力データ（完全移行後: examples を必須に）
export type RawPronounItem = {
  term: string;
  ipa: string;
  jp: string;
  examples: ExampleEntry[];
};

export type Segment = { start: number; end: number; items: PronounItem[] };

// 上位の品詞レベル（将来拡張を見越してユニオンで定義）
export type PartOfSpeech = 'pronouns' | 'others';

// 品詞グループ（上位）: URL と表示名、下位グループの配列
export type PosGroup = {
  pos: PartOfSpeech;
  url: string;
  title: string;
  groups: PronounGroup[];
};

// ===== Settings types (Pronouns Test) =====
export enum ChoiceView {
  Bottom4 = 'bottom4',
  None = 'none',
}

export enum QuestionOrder {
  Standard = 'standard',
  Random = 'random',
}

export enum AnswerMode {
  Normal = 'normal',
  Listening = 'listening',
}
