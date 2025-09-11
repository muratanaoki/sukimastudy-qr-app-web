export type PronounItem = {
  /** 通し番号（1〜） */
  index: number;
  /** 大ジャンル */
  group:
    | 'Personal/Possessive/Reflexive'
    | 'Indefinite (person/thing)'
    | 'Indefinite (quantity/partitive)'
    | 'Demonstrative/Other';
  /** 中分類（例：一人称/二人称/三人称、some系など） */
  subGroup?: string;
  /** 英語 */
  term: string;
  /** IPA（American English） */
  ipa: string;
  /** 日本語訳 */
  jp: string;
};
