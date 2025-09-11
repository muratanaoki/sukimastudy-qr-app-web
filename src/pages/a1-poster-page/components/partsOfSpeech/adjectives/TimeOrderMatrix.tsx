import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語時間、順序の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const TimeOrderMatrix: React.FC = () => {
  // 時間、順序の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 順序
    { english: 'first', japanese: '最初の、一番目の' },
    { english: 'next', japanese: '次の' },
    { english: 'last', japanese: '最後の、この前の' },
    { english: 'final', japanese: '最後の、最終の' },

    // 時制・新旧
    { english: 'past', japanese: '過去の' },
    { english: 'ancient', japanese: '古代の' },
    { english: 'old', japanese: '古い、昔の', linkNo: [3] },
    { english: 'historical', japanese: '歴史の、歴史上の' },
    { english: 'historic', japanese: '歴史的に重要な' },
    { english: 'traditional', japanese: '昔ながらの' },

    { english: 'present', japanese: '現在の', linkNo: [3] },
    { english: 'current', japanese: '現在の' },
    { english: 'recent', japanese: '最近の' },
    { english: 'modern', japanese: '現代の' },
    { english: 'future', japanese: '未来の' },

    { english: 'new', japanese: '新しい' },
    { english: 'fresh', japanese: '新しい、新鮮な', linkNo: [7] },

    // 早さ、遅さ
    { english: 'early', japanese: '早い、初期の' },
    { english: 'late', japanese: '遅れた、遅い' },

    // 時間の長さ
    { english: 'long', japanese: '長い', linkNo: [6] },
    { english: 'short', japanese: '短い', linkNo: [6] },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
