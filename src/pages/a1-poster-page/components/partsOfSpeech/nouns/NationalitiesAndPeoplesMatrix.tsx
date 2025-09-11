import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const NationalitiesAndPeoplesMatrix: React.FC = () => {
  // 国籍・民族データ
  const data: WordPairArray = [
    // アフリカ
    { english: 'African', japanese: 'アフリカ人' },

    // アメリカ大陸
    { english: 'American', japanese: 'アメリカ人' },
    { english: 'Brazilian', japanese: 'ブラジル人' },
    { english: 'Canadian', japanese: 'カナダ人' },
    { english: 'Mexican', japanese: 'メキシコ人' },

    // アジア
    { english: 'Asian', japanese: 'アジア人' },
    { english: 'Chinese', japanese: '中国人、中国語' },
    { english: 'Japanese', japanese: '日本人、日本語', linkNo: [55] },
    { english: 'Korean', japanese: '韓国人、韓国語' },
    { english: 'Indian', japanese: 'インド人' },
    { english: 'Thai', japanese: 'タイ人、タイ語' },
    { english: 'Vietnamese', japanese: 'ベトナム人、ベトナム語' },

    // ヨーロッパ
    { english: 'European', japanese: 'ヨーロッパ人' },
    { english: 'British', japanese: 'イギリス人' },
    { english: 'English', japanese: '英語' },
    { english: 'French', japanese: 'フランス人、フランス語' },
    { english: 'German', japanese: 'ドイツ人、ドイツ語' },
    { english: 'Greek', japanese: 'ギリシャ人、ギリシャ語' },
    { english: 'Italian', japanese: 'イタリア人、イタリア語' },
    { english: 'Dutch', japanese: 'オランダ人、オランダ語' },
    { english: 'Russian', japanese: 'ロシア人、ロシア語' },
    { english: 'Spanish', japanese: 'スペイン人、スペイン語' },

    // オセアニア
    { english: 'Australian', japanese: 'オーストラリア人' },
    { english: 'New Zealander', japanese: 'ニュージーランド人' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
