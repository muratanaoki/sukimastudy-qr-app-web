import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 特殊な不定代名詞を表示するコンポーネント
 */
export const SpecialIndefinitePronouns: React.FC = () => {
  // 不定代名詞のデータ（学習しやすい論理的な順序で整理）
  const pronounData: WordPairArray = [
    // 1. 個・他・一部・不定
    { english: 'one', japanese: '一人、もの' },
    { english: 'another', japanese: 'もう一つの、別の' },
    { english: 'other', japanese: '他の' },
    { english: 'others', japanese: '他のもの、人々' },
    { english: 'each', japanese: 'それぞれ' },
    { english: 'either', japanese: 'どちらか' },
    { english: 'neither', japanese: 'どちらも〜ない' },
    { english: 'none', japanese: 'どれも〜ない、誰も〜ない' },
    { english: 'some', japanese: 'いくつかの' },
    { english: 'any', japanese: 'いくらか、どれか' },
    { english: 'certain', japanese: 'ある人々' },

    // 2. 全体・多数・少数・量
    { english: 'all', japanese: 'すべて' },
    { english: 'both', japanese: '両方' },
    { english: 'most', japanese: 'ほとんどの' },
    { english: 'more', japanese: 'もっと多くの' },
    { english: 'many', japanese: '多くの（可算名詞）' },
    { english: 'much', japanese: '多くの（不可算名詞）' },
    { english: 'several', japanese: 'いくつかの' },
    { english: 'few', japanese: 'ほとんど〜ない（可算）' },
    { english: 'little', japanese: 'ほとんど〜ない（不可算）' },
    { english: 'less', japanese: 'より少ない' },
    { english: 'least', japanese: '最小、最も少ない' },
    { english: 'enough', japanese: '十分な' },
  ];

  return <WordMatrix data={pronounData} columns={6} />;
};
