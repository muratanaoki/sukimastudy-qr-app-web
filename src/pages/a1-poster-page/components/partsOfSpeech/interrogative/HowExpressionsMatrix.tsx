import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * Howを使った応用表現マトリクスのテーブルを表示するコンポーネント
 */
export const HowExpressionsMatrix: React.FC = () => {
  const data: WordPairArray = [
    { english: 'How many', japanese: 'いくつの〜' },
    { english: 'How much', japanese: 'いくら、どのくらいの量' },
    { english: 'How soon', japanese: 'どのくらい早く' },
    { english: 'How long', japanese: 'どのくらいの長さ、期間' },
    { english: 'How far', japanese: 'どのくらい遠く' },
    { english: 'How tall', japanese: 'どのくらいの高さ' },
    { english: 'How often', japanese: 'どのくらいの頻度' },
    { english: 'How old', japanese: '何歳' },
  ];

  return <WordMatrix data={data} columns={5} />;
};
