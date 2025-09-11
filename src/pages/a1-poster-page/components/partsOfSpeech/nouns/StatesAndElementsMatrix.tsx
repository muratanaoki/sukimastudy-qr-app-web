import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const StatesAndElementsMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 状態・現象
    { english: 'bubble', japanese: '泡' },
    { english: 'mist', japanese: '霧' },
    { english: 'smoke', japanese: '煙' },
    { english: 'steam', japanese: '蒸気' },
    { english: 'fire', japanese: '火、炎' },
    { english: 'ash', japanese: '灰' },
    { english: 'ice', japanese: '氷' },
    { english: 'water', japanese: '水' },
    { english: 'earth', japanese: '土', linkNo: [40] },
    { english: 'mud', japanese: '泥' },
    { english: 'dust', japanese: '塵、ほこり' },

    // 物質の状態
    { english: 'gas', japanese: '気体' },
    { english: 'liquid', japanese: '液体' },
    { english: 'solid', japanese: '固体' },
    { english: 'powder', japanese: '粉' },

    // 気体・元素
    { english: 'oxygen', japanese: '酸素' },
    { english: 'carbon dioxide', japanese: '二酸化炭素' },
    { english: 'element', japanese: '元素、要素' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
