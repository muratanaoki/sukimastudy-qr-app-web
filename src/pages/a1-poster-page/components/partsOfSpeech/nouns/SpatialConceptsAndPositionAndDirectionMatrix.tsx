import React from 'react';
import { WordPairArray } from '../../../../../shared/types';
import { WordMatrix } from '../../common/WordMatrix';

/**
 * 空間概念・位置マトリクスのテーブルを表示するコンポーネント
 */
export const SpatialConceptsAndPositionAndDirectionMatrix: React.FC = () => {
  // 空間概念・位置データ
  const data: WordPairArray = [
    // 方位
    { english: 'north', japanese: '北' },
    { english: 'south', japanese: '南' },
    { english: 'east', japanese: '東' },
    { english: 'west', japanese: '西' },

    // 上下・左右・中央
    { english: 'top', japanese: '上部、頂上', linkNo: [36] },
    { english: 'bottom', japanese: '底、下部' },
    { english: 'left', japanese: '左' },
    { english: 'right', japanese: '右', linkNo: [51] },
    { english: 'center', japanese: '中心、中央' },
    { english: 'middle', japanese: '中央、真ん中' },

    // 前後・側面
    { english: 'front', japanese: '前面、正面' },
    { english: 'back', japanese: '後ろ、背面', linkNo: [21] },
    { english: 'side', japanese: '側面、横', linkNo: [50] },

    // 内外
    { english: 'inside', japanese: '内部、中' },
    { english: 'outside', japanese: '外部、外' },

    // 方向
    { english: 'direction', japanese: '方向' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
