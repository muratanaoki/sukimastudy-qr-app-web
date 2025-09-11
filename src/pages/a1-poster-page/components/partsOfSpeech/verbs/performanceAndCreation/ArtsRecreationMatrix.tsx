import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 芸術とレクリエーションの動詞マトリクスを表示するコンポーネント
 */
export const ArtsRecreationMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 芸術・創作（意味が近い順）
    { english: 'sing', japanese: '歌う' },
    { english: 'dance', japanese: '踊る' },
    { english: 'act', japanese: '〜を演じる（舞台）' },
    { english: 'draw', japanese: '絵を描く、引き分ける', linkNo: [10] },
    { english: 'paint', japanese: '絵を描く（絵の具）、塗る' },

    // 遊び・スポーツ（意味が近い順）
    { english: 'play', japanese: '〜をする、遊ぶ、〜を演奏する' },
    { english: 'shoot', japanese: '〜を撃つ（球）' },
    { english: 'score', japanese: '得点する' },
    { english: 'ski', japanese: 'スキーをする' },
    { english: 'skate', japanese: 'スケートをする' },
    { english: 'fish', japanese: '魚を釣る、釣りをする' },
    { english: 'camp', japanese: 'キャンプする' },

    // 見逃す・引き分け・勝敗（意味が近い順）
    { english: 'win', japanese: '勝つ、〜を勝ち取る' }, // 自動詞＋他動詞
    { english: 'lose', japanese: '負ける、〜を失う' }, // 自動詞＋他動詞
  ];

  return <WordMatrix data={data} columns={5} />;
};
