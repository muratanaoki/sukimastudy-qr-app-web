import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

export const HypotheticalMatrix: React.FC = () => {
  const data: WordPairArray = [
    { english: 'would', japanese: '（もし〜なら）〜だろうに / 〜でしょう', linkNo: [8] },
  ];

  return <WordMatrix data={data} columns={1} />;
};
