import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語難易度、可能性の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const DifficultyPossibilityMatrix: React.FC = () => {
  // 難易度、可能性の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 簡単さ（意味が近い順に並び替え）
    { english: 'easy', japanese: 'やさしい（難易度が低い）' },
    { english: 'simple', japanese: '簡単な、単純な' },

    // 難しさ
    { english: 'hard', japanese: '難しい（一般的）', linkNo: [5] },
    { english: 'difficult', japanese: '難しい（知的な難しさ）' },

    // 可能性（意味が近い順に並び替え）
    { english: 'possible', japanese: '可能な' },
    { english: 'likely', japanese: 'ありそうな' },
    { english: 'impossible', japanese: '不可能な' },
    { english: 'unlikely', japanese: 'なさそうな' },

    // 確実性（意味が近い順に並び替え）
    { english: 'certain', japanese: '確かな（客観的）' },
    { english: 'sure', japanese: '確かな（主観的）' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
