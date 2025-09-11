import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const MethodsAndProcessMatrix: React.FC = () => {
  const data: WordPairArray = [
    { english: 'method', japanese: '方法（丁寧）' },
    { english: 'way', japanese: '方法（口語的）、道' },
    { english: 'system', japanese: '体系、制度' },
    { english: 'process', japanese: '過程、手順' },
    { english: 'stage', japanese: '段階、ステージ' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
