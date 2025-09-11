import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 経済、金融のマトリクスのテーブルを表示するコンポーネント
 */
export const EconomyAndFinanceMatrix: React.FC = () => {
  // 経済、金融データ
  const economyAndFinanceData: WordPairArray = [
    // 経済・金融・産業の基本概念
    { english: 'economy', japanese: '経済' },
    { english: 'finance', japanese: '金融' },
    { english: 'business', japanese: 'ビジネス' },
    { english: 'industry', japanese: '産業、工業' },

    // 企業・組織
    { english: 'company', japanese: '会社' },
    { english: 'branch', japanese: '支店', linkNo: [44] },

    // 市場・取引
    { english: 'market', japanese: '市場' },
    { english: 'trade', japanese: '貿易、取引' },
    { english: 'export', japanese: '輸出' },
    { english: 'import', japanese: '輸入' },
    { english: 'supply', japanese: '供給' },
    { english: 'demand', japanese: '需要' },

    // 商品・サービス・販売
    { english: 'product', japanese: '製品、産物' },
    { english: 'service', japanese: 'サービス、公共事業' },
    { english: 'sale', japanese: '販売' },
    { english: 'delivery', japanese: '配達' },
    { english: 'stock', japanese: '在庫' },

    // 収益・損失
    { english: 'profit', japanese: '利益' },
    { english: 'income', japanese: '収入' },
    { english: 'pay', japanese: '給料' },

    // 通貨・お金
    { english: 'money', japanese: 'お金' },
    { english: 'cash', japanese: '現金' },
    { english: 'credit card', japanese: 'クレジットカード' },
    { english: 'dollar', japanese: 'ドル' },
    { english: 'yen', japanese: '円' },
    { english: 'euro', japanese: 'ユーロ' },
    { english: 'pound', japanese: 'ポンド' },

    // 価格・費用
    { english: 'price', japanese: '価格' },
    { english: 'cost', japanese: 'コスト' },
    { english: 'charge', japanese: '料金' },
    { english: 'fee', japanese: '料金、手数料' },
    { english: 'fare', japanese: '運賃' },
    { english: 'expense', japanese: '支出、費用' },
    { english: 'rent', japanese: '家賃' },

    // 予算・税金・割引
    { english: 'budget', japanese: '予算' },
    { english: 'tax', japanese: '税金' },
    { english: 'discount', japanese: '割引' },
    { english: 'allowance', japanese: 'お小遣い' },

    // 会計・決済・書類
    { english: 'checkout', japanese: '会計' },
    { english: 'change', japanese: 'おつり' },
    { english: 'bill', japanese: '請求書' },
    { english: 'receipt', japanese: 'レシート' },
  ];

  return <WordMatrix data={economyAndFinanceData} columns={6} />;
};
