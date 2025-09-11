import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語感触、質感の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const TextureFeelMatrix: React.FC = () => {
  // 感触、質感の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 硬さ、柔らかさ
    { english: 'hard', japanese: '固い、硬い', linkNo: [19] },
    { english: 'solid', japanese: '中身の詰まった', linkNo: [7, 15] },
    { english: 'soft', japanese: 'やわらかい' },

    // 感触
    { english: 'rough', japanese: 'ざらざらした、粗い' },
    { english: 'smooth', japanese: 'なめらかな' },
    { english: 'sticky', japanese: 'ねばねばする' },
    { english: 'crispy', japanese: 'サクサクした' },

    // 鋭い・鈍い
    { english: 'sharp', japanese: '鋭い' },
    { english: 'dull', japanese: '鈍い' },

    // おいしさ
    { english: 'delicious', japanese: 'とてもおいしい' },
    { english: 'tasty', japanese: 'おいしい' },
    { english: 'juicy', japanese: 'ジューシーな' },
    { english: 'rich', japanese: 'コクがある、濃厚な', linkNo: [22] },

    // 味の種類
    { english: 'sweet', japanese: '甘い', linkNo: [1] },
    { english: 'sour', japanese: '酸っぱい' },
    { english: 'salty', japanese: '塩辛い' },
    { english: 'bitter', japanese: '苦い' },
    { english: 'spicy', japanese: 'スパイシーな' },
    { english: 'hot', japanese: '辛い', linkNo: [8] },

    // 品質
    { english: 'rotten', japanese: '腐った' },

    // 木・羊毛系
    { english: 'wooden', japanese: '木製の' },
    { english: 'woolen', japanese: '羊毛製の' },

    // 金属・プラスチック系
    { english: 'metallic', japanese: '金属の' },
    { english: 'plastic', japanese: 'プラスチック製の' },

    // 絹系
    { english: 'silky', japanese: '絹のような' },
  ];

  return <WordMatrix data={adjectiveData} columns={7} />;
};
