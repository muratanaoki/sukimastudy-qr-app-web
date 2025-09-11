import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 経済活動の動詞マトリクスを表示するコンポーネント
 */
export const EconomicActivitiesMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 買う・注文・買い物・売る（意味が近い順）
    { english: 'buy', japanese: '〜を買う、〜を購入する' },
    { english: 'shop', japanese: '買い物をする' },
    { english: 'order', japanese: '〜を注文する', linkNo: [6] },
    { english: 'sell', japanese: '〜を販売する' },
    { english: 'deal', japanese: '取引する、扱う' },

    // 予約（関連）
    { english: 'book', japanese: '〜を予約する' },

    // 保有・保持
    { english: 'hold', japanese: '〜を開催する（会議等）', linkNo: [10] },

    // 支払う・費用・浪費・貯金・余裕（意味が近い順）
    { english: 'pay', japanese: '〜を支払う' },
    { english: 'cost', japanese: '費用がかかる、〜を要する' },
    { english: 'waste', japanese: '〜を浪費する' },
    { english: 'save', japanese: '貯める、〜を節約する', linkNo: [8, 11] },
    { english: 'afford', japanese: '〜する余裕がある' },
    { english: 'reduce', japanese: '〜を減らす' },

    // 借りる・貸す・レンタル（意味が近い順）
    { english: 'borrow', japanese: '〜を借りる' },
    { english: 'lend', japanese: '〜を貸す' },
  ];

  return <WordMatrix data={data} columns={5} />;
};
