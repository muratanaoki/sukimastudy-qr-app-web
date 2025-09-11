import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const PositionMatrix: React.FC = () => {
  const data: WordPairArray = [
    { english: 'at', japanese: '〜に、〜で（特定の一点、地点）', linkNo: [3] },
    { english: 'in', japanese: '〜の中に（範囲の内側）', linkNo: [3] },
    { english: 'on', japanese: '〜の上に（接触している状態）', linkNo: [3, 4] },
    { english: 'above', japanese: '〜の上方に（接触しない位置）' },
    { english: 'below', japanese: '〜の下方に（接触なしを含む）' },
    { english: 'under', japanese: '〜の下に（接触、直下を含む）' },
    { english: 'inside', japanese: '〜の内側に（内部）' },
    { english: 'within', japanese: '〜の内側に（空間の範囲内）', linkNo: [3] },
    { english: 'outside', japanese: '〜の外側に（外部）' },
    { english: 'among', japanese: '〜の中に（3つ以上）' },
    { english: 'between', japanese: '〜の間に（2つの間）' },
    { english: 'in front of', japanese: '〜の前方に（対象の外側）' },
    { english: 'behind', japanese: '〜の後ろに（背後）' },
    { english: 'opposite', japanese: '〜の向かいに（向かい合う）' },
    { english: 'against', japanese: '〜に寄りかかって（接触する）', linkNo: [4] },
    { english: 'beside', japanese: '〜のそばに（横）' },
    { english: 'by', japanese: '〜のそばに（近接、すぐ脇）', linkNo: [3, 4] },
    { english: 'near', japanese: '〜の近くに' },
    { english: 'next to', japanese: '〜の隣に（直近）' },
    { english: 'far from', japanese: '〜から遠い（距離がある）' },
  ];
  return <WordMatrix data={data} columns={5} />;
};
