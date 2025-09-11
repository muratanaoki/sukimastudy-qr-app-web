import React from 'react';
import { WordPairArray } from '../../../../../shared/types';
import { WordMatrix } from '../../common/WordMatrix';

/**
 * 測定単位マトリクスのテーブルを表示するコンポーネント
 */
export const MeasurementUnitsMatrix: React.FC = () => {
  // 測定単位データ
  const measurementUnitsData: WordPairArray = [
    // 測定・単位
    { english: 'measure', japanese: '測定' },
    { english: 'degree', japanese: '度' },
    // 長さ
    { english: 'length', japanese: '長さ' },
    { english: 'distance', japanese: '距離' },
    { english: 'inch', japanese: 'インチ' },
    { english: 'foot', japanese: 'フィート' },
    { english: 'yard', japanese: 'ヤード' },
    { english: 'mile', japanese: 'マイル' },
    { english: 'meter', japanese: 'メートル' },
    { english: 'centimeter', japanese: 'センチメートル' },
    { english: 'kilometer', japanese: 'キロメートル' },
    // 大きさ・面積・体積
    { english: 'size', japanese: '大きさ、サイズ' },
    { english: 'area', japanese: '面積' },
    { english: 'volume', japanese: '音量、体積' },
    { english: 'height', japanese: '高さ' },
    { english: 'width', japanese: '幅、横幅' },
    // 重さ
    { english: 'weight', japanese: '重量' },
    { english: 'gram', japanese: 'グラム' },
    { english: 'kilogram', japanese: 'キログラム' },
    { english: 'pound', japanese: 'ポンド' },
    // 温度
    { english: 'temperature', japanese: '温度' },
    // 容量・容器
    { english: 'liter', japanese: 'リットル' },
    { english: 'cup', japanese: 'カップ一杯' },
    { english: 'bottle', japanese: 'ボトル' },
  ];

  return <WordMatrix data={measurementUnitsData} columns={6} />;
};
