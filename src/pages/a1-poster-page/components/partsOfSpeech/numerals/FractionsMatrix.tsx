import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 分数マトリクスのテーブルを表示するコンポーネント
 */
export const FractionsMatrix: React.FC = () => {
  const fractionData: WordPairArray = [
    { english: 'a half / one-half', japanese: '1/2' },
    { english: 'a third / one-third', japanese: '1/3' },
    { english: 'a quarter / one-fourth', japanese: '1/4' },
    { english: 'two-thirds', japanese: '2/3' },
    { english: 'one and a half', japanese: '1と1/2' },
    { english: 'three-quarters', japanese: '3/4' },
  ];

  return <WordMatrix data={fractionData} columns={3} />;
};
