import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const ArtsAndMediaAndPerformanceMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 芸術家・美術家
    { english: 'artist', japanese: '芸術家、美術家' },
    { english: 'painter', japanese: '画家' },

    // 作家・著者・記者・読者
    { english: 'writer', japanese: '作家' },
    { english: 'author', japanese: '著者' },
    { english: 'reporter', japanese: '記者' },
    { english: 'reader', japanese: '読者' },

    // 写真家・デザイナー
    { english: 'photographer', japanese: '写真家' },
    { english: 'designer', japanese: '設計者、デザイナー' },

    // 音楽家・歌手・ダンサー
    { english: 'musician', japanese: '音楽家' },
    { english: 'singer', japanese: '歌手' },
    { english: 'dancer', japanese: 'ダンサー' },

    // 俳優・女優・スター・モデル
    { english: 'actor', japanese: '俳優、役者' },
    { english: 'actress', japanese: '女優' },
    { english: 'star', japanese: 'スター、恒星', linkNo: [40] },
    { english: 'model', japanese: 'モデル、見本' },

    // 講演者・観客・ファン
    { english: 'speaker', japanese: '講演者', linkNo: [46] },
    { english: 'audience', japanese: '観客' },
    { english: 'fan', japanese: 'ファン', linkNo: [46] },
  ];

  return <WordMatrix data={data} columns={6} />;
};
