import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const EvaluationAndStandardsMatrix: React.FC = () => {
  const data: WordPairArray = [
    { english: 'value', japanese: '価値' },
    { english: 'importance', japanese: '重要性' },
    { english: 'quality', japanese: '質' },
    { english: 'standard', japanese: '基準' },
    { english: 'level', japanese: '水準' },
    { english: 'grade', japanese: '等級、成績' },
    { english: 'feature', japanese: '特徴' },
    { english: 'safety', japanese: '安全' },
    { english: 'speed', japanese: '速度' },
    { english: 'best', japanese: '最善、最高のもの' },
    { english: 'better', japanese: 'より良いもの、改善' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
