import React from 'react';
import {
  ComparativeAndSuperlativeMatrix,
  ComparativeData,
} from '../../common/ComparativeAndSuperlativeMatrix';

export const RegularChangesMatrix1: React.FC = () => {
  const data: ComparativeData[] = [
    {
      english: 'busy',
      comparative: 'busier',
      superlative: 'busiest',
      japanese: '忙しい',
    },
    {
      english: 'early',
      comparative: 'earlier',
      superlative: 'earliest',
      japanese: '（時間が）早い',
    },
    {
      english: 'happy',
      comparative: 'happier',
      superlative: 'happiest',
      japanese: '幸せな',
    },
  ];

  return (
    <>
      <ComparativeAndSuperlativeMatrix data={data} />
    </>
  );
};
