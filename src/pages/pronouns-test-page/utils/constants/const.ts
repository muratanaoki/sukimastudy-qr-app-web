import { PronounGroup, PronounItem, RawPronounItem, PosGroup, JudgementButtonType } from '../type';
import { MapPin } from 'lucide-react';

import { MedalRank } from '../enum';
import { PRONOUN_DATA_BASE } from './pronoun';

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

// URLを動的に生成するヘルパー関数
const createGroupUrl = (pos: string, index: number): string => `/${pos}?tab=${index + 1}`;

// グループにURLを付与するヘルパー関数
const addUrlToGroups = (groups: EnglishWordGroupBase[], pos: string): PronounGroup[] =>
  groups.map((group, index) => ({
    ...group,
    url: createGroupUrl(pos, index),
  }));

export const PRONOUN_DATA: PronounGroup[] = addUrlToGroups(PRONOUN_DATA_BASE, 'pronouns');

// 上位の「品詞グループ」レイヤ（今後他品詞を追加する拡張ポイント）
// - pos: 品詞キー（URLにも使える識別子）
// - url: 品詞トップのURL
// - title: 表示名
// - groups: 下位のグループ配列（上の DATA をそのまま利用）
export const POS_GROUPS: PosGroup[] = [
  {
    pos: 'pronouns',
    title: '代名詞',
    groups: addUrlToGroups(PRONOUN_DATA_BASE, 'pronouns'),
  },
  {
    pos: 'prepositions',
    title: '前置詞',
    groups: addUrlToGroups(PRONOUN_DATA_BASE, 'prepositions'),
  },
];

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
