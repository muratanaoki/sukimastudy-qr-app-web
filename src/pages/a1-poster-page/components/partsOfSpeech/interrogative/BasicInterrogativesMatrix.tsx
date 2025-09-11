import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 基本の疑問詞マトリクスのテーブルを表示するコンポーネント
 */
export const BasicInterrogativesMatrix: React.FC = () => {
  const data: WordPairArray = [
    { english: 'What', japanese: '何' },
    { english: 'Which', japanese: 'どちら、どれ' },
    { english: 'Who', japanese: '誰（主格）' },
    { english: 'Whom', japanese: '誰を、誰に（目的格）' },
    { english: 'Whose', japanese: '誰の（所有格）' },
    { english: 'When', japanese: 'いつ' },
    { english: 'Where', japanese: 'どこ' },
    { english: 'Why', japanese: 'なぜ' },
    { english: 'How', japanese: 'どうやって、どのように' },
  ];

  return <WordMatrix data={data} columns={5} />;
};
