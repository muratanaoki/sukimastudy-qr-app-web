import { PronounGroup, PronounItem, RawPronounItem, JudgementButtonType } from '../type';

import { MedalRank } from '../enum';

// 生データに通し番号を付与し、UI 側で扱いやすい `PronounItem` に変換するヘルパー
export const withIndex = (raw: RawPronounItem[]): PronounItem[] =>
  raw.map((d, i) => ({
    index: i + 1,
    term: d.term,
    ipa: d.ipa,
    jp: d.jp,
    examples: d.examples,
    choices: {
      enToJp: d.choices.enToJp,
    },
  }));

// URL以外のプロパティを持つグループの基底型
export type EnglishWordGroupBase = Omit<PronounGroup, 'url'>;

// URL生成やPOS_GROUPSは循環参照を避けるため、pos-groups.tsで定義される

export const FLASH_DURATION_MS = 500;

export const JUDGEMENT_BUTTON_TYPE = {
  KNOW: 'know',
  DONT_KNOW: 'dontKnow',
} as const satisfies Record<string, JudgementButtonType>;

export const BUTTON_LABELS = {
  REVEAL_TRANSLATION: '和訳表示',
  REVEAL_WORD: '単語表示',
  DONT_KNOW: '知らない',
  KNOW: '知ってる',
} as const;

export const MEDAL_RANKS = [MedalRank.Gold, MedalRank.Silver, MedalRank.Bronze] as const;
