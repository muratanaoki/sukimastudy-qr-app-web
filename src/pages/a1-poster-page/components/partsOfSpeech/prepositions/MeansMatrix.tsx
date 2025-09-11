import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const MeansMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 関係・所属 / 部分・比率
    { english: 'of', japanese: '〜の（所有、所属、部分など）' },
    { english: 'out of', japanese: '〜の中の、〜のうち（比率）', linkNo: [2, 5] },
    // 出所・経路・媒介
    { english: 'from', japanese: '〜から（情報源、出所）', linkNo: [2, 3] },
    { english: 'through', japanese: '〜を通して（媒介、経路、経験）', linkNo: [2] },
    { english: 'by', japanese: '〜によって（手段、方法、人）', linkNo: [1, 3] },
    // 同伴・道具 / 欠如
    { english: 'with', japanese: '〜と一緒に（道具、同伴）' },
    { english: 'without', japanese: '〜なしで（欠如）' },
    // 目的・利益
    { english: 'for', japanese: '〜のために、〜にとって（目的）', linkNo: [2, 3] },
    // 身分・役割 / 類似
    { english: 'as', japanese: '〜として（身分、役割、機能）' },
    { english: 'like', japanese: '〜のように（類似、比喩）' },
    // 話題・トピック
    { english: 'about', japanese: '〜について（一般的な話題）' },
    { english: 'on', japanese: '〜について（専門的な話題）', linkNo: [1, 3] },
    // 対立・対向
    { english: 'against', japanese: '〜に反対して、〜に対して', linkNo: [1] },
  ];
  return <WordMatrix data={data} columns={5} />;
};
