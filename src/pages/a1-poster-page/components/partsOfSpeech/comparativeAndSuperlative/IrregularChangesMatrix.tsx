import React from 'react';
import {
  ComparativeAndSuperlativeMatrix,
  ComparativeData,
} from '../../common/ComparativeAndSuperlativeMatrix';
import styles from '@/shared/styles/styles.module.css';

export const IrregularChangesMatrix: React.FC = () => {
  const data: ComparativeData[] = [
    {
      english: 'bad',
      comparative: 'worse',
      superlative: 'worst',
      japanese: '悪い、嫌な',
    },
    {
      english: 'badly',
      comparative: 'worse',
      superlative: 'worst',
      japanese: 'ひどく、下手に',
    },
    {
      english: '　far *',
      comparative: 'farther',
      superlative: 'farthest',
      japanese: '遠い（物理的な距離）',
    },
    {
      english: '　far *',
      comparative: 'further',
      superlative: 'furthest',
      japanese: '遠い（程度、発展）',
    },
    {
      english: 'good',
      comparative: 'better',
      superlative: 'best',
      japanese: '良い、優れている',
    },
    {
      english: 'ill',
      comparative: 'worse',
      superlative: 'worst',
      japanese: '病気の（重め）',
    },
    {
      english: '　late *',
      comparative: 'later',
      superlative: 'last',
      japanese: '遅い（順番）',
    },
    {
      english: '　little *',
      comparative: 'less',
      superlative: 'least',
      japanese: '少しの（量、程度）',
    },
    {
      english: 'many',
      comparative: 'more',
      superlative: 'most',
      japanese: 'たくさんの',
    },
    {
      english: 'much',
      comparative: 'more',
      superlative: 'most',
      japanese: 'とても（比較、否定、疑問で）',
    },

    {
      english: 'well',
      comparative: 'better',
      superlative: 'best',
      japanese: '体調が良い、元気な',
    },
  ];

  return (
    <>
      <ComparativeAndSuperlativeMatrix data={data} />
      <p className={styles.remark}>
        ※ far は「物理的な距離」の用法では farther–farthest をよく用い、「程度、発展」では
        further–furthest を用いる。
      </p>
      <p className={styles.remark}>
        ※ late は「時間・時期」の用法では later–latest（最遅、最新）に変化し、「順番」では
        later–last（順番が最後）となる。
      </p>
      <p className={styles.remark}>
        ※ little は「量・程度」の用法では less–least に変化し、「大きさ」では通常
        small–smaller–smallest を用いる。
      </p>
    </>
  );
};
