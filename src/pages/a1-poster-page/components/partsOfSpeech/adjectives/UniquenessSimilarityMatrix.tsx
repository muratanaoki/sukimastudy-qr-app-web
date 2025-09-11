import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語独自性、類似性の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const UniquenessSimilarityMatrix: React.FC = () => {
  // 独自性、類似性の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 特別性、独自性（意味が近い順に並び替え）
    { english: 'special', japanese: '特別な' },
    { english: 'favorite', japanese: '一番好きな' },
    { english: 'unique', japanese: '唯一の、ユニークな' },
    { english: 'rare', japanese: '珍しい、まれな' },
    { english: 'original', japanese: '独創的な、元の' },

    // 普通、一般（意味が近い順に並び替え）
    { english: 'normal', japanese: '普通の' },
    { english: 'typical', japanese: '典型的な' },
    { english: 'usual', japanese: 'いつもの' },
    { english: 'ordinary', japanese: '普通の、ありふれた' },
    { english: 'common', japanese: '普通の、一般的な' },

    // 同一性、類似性（意味が近い順に並び替え）
    { english: 'same', japanese: '同じ' },
    { english: 'similar', japanese: '似ている' },

    // 差異性（意味が近い順に並び替え）
    { english: 'different', japanese: '異なっている' },
    { english: 'other', japanese: '別の、他の' },
    { english: 'another', japanese: 'もう一つの' },

    // 所有、特定（意味が近い順に並び替え）
    { english: 'own', japanese: '自身の' },

    // 特殊性（意味が近い順に並び替え）
    { english: 'wild', japanese: '野生の', linkNo: [1] },
    { english: 'strange', japanese: '奇妙な、見慣れない', linkNo: [1] },
    { english: 'funny', japanese: '奇妙な、変な', linkNo: [2] },
    { english: 'magical', japanese: '魔法の、不思議な' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
