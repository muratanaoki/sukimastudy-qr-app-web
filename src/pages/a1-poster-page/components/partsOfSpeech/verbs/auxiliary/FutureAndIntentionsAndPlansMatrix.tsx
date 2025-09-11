import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

export const FutureAndIntentionsAndPlansMatrix: React.FC = () => {
  const data: WordPairArray = [
    {
      english: 'will / won’t（will not）',
      japanese: '〜するつもりだ / 〜しない（その場の意思、予測）',
    },
    {
      english: 'be going to / not be going to',
      japanese: '〜する予定だ / 〜するつもりはない（事前決定）',
    },
    { english: 'would like to', japanese: '〜したい（丁寧な意思表明）' },
  ];

  return <WordMatrix data={data} columns={3} />;
};
