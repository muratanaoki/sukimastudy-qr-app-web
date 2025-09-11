import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 建物、住居マトリクスのテーブルを表示するコンポーネント
 */
export const BuildingsAndDwellingsMatrix: React.FC = () => {
  // 建物、住居データ
  const buildingsAndDwellingsData: WordPairArray = [
    // 住居（総称・種類）
    { english: 'building', japanese: '建物' },
    { english: 'house', japanese: '家' },
    { english: 'apartment', japanese: 'アパート、マンション' },

    // 住居の部屋
    { english: 'room', japanese: '部屋' },
    { english: 'bedroom', japanese: '寝室' },
    { english: 'living room', japanese: '居間' },
    { english: 'kitchen', japanese: '台所' },
    { english: 'bathroom', japanese: '浴室' },

    // 家具・設備
    { english: 'bed', japanese: 'ベッド' },
    { english: 'seat', japanese: '座席' },
    { english: 'sheet', japanese: 'シーツ' },
    { english: 'shelf', japanese: '棚' },
    { english: 'closet', japanese: 'クローゼット' },

    // 教育施設
    { english: 'school', japanese: '学校' },
    { english: 'college', japanese: '大学（単科系、米で使用）' },
    { english: 'university', japanese: '大学（主に総合大）' },
    { english: 'classroom', japanese: '教室' },
    { english: 'library', japanese: '図書館' },

    // 仕事・産業施設
    { english: 'office', japanese: '事務所' },
    { english: 'factory', japanese: '工場' },
    { english: 'farm', japanese: '農場' },

    // 医療・宿泊施設
    { english: 'hospital', japanese: '病院' },
    { english: 'hotel', japanese: 'ホテル' },

    // 商業施設・店舗
    { english: 'store', japanese: '店（大型店）' },
    { english: 'shop', japanese: '店（小規模）' },
    { english: 'restaurant', japanese: 'レストラン' },
    { english: 'bakery', japanese: 'パン屋' },
    { english: 'bookstore', japanese: '本屋' },
    { english: 'supermarket', japanese: 'スーパーマーケット' },
    { english: 'counter', japanese: 'カウンター' },

    // 公共施設・サービス
    { english: 'bank', japanese: '銀行' },
    { english: 'post office', japanese: '郵便局' },

    // 交通施設
    { english: 'station', japanese: '駅' },
    { english: 'airport', japanese: '空港' },

    // 宗教・文化施設
    { english: 'church', japanese: '教会' },
    { english: 'temple', japanese: '寺院' },
    { english: 'shrine', japanese: '神社、聖堂' },
    { english: 'castle', japanese: '城' },

    // エンターテイメント・レクリエーション施設
    { english: 'theater', japanese: '劇場、演劇' },
    { english: 'museum', japanese: '博物館' },
    { english: 'aquarium', japanese: '水族館' },
    { english: 'zoo', japanese: '動物園' },
    { english: 'stadium', japanese: 'スタジアム' },
    { english: 'gym', japanese: 'ジム、体育館' },

    // 緊急・避難施設
    { english: 'shelter', japanese: 'シェルター、避難所' },

    // 建物の構造（出入口）
    { english: 'entrance', japanese: '入り口、玄関' },
    { english: 'exit', japanese: '出口' },
    { english: 'door', japanese: 'ドア' },
    { english: 'gate', japanese: '門' },

    // 建物の構造（内部）
    { english: 'hall', japanese: 'ホール、会館、玄関' },
    { english: 'wall', japanese: '壁' },
    { english: 'floor', japanese: '床' },
    { english: 'ceiling', japanese: '天井' },
    { english: 'window', japanese: '窓' },
    { english: 'stairs', japanese: '階段' },
    { english: 'corner', japanese: '角、隅' },
    { english: 'story', japanese: '階（建物）', linkNo: [38] },

    // 建物の構造（外部・付属）
    { english: 'roof', japanese: '屋根' },
    { english: 'garage', japanese: '車庫' },
    { english: 'tower', japanese: '塔' },
    { english: 'bridge', japanese: '橋' },
    { english: 'court', japanese: 'コート（競技場）' },

    // 屋外・庭・公園
    { english: 'garden', japanese: '庭（花壇、菜園）' },
    { english: 'yard', japanese: '庭（敷地、中庭）' },
    { english: 'park', japanese: '公園' },
    { english: 'fence', japanese: '柵' },
  ];

  return <WordMatrix data={buildingsAndDwellingsData} columns={6} />;
};
