import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const MovementMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 動き・移動
    { english: 'movement', japanese: '動き' },
    { english: 'move', japanese: '動くこと' },
    { english: 'step', japanese: '一歩、段階' },
    { english: 'hurry', japanese: '急ぎ' },
    { english: 'slide', japanese: '滑り', linkNo: [38] },

    // 旅行・訪問・帰還
    { english: 'trip', japanese: '旅行、つまずき' },
    { english: 'visit', japanese: '訪問' },
    { english: 'travel', japanese: '旅行、移動' },
    { english: 'return', japanese: '帰還' },

    // 上昇・落下・回転
    { english: 'rise', japanese: '上昇' },
    { english: 'fall', japanese: '落下', linkNo: [2] },
    { english: 'turn', japanese: '回転、順番、転機' },

    // 流れ・交通・飛行
    { english: 'flow', japanese: '流れ' },
    { english: 'traffic', japanese: '交通' },
    { english: 'flight', japanese: '飛行' },
    { english: 'escape', japanese: '脱出' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
