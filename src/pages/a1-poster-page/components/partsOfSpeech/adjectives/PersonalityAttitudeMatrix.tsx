import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語人の性格、態度の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const PersonalityAttitudeMatrix: React.FC = () => {
  // 人の性格、態度の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 親切・優しさ・誠実
    { english: 'kind', japanese: '親切な' },
    { english: 'generous', japanese: '気前のよい' },
    { english: 'sweet', japanese: '優しい', linkNo: [5] },
    { english: 'gentle', japanese: '優しい、穏やかな' },
    { english: 'honest', japanese: '正直な' },
    { english: 'polite', japanese: '礼儀正しい' },
    { english: 'open', japanese: '率直な', linkNo: [7] },
    { english: 'modest', japanese: '控えめな' },

    // 友好・明るさ・社交性
    { english: 'friendly', japanese: '友好的な' },
    { english: 'warm', japanese: '温かい、友好的な', linkNo: [8] },
    { english: 'nice', japanese: '感じが良い', linkNo: [15] },
    { english: 'cheerful', japanese: '元気な、明るい' },
    { english: 'sunny', japanese: '陽気な', linkNo: [8] },
    { english: 'talkative', japanese: 'おしゃべりな' },
    { english: 'shy', japanese: '内気な' },

    // 賢さ・真面目・誇り
    { english: 'wise', japanese: '賢明な、思慮深い' },
    { english: 'serious', japanese: 'まじめな', linkNo: [17] },
    { english: 'proud', japanese: '誇り高い' },

    // 勇敢・活発・勤勉・精力
    { english: 'brave', japanese: '勇敢な' },
    { english: 'active', japanese: '活発な' },
    { english: 'energetic', japanese: '精力的な' },
    { english: 'hardworking', japanese: '勤勉な' },

    // 我慢・注意
    { english: 'patient', japanese: '我慢強い' },
    { english: 'careful', japanese: '注意深い' },
    { english: 'strict', japanese: '厳しい' },
    { english: 'lazy', japanese: '怠惰な' },
    { english: 'careless', japanese: '不注意な' },

    // 好奇心
    { english: 'curious', japanese: '好奇心が強い' },

    // ネガティブ（不親切・意地悪・自己中心・弱さ・変わり者など）
    { english: 'unkind', japanese: '不親切な' },
    { english: 'rude', japanese: '失礼な' },
    { english: 'mean', japanese: '意地悪な、けちな' },
    { english: 'selfish', japanese: 'わがままな' },
    { english: 'weak', japanese: '弱い（精神的）', linkNo: [7] },
    { english: 'strange', japanese: '奇妙な、変な', linkNo: [21] },
    { english: 'wild', japanese: 'やんちゃな、奔放な', linkNo: [21] },
    { english: 'silly', japanese: 'ばかげた' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
