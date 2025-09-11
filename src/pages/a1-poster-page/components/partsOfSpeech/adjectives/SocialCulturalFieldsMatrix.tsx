import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語社会、文化、分野の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const SocialCulturalFieldsMatrix: React.FC = () => {
  // 社会、文化、分野の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 社会、文化（意味が近い順に並び替え）
    { english: 'social', japanese: '社会の、社交的な' },
    { english: 'public', japanese: '公共の' },
    { english: 'national', japanese: '国の、国民の' },
    { english: 'international', japanese: '国際的な' },
    { english: 'cultural', japanese: '文化の、文化的な' },
    { english: 'peaceful', japanese: '平和な' },
    { english: 'environmental', japanese: '環境の' },
    { english: 'natural', japanese: '自然の、天然の' },
    { english: 'human', japanese: '人間の' },
    { english: 'private', japanese: '私的な、個人の' },
    { english: 'familiar', japanese: '見慣れた、馴染みのある' },

    // スポーツ、娯楽（意味が近い順に並び替え）
    { english: 'musical', japanese: '音楽の' },

    // 技術、サービス（意味が近い順に並び替え）
    { english: 'electric', japanese: '電気の' },
    { english: 'digital', japanese: 'デジタルの' },
    { english: 'medical', japanese: '医療の' },
    { english: 'educational', japanese: '教育の' },
    { english: 'online', japanese: 'ネット上の' },
    { english: 'live', japanese: '生放送の', linkNo: [7] },
    { english: 'express', japanese: '急行の、速達の' },

    // その他
    { english: 'poor', japanese: '貧しい', linkNo: [3, 15] },
    { english: 'rich', japanese: '裕福な', linkNo: [5] },
    { english: 'global', japanese: '世界的な' },
    { english: 'single', japanese: '独身の' },
    { english: 'married', japanese: '既婚の' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
