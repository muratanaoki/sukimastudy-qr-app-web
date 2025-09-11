import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 価値観、宗教、信念のマトリクスのテーブルを表示するコンポーネント
 */
export const ReligionMatrix: React.FC = () => {
  // 価値観、宗教、信念データ
  const valuesReligionAndBeliefsData: WordPairArray = [
    // 天国・地獄
    { english: 'heaven', japanese: '天国' },
    { english: 'hell', japanese: '地獄' },

    // 神・天使・悪魔
    { english: 'god', japanese: '神' },
    { english: 'angel', japanese: '天使' },
    { english: 'devil', japanese: '悪魔' },
    { english: 'cross', japanese: '十字架' },

    // 魂・精神・霊
    { english: 'spirit', japanese: '精神、魂、霊', linkNo: [24] },
    { english: 'soul', japanese: '魂、精神' },
    { english: 'ghost', japanese: '幽霊、亡霊' },

    // 信仰・信念
    { english: 'faith', japanese: '信仰、信念' },
    { english: 'belief', japanese: '信念、信じること' },

    // 祈り・祝福・呪い
    { english: 'prayer', japanese: '祈り' },

    // 奇跡・運命・運・伝説
    { english: 'miracle', japanese: '奇跡' },
    { english: 'fortune', japanese: '運命、幸運' },
    { english: 'luck', japanese: '運' },
    { english: 'legend', japanese: '伝説' },
  ];

  return <WordMatrix data={valuesReligionAndBeliefsData} columns={6} />;
};
