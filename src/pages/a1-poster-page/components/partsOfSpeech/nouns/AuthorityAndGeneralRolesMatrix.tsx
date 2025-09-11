import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const AuthorityAndGeneralRolesMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 国家元首・王族
    { english: 'president', japanese: '大統領、社長' },
    { english: 'king', japanese: '王、国王' },
    { english: 'queen', japanese: '女王' },
    { english: 'prince', japanese: '王子' },
    { english: 'princess', japanese: '王女' },
    { english: 'emperor', japanese: '天皇、皇帝' },

    // リーダー・指導者
    { english: 'leader', japanese: 'リーダー、指導者' },
    { english: 'chief', japanese: '長、リーダー' },
    { english: 'manager', japanese: '管理者、経営者' },
    { english: 'owner', japanese: '所有者' },
    { english: 'boss', japanese: '上司' },
    { english: 'director', japanese: '監督、ディレクター' },
    { english: 'master', japanese: '主人、名人' },
    { english: 'captain', japanese: '主将、船長、隊長' },
    { english: 'coach', japanese: 'コーチ、指導者' },

    // 英雄・マスコット・政治家
    { english: 'hero', japanese: 'ヒーロー、英雄、主人公' },
    { english: 'heroine', japanese: 'ヒロイン、女性の英雄' },
    { english: 'mascot', japanese: 'マスコット' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
