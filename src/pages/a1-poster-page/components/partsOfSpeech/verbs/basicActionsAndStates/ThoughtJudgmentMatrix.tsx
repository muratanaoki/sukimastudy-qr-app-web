import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 思考と判断の動詞マトリクスのテーブルを表示するコンポーネント
 */
export const ThoughtJudgmentMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 思考・推測・想像（意味が近い順）
    { english: 'think', japanese: '考える、〜と考える（意見）' },
    { english: 'wonder', japanese: '〜かなと思う（疑問、好奇心）' },
    { english: 'guess', japanese: '〜を推測する（勘で）' },
    { english: 'suppose', japanese: '〜を推測する（状況から）' },
    { english: 'imagine', japanese: '〜を想像する' },
    { english: 'expect', japanese: '〜を予期する、〜を期待する' },

    // 知識・理解・気づき・意味・発見・記憶（意味が近い順）
    { english: 'know', japanese: '〜を知っている、〜と面識がある' },
    { english: 'understand', japanese: '〜を理解する（解釈する）' },
    { english: 'realize', japanese: '〜に気づく、〜だと悟る' },
    { english: 'find', japanese: '〜を見つける、〜と思う' },
    { english: 'mean', japanese: '〜を意味する' },
    { english: 'remember', japanese: '〜を覚えている、〜を思い出す' },
    { english: 'forget', japanese: '〜を忘れる' },
    { english: 'believe', japanese: '〜を信じる（事実だと考える）' },
    { english: 'doubt', japanese: '〜を疑う' },

    // 判断・選択・計画・解決・数える（意味が近い順）
    { english: 'decide', japanese: '〜を決める' },
    { english: 'choose', japanese: '〜を選ぶ（慎重）' },
    { english: 'pick', japanese: '〜を選ぶ（手早く）', linkNo: [10] },
    { english: 'plan', japanese: '〜を計画する' },
  ];
  return <WordMatrix data={data} columns={4} />;
};
