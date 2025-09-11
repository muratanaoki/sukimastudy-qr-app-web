import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * IT、コンピューティングマトリクスのテーブルを表示するコンポーネント
 */
export const TechnologyAndEngineeringMatrix: React.FC = () => {
  // IT、コンピューティングデータ
  const itComputingData: WordPairArray = [
    // コンピューター・IT基本
    { english: 'software', japanese: 'ソフトウェア' },
    { english: 'hardware', japanese: 'ハードウェア' },
    { english: 'computer', japanese: 'コンピュータ' },
    { english: 'Internet', japanese: 'インターネット' },
    { english: 'website', japanese: 'ウェブサイト' },
    { english: 'email', japanese: '電子メール' },

    // コンピューター入力装置・画面
    { english: 'mouse', japanese: 'マウス（機器）' },
    { english: 'keyboard', japanese: 'キーボード' },
    { english: 'button', japanese: 'ボタン', linkNo: [36] },
    { english: 'screen', japanese: '画面' },

    // 画面系
    { english: 'TV', japanese: 'テレビ' },

    // 機械・装置・エンジン
    { english: 'machine', japanese: '機械、装置' },
    { english: 'device', japanese: '装置、機器' },
    { english: 'engine', japanese: 'エンジン' },
    { english: 'motor', japanese: 'モーター' },
    { english: 'robot', japanese: 'ロボット' },

    // 通信・音響機器
    { english: 'phone', japanese: '電話' },
    { english: 'smartphone', japanese: 'スマートフォン（スマホ）' },
    { english: 'radio', japanese: 'ラジオ' },
    { english: 'speaker', japanese: 'スピーカー', linkNo: [13] },

    // 撮影・印刷機器
    { english: 'camera', japanese: 'カメラ' },
    { english: 'printer', japanese: 'プリンター' },

    // 時計
    { english: 'clock', japanese: '時計' },
    { english: 'watch', japanese: '腕時計' },

    // 電力・バッテリー
    { english: 'battery', japanese: 'バッテリー' },

    // 家電製品
    { english: 'refrigerator', japanese: '冷蔵庫' },
    { english: 'fridge', japanese: '冷蔵庫（略称）' },
    { english: 'oven', japanese: 'オーブン' },
    { english: 'microwave', japanese: '電子レンジ' },
    { english: 'fan', japanese: '扇風機', linkNo: [13] },
    { english: 'lamp', japanese: 'ランプ' },

    // 計測器
    { english: 'meter', japanese: 'メーター（計器）' },

    // 乗り物・交通手段
    { english: 'vehicle', japanese: '乗り物' },
    { english: 'car', japanese: '車' },
    { english: 'bus', japanese: 'バス' },
    { english: 'train', japanese: '電車' },
    { english: 'bicycle', japanese: '自転車' },
    { english: 'bike', japanese: '自転車、バイク' },
    { english: 'ship', japanese: '船' },
    { english: 'airplane', japanese: '飛行機' },
    { english: 'truck', japanese: 'トラック' },

    // 建物設備
    { english: 'elevator', japanese: 'エレベーター' },
  ];

  return <WordMatrix data={itComputingData} columns={6} />;
};
