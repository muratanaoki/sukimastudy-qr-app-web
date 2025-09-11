import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 対立と破壊の動詞マトリクスを表示するコンポーネント
 */
export const ConflictDestructionMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 争う・攻撃（意味が近い順）
    { english: 'fight', japanese: '戦う、争う' }, // 自動詞
    { english: 'attack', japanese: '〜を攻撃する' }, // 他動詞
    { english: 'beat', japanese: '〜を打ち負かす' }, // 他動詞
    { english: 'kick', japanese: '〜を蹴る' }, // 他動詞
    { english: 'kill', japanese: '〜を殺す、〜の命を奪う' }, // 他動詞
    { english: 'rob', japanese: '〜を奪う' },

    // 壊す・破壊・衝突（意味が近い順）
    { english: 'break', japanese: '〜を壊す、〜を割る' }, // 他動詞
    { english: 'destroy', japanese: '〜を破壊する（元に戻せない）' }, // 他動詞
    { english: 'crash', japanese: '衝突する（激しい）' }, // 自動詞
    { english: 'hit', japanese: 'あたる、〜を殴る', linkNo: [10] },
  ];

  return <WordMatrix data={data} columns={5} />;
};
