import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const RomanceAndMarriageMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 婚約・結婚・夫婦
    { english: 'bride', japanese: '花嫁' },
    { english: 'marriage', japanese: '結婚、婚姻' },
    { english: 'couple', japanese: '夫婦、カップル' },

    // 恋人・カップル
    { english: 'partner', japanese: '配偶者、恋人' },
    { english: 'boyfriend', japanese: '彼氏' },
    { english: 'girlfriend', japanese: '彼女' },

    // 愛しい人
    { english: 'dear', japanese: '愛しい人（丁寧）' },
    { english: 'honey', japanese: '愛しい人（親密な呼称）' },

    // 独身者
    { english: 'single', japanese: '独身者' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
