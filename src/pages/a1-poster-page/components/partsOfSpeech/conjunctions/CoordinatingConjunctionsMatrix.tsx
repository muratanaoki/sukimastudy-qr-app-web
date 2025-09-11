import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 等位接続詞マトリクスのテーブルを表示するコンポーネント
 */
export const CoordinatingConjunctionsMatrix: React.FC = () => {
  // 等位接続詞のデータ
  const coordinatingConjunctionsData: WordPairArray = [
    { english: 'and', japanese: 'そして、〜と〜' },
    { english: 'or', japanese: 'または、あるいは' },
    { english: 'nor', japanese: '〜も〜もない' },
    { english: 'but', japanese: 'しかし、けれども' },
    { english: 'yet', japanese: 'しかし、それでも' },
    { english: 'for', japanese: 'というのは〜だから' },
    { english: 'so', japanese: 'だから、それで' },
  ];

  return <WordMatrix data={coordinatingConjunctionsData} columns={5} />;
};
