import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const MaterialsAndSubstancesMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 金属・石
    { english: 'metal', japanese: '金属' },
    { english: 'iron', japanese: '鉄' },
    { english: 'copper', japanese: '銅' },
    { english: 'silver', japanese: '銀' },
    { english: 'gold', japanese: '金' },
    { english: 'bronze', japanese: '青銅' },
    { english: 'stone', japanese: '石' },

    // 布・繊維
    { english: 'cloth', japanese: '布' },
    { english: 'cotton', japanese: '綿、コットン' },
    { english: 'silk', japanese: '絹' },

    // その他素材
    { english: 'wood', japanese: '木材' },
    { english: 'glass', japanese: 'ガラス', linkNo: [33] },
    { english: 'plastic', japanese: 'プラスチック' },
    { english: 'paper', japanese: '紙', linkNo: [38] },
    { english: 'oil', japanese: '油、石油' },
    { english: 'paint', japanese: 'ペンキ' },
    { english: 'ink', japanese: 'インク' },
    { english: 'material', japanese: '材料、原料' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
