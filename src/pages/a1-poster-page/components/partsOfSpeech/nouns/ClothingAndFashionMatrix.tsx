import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 衣類、ファッションマトリクスのテーブルを表示するコンポーネント
 */
export const ClothingAndFashionMatrix: React.FC = () => {
  // 衣類、ファッションデータ
  const clothingAndFashionData: WordPairArray = [
    { english: 'wear', japanese: '衣類、着るもの' },
    // ファッション・スタイル（概念）
    { english: 'fashion', japanese: 'ファッション、流行' },
    { english: 'style', japanese: 'スタイル' },
    { english: 'trend', japanese: '流行' },
    { english: 'look', japanese: '外見、様子' },
    { english: 'brand', japanese: 'ブランド、銘柄' },

    // 衣服（総称・材料）
    { english: 'clothes', japanese: '衣服' },

    // 特別な衣服
    { english: 'uniform', japanese: '制服' },
    { english: 'pajamas', japanese: 'パジャマ' },
    { english: 'swimsuit', japanese: '水着' },

    // アウター（外着）
    { english: 'coat', japanese: 'コート' },
    { english: 'jacket', japanese: 'ジャケット' },
    { english: 'suit', japanese: 'スーツ' },

    // トップス（上半身）
    { english: 'sweater', japanese: 'セーター' },
    { english: 'top', japanese: 'トップス', linkNo: [31] },
    { english: 'T-shirt', japanese: 'T シャツ' },
    { english: 'dress', japanese: 'ワンピース' },

    // フォーマル小物
    { english: 'tie', japanese: 'ネクタイ', linkNo: [39] },

    // ボトムス（下半身）
    { english: 'pants', japanese: 'ズボン' },
    { english: 'jeans', japanese: 'ジーンズ' },
    { english: 'shorts', japanese: 'ショートパンツ' },
    { english: 'skirt', japanese: 'スカート' },

    // 足元
    { english: 'socks', japanese: '靴下' },
    { english: 'shoes', japanese: '靴（複数形が基本）' },
    { english: 'sneakers', japanese: 'スニーカー' },
    { english: 'boots', japanese: 'ブーツ' },
    { english: 'sandals', japanese: 'サンダル' },

    // 頭部アクセサリー
    { english: 'hat', japanese: '帽子' },
    { english: 'cap', japanese: 'キャップ' },

    // 身体アクセサリー
    { english: 'accessory', japanese: 'アクセサリー、装飾品' },
    { english: 'belt', japanese: 'ベルト' },
    { english: 'scarf', japanese: 'スカーフ、マフラー' },
    { english: 'gloves', japanese: '手袋' },

    // ジュエリー
    { english: 'ring', japanese: '指輪、リング、輪', linkNo: [39] },
    { english: 'necklace', japanese: '首飾り' },
    { english: 'earrings', japanese: 'イヤリング、ピアス' },

    // 実用小物
    { english: 'glasses', japanese: '眼鏡' },
    { english: 'purse', japanese: 'ハンドバッグ' },
    { english: 'wallet', japanese: '財布' },

    // 服の部品・構造
    { english: 'pocket', japanese: 'ポケット' },
    { english: 'button', japanese: 'ボタン', linkNo: [46] },
    { english: 'zipper', japanese: 'ジッパー' },
  ];

  return <WordMatrix data={clothingAndFashionData} columns={6} />;
};
