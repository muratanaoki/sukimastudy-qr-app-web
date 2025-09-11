import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語の冠詞のマトリクスコンポーネント
 */
export const ArticlesMatrix: React.FC = () => {
  // 冠詞のデータ
  const articlesData: WordPairArray = [
    { english: 'the', japanese: 'その（お互いに分かる特定の物、人）' },
    { english: 'a / an', japanese: 'ある（どれか１つの物、人）' },
  ];

  return <WordMatrix data={articlesData} columns={2} />;
};
