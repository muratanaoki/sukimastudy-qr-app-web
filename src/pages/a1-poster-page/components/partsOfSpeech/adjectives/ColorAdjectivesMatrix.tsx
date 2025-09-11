import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語色の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const ColorAdjectivesMatrix: React.FC = () => {
  // 色の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 基本色（無彩色）
    { english: 'black', japanese: '黒色の' },
    { english: 'gray', japanese: '灰色の' },
    { english: 'white', japanese: '白い' },

    // 基本色（暖色系）
    { english: 'red', japanese: '赤い' },
    { english: 'pink', japanese: 'ピンク色の' },
    { english: 'orange', japanese: 'オレンジ色の' },
    { english: 'yellow', japanese: '黄色い' },
    { english: 'brown', japanese: '茶色の' },

    // 基本色（寒色系）
    { english: 'blue', japanese: '青色の' },
    { english: 'green', japanese: '緑色の' },
    { english: 'purple', japanese: '紫色の' },
    { english: 'beige', japanese: 'ベージュ色の' },

    // 特別な色
    { english: 'golden', japanese: '金色の、黄金の' },
    { english: 'silver', japanese: '銀色の' },

    // 色の性質
    { english: 'colorful', japanese: '色とりどりの' },
    { english: 'bright', japanese: '明るい、鮮やかな', linkNo: [4, 8] },
    { english: 'dark', japanese: '暗い、濃い' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
