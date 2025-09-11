import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const SportsAndCompetitionMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 選手・指導者・チーム
    { english: 'athlete', japanese: '運動選手' },
    { english: 'player', japanese: '選手' },
    { english: 'swimmer', japanese: '水泳選手' },
    { english: 'climber', japanese: '登山家' },
    { english: 'teammate', japanese: 'チームメイト' },

    // 勝者・敗者・チャンピオン・ライバル
    { english: 'winner', japanese: '勝利者' },
    { english: 'loser', japanese: '敗者' },
    { english: 'champion', japanese: '優勝者、チャンピオン' },
    { english: 'rival', japanese: 'ライバル、好敵手' },

    // 審判
    { english: 'referee', japanese: '審判' },
    { english: 'umpire', japanese: '審判' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
