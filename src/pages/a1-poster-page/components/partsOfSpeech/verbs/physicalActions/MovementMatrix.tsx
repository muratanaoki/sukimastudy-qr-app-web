import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 移動の動詞マトリクスのテーブルを表示するコンポーネント
 */
export const MovementMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 基本移動・行く・来る・移動（意味が近い順）
    { english: 'go', japanese: '行く、移動する' }, // 自動詞
    { english: 'move', japanese: '移動する、〜を動かす', linkNo: [1] }, // 自動詞＋他動詞
    { english: 'travel', japanese: '旅行する' }, // 自動詞
    { english: 'come', japanese: '来る、到着する' }, // 自動詞

    // 出発・到着・帰る・入る（意味が近い順）
    { english: 'leave', japanese: '出発する、〜を去る' }, // 自動詞＋他動詞
    { english: 'return', japanese: '帰る、〜を返す' }, // 自動詞＋他動詞
    { english: 'arrive', japanese: '到着する' }, // 自動詞
    { english: 'enter', japanese: '〜に入る', linkNo: [11] }, // 他動詞

    // 通過・横断・達する（意味が近い順）
    { english: 'pass', japanese: '通り過ぎる、〜を通り過ぎる', linkNo: [7] }, // 自動詞＋他動詞
    { english: 'cross', japanese: '横切る、〜を横切る、〜を渡る' }, // 自動詞＋他動詞
    { english: 'reach', japanese: '〜に達する（目標、場所）' }, // 他動詞

    // 歩く・踏む・走る・急ぐ（意味が近い順）
    { english: 'walk', japanese: '歩く、〜を歩く、〜を散歩させる' }, // 自動詞＋他動詞
    { english: 'step', japanese: '歩む、〜を踏む' }, // 自動詞＋他動詞
    { english: 'run', japanese: '走る' }, // 自動詞
    { english: 'hurry', japanese: '急ぐ' }, // 自動詞

    // 跳ぶ・登る・昇る・落ちる（意味が近い順）
    { english: 'jump', japanese: '跳ぶ、〜を飛び越える' }, // 自動詞＋他動詞
    { english: 'climb', japanese: '登る' }, // 自動詞
    { english: 'rise', japanese: '上がる、昇る', linkNo: [17] }, // 自動詞
    { english: 'fall', japanese: '落ちる' }, // 自動詞

    // 泳ぐ・飛ぶ・着陸（意味が近い順）
    { english: 'swim', japanese: '泳ぐ' }, // 自動詞
    { english: 'fly', japanese: '飛ぶ、〜を飛ばす' }, // 自動詞＋他動詞
    { english: 'land', japanese: '着陸する、〜を着陸させる' }, // 自動詞＋他動詞

    // 乗る・運転・駐車・降りる（意味が近い順）
    { english: 'ride', japanese: '〜に乗る' }, // 他動詞
    { english: 'drive', japanese: '〜を運転する' }, // 他動詞
    { english: 'park', japanese: '車を停める、〜を駐車する' }, // 他動詞
    { english: 'miss', japanese: '〜を見逃す、乗り遅れる', linkNo: [1] }, // 他動詞

    // 転がる・滑る・つまずく・曲がる・逃げる（意味が近い順）
    { english: 'roll', japanese: '転がる、〜を転がす' }, // 自動詞＋他動詞
    { english: 'slide', japanese: '滑る、〜を滑らせる' }, // 自動詞＋他動詞
    { english: 'trip', japanese: 'つまずく、〜をつまずかせる' }, // 自動詞＋他動詞
    { english: 'turn', japanese: '曲がる', linkNo: [10, 15] }, // 自動詞
    { english: 'escape', japanese: '脱出する' }, // 自動詞
  ];

  return <WordMatrix data={data} columns={4} />;
};
