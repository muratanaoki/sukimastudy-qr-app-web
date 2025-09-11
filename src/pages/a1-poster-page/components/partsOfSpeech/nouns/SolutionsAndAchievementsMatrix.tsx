import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const SolutionsAndAchievementsMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 解決・ヒント・答え
    { english: 'solution', japanese: '解決策' },
    { english: 'hint', japanese: 'ヒント（助言）' },
    { english: 'clue', japanese: '手がかり（証拠）' },
    { english: 'improvement', japanese: '改善、上達' },
    { english: 'update', japanese: '更新' },

    // 成功・達成・勝利
    { english: 'success', japanese: '成功' },
    { english: 'achievement', japanese: '達成、業績' },
    { english: 'victory', japanese: '勝利' },
    { english: 'hit', japanese: 'ヒット、成功作', linkNo: [39] },

    // 賞
    { english: 'award', japanese: ' 賞（名誉、評価）' },
    { english: 'prize', japanese: '賞品（報酬）' },

    // 宝・宝物
    { english: 'treasure', japanese: '宝、宝物' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
