import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const PrimaryInterjectionsMatrix: React.FC = () => {
  const greetingsData: WordPairArray = [
    // 挨拶
    { english: 'hello', japanese: 'こんにちは、もしもし' },
    { english: 'hi', japanese: 'やあ' },
    { english: 'hey', japanese: 'ねえ、おい' },

    // 驚き・感嘆・うっかり
    { english: 'oh', japanese: 'ああ、おや' },
    { english: 'wow', japanese: 'わー、すごい' },
    { english: 'Oops!', japanese: 'おっと！、しまった！' },
    { english: 'what', japanese: 'えっ、なんだって？' },

    // 返答（肯定・否定）
    { english: 'yeah', japanese: 'うん、そうだね' },
    { english: 'Uh-huh.', japanese: 'うんうん、はい' },
    { english: 'nope', japanese: 'いや、いいえ' },

    // 肯定・同意・賞賛
    { english: 'yes', japanese: 'はい' },
    { english: 'OK / O.K.', japanese: 'わかった、いいよ' },
    { english: 'right', japanese: 'そのとおり、わかった' },
    { english: 'Great!', japanese: 'すごい！、やった！' },

    // 否定
    { english: 'no', japanese: 'いいえ' },

    // 考え中・つなぎ
    { english: 'well', japanese: 'ええと、さて' },
    { english: 'um / uh', japanese: 'えーと、あのー' },
    { english: 'hmm', japanese: 'うーん' },

    // 痛み・不快
    { english: 'Ouch! / Ow!', japanese: '痛っ！、イテッ！' },
    { english: 'Ugh!', japanese: 'うげっ、うへぇ' },
  ];

  return <WordMatrix data={greetingsData} columns={5} />;
};
