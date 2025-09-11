import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 環境、気象マトリクスのテーブルを表示するコンポーネント
 */
export const EnvironmentWeatherMatrix: React.FC = () => {
  // 環境、気象データ
  const environmentWeatherData: WordPairArray = [
    // 自然・環境
    { english: 'nature', japanese: '自然' },
    { english: 'environment', japanese: '自然環境' },
    { english: 'pollution', japanese: '環境の汚染' },

    // 空・天体・空気
    { english: 'sky', japanese: '空' },
    { english: 'air', japanese: '空気' },
    { english: 'sunlight', japanese: '日光' },
    { english: 'sunshine', japanese: '晴天、日光' },
    { english: 'rainbow', japanese: '虹' },
    { english: 'shade', japanese: '日陰' },
    { english: 'shadow', japanese: '影' },

    // 天気・気象
    { english: 'weather', japanese: '天気' },
    { english: 'cloud', japanese: '雲' },
    { english: 'wind', japanese: '風' },
    { english: 'heat', japanese: '暑さ、熱' },
    { english: 'climate', japanese: '気候' },

    // 気象現象
    { english: 'rain', japanese: '雨' },
    { english: 'snow', japanese: '雪' },
    { english: 'storm', japanese: '嵐' },
    { english: 'typhoon', japanese: '台風' },
    { english: 'fog', japanese: '霧' },
    { english: 'lightning', japanese: '稲妻' },
    { english: 'thunder', japanese: '雷' },

    // 災害
    { english: 'disaster', japanese: '自然災害' },
    { english: 'earthquake', japanese: '地震' },
  ];

  return <WordMatrix data={environmentWeatherData} columns={6} />;
};
