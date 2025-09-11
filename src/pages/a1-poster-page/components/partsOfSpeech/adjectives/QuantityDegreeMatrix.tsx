import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語数量、程度の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const QuantityDegreeMatrix: React.FC = () => {
  // 数量、程度の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 全体性・数量（意味が近い順に並び替え）
    { english: 'enough', japanese: '十分な' },
    { english: 'extra', japanese: '追加の、余分な' },
    { english: 'limited', japanese: '限られた' },
    { english: 'several', japanese: 'いくつかの' },
    { english: 'various', japanese: '様々な' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
