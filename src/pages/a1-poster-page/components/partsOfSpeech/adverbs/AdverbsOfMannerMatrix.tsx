import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語様子の副詞マトリクスのテーブルを表示するコンポーネント
 */
export const AdverbsOfMannerMatrix: React.FC = () => {
  // 様子の副詞のデータ（意味が近いもの同士を隣接させて整理）
  const adverbData: WordPairArray = [
    // 速度・時間
    { english: 'quickly', japanese: '速く、急いで（動作）' },
    { english: 'fast', japanese: '速く（スピードそのもの）' },
    { english: 'slowly', japanese: 'ゆっくりと' },
    { english: 'suddenly', japanese: '突然に、急に' },

    // 上手・良し悪し・容易さ
    { english: 'well', japanese: '上手に、うまく' },
    { english: 'better', japanese: 'より良く' },
    { english: 'best', japanese: '最もよく' },
    { english: 'badly', japanese: 'ひどく、下手に' },
    { english: 'easily', japanese: '簡単に、容易に（難易度が低い）' },
    { english: 'simply', japanese: '簡単に、単純に（方法が単純）' },
    { english: 'hard', japanese: '一生懸命に、激しく' },
    { english: 'wrongly', japanese: '誤って、不当に' },
    { english: 'properly', japanese: 'きちんと、適切に' },

    // 注意・真剣
    { english: 'carefully', japanese: '注意深く' },
    { english: 'carelessly', japanese: '不注意に' },
    { english: 'seriously', japanese: '真剣に、まじめに' },
    { english: 'politely', japanese: '丁寧に' },
    { english: 'actively', japanese: '積極的に' },

    // 音量・静寂・優しさ
    { english: 'loudly', japanese: '大声で' },
    { english: 'noisily', japanese: '騒がしく（騒音を立てて）' },
    { english: 'aloud', japanese: '声に出して' },
    { english: 'quietly', japanese: '静かに、ひっそりと' },
    { english: 'softly', japanese: '優しく、柔らかく（音、声等）' },
    { english: 'gently', japanese: '優しく（動作や態度が穏やか）' },

    // 明確・真実
    { english: 'clearly', japanese: 'はっきりと' },

    // 方向・位置・広さ・少し
    { english: 'straight', japanese: 'まっすぐに' },
    { english: 'wide', japanese: '大きく、広く' },
    { english: 'slightly', japanese: 'わずかに、少し' },

    // 感情・態度
    { english: 'happily', japanese: 'うれしそうに' },
    { english: 'sadly', japanese: '悲しそうに' },
    { english: 'angrily', japanese: '怒って' },
    { english: 'kindly', japanese: '親切に' },
    { english: 'calmly', japanese: '冷静に' },
    { english: 'freely', japanese: '自由に' },
    { english: 'alone', japanese: 'ひとりで' },

    // 幸運・不運
    { english: 'luckily', japanese: '幸運にも（主観的、口語的）' },
    { english: 'fortunately', japanese: '幸運にも（客観的、丁寧）' },
    { english: 'unfortunately', japanese: '不運にも、残念ながら' },

    // 安全・価格
    { english: 'safely', japanese: '安全に、無事に' },
    { english: 'cheaply', japanese: '安く' },

    // その他状態
    { english: 'brightly', japanese: '明るく、鮮やかに' },
    { english: 'sweetly', japanese: '甘く' },
    { english: 'differently', japanese: '異なるやり方で' },

    // 同時性
    { english: 'together', japanese: '一緒に' },
  ];

  return <WordMatrix data={adverbData} columns={5} />;
};
