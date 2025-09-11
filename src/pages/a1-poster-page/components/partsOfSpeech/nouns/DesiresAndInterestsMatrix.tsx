import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const MotivationAndDrive: React.FC = () => {
  // 欲求・関心データ
  const motivationAndDriveData: WordPairArray = [
    // 欲求・必要・願望
    { english: 'need', japanese: '必要' },
    { english: 'wish', japanese: '願望、願い' },

    // 興味・好奇心
    { english: 'interest', japanese: '興味、関心' },

    // 意志・動機・推進力
    { english: 'will', japanese: '意志、遺言' },
    { english: 'motivation', japanese: '動機、やる気' },
    { english: 'drive', japanese: '推進力、衝動' },

    // 努力・試み
    { english: 'effort', japanese: '努力' },
    { english: 'try', japanese: '試み' },

    // 練習・運動・活動
    { english: 'practice', japanese: '練習' },
    { english: 'training', japanese: '訓練' },
    { english: 'activity', japanese: '活動' },

    // 冒険
    { english: 'adventure', japanese: '冒険' },

    // 情熱・力・エネルギー・勇気
    { english: 'passion', japanese: '情熱、熱意' },
  ];

  return <WordMatrix data={motivationAndDriveData} columns={6} />;
};
