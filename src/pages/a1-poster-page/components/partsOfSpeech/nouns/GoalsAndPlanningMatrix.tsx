import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const GoalsAndPlanningMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 目的・目標
    { english: 'purpose', japanese: '目的' },
    { english: 'goal', japanese: '目標', linkNo: [39] },
    { english: 'challenge', japanese: '挑戦' },

    // 計画・実行
    { english: 'plan', japanese: '計画' },
    { english: 'project', japanese: 'プロジェクト' },
    { english: 'program', japanese: 'プログラム' },
    { english: 'deadline', japanese: '締め切り' },

    // 選択・可能性
    { english: 'choice', japanese: '選択' },
    { english: 'option', japanese: '選択肢' },
    { english: 'possibility', japanese: '可能性' },

    // 機会・チャンス
    { english: 'chance', japanese: 'チャンス（偶然の機会）' },
    { english: 'opportunity', japanese: '機会（計画的な好機）' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
