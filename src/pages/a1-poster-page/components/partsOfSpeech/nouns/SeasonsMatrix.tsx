import React from 'react';
import { WordPairArray } from '../../../../../shared/types';
import { WordMatrix } from '../../common/WordMatrix';

/**
 * 季節マトリクスのテーブルを表示するコンポーネント
 */
export const SeasonsMatrix: React.FC = () => {
  // 季節データ
  const seasonsData: WordPairArray = [
    { english: 'season', japanese: '時期、季節' },
    { english: 'spring', japanese: '春', linkNo: [42] },
    { english: 'summer', japanese: '夏' },
    { english: 'autumn', japanese: '秋' },
    { english: 'fall', japanese: '秋', linkNo: [30] },
    { english: 'winter', japanese: '冬' },
  ];

  return <WordMatrix data={seasonsData} columns={6} />;
};
