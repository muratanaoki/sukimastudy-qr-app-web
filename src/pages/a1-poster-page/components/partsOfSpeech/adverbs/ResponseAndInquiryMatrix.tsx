import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語疑問、否定の副詞マトリクスのテーブルを表示するコンポーネント
 */
export const ResponseAndInquiryMatrix: React.FC = () => {
  // 疑問、否定の副詞のデータ（学習しやすい論理的な順序で整理）
  const adverbData: WordPairArray = [
    // 疑問・肯定
    { english: 'ever', japanese: 'いったい、そもそも（疑問文で）', linkNo: [7] },
    { english: 'yes', japanese: 'はい、そうです' },
    { english: 'please', japanese: 'お願いします' },

    // 否定
    { english: 'not', japanese: '〜でない' },
    { english: 'no', japanese: 'いいえ' },
    { english: 'never', japanese: '決して〜ない' },
    { english: 'either', japanese: '〜もまた（否定文の文末）' },
    { english: 'neither', japanese: '〜も…ない（返答で）' },

    // その他
    { english: 'else', japanese: 'そのほかに' },
  ];

  return <WordMatrix data={adverbData} columns={5} />;
};
