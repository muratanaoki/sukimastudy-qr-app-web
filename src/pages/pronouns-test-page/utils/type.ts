export type PronounItem = {
  /** 通し番号（1〜） */
  index: number;
  /** 英語 */
  term: string;
  /** IPA（American English） */
  ipa: string;
  /** 日本語訳 */
  jp: string;
  /** 例文（中1レベル、英語のみ） */
  exJ1?: string;
  /** 例文（中2レベル、英語のみ） */
  exJ2?: string;
  /** 例文（中3レベル、英語のみ） */
  exJ3?: string;
  /** 例文（中1レベル）の日本語訳 */
  exJ1Jp?: string;
  /** 例文（中2レベル）の日本語訳 */
  exJ2Jp?: string;
  /** 例文（中3レベル）の日本語訳 */
  exJ3Jp?: string;
};

export type ExampleEntry = { en?: string; jp?: string };

// ページ全体のラップデータ（単一グループ運用想定）
export type PronounData = {
  groupNo: number; // 連番（将来複数化してもよい）
  title: string; // 日本語タイトル
  items: PronounItem[]; // 本体
};
