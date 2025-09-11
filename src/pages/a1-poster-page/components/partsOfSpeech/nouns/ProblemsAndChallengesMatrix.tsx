import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const ProblemsAndChallengesMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 問題・課題
    { english: 'problem', japanese: '問題' },
    { english: 'issue', japanese: '論点、課題' },
    { english: 'trouble', japanese: 'トラブル、困ったこと' },
    { english: 'difficulty', japanese: '困難さ、難しさ' },
    { english: 'check', japanese: '点検、確認' },
    { english: 'search', japanese: '検索' },

    // 危険・リスク
    { english: 'risk', japanese: 'リスク、危険性' },
    { english: 'danger', japanese: '危険（直接的）' },

    // 失敗・敗北・損失
    { english: 'defeat', japanese: '敗北（競争での負け）' },
    { english: 'loss', japanese: '損失、失うこと', linkNo: [39] },

    // 間違い・誤り
    { english: 'mistake', japanese: '間違い（人的）' },
    { english: 'error', japanese: 'エラー、誤り（技術的）' },
    { english: 'miss', japanese: 'ミス（逃す、外す）', linkNo: [19] },

    // 責任・欠点・事故
    { english: 'responsibility', japanese: '責任（役割、義務）' },
    { english: 'fault', japanese: '過失、責任（失敗）' },
    { english: 'accident', japanese: '事故、偶然' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
