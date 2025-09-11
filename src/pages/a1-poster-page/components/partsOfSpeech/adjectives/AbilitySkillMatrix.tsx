import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語人の能力、技術の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const AbilitySkillMatrix: React.FC = () => {
  // 人の能力、技術の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 知性・賢さ
    { english: 'clever', japanese: '利口な、機転が利く' },
    { english: 'smart', japanese: '頭が良い、賢い' },
    { english: 'bright', japanese: '利発な、頭の良い', linkNo: [8, 9] },

    // 能力・技術
    { english: 'able', japanese: '有能な、能力のある' },
    { english: 'skillful', japanese: '熟練した、上手な' },
    { english: 'talented', japanese: '才能のある' },

    // 優秀・非常に優れた
    { english: 'excellent', japanese: '非常に優れた' },

    // 成功
    { english: 'successful', japanese: '成功した' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
