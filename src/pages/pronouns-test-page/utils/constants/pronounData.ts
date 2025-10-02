import {
  PronounGroup,
  PronounItem,
  RawPronounItem,
  PosGroup,
  JudgementButtonType,
} from '../domain/type';
import { ChartColumn, MousePointer, User, Users } from 'lucide-react';
import { DATA_RAW_SOURCE1, DATA_RAW_SOURCE2, DATA_RAW_SOURCE3, DATA_RAW_SOURCE4 } from './const';

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
      jpToEn: d.choices.jpToEn,
    },
  }));

// 生データ（そのままエクスポート）
export const DATA_RAW1: RawPronounItem[] = DATA_RAW_SOURCE1;
export const DATA_RAW2: RawPronounItem[] = DATA_RAW_SOURCE2;
export const DATA_RAW3: RawPronounItem[] = DATA_RAW_SOURCE3;
export const DATA_RAW4: RawPronounItem[] = DATA_RAW_SOURCE4;

// 画面で使うグループ配列（現状は静的に定義。API 化する場合の元データとしても利用）
export const DATA: PronounGroup[] = [
  {
    id: 'personal-pronouns',
    groupNo: 1,
    title: '人称・所有・再帰代名詞',
    abbr: '人称',
    icon: User,
    url: '/pronouns?tab=1',
    items: withIndex(DATA_RAW1),
  },
  {
    id: 'indefinite-people',
    groupNo: 2,
    title: '不定代名詞（人・物・事）',
    abbr: '不定',
    icon: Users,
    url: '/pronouns?tab=2',
    items: withIndex(DATA_RAW2),
  },
  {
    id: 'indefinite-quantity',
    groupNo: 3,
    title: '不定代名詞（数量・部分など）',
    abbr: '不定',
    icon: ChartColumn,
    url: '/pronouns?tab=3',
    items: withIndex(DATA_RAW3),
  },
  {
    id: 'demonstrative-others',
    groupNo: 4,
    title: '指示代名詞・その他',
    abbr: '指示',
    icon: MousePointer,
    url: '/pronouns?tab=4',
    items: withIndex(DATA_RAW4),
  },
];

// 上位の「品詞グループ」レイヤ（今後他品詞を追加する拡張ポイント）
// - pos: 品詞キー（URLにも使える識別子）
// - url: 品詞トップのURL
// - title: 表示名
// - groups: 下位のグループ配列（上の DATA をそのまま利用）
export const POS_GROUPS: PosGroup[] = [
  {
    pos: 'pronouns',
    url: '/pronouns',
    title: '代名詞',
    groups: DATA,
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
