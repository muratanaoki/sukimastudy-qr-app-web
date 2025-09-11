import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 身体の動作の動詞マトリクスのテーブルを表示するコンポーネント
 */
export const BodyActionsMatrixSimple: React.FC = () => {
  const data: WordPairArray = [
    // 座る・立つ・横になる・起きる・生きる（意味が近い順）
    { english: 'sit', japanese: '座る、座っている' }, // 自動詞
    { english: 'lie', japanese: '横になる', linkNo: [6] }, // 自動詞
    { english: 'stand', japanese: '立つ、立っている', linkNo: [1] }, // 自動詞
    { english: 'wake', japanese: '目を覚ます、〜を起こす' }, // 自動詞＋他動詞
    { english: 'live', japanese: '生きる、生活する' }, // 自動詞

    // 眠る・休む（意味が近い順）
    { english: 'sleep', japanese: '眠る' }, // 自動詞
    { english: 'rest', japanese: '休む、休憩する' }, // 自動詞

    // 食べる・噛む・飲む（意味が近い順）
    { english: 'eat', japanese: '〜を食べる' }, // 他動詞
    { english: 'bite', japanese: '〜を噛む' }, // 他動詞
    { english: 'drink', japanese: '〜を飲む' }, // 他動詞

    // 微笑む・笑う・泣く（意味が近い順）
    { english: 'smile', japanese: '微笑む' }, // 自動詞
    { english: 'laugh', japanese: '笑う' }, // 自動詞
    { english: 'cry', japanese: '泣く' }, // 自動詞

    // 曲げる・うなずく・振る（意味が近い順）
    { english: 'bend', japanese: 'かがむ、〜を曲げる' }, // 自動詞＋他動詞
    { english: 'nod', japanese: 'うなずく' }, // 自動詞
    { english: 'shake', japanese: '揺れる、〜を振る（動作全般）' },
    { english: 'wave', japanese: '手を振る、〜を振る（合図、挨拶）' },

    // 呼吸
    { english: 'breathe', japanese: '呼吸する' }, // 自動詞

    // 運動
    { english: 'exercise', japanese: '運動する' }, // 自動詞

    // 生まれる・死ぬ（意味が近い順）
    { english: 'bear', japanese: '〜を産む' }, // 他動詞
    { english: 'die', japanese: '死ぬ、枯れる' }, // 自動詞
  ];

  return <WordMatrix data={data} columns={4} />;
};
