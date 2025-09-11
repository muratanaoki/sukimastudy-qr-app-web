import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const TypesAndComparisonMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 分類・種類
    { english: 'type', japanese: '種類（丁寧）' },
    { english: 'kind', japanese: '種類（口語的）' },
    { english: 'variety', japanese: '多様性' },

    // 比較・対比
    { english: 'comparison', japanese: '比較' },
    { english: 'difference', japanese: '違い' },
    { english: 'opposite', japanese: '反対のもの' },
    { english: 'match', japanese: '似合うもの、匹敵するもの', linkNo: [39] },

    // 関係・つながり
    { english: 'relation', japanese: '関係' },
    { english: 'link', japanese: '関連、つながり' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
