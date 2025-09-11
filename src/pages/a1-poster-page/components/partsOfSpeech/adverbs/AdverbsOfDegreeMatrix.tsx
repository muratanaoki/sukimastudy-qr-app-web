import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語程度の副詞マトリクスのテーブルを表示するコンポーネント
 */
export const AdverbsOfDegreeMatrix: React.FC = () => {
  // 程度の副詞のデータ（意味別にグループ化して整理）
  const adverbData: WordPairArray = [
    // 完全・全体
    { english: 'absolutely', japanese: '完全に、全くその通りに（強い断定）' },
    { english: 'completely', japanese: '完全に、すっかり（100%完了）' },
    { english: 'entirely', japanese: '完全に（全体として）' },
    { english: 'fully', japanese: '完全に、十分に（条件が満たされた）' },

    // 強調・非常に
    { english: 'very', japanese: 'とても、非常に（一般的な強調）' },
    { english: 'highly', japanese: '非常に（評価、可能性を強める）' },
    { english: 'pretty', japanese: 'かなり、けっこう（veryより弱い）' },
    { english: 'extremely', japanese: '非常に（veryより強い）' },
    { english: 'so', japanese: 'とても、非常に（感情的な強調）', linkNo: [3] },
    { english: 'incredibly', japanese: '信じられないほど' },
    { english: 'really', japanese: '本当に、とても（口語的）' },
    { english: 'much', japanese: 'とても（比較、否定、疑問で）' },

    // かなり・相当・部分的
    { english: 'quite', japanese: 'かなり、完全に（強め）' },
    { english: 'fairly', japanese: 'かなり、まあまあ（控えめ）' },
    { english: 'rather', japanese: 'かなり、いくぶん（やや改まった）' },
    { english: 'considerably', japanese: 'かなり、相当に（客観的な度合い）' },
    { english: 'partly', japanese: '部分的に' },

    // 特に
    { english: 'especially', japanese: '特に、とりわけ' },

    // ほとんど・ほぼ
    { english: 'almost', japanese: 'ほとんど、ほぼ（あと少しで達成）' },
    { english: 'nearly', japanese: 'ほとんど、ほぼ' },
    { english: 'mostly', japanese: 'たいてい、ほとんど（大部分）' },
    { english: 'barely', japanese: 'かろうじて、やっと（最低限の達成）' },
    { english: 'hardly', japanese: 'ほとんど〜ない' },

    // 比較・最上
    { english: 'most', japanese: '最も' },
    { english: 'more', japanese: 'もっと、さらに' },
    { english: 'less', japanese: 'より少なく' },
    { english: 'least', japanese: '最も〜でない' },
    { english: 'far', japanese: 'ずっと', linkNo: [6] },
    { english: 'still', japanese: 'さらに、いっそう（比較を強める）', linkNo: [7] },
    { english: 'even', japanese: 'さらに、〜でさえ（予想外、強調、比較）' },

    // 正確・限定
    { english: 'exactly', japanese: '正確に、まさに' },
    { english: 'just', japanese: 'ちょうど、まさに', linkNo: [7] },

    // およそ・だいたい
    { english: 'about', japanese: 'だいたい' },
    { english: 'around', japanese: 'およそ（口語的）', linkNo: [6] },

    // 十分・以上
    { english: 'enough', japanese: '十分に' },

    // 限定・過剰
    { english: 'only', japanese: '〜だけ、〜にすぎない' },
    { english: 'too', japanese: '〜すぎる' },
    { english: 'little', japanese: '少し、わずかに' },

    // 深さ
    { english: 'deeply', japanese: '深く' },
  ];

  return <WordMatrix data={adverbData} columns={4} />;
};
