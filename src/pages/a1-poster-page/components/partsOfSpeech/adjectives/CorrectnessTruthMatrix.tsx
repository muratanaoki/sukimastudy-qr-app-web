import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語正しさ、真偽の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const CorrectnessTruthMatrix: React.FC = () => {
  // 正しさ、真偽の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 正しさ（意味が近い順に並び替え）
    { english: 'correct', japanese: '正しい（事実、基準）' },
    { english: 'accurate', japanese: '正確な（精密）' },
    { english: 'right', japanese: '正しい（正当、道徳的）' },

    { english: 'true', japanese: '事実の、真実の' },
    { english: 'real', japanese: '本物の、現実の' },

    // 正しさ（ネガティブ）
    { english: 'wrong', japanese: '正しくない、誤った' },
    { english: 'false', japanese: '偽の、間違った' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
