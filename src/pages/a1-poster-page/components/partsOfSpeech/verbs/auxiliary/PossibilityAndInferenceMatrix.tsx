import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

export const PossibilityAndInferenceMatrix: React.FC = () => {
  const data: WordPairArray = [
    { english: 'may / may not', japanese: '〜かもしれない / 〜でないかもしれない', linkNo: [2] },
    {
      english: 'might / might not',
      japanese: '〜かもしれない / 〜でないかもしれない（mayより弱）',
    },
    { english: 'could', japanese: '〜の可能性があり得る（条件次第、理論上）', linkNo: [1] },
    { english: 'must', japanese: '〜にちがいない（主観的な確信）', linkNo: [4] },
    { english: 'can’t（cannot）', japanese: '〜のはずがない（強い否定推量）', linkNo: [1, 2] },
  ];

  return <WordMatrix data={data} columns={3} />;
};
