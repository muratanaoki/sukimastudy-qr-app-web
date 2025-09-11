export enum PronounGroup {
  Personal = 'Personal/Possessive/Reflexive',
  IndefPersonThing = 'Indefinite (person/thing)',
  IndefQuantityPartitive = 'Indefinite (quantity/partitive)',
  Demonstrative = 'Demonstrative/Other',
}

export type PronounItem = {
  /** 通し番号（1〜） */
  index: number;
  /** 大ジャンル */
  group: PronounGroup;
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
