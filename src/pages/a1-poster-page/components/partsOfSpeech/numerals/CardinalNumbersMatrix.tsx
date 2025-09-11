import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語基数詞マトリクスのテーブルを表示するコンポーネント
 */
export const CardinalNumbersMatrix: React.FC = () => {
  // 基数詞のデータ（学習しやすい論理的な順序で整理）
  const cardinalData: WordPairArray = [
    { english: 'minus', japanese: 'マイナス' },
    { english: 'plus', japanese: 'プラス' },
    { english: 'zero', japanese: '0' },
    { english: 'one', japanese: '1' },
    { english: 'two', japanese: '2' },
    { english: 'three', japanese: '3' },
    { english: 'four', japanese: '4' },
    { english: 'five', japanese: '5' },
    { english: 'six', japanese: '6' },
    { english: 'seven', japanese: '7' },
    { english: 'eight', japanese: '8' },
    { english: 'nine', japanese: '9' },
    { english: 'ten', japanese: '10' },
    { english: 'eleven', japanese: '11' },
    { english: 'twelve', japanese: '12' },
    { english: 'thirteen', japanese: '13' },
    { english: 'fourteen', japanese: '14' },
    { english: 'fifteen', japanese: '15' },
    { english: 'sixteen', japanese: '16' },
    { english: 'seventeen', japanese: '17' },
    { english: 'eighteen', japanese: '18' },
    { english: 'nineteen', japanese: '19' },
    { english: 'twenty', japanese: '20' },
    { english: 'thirty', japanese: '30' },
    { english: 'forty', japanese: '40' },
    { english: 'fifty', japanese: '50' },
    { english: 'sixty', japanese: '60' },
    { english: 'seventy', japanese: '70' },
    { english: 'eighty', japanese: '80' },
    { english: 'ninety', japanese: '90' },
    { english: 'hundred', japanese: '100' },
    { english: 'thousand', japanese: '1000' },
    { english: 'million', japanese: '100万' },
    { english: 'billion', japanese: '10億' },
    { english: 'trillion', japanese: '1兆' },
  ];

  return <WordMatrix data={cardinalData} columns={6} />;
};
