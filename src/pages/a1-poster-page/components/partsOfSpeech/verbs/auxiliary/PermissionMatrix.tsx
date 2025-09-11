import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

export const PermissionMatrix: React.FC = () => {
  const data: WordPairArray = [
    { english: 'can', japanese: '〜してもよい（口語的）', linkNo: [1, 6] },
    {
      english: 'may / may not',
      japanese: '〜してもよい / 〜してはいけない（丁寧）',
      linkNo: [6],
    },
    {
      english: 'be allowed to / not be allowed to',
      japanese: '〜することを許されている / 許されていない',
    },
  ];

  return <WordMatrix data={data} columns={3} />;
};
