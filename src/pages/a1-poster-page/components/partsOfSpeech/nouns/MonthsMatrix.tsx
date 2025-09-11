import React from 'react';
import { WordPairArray } from '../../../../../shared/types';
import { WordMatrix } from '../../common/WordMatrix';

/**
 * 月マトリクスのテーブルを表示するコンポーネント
 */
export const MonthsMatrix: React.FC = () => {
  // 月データ
  const monthsData: WordPairArray = [
    { english: 'January', japanese: '１月' },
    { english: 'February', japanese: '２月' },
    { english: 'March', japanese: '３月' },
    { english: 'April', japanese: '４月' },
    { english: 'May', japanese: '５月' },
    { english: 'June', japanese: '６月' },
    { english: 'July', japanese: '７月' },
    { english: 'August', japanese: '８月' },
    { english: 'September', japanese: '９月' },
    { english: 'October', japanese: '１０月' },
    { english: 'November', japanese: '１１月' },
    { english: 'December', japanese: '１２月' },
  ];

  return <WordMatrix data={monthsData} columns={6} />;
};
