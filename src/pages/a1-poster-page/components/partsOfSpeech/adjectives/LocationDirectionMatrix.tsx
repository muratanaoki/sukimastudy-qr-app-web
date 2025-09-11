import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語場所、方向の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const LocationDirectionMatrix: React.FC = () => {
  // 場所、方向の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 基本方位
    { english: 'northern', japanese: '北部の' },
    { english: 'southern', japanese: '南部の' },
    { english: 'eastern', japanese: '東部の' },
    { english: 'western', japanese: '西部の' },

    // 垂直位置
    { english: 'central', japanese: '中心の（中心的な役割）' },
    { english: 'middle', japanese: '真ん中の（物理的中間点）' },
    { english: 'upper', japanese: '上部の' },
    { english: 'lower', japanese: '下部の' },

    // 水平位置
    { english: 'left', japanese: '左の' },
    { english: 'right', japanese: '右の' },
    { english: 'opposite', japanese: '反対の' },

    // 距離
    { english: 'close', japanese: '近い、親しい、接近した' },
    { english: 'nearby', japanese: '近くの（場所、位置）' },
    { english: 'far', japanese: '遠い' },
    { english: 'distant', japanese: '遠方の、隔たりがある' },

    // その他
    { english: 'local', japanese: '地元の' },
    { english: 'indoor', japanese: '屋内の' },
    { english: 'outdoor', japanese: '屋外の' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
