import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語確信、意見の副詞マトリクスのテーブルを表示するコンポーネント
 */
export const CertaintyOpinionAdverbsMatrix: React.FC = () => {
  // 確信、意見の副詞のデータ（学習しやすい論理的な順序で整理）
  const adverbData: WordPairArray = [
    // 確信・事実
    { english: 'certainly', japanese: '確かに、間違いなく（客観的）' },
    { english: 'surely', japanese: 'きっと、確かに（主観的）' },
    { english: 'obviously', japanese: '明らかに（見て明らか）' },
    { english: 'actually', japanese: '実は、実際は' },
    { english: 'truly', japanese: '本当に、心から' },

    // 可能性・推量
    { english: 'maybe', japanese: 'たぶん、もしかして（口語的）' },
    { english: 'perhaps', japanese: 'たぶん、もしかして（やや丁寧）' },
    { english: 'probably', japanese: 'たぶん、おそらく（確率が高い）' },
    { english: 'possibly', japanese: 'ひょっとすると' },
    { english: 'hopefully', japanese: '願わくば、できれば' },
  ];

  return <WordMatrix data={adverbData} columns={5} />;
};
