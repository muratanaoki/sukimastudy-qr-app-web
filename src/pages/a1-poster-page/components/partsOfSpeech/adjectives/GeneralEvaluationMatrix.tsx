import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語総合評価の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const GeneralEvaluationMatrix: React.FC = () => {
  // 総合評価の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 良い評価（意味が近い順に並び替え）
    { english: 'good', japanese: '良い、優れている' },
    { english: 'nice', japanese: '良い、素敵な', linkNo: [1] },
    { english: 'fine', japanese: '良い、元気な' },
    { english: 'OK', japanese: '良い、大丈夫な' },
    { english: 'fit', japanese: '適した、ふさわしい', linkNo: [3] },
    { english: 'solid', japanese: 'しっかりした、堅実な', linkNo: [5, 7] },

    { english: 'great', japanese: '素晴らしい、偉大な' },
    { english: 'amazing', japanese: '素晴らしい（驚き、感動）' },
    { english: 'wonderful', japanese: '素晴らしい（心から）' },
    { english: 'excellent', japanese: '非常に優れた、すばらしい' },
    { english: 'fantastic', japanese: 'すばらしい、素敵な' },
    { english: 'super', japanese: '最高の、すごい' },
    { english: 'awesome', japanese: 'すごい、素晴らしい' },
    { english: 'perfect', japanese: '完璧な' },
    { english: 'cool', japanese: 'かっこいい', linkNo: [8] },

    // 比較級、最上級（良い）
    { english: 'better', japanese: 'より良い' },
    { english: 'best', japanese: '最高の' },

    // 悪い評価（意味が近い順に並び替え）
    { english: 'bad', japanese: '悪い、嫌な' },
    { english: 'poor', japanese: '劣った、下手な', linkNo: [3, 22] },
    { english: 'cheap', japanese: '粗悪な、安っぽい', linkNo: [16] },

    { english: 'terrible', japanese: 'ひどい（広い意味）' },
    { english: 'horrible', japanese: 'ひどい、ぞっとする' },
    { english: 'awful', japanese: 'ひどい、最悪の' },

    // 比較級、最上級（悪い）
    { english: 'worse', japanese: 'より悪い' },
    { english: 'worst', japanese: '最悪の' },

    { english: 'dull', japanese: '退屈な' },
    { english: 'average', japanese: '平均的な' },
    { english: 'popular', japanese: '人気のある' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
