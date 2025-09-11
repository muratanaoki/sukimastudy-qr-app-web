import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語人の感情、気分の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const EmotionsMoodsMatrix: React.FC = () => {
  // 人の感情、気分の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 喜び・満足・安らぎ
    { english: 'happy', japanese: 'うれしい、幸せな' },
    { english: 'glad', japanese: 'うれしい' },
    { english: 'pleased', japanese: '喜んでいる、満足している' },
    { english: 'satisfied', japanese: '満足した' },
    { english: 'comfortable', japanese: '気楽な、心地よい' },
    { english: 'peaceful', japanese: '心が穏やかな' },
    { english: 'calm', japanese: '穏やかな' },
    { english: 'relaxed', japanese: 'くつろいだ' },

    // わくわく・興奮
    { english: 'excited', japanese: 'わくわくしている' },
    { english: 'exciting', japanese: 'わくわくする' },

    // 興味
    { english: 'interested', japanese: '興味を持っている' },
    { english: 'interesting', japanese: '面白い、興味深い' },

    // 楽しさ・面白さ
    { english: 'fun', japanese: '楽しい、面白い' },
    { english: 'funny', japanese: '滑稽な、おかしな', linkNo: [21] },

    // ネガティブ（悲しみ・失望・傷つき）
    { english: 'sad', japanese: '悲しい' },
    { english: 'unhappy', japanese: '不幸な、不満な' },
    { english: 'disappointed', japanese: 'がっかりした' },
    { english: 'sorry', japanese: '申し訳ない、気の毒に思う' },
    { english: 'hurt', japanese: '傷ついた' },

    // 怒り・動揺
    { english: 'angry', japanese: '怒っている' },
    { english: 'upset', japanese: '動揺した' },

    // 心配・不安・緊張
    { english: 'worried', japanese: '心配している' },
    { english: 'anxious', japanese: '不安な' },
    { english: 'nervous', japanese: '不安な、緊張した' },

    // 恐怖
    { english: 'afraid', japanese: '恐れている' },
    { english: 'scared', japanese: 'おびえた' },

    // 驚き
    { english: 'surprised', japanese: '驚いている' },
    { english: 'surprising', japanese: '驚かせるような' },

    // 恥ずかしさ
    { english: 'embarrassed', japanese: '恥ずかしい' },
    { english: 'embarrassing', japanese: '恥ずかしい思いをさせる' },

    // 孤独
    { english: 'alone', japanese: 'ひとりぼっちの' },
    { english: 'lonely', japanese: '寂しい' },

    // 疲労・眠気
    { english: 'tired', japanese: '疲れた' },
    { english: 'sleepy', japanese: '眠い' },

    // 欲求・体調
    { english: 'hungry', japanese: 'お腹が空いた' },
    { english: 'thirsty', japanese: 'のどが渇いた' },
    { english: 'sick', japanese: '病気の、気分が悪い', linkNo: [3] },

    // 運
    { english: 'lucky', japanese: '運が良い' },
    { english: 'unlucky', japanese: '不運な' },

    // 退屈
    { english: 'boring', japanese: '退屈させる' },
    { english: 'bored', japanese: '退屈している' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
