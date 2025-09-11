import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 自然現象を表す動詞マトリクスを表示するコンポーネント
 */
export const NaturalPhenomenaMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 降る（意味が近い順）
    { english: 'rain', japanese: '雨が降る' },
    { english: 'snow', japanese: '雪が降る' },

    // 輝く・昇る・沈む（意味が近い順）
    { english: 'shine', japanese: '輝く' },
    { english: 'rise', japanese: '昇る（太陽等）', linkNo: [5] },
    { english: 'set', japanese: '沈む（太陽等）', linkNo: [10] },

    // 溶ける・凍る（意味が近い順）
    { english: 'melt', japanese: '溶ける、〜を溶かす' },
    { english: 'freeze', japanese: '凍る、〜を凍らせる' },

    // 吹く・流れる（意味が近い順）
    { english: 'blow', japanese: '風が吹く', linkNo: [10] },
    { english: 'flow', japanese: '流れる（川、水）' },

    // 燃える・沸騰する（意味が近い順）
    { english: 'burn', japanese: '燃える、〜を燃やす' },
    { english: 'boil', japanese: '沸騰する' },
  ];

  return <WordMatrix data={data} columns={5} />;
};
