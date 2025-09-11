import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const AttributesAndStandardsMatrix: React.FC = () => {
  // 価値・品質データ
  const data: WordPairArray = [
    // 価値・重要性
    { english: 'value', japanese: '価値' },
    { english: 'importance', japanese: '重要性' },

    // 質・等級・基準・水準
    { english: 'quality', japanese: '質' },
    { english: 'grade', japanese: '等級、成績', linkNo: [55] },
    { english: 'standard', japanese: '基準' },
    { english: 'level', japanese: '水準' },

    // 最善・より良い
    { english: 'best', japanese: '最善、最高のもの' },
    { english: 'better', japanese: 'より良いもの、改善' },

    // 安全
    { english: 'safety', japanese: '安全' },

    // 特徴・美しさ
    { english: 'feature', japanese: '特徴' },
    { english: 'beauty', japanese: '美しさ' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
