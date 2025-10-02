import type { LucideIcon } from 'lucide-react';

/**
 * Pronouns テストで利用するドメインモデル群。
 * - Firestore 等の永続層ではなく、現在は静的データを前提にした型定義を集約。
 * - UI コンポーネントやロジック層が同じ型を共有することで、データ整合性を担保する。
 */
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
  choices: QAChoices;
};

/**
 * 出題モードごとの選択肢。固定長 3 件に揃えることでインデックスアクセスを単純化している。
 */
export type QAChoices = {
  enToJp: [string, string, string];
  jpToEn: [string, string, string];
};

/**
 * 例文データ。レベルは 1(易)〜3(難) で UI の難易度ラベルに利用。
 */
export type ExampleEntry = { en?: string; jp?: string; level?: 1 | 2 | 3 };

// 単一グループ
export type PronounGroup = {
  id: string; // 安定した識別子
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
  choices: QAChoices;
};

export type Segment = { start: number; end: number; items: PronounItem[] };

export type MedalRank = 'gold' | 'silver' | 'bronze';

export type MedalStoreState = {
  version: number;
  updatedAt: string;
  medals: Record<string, MedalRank>;
};

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

export type JudgementButtonType = 'know' | 'dontKnow';
