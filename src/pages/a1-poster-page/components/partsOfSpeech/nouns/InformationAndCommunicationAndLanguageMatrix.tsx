import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * コミュニケーション、言語のマトリクスのテーブルを表示するコンポーネント
 */
export const InformationAndCommunicationMatrix: React.FC = () => {
  // コミュニケーション、言語データ
  const data: WordPairArray = [
    // 会話・発言
    { english: 'communication', japanese: 'コミュニケーション' },
    { english: 'contact', japanese: '接触、連絡' },
    { english: 'conversation', japanese: '会話' },
    { english: 'talk', japanese: '話、おしゃべり' },
    { english: 'discussion', japanese: '議論' },
    { english: 'interview', japanese: 'インタビュー' },
    { english: 'invitation', japanese: '招待' },
    { english: 'presentation', japanese: '発表' },
    { english: 'speech', japanese: '演説（一般的）' },
    { english: 'address', japanese: '演説（公式、式辞）', linkNo: [42] },
    { english: 'comment', japanese: '意見' },
    { english: 'suggestion', japanese: '提案' },
    { english: 'call', japanese: '呼びかけ、電話' },
    { english: 'shout', japanese: '叫び' },
    { english: 'voice', japanese: '声' },
    { english: 'thanks', japanese: '感謝' },

    // 質問・返答
    { english: 'question', japanese: '質問' },
    { english: 'answer', japanese: '返事、答え' },
    { english: 'request', japanese: '依頼' },
    { english: 'notice', japanese: '通知' },
    { english: 'warning', japanese: '警告' },

    // 真偽・秘密
    { english: 'secret', japanese: '秘密' },
    { english: 'lie', japanese: '嘘' },
    { english: 'truth', japanese: '真実' },

    // 情報・紹介
    { english: 'information', japanese: '情報' },
    { english: 'introduction', japanese: '紹介' },
    { english: 'example', japanese: '例' },
    { english: 'explanation', japanese: '説明' },

    // 言語・文章
    { english: 'language', japanese: '言語' },
    { english: 'word', japanese: '単語' },
    { english: 'phrase', japanese: '句' },
    { english: 'sentence', japanese: '文' },
    { english: 'text', japanese: '文章' },
    { english: 'alphabet', japanese: 'アルファベット' },

    // 表現・ジェスチャー
    { english: 'expression', japanese: '表現', linkNo: [25] },
    { english: 'gesture', japanese: 'ジェスチャー、身振り' },
    { english: 'line', japanese: '回線', linkNo: [50] },
    { english: 'message', japanese: 'メッセージ' },

    // 記号・標識・信号
    { english: 'sign', japanese: '標識、しるし' },
    { english: 'signal', japanese: '信号' },

    // リスト・表・図
    { english: 'list', japanese: 'リスト、一覧' },
    { english: 'record', japanese: '記録、録音' },
    { english: 'data', japanese: 'データ、資料' },
    { english: 'password', japanese: 'パスワード' },
    { english: 'chart', japanese: '図表' },
    { english: 'table', japanese: '表', linkNo: [33] },
    { english: 'graph', japanese: 'グラフ' },

    // 会議
    { english: 'meeting', japanese: '会議' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
