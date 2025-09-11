import React from 'react';
import { WordPairArray } from '../../../../../shared/types';
import { WordMatrix } from '../../common/WordMatrix';

/**
 * 祝日、休暇マトリクスのテーブルを表示するコンポーネント
 */
export const HolidaysMatrix: React.FC = () => {
  const holidaysData: WordPairArray = [
    // 祝日
    { english: "New Year's Day", japanese: '元日' },
    { english: "New Year's Eve", japanese: '大晦日' },
    { english: 'Christmas', japanese: 'クリスマス' },
    { english: 'Halloween', japanese: 'ハロウィーン' },
    { english: 'Thanksgiving', japanese: '感謝祭' },
    { english: 'Golden Week', japanese: 'ゴールデンウィーク' },
    { english: "Valentine's Day", japanese: 'バレンタインデー' },
    { english: 'National Day', japanese: '国家の日、建国記念日' },
    // 記念日・お祝い
    { english: 'birthday', japanese: '誕生日' },
    { english: 'anniversary', japanese: '記念日' },
    { english: 'celebration', japanese: 'お祝い' },
    // 休暇・休憩
    { english: 'holiday', japanese: '休日' },
  ];

  return <WordMatrix data={holidaysData} columns={6} />;
};
