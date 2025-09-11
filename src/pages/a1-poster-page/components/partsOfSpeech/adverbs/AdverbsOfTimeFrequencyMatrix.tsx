import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語時、頻度の副詞マトリクスのテーブルを表示するコンポーネント
 */
export const AdverbsOfTimeFrequencyMatrix: React.FC = () => {
  // 時、頻度の副詞のデータ（意味別にグループ化して整理）
  const adverbData: WordPairArray = [
    // 現在
    { english: 'now', japanese: '今、すぐに' },
    { english: 'immediately', japanese: 'すぐに（直ちに）' },
    { english: 'today', japanese: '今日、本日' },
    { english: 'tonight', japanese: '今夜' },

    // 過去
    { english: 'yesterday', japanese: '昨日' },
    { english: 'ago', japanese: '〜前に' },
    { english: 'before', japanese: '以前に' },

    // 未来
    { english: 'tomorrow', japanese: '明日' },
    { english: 'later', japanese: '後で、後に' },
    { english: 'soon', japanese: 'すぐに、まもなく' },
    { english: 'eventually', japanese: 'やがて、最終的に' },
    { english: 'someday', japanese: 'いつか、そのうち' },

    // 時間の順序
    { english: 'first', japanese: '最初に' },
    { english: 'next', japanese: '次に' },
    { english: 'then', japanese: 'その時、それから', linkNo: [3] },
    { english: 'finally', japanese: 'ついに、ようやく、最後に' },
    { english: 'last', japanese: '最後に（順序）' },
    { english: 'afterwards', japanese: 'その後、後で' },

    // 時間の長さ
    { english: 'long', japanese: '長く' },
    { english: 'forever', japanese: '永遠に、永久に' },

    // 早さ・遅さ（近い意味をまとめて並べる）
    { english: 'early', japanese: '早く' },
    { english: 'late', japanese: '遅く' },

    // 継続・状態（近い意味をまとめて並べる）
    { english: 'still', japanese: 'まだ、今でも（継続している）', linkNo: [1] },
    { english: 'yet', japanese: 'まだ（未完了）' },
    { english: 'already', japanese: 'すでに、もう' },
    { english: 'just', japanese: 'たった今、つい', linkNo: [1] },

    { english: 'recently', japanese: '最近（近頃の短い期間で）' },
    { english: 'lately', japanese: '最近（ここしばらくの間ずっと）' },
    { english: 'nowadays', japanese: '近頃は、最近では（世間では）' },

    // 繰り返し
    { english: 'again', japanese: 'もう一度、再び' },

    // 頻度（高い順にまとめて並べる）
    { english: 'always', japanese: 'いつも、常に' },
    { english: 'daily', japanese: '毎日' },
    { english: 'usually', japanese: 'たいてい、普通は' },
    { english: 'often', japanese: 'しばしば、よく' },

    // 頻度（中）
    { english: 'sometimes', japanese: '時々、たまに' },

    // 頻度（低い順にまとめて並べる）
    { english: 'once', japanese: '一度' },
    { english: 'twice', japanese: '2回、2度' },
    { english: 'seldom', japanese: 'めったに〜ない（やや古風）' },
    { english: 'rarely', japanese: 'めったに〜ない（一般的）' },
    { english: 'ever', japanese: '今までに', linkNo: [4] },

    // 否定的
    { english: 'anymore', japanese: 'もはや（主に否定文）' },
  ];

  return <WordMatrix data={adverbData} columns={5} />;
};
