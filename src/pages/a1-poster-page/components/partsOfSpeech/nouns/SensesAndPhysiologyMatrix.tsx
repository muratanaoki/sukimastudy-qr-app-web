import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 感覚、生理現象のマトリクスのテーブルを表示するコンポーネント
 */
export const SensesAndPhysiologyMatrix: React.FC = () => {
  // 感覚、生理現象データ
  const sensesAndPhysiologyData: WordPairArray = [
    // 感覚
    { english: 'sense', japanese: '五感、感覚', linkNo: [24] },

    { english: 'vision', japanese: '視覚' },
    { english: 'hearing', japanese: '聴覚' },
    { english: 'taste', japanese: '味、味覚' },
    { english: 'smell', japanese: '匂い、嗅覚' },
    { english: 'touch', japanese: '触覚', linkNo: [28] },
    { english: 'pain', japanese: '痛み、痛覚' },

    // 生理現象
    { english: 'breath', japanese: '息、呼吸' },
    { english: 'tear', japanese: '涙' },
    { english: 'sleep', japanese: '睡眠、眠り' },
    { english: 'hunger', japanese: '空腹' },
    { english: 'death', japanese: '死、死亡' },
  ];

  return <WordMatrix data={sensesAndPhysiologyData} columns={6} />;
};
