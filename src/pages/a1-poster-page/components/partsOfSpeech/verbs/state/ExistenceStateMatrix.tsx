import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 存在と状態を表す動詞マトリクスを表示するコンポーネント
 */
export const ExistenceStateMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 持つ・含む・保つ（意味が近い順）
    { english: 'have', japanese: '〜を持っている' },
    { english: 'own', japanese: '〜を所有する' },
    { english: 'include', japanese: '〜を含む（全体の一部として）' },
    { english: 'contain', japanese: '〜を含む（物理的に中に入れる）' },

    // とどまる・生きる・状態でいる（意味が近い順）
    { english: 'remain', japanese: 'とどまる（状態が変わらず残る）' },
    { english: 'stay', japanese: '滞在する（場所にとどまる）' },
    { english: 'keep', japanese: '〜を保つ、〜を維持する' },
    { english: 'belong', japanese: '所属する' },
    { english: 'fit', japanese: '合う、〜に合う（形が合う）' },
    { english: 'suit', japanese: '〜に似合う（印象、雰囲気）' },
    { english: 'match', japanese: '〜と合う（組み合わせが合う）' },
  ];

  return <WordMatrix data={data} columns={5} />;
};
