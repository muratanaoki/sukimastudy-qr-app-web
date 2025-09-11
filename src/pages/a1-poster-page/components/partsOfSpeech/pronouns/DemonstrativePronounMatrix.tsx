import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語指示代名詞マトリクスのテーブルを表示するコンポーネント
 */
export const DemonstrativePronounMatrix: React.FC = () => {
  // 指示代名詞のデータ（学習しやすい論理的な順序で整理）
  const pronounData: WordPairArray = [
    { english: 'this', japanese: 'これ' },
    { english: 'these', japanese: 'これら' },
    { english: 'that', japanese: 'それ、あれ' },
    { english: 'those', japanese: 'それら、あれら' },
    { english: 'such', japanese: 'そのようなもの、こと' },
    { english: 'same', japanese: '同じもの、こと' },
  ];

  return <WordMatrix data={pronounData} columns={3} />;
};
