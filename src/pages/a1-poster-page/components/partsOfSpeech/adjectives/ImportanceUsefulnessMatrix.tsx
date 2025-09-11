import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語重要性、有用性の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const ImportanceUsefulnessMatrix: React.FC = () => {
  // 重要性、有用性の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 重要性（意味が近い順に並び替え）
    { english: 'important', japanese: '重要な（一般的）' },
    { english: 'serious', japanese: '重大な、深刻な', linkNo: [1] },

    { english: 'main', japanese: '主な' },
    { english: 'basic', japanese: '基本的な、基礎の' },
    { english: 'essential', japanese: '不可欠な' },
    { english: 'necessary', japanese: '必要な' },

    // 有用性（ポジティブ）
    { english: 'useful', japanese: '役に立つ（実用的、有用）' },
    { english: 'helpful', japanese: '役に立つ（手助け、親切）' },
    { english: 'convenient', japanese: '都合のよい' },

    // 有用性（ネガティブ）
    { english: 'inconvenient', japanese: '不便な' },
    { english: 'useless', japanese: '役に立たない' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
