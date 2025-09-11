import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 成功と成果マトリクスのテーブルを表示するコンポーネント
 */
export const SituationAndContextMatrix: React.FC = () => {
  // 状況と文脈データ
  const data: WordPairArray = [
    // 状況・条件・場合
    { english: 'situation', japanese: '状況' },
    { english: 'condition', japanese: '条件', linkNo: [23] },
    { english: 'case', japanese: '場合、事例', linkNo: [33] },
    { english: 'state', japanese: '状態', linkNo: [41] },

    // 事実・真偽
    { english: 'fact', japanese: '事実' },
    { english: 'fake', japanese: '偽物、偽り' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
