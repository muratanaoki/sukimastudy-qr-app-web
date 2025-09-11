import React from 'react';
import {
  ComparativeAndSuperlativeMatrix,
  ComparativeData,
} from '../../common/ComparativeAndSuperlativeMatrix';

export const MostAndmoreMatrix: React.FC = () => {
  const data: ComparativeData[] = [
    {
      english: 'beautiful',
      comparative: 'more beautiful',
      superlative: 'most beautiful',
      japanese: '美しい',
    },
    {
      english: 'difficult',
      comparative: 'more difficult',
      superlative: 'most difficult',
      japanese: '難しい',
    },
    {
      english: 'important',
      comparative: 'more important',
      superlative: 'most important',
      japanese: '重要な、大切な',
    },
  ];

  return (
    <>
      <ComparativeAndSuperlativeMatrix data={data} />
    </>
  );
};
