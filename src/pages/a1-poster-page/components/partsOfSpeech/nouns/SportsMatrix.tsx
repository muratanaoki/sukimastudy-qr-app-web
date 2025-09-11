import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * スポーツマトリクスのテーブルを表示するコンポーネント
 */
export const SportsMatrix: React.FC = () => {
  const data: WordPairArray = [
    // スポーツ全般
    { english: 'sport', japanese: 'スポーツ、競技' },
    { english: 'Olympics', japanese: 'オリンピック競技大会' },

    // 大会・試合
    { english: 'competition', japanese: '競技会、大会' },
    { english: 'match', japanese: '対戦、勝負', linkNo: [60] },
    { english: 'game', japanese: '試合', linkNo: [37] },
    { english: 'race', japanese: '競争、レース' },
    { english: 'final', japanese: '決勝戦' },
    { english: 'tournament', japanese: 'トーナメント' },
    { english: 'league', japanese: 'リーグ' },
    { english: 'marathon', japanese: 'マラソン' },

    // チーム・人・応援
    { english: 'team', japanese: 'チーム、組' },
    { english: 'club', japanese: '部活、サークル' },
    { english: 'away', japanese: 'アウェイ' },

    // 勝敗・得点・記録
    { english: 'win', japanese: '勝利、優勝' },
    { english: 'loss', japanese: '負け、敗北', linkNo: [62] },
    { english: 'draw', japanese: '引き分け' },
    { english: 'tie', japanese: '引き分け', linkNo: [36] },
    { english: 'score', japanese: '得点' },
    { english: 'goal', japanese: 'ゴール', linkNo: [61] },
    { english: 'medal', japanese: 'メダル、勲章' },
    { english: 'trophy', japanese: 'トロフィー' },
    { english: 'out', japanese: 'アウト' },
    { english: 'save', japanese: 'セーブ（スポーツ）' },
    { english: 'foul', japanese: '反則、ファウル' },
    { english: 'penalty', japanese: 'ペナルティ、罰則' },

    // 球技の動作・プレー
    { english: 'catch', japanese: '捕球' },
    { english: 'hit', japanese: 'ヒット、安打', linkNo: [63] },
    { english: 'pass', japanese: 'パス' },
    { english: 'serve', japanese: 'サーブ（球技）' },
    { english: 'shot', japanese: 'シュート' },

    // 球技スポーツ
    { english: 'baseball', japanese: '野球' },
    { english: 'basketball', japanese: 'バスケットボール' },
    { english: 'football', japanese: 'フットボール' },
    { english: 'soccer', japanese: 'サッカー' },
    { english: 'tennis', japanese: 'テニス' },
    { english: 'rugby', japanese: 'ラグビー' },
    { english: 'volleyball', japanese: 'バレーボール' },
    { english: 'golf', japanese: 'ゴルフ' },

    // その他のスポーツ
    { english: 'judo', japanese: '柔道' },
    { english: 'swimming', japanese: '水泳（競泳）' },
    { english: 'climbing', japanese: '登山、クライミング' },
    { english: 'skating', japanese: 'スケート' },
    { english: 'ski', japanese: 'スキー（競技、板）' },

    // 競技場・施設
    { english: 'field', japanese: 'フィールド、競技場', linkNo: [42] },
    { english: 'track', japanese: 'トラック、陸上競技場' },
    { english: 'ring', japanese: 'リング（格闘技）', linkNo: [36] },
    { english: 'lane', japanese: 'コース（水泳等）' },
    { english: 'pool', japanese: 'プール' },
    { english: 'base', japanese: '塁（野球）' },

    // 用具・道具
    { english: 'ball', japanese: 'ボール、球' },
    { english: 'bat', japanese: 'バット' },
    { english: 'racket', japanese: 'ラケット' },
    { english: 'glove', japanese: 'グローブ' },
    { english: 'helmet', japanese: 'ヘルメット' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
