import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const BasicIndividualsMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 一般
    { english: 'person', japanese: '人、人間' },
    { english: 'people', japanese: '人々、国民' },
    { english: 'human', japanese: '人間、人' },

    // 性別・成人
    { english: 'man', japanese: '男性、人' },
    { english: 'men', japanese: '男性（複数形）' },
    { english: 'woman', japanese: '女性、成人女性' },
    { english: 'women', japanese: '女性（複数形）' },
    { english: 'male', japanese: '男性、男の人' },
    { english: 'female', japanese: '女性' },
    { english: 'lady', japanese: '女性、婦人' },
    { english: 'gentleman', japanese: '紳士' },
    { english: 'gentlemen', japanese: '紳士（複数形）' },
    { english: 'adult', japanese: '大人' },

    // 年齢層
    { english: 'youth', japanese: '若者' },
    { english: 'baby', japanese: '赤ちゃん、幼児' },
    { english: 'child / kid', japanese: '子供' },
    { english: 'children / kids', japanese: '子供（複数形）' },
    { english: 'boy', japanese: '男の子、少年' },
    { english: 'girl', japanese: '女の子、少女' },
    { english: 'teenager', japanese: '十代の若者' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
