import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

export const AbilityMatrix: React.FC = () => {
  const data: WordPairArray = [
    {
      english: 'can / can’t (cannot)',
      japanese: '〜できる / できない（現在の能力）',
      linkNo: [2, 6],
    },
    {
      english: 'could / couldn’t (could not)',
      japanese: '〜できた / できなかった（過去の能力）',
      linkNo: [6],
    },
    { english: 'be able to / not be able to', japanese: '〜できる / できない' },
    {
      english: 'will be able to / won’t be able to',
      japanese: '〜できるようになる / できないだろう',
    },
  ];

  return <WordMatrix data={data} columns={2} />;
};
