import React from 'react';
import {
  ComparativeAndSuperlativeMatrix,
  ComparativeData,
} from '../../common/ComparativeAndSuperlativeMatrix';

export const RegularChangesMatrix3: React.FC = () => {
  const data: ComparativeData[] = [
    {
      english: 'cute',
      comparative: 'cuter',
      superlative: 'cutest',
      japanese: 'かわいい（愛らしい系）',
    },
    {
      english: 'large',
      comparative: 'larger',
      superlative: 'largest',
      japanese: '大きい、広い',
    },
    {
      english: 'nice',
      comparative: 'nicer',
      superlative: 'nicest',
      japanese: '感じが良い',
    },
  ];

  return (
    <>
      <ComparativeAndSuperlativeMatrix data={data} />
    </>
  );
};
