import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const CountriesMatrix: React.FC = () => {
  const data: WordPairArray = [
    { english: 'state', japanese: '州、国', linkNo: [58] },
    { english: 'country', japanese: '国' },
    { english: 'nation', japanese: '国家' },

    // アジア (Asia)
    { english: 'Japan', japanese: '日本' },
    { english: 'China', japanese: '中国' },
    { english: 'Korea', japanese: '韓国' },
    { english: 'India', japanese: 'インド' },
    { english: 'Thailand', japanese: 'タイ' },
    { english: 'Vietnam', japanese: 'ベトナム' },
    { english: 'Philippines', japanese: 'フィリピン' },
    { english: 'Singapore', japanese: 'シンガポール' },
    { english: 'Malaysia', japanese: 'マレーシア' },
    { english: 'Taiwan', japanese: '台湾' },
    { english: 'Indonesia', japanese: 'インドネシア' },
    { english: 'Saudi Arabia', japanese: 'サウジアラビア' },
    { english: 'Mongolia', japanese: 'モンゴル' },

    // ヨーロッパ (Europe)
    { english: 'United Kingdom', japanese: 'イギリス' },
    { english: 'UK', japanese: 'イギリス' },
    { english: 'France', japanese: 'フランス' },
    { english: 'Germany', japanese: 'ドイツ' },
    { english: 'Italy', japanese: 'イタリア' },
    { english: 'Spain', japanese: 'スペイン' },
    { english: 'Russia', japanese: 'ロシア' },
    { english: 'Greece', japanese: 'ギリシャ' },
    { english: 'Netherlands', japanese: 'オランダ' },
    { english: 'Switzerland', japanese: 'スイス' },
    { english: 'Sweden', japanese: 'スウェーデン' },
    { english: 'Turkey', japanese: 'トルコ' },
    { english: 'Ireland', japanese: 'アイルランド' },
    { english: 'Belgium', japanese: 'ベルギー' },
    { english: 'Austria', japanese: 'オーストリア' },
    { english: 'Poland', japanese: 'ポーランド' },
    { english: 'Norway', japanese: 'ノルウェー' },

    // 北米 (North America)
    { english: 'U.S.A.', japanese: 'アメリカ合衆国' },
    { english: 'United States', japanese: 'アメリカ合衆国' },
    { english: 'Canada', japanese: 'カナダ' },
    { english: 'Mexico', japanese: 'メキシコ' },

    // 南米 (South America)
    { english: 'Brazil', japanese: 'ブラジル' },
    { english: 'Peru', japanese: 'ペルー' },
    { english: 'Argentina', japanese: 'アルゼンチン' },
    { english: 'Chile', japanese: 'チリ' },

    // オセアニア (Oceania)
    { english: 'Australia', japanese: 'オーストラリア' },
    { english: 'New Zealand', japanese: 'ニュージーランド' },

    // アフリカ (Africa)
    { english: 'Egypt', japanese: 'エジプト' },
    { english: 'Kenya', japanese: 'ケニア' },
    { english: 'South Africa', japanese: '南アフリカ' },
    { english: 'Ghana', japanese: 'ガーナ' },
    { english: 'Nigeria', japanese: 'ナイジェリア' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
