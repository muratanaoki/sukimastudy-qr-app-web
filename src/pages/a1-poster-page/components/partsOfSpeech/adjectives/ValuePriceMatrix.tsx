import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語価値、価格の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const ValuePriceMatrix: React.FC = () => {
  // 価値、価格の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 高価・価値
    { english: 'expensive', japanese: '値段が高い' },
    { english: 'valuable', japanese: '価値のある、高価な' },
    { english: 'precious', japanese: '貴重な' },

    // 安価
    { english: 'cheap', japanese: '安い、低価格な', linkNo: [15] },
    { english: 'reasonable', japanese: '手ごろな、妥当な' },
    { english: 'affordable', japanese: '手頃な価格の' },
    { english: 'free', japanese: '無料の', linkNo: [3] },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
