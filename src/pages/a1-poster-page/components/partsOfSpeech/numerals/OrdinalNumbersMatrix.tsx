import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語序数詞マトリクスのテーブルを表示するコンポーネント
 */
export const OrdinalNumbersMatrix: React.FC = () => {
  // 序数詞のデータ（学習しやすい論理的な順序で整理）
  const ordinalData: WordPairArray = [
    { english: 'zeroth', japanese: '0番目' },
    { english: 'first', japanese: '1番目' },
    { english: 'second', japanese: '2番目' },
    { english: 'third', japanese: '3番目' },
    { english: 'fourth', japanese: '4番目' },
    { english: 'fifth', japanese: '5番目' },
    { english: 'sixth', japanese: '6番目' },
    { english: 'seventh', japanese: '7番目' },
    { english: 'eighth', japanese: '8番目' },
    { english: 'ninth', japanese: '9番目' },
    { english: 'tenth', japanese: '10番目' },
    { english: 'eleventh', japanese: '11番目' },
    { english: 'twelfth', japanese: '12番目' },
    { english: 'twentieth', japanese: '20番目' },
    { english: 'twenty-first', japanese: '21番目' },
    { english: 'twenty-second', japanese: '22番目' },
    { english: 'twenty-third', japanese: '23番目' },
    { english: 'thirtieth', japanese: '30番目' },
  ];

  return <WordMatrix data={ordinalData} columns={6} />;
};
