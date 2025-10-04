import { PronounGroup, PronounItem, RawPronounItem, PosGroup, JudgementButtonType } from '../type';
import { ChartColumn, MousePointer, User, Users } from 'lucide-react';
import {
  PRONOUN_DATA_RAW_SOURCE1,
  PRONOUN_DATA_RAW_SOURCE2,
  PRONOUN_DATA_RAW_SOURCE3,
  PRONOUN_DATA_RAW_SOURCE4,
} from './pronoun';
import { MedalRank } from '../enum';

// 生データに通し番号を付与し、UI 側で扱いやすい `PronounItem` に変換するヘルパー
const withIndex = (raw: RawPronounItem[]): PronounItem[] =>
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

// URLを動的に生成するヘルパー関数
const createGroupUrl = (pos: string, index: number): string => `/${pos}?tab=${index + 1}`;

// 画面で使うグループ配列（現状は静的に定義。API 化する場合の元データとしても利用）
const PRONOUN_DATA_BASE = [
  {
    id: 'personal-pronouns',
    groupNo: 1,
    title: '人称・所有・再帰代名詞',
    abbr: '人称',
    icon: User,
    items: withIndex(PRONOUN_DATA_RAW_SOURCE1),
  },
  {
    id: 'indefinite-people',
    groupNo: 2,
    title: '不定代名詞（人・物・事）',
    abbr: '不定',
    icon: Users,
    items: withIndex(PRONOUN_DATA_RAW_SOURCE2),
  },
  {
    id: 'indefinite-quantity',
    groupNo: 3,
    title: '不定代名詞（数量・部分など）',
    abbr: '不定',
    icon: ChartColumn,
    items: withIndex(PRONOUN_DATA_RAW_SOURCE3),
  },
  {
    id: 'demonstrative-others',
    groupNo: 4,
    title: '指示代名詞・その他',
    abbr: '指示',
    icon: MousePointer,
    items: withIndex(PRONOUN_DATA_RAW_SOURCE4),
  },
];

export const PRONOUN_DATA: PronounGroup[] = PRONOUN_DATA_BASE.map((group, index) => ({
  ...group,
  url: createGroupUrl('pronouns', index),
}));

// 上位の「品詞グループ」レイヤ（今後他品詞を追加する拡張ポイント）
// - pos: 品詞キー（URLにも使える識別子）
// - url: 品詞トップのURL
// - title: 表示名
// - groups: 下位のグループ配列（上の DATA をそのまま利用）
export const POS_GROUPS: PosGroup[] = [
  {
    pos: 'pronouns',
    title: '代名詞',
    groups: PRONOUN_DATA_BASE.map((group, index) => ({
      ...group,
      url: createGroupUrl('pronouns', index),
    })),
  },
  // {
  //   pos: 'others',
  //   url: '/others',
  //   title: 'その他',
  //   groups: DATA,
  // },
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
