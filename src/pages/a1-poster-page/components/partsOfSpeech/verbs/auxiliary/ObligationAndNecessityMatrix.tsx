import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

export const ObligationAndNecessityMatrix: React.FC = () => {
  const data: WordPairArray = [
    {
      english: 'must / mustn’t（must not）',
      japanese: '〜しなければならない（主観的、強い義務） / 〜してはいけない（強い禁止）',
      linkNo: [6],
    },
    {
      english: 'have to / don’t have to',
      japanese: '〜しなければならない / 〜する必要はない（外的要因）',
    },
    {
      english: 'need to / don’t need to',
      japanese: '〜する必要がある / 〜する必要はない',
    },
    {
      english: 'be supposed to / not be supposed to',
      japanese: '〜することになっている / しないことになっている',
    },
  ];

  return <WordMatrix data={data} columns={2} />;
};
