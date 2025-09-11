import React from 'react';
import { WordPairArray } from '../../../../../shared/types';
import { WordMatrix } from '../../common/WordMatrix';

/**
 * 時間帯マトリクスのテーブルを表示するコンポーネント
 */
export const PartsOfTheDayMatrix: React.FC = () => {
  // 時間帯データ
  const timezoneData: WordPairArray = [
    // 夜明け
    { english: 'sunrise', japanese: '日の出' },
    // 朝
    { english: 'morning', japanese: '朝' },
    { english: 'a.m.', japanese: '午前' },
    // 昼
    { english: 'noon', japanese: '正午' },
    { english: 'daytime', japanese: '昼間' },
    { english: 'afternoon', japanese: '午後' },
    { english: 'p.m.', japanese: '午後' },
    // 夕方
    { english: 'evening', japanese: '夕方' },
    { english: 'sunset', japanese: '日の入り' },
    // 夜
    { english: 'night', japanese: '夜' },
    { english: 'midnight', japanese: '真夜中' },
  ];

  return <WordMatrix data={timezoneData} columns={6} />;
};
