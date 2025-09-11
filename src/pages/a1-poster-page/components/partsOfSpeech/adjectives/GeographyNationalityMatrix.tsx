import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語地名、国籍の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const GeographyNationalityMatrix: React.FC = () => {
  // 地名、国籍の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // アジア
    { english: 'Japanese', japanese: '日本の' },
    { english: 'Chinese', japanese: '中国の' },
    { english: 'Korean', japanese: '韓国の' },
    { english: 'Indian', japanese: 'インドの' },
    { english: 'Asian', japanese: 'アジアの' },

    // 北米・オセアニア
    { english: 'American', japanese: 'アメリカの' },
    { english: 'Canadian', japanese: 'カナダの' },
    { english: 'Australian', japanese: 'オーストラリアの' },

    // ヨーロッパ
    { english: 'British', japanese: 'イギリスの' },
    { english: 'French', japanese: 'フランスの' },
    { english: 'Italian', japanese: 'イタリアの' },
    { english: 'Spanish', japanese: 'スペインの' },
    { english: 'German', japanese: 'ドイツの' },
    { english: 'Russian', japanese: 'ロシアの' },
    { english: 'European', japanese: 'ヨーロッパの' },

    // アフリカ
    { english: 'African', japanese: 'アフリカの' },

    // 地域・その他
    { english: 'foreign', japanese: '外国の' },
    { english: 'domestic', japanese: '国内の' },
    { english: 'urban', japanese: '都市の' },
    { english: 'rural', japanese: '田舎の' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
