import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 天体、宇宙マトリクスのテーブルを表示するコンポーネント
 */
export const CelestialSpaceMatrix: React.FC = () => {
  // 天体、宇宙データ
  const celestialSpaceData: WordPairArray = [
    // 宇宙全般
    { english: 'universe', japanese: '宇宙全体' },
    { english: 'space', japanese: '宇宙空間（地球の外）' },

    // 太陽系の中心・月
    { english: 'sun', japanese: '太陽' },
    { english: 'moon', japanese: '月' },

    // 天体の種類
    { english: 'star', japanese: '恒星、スター', linkNo: [13] },
    { english: 'planet', japanese: '惑星' },

    // 太陽系の惑星
    { english: 'Mercury', japanese: '水星' },
    { english: 'Venus', japanese: '金星' },
    { english: 'Earth', japanese: '地球', linkNo: [48] },
    { english: 'Mars', japanese: '火星' },
    { english: 'Jupiter', japanese: '木星' },
    { english: 'Saturn', japanese: '土星' },
  ];

  return <WordMatrix data={celestialSpaceData} columns={6} />;
};
