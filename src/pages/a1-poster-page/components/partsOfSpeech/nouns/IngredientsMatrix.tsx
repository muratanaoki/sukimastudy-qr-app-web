import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 食材マトリクスのテーブルを表示するコンポーネント
 */
export const IngredientsMatrix: React.FC = () => {
  // 食材データ
  const ingredientsData: WordPairArray = [
    // 食べ物・飲み物（総称）
    { english: 'food', japanese: '食べ物' },
    { english: 'drink', japanese: '飲み物（一般的）' },
    { english: 'beverage', japanese: '飲み物（丁寧）' },

    // 食事・メニュー
    { english: 'meal', japanese: '食事' },
    { english: 'breakfast', japanese: '朝食' },
    { english: 'lunch', japanese: '昼食' },
    { english: 'dinner', japanese: '夕食' },
    { english: 'snack', japanese: '軽食、おやつ' },
    { english: 'menu', japanese: 'メニュー' },
    { english: 'sandwich', japanese: 'サンドイッチ' },

    // 料理・レシピ
    { english: 'dish', japanese: '料理' },
    { english: 'recipe', japanese: 'レシピ' },
    { english: 'soup', japanese: 'スープ' },
    { english: 'salad', japanese: 'サラダ' },

    // 材料・主食
    { english: 'rice', japanese: '米' },
    { english: 'bread', japanese: 'パン' },
    { english: 'toast', japanese: 'トースト' },
    { english: 'noodles', japanese: '麺' },
    { english: 'flour', japanese: '小麦粉' },
    { english: 'cereal', japanese: 'シリアル' },

    // 野菜・果物・ナッツ
    { english: 'vegetable', japanese: '野菜' },
    { english: 'fruit', japanese: '果物' },
    { english: 'nut', japanese: 'ナッツ' },

    // 肉・魚介類
    { english: 'meat', japanese: '肉' },
    { english: 'beef', japanese: '牛肉' },
    { english: 'pork', japanese: '豚肉' },
    { english: 'chicken', japanese: '鶏肉', linkNo: [45] },
    { english: 'seafood', japanese: 'シーフード、魚介類' },

    // 卵・乳製品
    { english: 'egg', japanese: '卵' },
    { english: 'milk', japanese: '牛乳' },
    { english: 'cream', japanese: 'クリーム' },
    { english: 'cheese', japanese: 'チーズ' },
    { english: 'butter', japanese: 'バター' },

    // 調味料・風味
    { english: 'salt', japanese: '塩' },
    { english: 'sugar', japanese: '砂糖' },
    { english: 'pepper', japanese: 'こしょう' },
    { english: 'sauce', japanese: 'ソース' },
    { english: 'flavor', japanese: '風味、味' },

    // デザート・甘いもの
    { english: 'dessert', japanese: 'デザート' },
    { english: 'cake', japanese: 'ケーキ' },
    { english: 'sweet', japanese: '甘いもの' },
    { english: 'treat', japanese: 'ごちそう' },

    // 飲み物（具体的）
    { english: 'tea', japanese: 'お茶' },
    { english: 'coffee', japanese: 'コーヒー' },
    { english: 'juice', japanese: 'ジュース' },
    { english: 'soda', japanese: 'ソーダ、炭酸飲料' },
    { english: 'beer', japanese: 'ビール' },
    { english: 'wine', japanese: 'ワイン' },
  ];

  return <WordMatrix data={ingredientsData} columns={6} />;
};
