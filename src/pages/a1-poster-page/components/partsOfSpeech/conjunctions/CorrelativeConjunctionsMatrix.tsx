import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 相関接続詞マトリクスのテーブルを表示するコンポーネント
 */
export const CorrelativeConjunctionsMatrix: React.FC = () => {
  // 相関接続詞のデータ
  const correlativeConjunctionsData: WordPairArray = [
    { english: 'both...and', japanese: '〜も〜も両方' },
    { english: 'not only...but also', japanese: '〜だけでなく、〜もまた' },
    { english: 'either...or', japanese: '〜か〜のどちらか' },
    { english: 'neither...nor', japanese: '〜も〜もない' },
    { english: 'whether...or', japanese: '〜であろうと〜でなかろうと' },
    { english: 'as...as', japanese: '〜と同じくらい' },
    { english: 'so...that', japanese: 'とても〜なので' },
    { english: 'such...that', japanese: 'そのような〜なので' },
  ];

  return <WordMatrix data={correlativeConjunctionsData} columns={5} />;
};
