import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const SocialGroupsAndStatusMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 友人・親友
    { english: 'friend', japanese: '友達、友人' },

    // 近所の人・地元の人
    { english: 'neighbor', japanese: '近所の人' },
    { english: 'local', japanese: '地元の人' },

    // 市民
    { english: 'citizen', japanese: '市民' },

    // 外国人・見知らぬ人
    { english: 'foreigner', japanese: '外国人、異邦人' },
    { english: 'stranger', japanese: '見知らぬ人' },

    // 集団・大衆
    { english: 'group', japanese: 'グループ、集団' },
    { english: 'member', japanese: '構成員、メンバー' },
    { english: 'party', japanese: '政党', linkNo: [37] },
    { english: 'crowd', japanese: '群衆' },
    { english: 'public', japanese: '一般の人々、大衆' },

    // 敵
    { english: 'enemy', japanese: '敵' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
