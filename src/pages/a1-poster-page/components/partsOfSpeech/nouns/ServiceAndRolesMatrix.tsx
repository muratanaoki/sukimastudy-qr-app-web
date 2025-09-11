import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const ServiceAndRolesMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 乗客・旅行者・観光客
    { english: 'passenger', japanese: '乗客' },
    { english: 'traveler', japanese: '旅行者、旅人' },
    { english: 'tourist', japanese: '旅行者、観光客' },

    // 訪問者・招待客
    { english: 'visitor', japanese: '訪問者、見学者' },
    { english: 'guest', japanese: '客、招待客、宿泊客' },

    // 客・利用者
    { english: 'customer', japanese: '店の客' },
    { english: 'user', japanese: '利用者、ユーザー' },

    // 患者
    { english: 'patient', japanese: '患者' },

    // 案内人・主催者・乗組員
    { english: 'guide', japanese: '案内人' },
    { english: 'host', japanese: '司会者、主催者' },
    { english: 'crew', japanese: '乗組員' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
