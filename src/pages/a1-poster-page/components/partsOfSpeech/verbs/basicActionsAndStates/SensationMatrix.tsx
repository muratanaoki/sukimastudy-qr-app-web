import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 感覚の動詞マトリクスのテーブルを表示するコンポーネント
 */
export const SensationMatrix: React.FC = () => {
  // 感覚の動詞データ
  const sensationData: WordPairArray = [
    // 視覚系（意味が近い順）
    { english: 'see', japanese: '〜を見る（自然に目に入る）' },
    { english: 'look', japanese: '見る（視線を向ける）' },
    { english: 'watch', japanese: '〜を見る（動きを注意して見る）' },
    { english: 'notice', japanese: '〜に気づく' },
    { english: 'seem', japanese: '〜のように見える、〜と思われる' },

    // 聴覚系（意味が近い順）
    { english: 'hear', japanese: '〜が聞こえる（受動的）' },
    { english: 'listen', japanese: '聞く（耳を傾ける）' },
    { english: 'sound', japanese: '音がする、〜のように聞こえる' },

    // 触覚・感覚（意味が近い順）
    { english: 'feel', japanese: '〜を感じる、〜と思う、〜を探る' },
    { english: 'touch', japanese: '〜に触る', linkNo: [1] },

    // 嗅覚
    { english: 'smell', japanese: '〜のにおいがする、〜のにおいをかぐ' },

    // 味覚
    { english: 'taste', japanese: '〜の味がする、〜を味わう' },
  ];

  return <WordMatrix data={sensationData} columns={4} />;
};
