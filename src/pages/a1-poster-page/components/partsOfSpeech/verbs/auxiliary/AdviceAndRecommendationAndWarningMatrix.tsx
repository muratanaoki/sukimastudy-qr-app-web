import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

export const AdviceAndRecommendationAndWarningMatrix: React.FC = () => {
  const data: WordPairArray = [
    {
      english: 'should / shouldn’t（should not）',
      japanese: '〜すべきだ / 〜すべきでない（口語的）',
    },
    {
      english: 'ought to / ought not to',
      japanese: '〜すべきだ / 〜すべきでない（丁寧）',
    },
    {
      english: 'had better / had better not',
      japanese: '〜した方がいい / しない方がいい（忠告、警告で強め）',
    },
  ];

  return <WordMatrix data={data} columns={3} />;
};
