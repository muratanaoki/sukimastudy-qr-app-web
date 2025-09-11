import React from 'react';
import { WordPairArray } from '../../../../../shared/types';
import { WordMatrix } from '../../common/WordMatrix';

/**
 * 数、数量マトリクスのテーブルを表示するコンポーネント
 */
export const NumbersQuantityMatrix: React.FC = () => {
  // 数、数量データ
  const numbersQuantityData: WordPairArray = [
    // 基本・単位
    { english: 'number', japanese: '数、番号' },
    { english: 'unit', japanese: '単位' },
    // 計算・集計
    { english: 'count', japanese: '数えること、総数' },
    { english: 'sum', japanese: '合計、総和' },
    { english: 'total', japanese: '合計' },
    { english: 'amount', japanese: '量、総額' },
    { english: 'quantity', japanese: '量' },
    // 割合・平均
    { english: 'percent', japanese: 'パーセント' },
    { english: 'percentage', japanese: '割合、百分率' },
    { english: 'rate', japanese: '率、割合' },
    { english: 'average', japanese: '平均' },
    // 全体・部分
    { english: 'whole', japanese: '全体' },
    { english: 'part', japanese: '部分' },
    { english: 'piece', japanese: '断片' },
    { english: 'bit', japanese: '少し' },
    // 増減
    { english: 'increase', japanese: '増加' },
    { english: 'decrease', japanese: '減少' },
    // 倍数
    { english: 'single', japanese: '単一' },
    { english: 'double', japanese: '2倍' },
    { english: 'triple', japanese: '3倍' },
    // 集合・組
    { english: 'pair', japanese: '一組' },
    { english: 'couple', japanese: '一組、二人、少数' },
    { english: 'lot', japanese: 'たくさん（a lot ofで使用）' },
    // その他
    { english: 'half', japanese: '半分' },
  ];

  return <WordMatrix data={numbersQuantityData} columns={6} />;
};
