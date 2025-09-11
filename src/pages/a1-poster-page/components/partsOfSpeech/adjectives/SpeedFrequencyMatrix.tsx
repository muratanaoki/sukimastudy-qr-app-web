import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語速さ、頻度の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const SpeedFrequencyMatrix: React.FC = () => {
  // 速さ、頻度の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 速さ
    { english: 'fast', japanese: '速い（物理的）' },
    { english: 'quick', japanese: '迅速な（動作、反応）' },
    { english: 'rapid', japanese: '急速な（変化、進行）' },
    { english: 'slow', japanese: '遅い' },
    { english: 'gradual', japanese: '段階的な' },
    { english: 'sudden', japanese: '突然の' },
    { english: 'constant', japanese: '絶え間ない、一定の' },

    // 頻度
    { english: 'daily', japanese: '毎日の（周期、頻度）' },
    { english: 'everyday', japanese: '毎日の、日常の' },
    { english: 'regular', japanese: '定期的な、規則的な' },
    { english: 'frequent', japanese: '頻繁な' },
    { english: 'weekly', japanese: '毎週の' },
    { english: 'monthly', japanese: '毎月の' },
    { english: 'annual', japanese: '毎年の、年に一度の' },
    { english: 'occasional', japanese: '時折の' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
