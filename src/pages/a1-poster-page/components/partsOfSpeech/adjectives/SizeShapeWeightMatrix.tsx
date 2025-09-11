import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語大きさ、形、重さの形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const SizeShapeWeightMatrix: React.FC = () => {
  // 大きさ、形、重さの形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 大きさ
    { english: 'big', japanese: '大きい（主観的）' },
    { english: 'large', japanese: '大きい（客観的）' },
    { english: 'huge', japanese: '巨大な' },

    { english: 'small', japanese: '小さい（客観的）' },
    { english: 'little', japanese: '小さい、少しの' },
    { english: 'tiny', japanese: 'とても小さい' },

    // 固体

    // 幅・厚さ・太さ
    { english: 'wide', japanese: '幅広い（物理的）' },
    { english: 'broad', japanese: '幅広い（抽象、範囲）' },
    { english: 'narrow', japanese: '幅が狭い' },
    { english: 'thick', japanese: '厚い、太い（無生物）' },
    { english: 'fat', japanese: '厚い、太い（生物）', linkNo: [3] },
    { english: 'thin', japanese: '薄い、細い', linkNo: [3] },
    { english: 'slim', japanese: 'ほっそりした' },

    // 長さ・高さ・深さ
    { english: 'long', japanese: '長い', linkNo: [13] },
    { english: 'short', japanese: '短い、丈が短い', linkNo: [13] },
    { english: 'tall', japanese: '背が高い' },
    { english: 'high', japanese: '高い' },
    { english: 'low', japanese: '低い' },
    { english: 'deep', japanese: '深い' },
    { english: 'shallow', japanese: '浅い' },

    // 重さ
    { english: 'heavy', japanese: '重い' },
    { english: 'light', japanese: '軽い', linkNo: [8] },

    // 形
    { english: 'round', japanese: '丸い、円形の' },
    { english: 'square', japanese: '正方形の' },
    { english: 'flat', japanese: '平らな' },
    { english: 'straight', japanese: 'まっすぐな' },
  ];

  return <WordMatrix data={adjectiveData} columns={7} />;
};
