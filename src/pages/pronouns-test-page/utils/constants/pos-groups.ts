import { PronounGroup, PosGroup } from '../type';
import { EnglishWordGroupBase } from './const';
import { PRONOUN_DATA_BASE } from './pronoun';
import { PREPOSITION_DATA_BASE } from './preposition';
import { PartOfSpeechEnum } from '../enum';

// URLを動的に生成するヘルパー関数
const createGroupUrl = (pos: PartOfSpeechEnum, index: number): string => `/${pos}?tab=${index + 1}`;

// グループにURLを付与するヘルパー関数
const addUrlToGroups = (groups: EnglishWordGroupBase[], pos: PartOfSpeechEnum): PronounGroup[] =>
  groups.map((group, index) => ({
    ...group,
    url: createGroupUrl(pos, index),
  }));

// 代名詞データ（URLつき）
export const PRONOUN_DATA: PronounGroup[] = addUrlToGroups(
  PRONOUN_DATA_BASE,
  PartOfSpeechEnum.Pronouns
);

// 前置詞データ（URLつき）
export const PREPOSITION_DATA: PronounGroup[] = addUrlToGroups(
  PREPOSITION_DATA_BASE,
  PartOfSpeechEnum.Prepositions
);

// 上位の「品詞グループ」レイヤ（今後他品詞を追加する拡張ポイント）
// - pos: 品詞キー（URLにも使える識別子）
// - url: 品詞トップのURL
// - title: 表示名
// - groups: 下位のグループ配列（上の DATA をそのまま利用）
export const POS_GROUPS: PosGroup[] = [
  {
    pos: PartOfSpeechEnum.Pronouns,
    title: '代名詞',
    groups: PRONOUN_DATA,
  },
  {
    pos: PartOfSpeechEnum.Prepositions,
    title: '前置詞',
    groups: PREPOSITION_DATA,
  },
  {
    pos: PartOfSpeechEnum.Nouns,
    title: '名詞',
    subtitle: '（1/14）',
    groups: PREPOSITION_DATA,
  },
];
