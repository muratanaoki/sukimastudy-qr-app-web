import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * ポジティブな感情のマトリクスのテーブルを表示するコンポーネント
 */
export const EmotionsMatrix: React.FC = () => {
  // ポジティブな感情データ
  const positiveEmotionsData: WordPairArray = [
    // 喜び・楽しみ
    { english: 'feeling', japanese: '感情、気持ち' },
    { english: 'happiness', japanese: '幸福、幸せ' },
    { english: 'joy', japanese: '喜び、うれしさ' },
    { english: 'fun', japanese: '楽しみ、面白さ' },
    { english: 'pleasure', japanese: '喜び、楽しみ' },
    { english: 'excitement', japanese: '興奮、刺激' },
    { english: 'favorite', japanese: 'お気に入り' },

    // 表情
    { english: 'expression', japanese: '表情', linkNo: [54] },

    // 笑い・ユーモア
    { english: 'smile', japanese: '笑顔、微笑み' },
    { english: 'laugh', japanese: '笑い' },
    { english: 'laughter', japanese: '笑い声' },
    { english: 'humor', japanese: 'ユーモア' },

    // 驚き・感動
    { english: 'surprise', japanese: '驚き、予期せぬこと' },
    { english: 'wonder', japanese: '驚き、不思議' },
    { english: 'shock', japanese: '衝撃、ショック' },

    // 愛・優しさ
    { english: 'love', japanese: '愛情、愛' },
    { english: 'kindness', japanese: '親切、優しさ' },

    // 希望・応援
    { english: 'hope', japanese: '希望、期待' },

    // 安らぎ
    { english: 'comfort', japanese: '慰め、安らぎ' },
    { english: 'relief', japanese: '安堵' },
    { english: 'peace', japanese: '心の安らぎ', linkNo: [51] },

    // 誇り・信頼・尊敬
    { english: 'pride', japanese: '誇り、プライド' },

    // ネガティブ系
    { english: 'sadness', japanese: '悲しみ、哀愁' },
    { english: 'loneliness', japanese: '孤独、寂しさ' },
    { english: 'fear', japanese: '恐怖、恐れ' },
    { english: 'scare', japanese: '恐怖' },
    { english: 'worry', japanese: '心配、不安' },
    { english: 'anger', japanese: '怒り、憤り' },
    { english: 'hate', japanese: '憎しみ、嫌悪' },
    { english: 'stress', japanese: 'ストレス' },
  ];

  return <WordMatrix data={positiveEmotionsData} columns={6} />;
};
