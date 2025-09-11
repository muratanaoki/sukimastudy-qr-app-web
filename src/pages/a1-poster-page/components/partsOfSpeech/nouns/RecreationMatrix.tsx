import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const RecreationMatrix: React.FC = () => {
  const data: WordPairArray = [
    // レクリエーション・趣味（総称）
    { english: 'recreation', japanese: 'レクリエーション、娯楽' },
    { english: 'hobby', japanese: '趣味' },
    { english: 'exercise', japanese: 'エクササイズ、運動' },
    { english: 'cooking', japanese: '料理' },

    // ゲーム・遊び・おもちゃ
    { english: 'game', japanese: 'ゲーム、遊び（広い意味）', linkNo: [39] },
    { english: 'card', japanese: 'カード' },
    { english: 'toy', japanese: 'おもちゃ' },

    // アウトドア・自然活動
    { english: 'camping', japanese: 'キャンプ' },
    { english: 'hiking', japanese: 'ハイキング' },
    { english: 'cycling', japanese: 'サイクリング' },
    { english: 'picnic', japanese: 'ピクニック' },
    { english: 'fishing', japanese: '釣り' },

    // 旅行・観光・休暇
    { english: 'vacation', japanese: '休暇' },
    { english: 'sightseeing', japanese: '観光' },

    // イベント・パーティー・祭り
    { english: 'event', japanese: 'イベント、出来事' },
    { english: 'party', japanese: 'パーティー', linkNo: [10] },
    { english: 'treat', japanese: '楽しみ、嬉しい出来事' },
    { english: 'festival', japanese: 'フェスティバル、祭り' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
