import React from 'react';
import { WordPairArray } from '../../../../../shared/types';
import { WordMatrix } from '../../common/WordMatrix';

/**
 * 曜日マトリクスのテーブルを表示するコンポーネント
 */
export const DaysOfWeekMatrix: React.FC = () => {
  // 曜日データ
  const daysOfWeekData: WordPairArray = [
    { english: 'Monday', japanese: '月曜日' },
    { english: 'Tuesday', japanese: '火曜日' },
    { english: 'Wednesday', japanese: '水曜日' },
    { english: 'Thursday', japanese: '木曜日' },
    { english: 'Friday', japanese: '金曜日' },
    { english: 'Saturday', japanese: '土曜日' },
    { english: 'Sunday', japanese: '日曜日' },
    { english: 'weekday', japanese: '平日' },
    { english: 'weekend', japanese: '週末' },
  ];

  return <WordMatrix data={daysOfWeekData} columns={6} />;
};
