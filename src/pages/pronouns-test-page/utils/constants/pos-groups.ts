import { PronounGroup, PosGroup } from '../type';
import { EnglishWordGroupBase } from './const';
import { PRONOUN_DATA_BASE } from './pronoun';
import { PREPOSITION_DATA_BASE } from './preposition';

// URLを動的に生成するヘルパー関数
const createGroupUrl = (pos: string, index: number): string => `/${pos}?tab=${index + 1}`;

// グループにURLを付与するヘルパー関数
const addUrlToGroups = (groups: EnglishWordGroupBase[], pos: string): PronounGroup[] =>
  groups.map((group, index) => ({
    ...group,
    url: createGroupUrl(pos, index),
  }));

// 代名詞データ（URLつき）
export const PRONOUN_DATA: PronounGroup[] = addUrlToGroups(PRONOUN_DATA_BASE, 'pronouns');

// 前置詞データ（URLつき）
export const PREPOSITION_DATA: PronounGroup[] = addUrlToGroups(
  PREPOSITION_DATA_BASE,
  'prepositions'
);

// 上位の「品詞グループ」レイヤ（今後他品詞を追加する拡張ポイント）
// - pos: 品詞キー（URLにも使える識別子）
// - url: 品詞トップのURL
// - title: 表示名
// - groups: 下位のグループ配列（上の DATA をそのまま利用）
export const POS_GROUPS: PosGroup[] = [
  {
    pos: 'pronouns',
    title: '代名詞',
    groups: PRONOUN_DATA,
  },
  {
    pos: 'prepositions',
    title: '前置詞',
    groups: PREPOSITION_DATA,
  },
];
