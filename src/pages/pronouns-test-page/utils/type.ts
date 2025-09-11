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
};
