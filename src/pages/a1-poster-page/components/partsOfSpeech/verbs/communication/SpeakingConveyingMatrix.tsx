import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 話す・伝えるの動詞マトリクスのテーブルを表示するコンポーネント
 */
export const SpeakingConveyingMatrix: React.FC = () => {
  // 話す・伝える動詞データ
  const data: WordPairArray = [
    // 言う・伝える・表現（意味が近い順）
    { english: 'say', japanese: '〜を言う、〜と述べる' },
    { english: 'tell', japanese: '〜を伝える、〜に命じる' },
    { english: 'speak', japanese: '話す、〜を話す（言語）' },
    { english: 'talk', japanese: '話す、語る' },
    { english: 'discuss', japanese: '〜を議論する' },
    { english: 'explain', japanese: '〜を説明する' },
    { english: 'describe', japanese: '〜を描写する' },
    { english: 'add', japanese: '〜を付け加えて言う', linkNo: [10] },
    { english: 'repeat', japanese: '〜を繰り返す' },
    { english: 'express', japanese: '〜を表現する' },
    { english: 'introduce', japanese: '〜を紹介する' }, // 他動詞
    { english: 'show', japanese: '〜を見せる' },
    { english: 'point', japanese: '指さす（指を向ける）、〜を指す' },
    { english: 'contact', japanese: '〜に連絡する' },

    // 電話・メッセージ・送信（意味が近い順）
    { english: 'call', japanese: '〜に電話する、〜を呼ぶ' },
    { english: 'phone', japanese: '〜に電話する（口語的）' },
    { english: 'text', japanese: '〜にメッセージを送る' },
    { english: 'email', japanese: '〜にメールを送る' },
    { english: 'signal', japanese: '〜に合図する' },
    { english: 'send', japanese: '〜を送る、〜を届ける' }, // 他動詞

    // 質問・返答（意味が近い順）
    { english: 'ask', japanese: '〜に質問する' },
    { english: 'answer', japanese: '〜に答える、〜に返事する' },

    // 提案・約束・感謝・命令（意味が近い順）
    { english: 'suggest', japanese: '〜を提案する' },
    { english: 'promise', japanese: '〜を約束する' },
    { english: 'thank', japanese: '〜に感謝する' },
    { english: 'order', japanese: '〜を命じる', linkNo: [14] }, // 他動詞

    // 叫ぶ・嘘・不平（意味が近い順）
    { english: 'shout', japanese: '〜を叫ぶ、〜を大声で言う' },
    { english: 'lie', japanese: '嘘をつく', linkNo: [4] },
    { english: 'complain', japanese: '不平を言う' },
  ];

  return <WordMatrix data={data} columns={4} />;
};
