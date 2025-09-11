import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 状況・状態マトリクスのテーブルを表示するコンポーネント
 */
export const ConditionAndStateMatrix: React.FC = () => {
  // 状況・状態データ
  const conditionAndStateData: WordPairArray = [
    { english: 'situation', japanese: '状況' },
    { english: 'condition', japanese: '条件、状況' },
    { english: 'case', japanese: '場合、事例' },
    { english: 'state', japanese: '状態' },
  ];

  return <WordMatrix data={conditionAndStateData} columns={5} />;
};
