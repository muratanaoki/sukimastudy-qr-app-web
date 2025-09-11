import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const DirectionMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 到達、方向
    { english: 'to', japanese: '〜へ、〜まで（到達点、方向）' },
    { english: 'for', japanese: '〜行き（行き先を示す）', linkNo: [3, 4] },
    { english: 'toward / towards', japanese: '〜の方へ（方向づけ、接近）' },
    { english: 'into', japanese: '〜の中へ（外→内へ進入）', linkNo: [5] },
    { english: 'onto', japanese: '〜の上へ（下→上へ移動し接触）' },
    { english: 'over', japanese: '〜を越えて、〜の上を（横断）', linkNo: [3, 5] },
    { english: 'from', japanese: '〜から（起点、出所）', linkNo: [3, 4] },
    { english: 'off', japanese: '〜から離れて（分離、離脱）' },
    { english: 'up', japanese: '〜の上の方へ（上昇）' },
    { english: 'down', japanese: '〜の下の方へ（下降）' },
    { english: 'across', japanese: '〜を横切って（端から端へ）' },
    { english: 'through', japanese: '〜を通り抜けて（内部を通過）', linkNo: [4] },
    { english: 'along', japanese: '〜に沿って（線、縁に沿う移動）' },
    { english: 'past', japanese: '〜を通り過ぎて（通過）', linkNo: [3] },
    { english: 'around', japanese: '〜の周りを（周回、あたりを）', linkNo: [3] },
    { english: 'out of', japanese: '〜の外へ、〜の外に（内→外）', linkNo: [4, 5] },
  ];
  return <WordMatrix data={data} columns={5} />;
};
