import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

export const HabitAndIdiomaticMatrix: React.FC = () => {
  const data: WordPairArray = [
    {
      english: 'used to',
      japanese: '以前はよく〜した（過去の習慣、状態）',
    },

    {
      english: 'didn’t use to / used not to',
      japanese: '以前は〜しなかった（過去の習慣、状態）',
    },

    { english: 'would', japanese: 'よく〜したものだ（過去の習慣のみ）', linkNo: [9] },
  ];

  return <WordMatrix data={data} columns={3} />;
};
