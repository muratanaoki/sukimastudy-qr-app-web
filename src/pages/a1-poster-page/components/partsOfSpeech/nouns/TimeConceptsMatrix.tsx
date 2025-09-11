import React from 'react';
import { WordPairArray } from '../../../../../shared/types';
import { WordMatrix } from '../../common/WordMatrix';

/**
 * 時間の概念マトリクスのテーブルを表示するコンポーネント
 */
export const TimeConceptsMatrix: React.FC = () => {
  // 時間の概念データ
  const timeConceptsData: WordPairArray = [
    // 基本・時の流れ
    { english: 'time', japanese: '時間' },
    { english: 'moment', japanese: '瞬間' },
    { english: 'point', japanese: '時点', linkNo: [50, 57] },
    { english: 'period', japanese: '期間' },
    // 過去・現在・未来
    { english: 'past', japanese: '過去' },
    { english: 'present', japanese: '現在', linkNo: [32] },
    { english: 'future', japanese: '未来' },
    // 歴史・時代
    { english: 'age', japanese: '時代' },
    { english: 'generation', japanese: '世代' },
    // 始まり・終わり
    { english: 'birth', japanese: '誕生' },
    { english: 'beginning', japanese: '始まり' },
    { english: 'start', japanese: '開始' },
    { english: 'end', japanese: '終わり、終点' },
    { english: 'last', japanese: '最後' },
    // スケジュール・カレンダー
    { english: 'schedule', japanese: 'スケジュール' },
    { english: 'calendar', japanese: 'カレンダー' },
  ];

  return <WordMatrix data={timeConceptsData} columns={6} />;
};
