import React from 'react';
import {
  ComparativeAndSuperlativeMatrix,
  ComparativeData,
} from '../../common/ComparativeAndSuperlativeMatrix';

export const RegularChangesMatrix2: React.FC = () => {
  const data: ComparativeData[] = [
    {
      english: 'big',
      comparative: 'bigger',
      superlative: 'biggest',
      japanese: '大きい',
    },
    {
      english: 'hot',
      comparative: 'hotter',
      superlative: 'hottest',
      japanese: '暑い、熱い',
    },
    {
      english: 'sad',
      comparative: 'sadder',
      superlative: 'saddest',
      japanese: '悲しい',
    },
  ];

  return (
    <>
      <ComparativeAndSuperlativeMatrix data={data} />
    </>
  );
};
