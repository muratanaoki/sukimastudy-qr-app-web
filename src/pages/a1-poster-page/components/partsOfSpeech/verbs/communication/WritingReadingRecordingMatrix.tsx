import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

export const WritingReadingRecordingMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 書く・入力・記入・署名（意味が近い順）
    { english: 'write', japanese: '〜を書く' },
    { english: 'type', japanese: '〜を入力する（キーボードで）' },
    { english: 'enter', japanese: '〜を入力する（書類、電子媒体）', linkNo: [5] },
    { english: 'spell', japanese: '〜をつづる' },
    { english: 'sign', japanese: '〜に署名する' },

    // 複製・印刷（意味が近い順）
    { english: 'copy', japanese: '〜を複製する、〜を写す' },
    { english: 'print', japanese: '〜を印刷する' },

    // 読む
    { english: 'read', japanese: '〜を読む' },

    // 記録・保存（意味が近い順）
    { english: 'record', japanese: '〜を記録する（録音、録画）' },
    { english: 'save', japanese: '〜を保存する', linkNo: [8, 14] },
  ];

  return <WordMatrix data={data} columns={5} />;
};
