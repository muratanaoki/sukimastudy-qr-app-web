import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語接続、論理の副詞マトリクスのテーブルを表示するコンポーネント
 */
export const ConjunctiveLogicalAdverbsMatrix: React.FC = () => {
  // 接続、論理の副詞のデータ（意味別にグループ化して整理）
  const adverbData: WordPairArray = [
    // 追加・強調
    { english: 'also', japanese: '〜もまた、〜も' },
    { english: 'besides', japanese: 'その上、さらに' },

    // 順接・結果
    { english: 'then', japanese: 'それなら、その場合は', linkNo: [7] },
    { english: 'so', japanese: 'だから、それで', linkNo: [1] },
    { english: 'therefore', japanese: 'それゆえに、したがって' },

    // 逆接・対比
    { english: 'however', japanese: 'しかしながら' },
    { english: 'though', japanese: ' けれども' },
    { english: 'instead', japanese: '代わりに' },

    // その他
    { english: 'anyway', japanese: 'とにかく' },
    { english: 'otherwise', japanese: 'さもなければ、そうでないと' },
  ];

  return <WordMatrix data={adverbData} columns={5} />;
};
