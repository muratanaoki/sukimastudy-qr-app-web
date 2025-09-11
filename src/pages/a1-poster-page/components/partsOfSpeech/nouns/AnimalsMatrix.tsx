import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 動物マトリクスのテーブルを表示するコンポーネント
 */
export const AnimalsMatrix: React.FC = () => {
  // 動物データ
  const animalsData: WordPairArray = [
    // 動物全般
    { english: 'animal', japanese: '動物' },
    { english: 'creature', japanese: '生き物' },
    // ペット・動物園
    { english: 'pet', japanese: 'ペット' },
    { english: 'tail', japanese: 'しっぽ' },
    // ペット
    { english: 'dog', japanese: '犬' },
    { english: 'cat', japanese: 'ネコ' },
    { english: 'rabbit', japanese: 'ウサギ' },
    { english: 'bird', japanese: '鳥' },
    // 家畜
    { english: 'chicken', japanese: 'ニワトリ', linkNo: [34] },
    { english: 'horse', japanese: '馬' },
    { english: 'cow', japanese: '牛' },
    { english: 'pig', japanese: 'ブタ' },
    { english: 'sheep', japanese: 'ヒツジ' },
    // 野生動物
    { english: 'monkey', japanese: 'サル' },
    { english: 'panda', japanese: 'パンダ' },
    { english: 'lion', japanese: 'ライオン' },
    { english: 'tiger', japanese: 'トラ' },
    { english: 'bear', japanese: 'クマ' },
    { english: 'elephant', japanese: 'ゾウ' },
    { english: 'fox', japanese: 'キツネ' },
    // 水生動物
    { english: 'fish', japanese: '魚' },
    { english: 'whale', japanese: 'クジラ' },
    { english: 'dolphin', japanese: 'イルカ' },
    // 昆虫
    { english: 'insect', japanese: '昆虫' },
    { english: 'butterfly', japanese: 'チョウ' },
    { english: 'ant', japanese: 'アリ' },
    { english: 'bee', japanese: 'ハチ' },
    { english: 'spider', japanese: 'クモ' },
    { english: 'moth', japanese: 'ガ' },
    { english: 'fly', japanese: 'ハエ' },
  ];

  return <WordMatrix data={animalsData} columns={6} />;
};
