import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 変化と発生を表す動詞マトリクスを表示するコンポーネント
 */
export const ChangeOccurrenceMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 変化・状態になる（意味が近い順）
    { english: 'become', japanese: '〜になる（丁寧）' },
    { english: 'get', japanese: '〜になる（口語的）', linkNo: [10] },
    { english: 'turn', japanese: '変わる、〜を変える（色、性質）', linkNo: [5, 10] },
    { english: 'change', japanese: '変わる、〜を変える（全般）' },
    { english: 'grow', japanese: '増える、〜を育てる（自然育成）' },
    { english: 'develop', japanese: '発達する、〜を発達させる', linkNo: [12] },
    { english: 'increase', japanese: '増える、〜を増やす（数、程度）' },
    { english: 'decrease', japanese: '減る、〜を減らす（数、程度）' },

    // 始まる・続く・終わる（意味が近い順）
    { english: 'start', japanese: '始まる、〜を始める（口語的）' },
    { english: 'begin', japanese: '始まる、〜を始める（丁寧）' },
    { english: 'continue', japanese: '続く、〜を続ける（動作、行為）' },
    { english: 'last', japanese: '続く、持続する（状態、期間）' },
    { english: 'finish', japanese: '終える、〜を終える（タスク等）' },
    { english: 'end', japanese: '終わる、〜を終わらせる（状態）' },
    { english: 'stop', japanese: '止まる、〜をやめる' },

    // 発生・現れる・消える（意味が近い順）
    { english: 'happen', japanese: '起こる、生じる' },
    { english: 'cause', japanese: '〜を引き起こす' },
    { english: 'appear', japanese: '現れる' },
    { english: 'disappear', japanese: '消える' },
  ];

  return <WordMatrix data={data} columns={5} />;
};
