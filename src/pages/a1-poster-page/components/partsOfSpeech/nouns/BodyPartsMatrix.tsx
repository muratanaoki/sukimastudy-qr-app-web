import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 身体の部位のマトリクスのテーブルを表示するコンポーネント
 */
export const BodyPartsMatrix: React.FC = () => {
  // 身体の部位データ
  const bodyPartsData: WordPairArray = [
    // 頭部・顔
    { english: 'head', japanese: '頭' },
    { english: 'face', japanese: '顔' },
    { english: 'hair', japanese: '髪の毛' },
    { english: 'forehead', japanese: '額' },
    { english: 'eyebrow', japanese: '眉毛' },
    { english: 'eye', japanese: '目' },
    { english: 'ear', japanese: '耳' },
    { english: 'nose', japanese: '鼻' },
    { english: 'cheek', japanese: '頬' },
    { english: 'chin', japanese: 'あご' },
    { english: 'mouth', japanese: '口' },
    { english: 'lip', japanese: '唇' },
    { english: 'tongue', japanese: '舌' },
    { english: 'tooth', japanese: '歯' },
    { english: 'teeth', japanese: '歯（複数形）' },
    { english: 'throat', japanese: '喉' },

    // 首
    { english: 'neck', japanese: '首' },

    // 肩・腕・手
    { english: 'shoulder', japanese: '肩' },
    { english: 'arm', japanese: '腕' },
    { english: 'elbow', japanese: '肘' },
    { english: 'wrist', japanese: '手首' },
    { english: 'hand', japanese: '手' },
    { english: 'finger', japanese: '指' },
    { english: 'nail', japanese: '爪' },

    // 背中・胸・お腹・腰・お尻
    { english: 'back', japanese: '背中', linkNo: [31] },
    { english: 'chest', japanese: '胸' },
    { english: 'belly', japanese: 'お腹' },
    { english: 'waist', japanese: '腰（胴回り）' },
    { english: 'hip', japanese: '腰、臀部（でんぶ）' },
    { english: 'buttocks', japanese: 'お尻' },

    // 脚・足
    { english: 'leg', japanese: '脚' },
    { english: 'knee', japanese: '膝' },
    { english: 'ankle', japanese: '足首' },
    { english: 'foot', japanese: '足（足首から下）' },
    { english: 'feet', japanese: '足（複数形）' },
    { english: 'toe', japanese: '足の指' },

    // 体幹・内臓・筋肉・骨・皮膚・血液
    { english: 'body', japanese: '体、肉体' },
    { english: 'skin', japanese: '皮膚、肌' },
    { english: 'bone', japanese: '骨' },
    { english: 'blood', japanese: '血液、血' },
    { english: 'brain', japanese: '脳、頭脳' },
    { english: 'muscle', japanese: '筋肉' },
  ];

  return <WordMatrix data={bodyPartsData} columns={6} />;
};
