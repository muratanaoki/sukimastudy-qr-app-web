import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const OccupationsAndJobsMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 職務・役割
    { english: 'job', japanese: '職務' },
    { english: 'role', japanese: '役割' },

    // 従業員・作業員
    { english: 'worker', japanese: '労働者、作業員' },
    { english: 'staff', japanese: '職員、従業員' },
    { english: 'secretary', japanese: '秘書' },

    // 専門職（技術・科学・法律・医療）
    { english: 'engineer', japanese: '技術者、エンジニア' },
    { english: 'programmer', japanese: 'プログラマー' },
    { english: 'mechanic', japanese: '整備士' },
    { english: 'carpenter', japanese: '大工' },
    { english: 'scientist', japanese: '科学者' },
    { english: 'lawyer', japanese: '弁護士' },
    { english: 'doctor / Dr.', japanese: '医者、医師、博士', linkNo: [19] },
    { english: 'nurse', japanese: '看護師' },
    { english: 'dentist', japanese: '歯医者' },

    // 公務員・警察・消防・軍人
    { english: 'police', japanese: '警察（集合名詞）' },
    { english: 'officer', japanese: '役人、警官、将校（公職）' },
    { english: 'firefighter', japanese: '消防士' },
    { english: 'soldier', japanese: '兵士、軍人' },

    // 運輸・農業・漁業
    { english: 'farmer', japanese: '農家' },
    { english: 'fisherman', japanese: '漁師' },
    { english: 'driver', japanese: '運転手' },
    { english: 'pilot', japanese: 'パイロット、操縦士' },

    // 飲食・サービス
    { english: 'cook', japanese: '料理人' },
    { english: 'chef', japanese: 'シェフ、料理長' },
    { english: 'waiter', japanese: 'ウェイター' },
    { english: 'waitress', japanese: 'ウェイトレス' },
    { english: 'receptionist', japanese: '受付係' },
    { english: 'hairdresser', japanese: '美容師' },
    { english: 'baker', japanese: 'パン職人' },
    { english: 'clerk', japanese: '店員' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
