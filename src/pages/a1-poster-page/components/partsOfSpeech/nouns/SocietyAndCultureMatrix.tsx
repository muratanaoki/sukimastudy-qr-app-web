import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 社会構造、制度のマトリクスのテーブルを表示するコンポーネント
 */
export const SocialStructuresAndSystemsMatrix: React.FC = () => {
  // 社会・文化カテゴリの単語リスト
  const socialStructuresAndSystemsData: WordPairArray = [
    // 社会・文化
    { english: 'society', japanese: '社会' },
    { english: 'community', japanese: '地域社会、共同体' },
    { english: 'culture', japanese: '文化' },
    { english: 'tradition', japanese: '伝統' },
    { english: 'custom', japanese: '（社会や個人の）習慣' },
    { english: 'ceremony', japanese: '式典、儀式' },
    { english: 'wedding', japanese: '結婚式' },

    // 政治・制度
    { english: 'government', japanese: '政府' },
    { english: 'politics', japanese: '政治' },
    { english: 'law', japanese: '法律' },
    { english: 'rule', japanese: '規則' },
    { english: 'population', japanese: '人口' },
    { english: 'election', japanese: '選挙' },
    { english: 'war', japanese: '戦争' },

    // 権利・平和・投票
    { english: 'right', japanese: '権利', linkNo: [31] },
    { english: 'peace', japanese: '平和', linkNo: [25] },
    { english: 'vote', japanese: '投票' },
  ];

  return <WordMatrix data={socialStructuresAndSystemsData} columns={6} />;
};
