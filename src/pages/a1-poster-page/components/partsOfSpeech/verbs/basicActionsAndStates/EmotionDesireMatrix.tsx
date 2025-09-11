import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 感情と欲求の動詞マトリクスのテーブルを表示するコンポーネント
 */
export const EmotionDesireMatrix: React.FC = () => {
  // 感情と欲求の動詞データ
  const emotionDesireData: WordPairArray = [
    // 好意・愛情・好み（意味が近い順）
    { english: 'like', japanese: '〜を好む、〜が好き' },
    { english: 'love', japanese: '〜を愛する' },
    { english: 'prefer', japanese: '〜の方を好む' },
    { english: 'enjoy', japanese: '〜を楽しむ、〜を満喫する' },
    { english: 'miss', japanese: '〜を恋しく思う', linkNo: [5] },

    // 欲求・願望・必要（意味が近い順）
    { english: 'want', japanese: '〜が欲しい' },
    { english: 'need', japanese: '〜を必要とする' },
    { english: 'wish', japanese: '〜を願う' },
    { english: 'hope', japanese: '〜だといいなと望む' },

    // 気にかける・心配・我慢（意味が近い順）
    { english: 'care', japanese: '気にかける' },
    { english: 'worry', japanese: '心配する' },
    { english: 'mind', japanese: '〜を気にする、〜を嫌がる' },
    { english: 'stand', japanese: '〜を我慢する', linkNo: [4] },

    // 嫌悪・恐れ・傷つける（意味が近い順）
    { english: 'hate', japanese: '〜をひどく嫌う' },
    { english: 'fear', japanese: '〜を恐れる' },
    { english: 'hurt', japanese: '〜の心を痛める' },

    // 感動・心を動かす・満足（意味が近い順）
    { english: 'touch', japanese: '感動させる', linkNo: [2] },
    { english: 'move', japanese: '〜を動かす（感情）', linkNo: [5] },
    { english: 'satisfy', japanese: '〜を満足させる' },

    // 興奮・驚き（意味が近い順）
    { english: 'excite', japanese: '〜を興奮させる' },
    { english: 'surprise', japanese: '〜を驚かせる' },
  ];

  return <WordMatrix data={emotionDesireData} columns={4} />;
};
