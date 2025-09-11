import React from 'react';
import { WordPairArray } from '../../../../../shared/types';
import { WordMatrix } from '../../common/WordMatrix';

/**
 * 時間の単位マトリクスのテーブルを表示するコンポーネント
 */
export const TimeUnitsMatrix: React.FC = () => {
  // 時間の単位データ
  const timeUnitsData: WordPairArray = [
    // 長い単位
    { english: 'century', japanese: '世紀' },
    { english: 'decade', japanese: '10年間' },
    { english: 'year', japanese: '年' },
    { english: 'quarter', japanese: '四半期' },
    { english: 'month', japanese: '月' },
    { english: 'week', japanese: '週' },
    { english: 'day', japanese: '日' },
    // 時間
    { english: 'hour', japanese: '時' },
    { english: 'minute', japanese: '分' },
    { english: 'second', japanese: '秒' },
    { english: 'millisecond', japanese: 'ミリ秒' },
    // その他
    { english: 'term', japanese: '期間', linkNo: [55] },
  ];

  return <WordMatrix data={timeUnitsData} columns={6} />;
};
