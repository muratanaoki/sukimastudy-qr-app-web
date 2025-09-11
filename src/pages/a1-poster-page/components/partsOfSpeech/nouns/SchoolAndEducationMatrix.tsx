import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const SchoolAndEducationMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 教員・生徒・クラスメート
    { english: 'professor', japanese: '教授' },
    { english: 'teacher', japanese: '先生、教師' },
    { english: 'librarian', japanese: '図書館員、司書' },
    { english: 'student', japanese: '生徒、学生' },
    { english: 'classmate', japanese: 'クラスメート' },

    // 校長・卒業生
    { english: 'principal', japanese: '校長' },
    { english: 'graduate', japanese: '卒業生' },

    // 初心者・専門家・ボランティア
    { english: 'beginner', japanese: '初心者' },
    { english: 'expert', japanese: '専門家' },
    { english: 'volunteer', japanese: 'ボランティア' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
