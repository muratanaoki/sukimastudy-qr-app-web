import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 社会構造、制度のマトリクスのテーブルを表示するコンポーネント
 */
export const SchoolAndLearningMatrix: React.FC = () => {
  // 学校・学習関連の単語リスト
  const data: WordPairArray = [
    // 学習・教育
    { english: 'education', japanese: '教育' },
    { english: 'learning', japanese: '学習' },
    { english: 'reading', japanese: '読書' },
    { english: 'study', japanese: '勉強' },
    { english: 'growth', japanese: '成長' },

    // 教科
    { english: 'subject', japanese: '教科、主題、主語' },
    { english: 'Japanese', japanese: '国語', linkNo: [20] },
    { english: 'mathematics', japanese: '数学' },
    { english: 'math', japanese: '数学（略称）' },
    { english: 'science', japanese: '理科、科学' },
    { english: 'history', japanese: '歴史' },
    { english: 'geography', japanese: '地理' },
    { english: 'music', japanese: '音楽' },
    { english: 'art', japanese: '美術', linkNo: [38] },
    { english: 'moral education', japanese: '道徳' },
    { english: 'physical education', japanese: '体育' },
    { english: 'P.E.', japanese: '体育（略称）' },

    // 授業・講義
    { english: 'lesson', japanese: '授業、教訓' },
    { english: 'class', japanese: '授業、クラス' },
    { english: 'lecture', japanese: '講義' },

    // 学年・卒業・学期
    { english: 'grade', japanese: '学年', linkNo: [56] },
    { english: 'graduation', japanese: '卒業' },
    { english: 'semester', japanese: '学期' },
    { english: 'term', japanese: '学期', linkNo: [1] },

    // 課題・宿題
    { english: 'homework', japanese: '宿題' },
    { english: 'assignment', japanese: '課題、宿題' },

    // 試験・テスト
    { english: 'exam', japanese: '試験' },
    { english: 'test', japanese: 'テスト' },
    { english: 'quiz', japanese: '小テスト' },
    { english: 'review', japanese: '復習、見直し' },
  ];

  return <WordMatrix data={data} columns={5} />;
};
