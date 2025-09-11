import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const DailyLifeAndHouseworkMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 生活・暮らし
    { english: 'life', japanese: '生活、人生' },
    { english: 'living', japanese: '生計、暮らし' },
    { english: 'home', japanese: '家庭、住まい' },
    { english: 'work', japanese: '仕事', linkNo: [38] },
    { english: 'routine', japanese: '日課、決まった手順' },
    { english: 'habit', japanese: '習慣' },
    { english: 'diary', japanese: '日記' },
    { english: 'diet', japanese: '食事、食生活、食事制限' },

    // 家事
    { english: 'housework', japanese: '家事' },
    { english: 'cleaning', japanese: '掃除' },
    { english: 'washing', japanese: '洗濯' },
    { english: 'laundry', japanese: '洗濯物' },
    { english: 'cooking', japanese: '料理' },
    { english: 'shopping', japanese: '買い物' },
    { english: 'recycle', japanese: 'リサイクル' },

    // ゴミ・汚れ
    { english: 'garbage', japanese: 'ゴミ（生ゴミ）' },
    { english: 'trash', japanese: 'ゴミ（乾いたゴミ）' },
    { english: 'mess', japanese: '散らかり、汚れ' },

    // 休憩・休息・休暇
    { english: 'rest', japanese: '休憩、休息' },
    { english: 'nap', japanese: '昼寝' },
    { english: 'break', japanese: '休憩' },

    // デート
    { english: 'date', japanese: 'デート', linkNo: [4] },

    // 贈り物
    { english: 'present', japanese: 'プレゼント、贈り物', linkNo: [8] },
    { english: 'gift', japanese: '贈り物', linkNo: [26] },

    // 郵便
    { english: 'mail', japanese: '郵便物' },

    // 予約
    { english: 'reservation', japanese: '予約（場所、席）' },
    { english: 'appointment', japanese: '予約（人との面会）' },

    // 滞在
    { english: 'stay', japanese: '滞在' },
    { english: 'homestay', japanese: '家庭滞在' },

    // 待ち時間
    { english: 'wait', japanese: '待ち時間' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
