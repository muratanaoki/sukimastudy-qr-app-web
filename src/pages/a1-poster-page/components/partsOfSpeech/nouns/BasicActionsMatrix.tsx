import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 基本動作のマトリクスのテーブルを表示するコンポーネント
 */
export const BasicActionsMatrix: React.FC = () => {
  // 基本動作データ
  const data: WordPairArray = [
    // 基本動作
    { english: 'action', japanese: '行動' },
    { english: 'touch', japanese: '触れること', linkNo: [22] },
    { english: 'hold', japanese: '握ること' },
    { english: 'lift', japanese: '持ち上げること' },
    { english: 'walk', japanese: '散歩、歩行' },
    { english: 'run', japanese: 'ラン、走行' },
    { english: 'jump', japanese: '跳躍' },
    { english: 'cut', japanese: '切ること' },

    // 押す・引く・蹴る
    { english: 'push', japanese: '押すこと' },
    { english: 'pull', japanese: '引くこと' },
    { english: 'kick', japanese: '蹴ること' },
    { english: 'throw', japanese: '投げること' },
    { english: 'swim', japanese: 'ひと泳ぎ' },

    // 揺れ・振る・ノック
    { english: 'shake', japanese: '揺れ（短く強い）' },
    { english: 'swing', japanese: '揺れ（ゆったり弧を描く）' },
    { english: 'wave', japanese: '手を振ること', linkNo: [47] },
    { english: 'knock', japanese: 'ノックの音' },

    // 見る・目覚め・泣く・着る
    { english: 'cry', japanese: '泣き声' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
