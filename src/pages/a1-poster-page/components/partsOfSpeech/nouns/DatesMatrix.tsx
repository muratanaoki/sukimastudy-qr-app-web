import React from 'react';
import { WordPairArray } from '../../../../../shared/types';
import { WordMatrix } from '../../common/WordMatrix';

/**
 * 日付マトリクスのテーブルを表示するコンポーネント
 */
export const DatesMatrix: React.FC = () => {
  // 日付データ
  const datesData: WordPairArray = [
    { english: 'date', japanese: '日付', linkNo: [32] },
    { english: 'today', japanese: '今日' },
    { english: 'tomorrow', japanese: '明日' },
    { english: 'yesterday', japanese: '昨日' },
    { english: 'day before yesterday', japanese: '一昨日' },
    { english: 'day after tomorrow', japanese: '明後日' },
  ];

  return <WordMatrix data={datesData} columns={3} />;
};
