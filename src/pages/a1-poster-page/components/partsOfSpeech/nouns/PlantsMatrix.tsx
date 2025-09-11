import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 植物マトリクスのテーブルを表示するコンポーネント
 */
export const PlantsMatrix: React.FC = () => {
  // 植物データ
  const plantsData: WordPairArray = [
    // 植物全般
    { english: 'plant', japanese: '植物' },
    { english: 'tree', japanese: '木' },
    { english: 'flower', japanese: '花' },
    { english: 'grass', japanese: '草、芝生' },
    // 部位
    { english: 'leaf', japanese: '葉' },
    { english: 'seed', japanese: '種' },
    { english: 'branch', japanese: '枝', linkNo: [53] },
    { english: 'root', japanese: '根' },

    // 果物
    { english: 'apple', japanese: 'リンゴ' },
    { english: 'orange', japanese: 'オレンジ' },
    { english: 'banana', japanese: 'バナナ' },
    { english: 'strawberry', japanese: 'イチゴ' },
    { english: 'grape', japanese: 'ブドウ' },
    { english: 'lemon', japanese: 'レモン' },
    { english: 'peach', japanese: 'モモ' },
    { english: 'cherry', japanese: 'サクランボ' },
    // 野菜
    { english: 'potato', japanese: 'ジャガイモ' },
    { english: 'tomato', japanese: 'トマト' },
    { english: 'onion', japanese: 'タマネギ' },
    { english: 'carrot', japanese: 'ニンジン' },
    { english: 'corn', japanese: 'トウモロコシ' },
    // 花
    { english: 'rose', japanese: 'バラ' },
    { english: 'sunflower', japanese: 'ひまわり' },
    { english: 'tulip', japanese: 'チューリップ' },
  ];

  return <WordMatrix data={plantsData} columns={6} />;
};
