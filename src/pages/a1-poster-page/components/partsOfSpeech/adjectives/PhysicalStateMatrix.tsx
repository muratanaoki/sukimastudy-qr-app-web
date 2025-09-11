import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語物理的な状態の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const PhysicalStateMatrix: React.FC = () => {
  // 物理的な状態の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 清潔さ
    { english: 'clean', japanese: 'きれいな' },
    { english: 'dirty', japanese: '汚い' },

    // 湿度
    { english: 'wet', japanese: 'ぬれた' },
    { english: 'dry', japanese: '乾燥した' },

    // 容量、充填状態
    { english: 'empty', japanese: '空の（中身が空）' },
    { english: 'full', japanese: '満たされた' },

    // 強度、品質
    { english: 'strong', japanese: '丈夫な、力が強い' },
    { english: 'weak', japanese: '弱い、もろい', linkNo: [1] },

    // 物理的状態
    { english: 'solid', japanese: '固体の', linkNo: [5, 15] },
    { english: 'liquid', japanese: '液体の' },
    { english: 'broken', japanese: '壊れた、故障した' },

    // 鮮度、生命
    { english: 'fresh', japanese: '新鮮な', linkNo: [13] },
    { english: 'raw', japanese: '生の' },
    { english: 'live', japanese: '生きている', linkNo: [22] },
    { english: 'dead', japanese: '死んでいる', linkNo: [3] },

    // 空き・使用中
    { english: 'vacant', japanese: '空いている（部屋等）' },
    { english: 'occupied', japanese: '使用中の' },
    { english: 'available', japanese: '利用可能な、都合がつく' },

    // 開閉
    { english: 'open', japanese: '開いている', linkNo: [1] },
    { english: 'closed', japanese: '閉まっている' },

    // 混雑
    { english: 'crowded', japanese: '混んでいる' },

    // 安全・危険
    { english: 'safe', japanese: '安全な' },
    { english: 'dangerous', japanese: '危険な' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
