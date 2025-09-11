import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 創造と発展の動詞マトリクスを表示するコンポーネント
 */
export const CreationDevelopmentMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 作る・創造（意味が近い順）
    { english: 'make', japanese: '〜を作る、〜にする' },
    { english: 'cook', japanese: '〜を料理する' },
    { english: 'create', japanese: '〜を創造する' },
    { english: 'produce', japanese: '〜を生産する、〜を制作する' },
    { english: 'build', japanese: '〜を建てる、〜を構築する' },
    { english: 'design', japanese: '〜を設計する' },
    { english: 'invent', japanese: '〜を発明する' },

    // 改善・発展・育てる（意味が近い順）
    { english: 'improve', japanese: '改善する、〜を改善する' },
    { english: 'develop', japanese: '〜を開発する', linkNo: [15] },

    // 発見・探す
    { english: 'discover', japanese: '〜を発見する' },
  ];

  return <WordMatrix data={data} columns={5} />;
};
