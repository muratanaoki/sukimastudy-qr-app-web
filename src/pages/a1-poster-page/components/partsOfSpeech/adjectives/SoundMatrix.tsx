import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語音の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const SoundMatrix: React.FC = () => {
  const adjectiveData: WordPairArray = [
    // 大きい・うるさい
    { english: 'loud', japanese: '音が大きい' },
    { english: 'noisy', japanese: 'やかましい、騒がしい' },

    // 静か・無音・かすか
    { english: 'quiet', japanese: '静かな、騒がしくない' },
    { english: 'silent', japanese: '静かな、無音の' },
    { english: 'faint', japanese: 'かすかな' },

    // 明瞭さ
    { english: 'clear', japanese: 'はっきりした', linkNo: [8] },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
