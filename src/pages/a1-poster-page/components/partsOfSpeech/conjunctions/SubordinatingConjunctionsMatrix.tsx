import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 従位接続詞マトリクスのテーブルを表示するコンポーネント
 */
export const SubordinatingConjunctionsMatrix: React.FC = () => {
  // 従位接続詞のデータ
  const subordinatingConjunctionsData: WordPairArray = [
    // 時・順序
    { english: 'after', japanese: '〜の後で' },
    { english: 'as soon as', japanese: '〜するとすぐに' },
    { english: 'before', japanese: '〜の前に' },
    { english: 'when', japanese: '〜するとき' },
    { english: 'while', japanese: '〜する間' },
    { english: 'until', japanese: '〜まで（ずっと）' },
    { english: 'till', japanese: '〜まで（untilと同義）' },
    { english: 'once', japanese: 'いったん〜すると' },
    { english: 'as', japanese: '〜のとき、〜なので' },
    // 理由・原因
    { english: 'because', japanese: 'なぜなら〜だから' },
    { english: 'so that', japanese: '〜するように、その結果〜' },
    { english: 'since', japanese: '〜以来、〜なので、〜だから' },
    // 条件・仮定
    { english: 'if', japanese: 'もし〜ならば' },
    { english: 'unless', japanese: 'もし〜でなければ' },
    { english: 'whether', japanese: '〜かどうか' },
    // 名詞節
    { english: 'that', japanese: '〜ということ' },
    // 譲歩
    { english: 'although', japanese: '〜だけれども（硬い表現）' },
    { english: 'though', japanese: '〜だけれども（口語的）' },
    { english: 'even though', japanese: '〜にもかかわらず（強調）' },
    { english: 'even if', japanese: 'たとえ〜だとしても' },
  ];

  return <WordMatrix data={subordinatingConjunctionsData} columns={5} />;
};
