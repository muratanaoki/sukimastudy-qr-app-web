import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 敬称、呼称のマトリクスのテーブルを表示するコンポーネント
 */
export const TitlesAndAddressesMatrix: React.FC = () => {
  // 敬称、呼称データ
  const titlesAndAddressesData: WordPairArray = [
    // 男性敬称
    { english: 'Mr.', japanese: '〜さん、〜氏' },
    { english: 'sir', japanese: '（男性への丁寧な呼びかけ）' },

    // 女性敬称
    { english: 'Miss', japanese: '未婚の女性への敬称', linkNo: [62] },
    { english: 'Mrs.', japanese: '〜夫人、〜さん' },
    { english: 'Ms.', japanese: '〜さん（女性一般の敬称）' },

    // 博士・医者
    { english: 'Dr.', japanese: '博士、医者', linkNo: [12] },

    // 奥様・お嬢様
    { english: "madam / ma'am", japanese: '奥様、ご婦人' },

    // 世代
    { english: 'Jr. / Junior', japanese: 'ジュニア、2世' },
    { english: 'Sr. / Senior', japanese: 'シニア、1世' },
  ];

  return <WordMatrix data={titlesAndAddressesData} columns={6} />;
};
