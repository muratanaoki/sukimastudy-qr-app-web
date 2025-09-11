import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語光、天気の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const LightWeatherMatrix: React.FC = () => {
  // 光、天気の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 光
    { english: 'bright', japanese: '明るい、輝いている', linkNo: [4, 9] },
    { english: 'light', japanese: '明るい（brightより弱）', linkNo: [6] },

    // 天気（晴れ・曇り・雨・風・霧）
    { english: 'sunny', japanese: '晴れの、明るい', linkNo: [1] },
    { english: 'clear', japanese: '晴れた（快晴）', linkNo: [10] },
    { english: 'cloudy', japanese: '曇った' },
    { english: 'rainy', japanese: '雨の' },
    { english: 'windy', japanese: '風が強い' },
    { english: 'foggy', japanese: '霧の深い' },

    // 温度
    { english: 'hot', japanese: '暑い', linkNo: [5] },
    { english: 'warm', japanese: '暖かい', linkNo: [1] },
    { english: 'cool', japanese: '涼しい', linkNo: [15] },
    { english: 'cold', japanese: '寒い' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
