import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 文芸マトリクスのテーブルを表示するコンポーネント
 */
export const MediaAndContentMatrix: React.FC = () => {
  // 文芸データ
  const literatureData: WordPairArray = [
    // 文学・物語・作品
    { english: 'fiction', japanese: 'フィクション、小説' },
    { english: 'novel', japanese: '小説' },
    { english: 'story', japanese: '物語', linkNo: [35] },
    { english: 'poem', japanese: '詩' },
    { english: 'essay', japanese: '随筆、小論' },
    { english: 'mystery', japanese: 'ミステリー' },
    { english: 'work', japanese: '作品、制作物', linkNo: [32] },
    { english: 'comedy', japanese: 'コメディ、喜劇' },

    // 出版物・本・雑誌・辞書
    { english: 'book', japanese: '本' },
    { english: 'textbook', japanese: '教科書' },
    { english: 'dictionary', japanese: '辞書' },
    { english: 'magazine', japanese: '雑誌' },
    { english: 'title', japanese: '題名、タイトル' },
    { english: 'headline', japanese: '見出し' },
    { english: 'chapter', japanese: '章' },
    { english: 'page', japanese: 'ページ' },

    { english: 'series', japanese: 'シリーズ' },

    // 新聞・記事・報道
    { english: 'newspaper', japanese: '新聞' },
    { english: 'news', japanese: 'ニュース、報道' },
    { english: 'article', japanese: '記事' },
    { english: 'report', japanese: '報告書' },
    { english: 'paper', japanese: '論文、新聞', linkNo: [49] },
    { english: 'press', japanese: '報道機関、新聞' },

    // 手紙・広告・コピー
    { english: 'letter', japanese: '手紙' },
    { english: 'postcard', japanese: '絵はがき' },
    { english: 'advertisement', japanese: '広告' },
    { english: 'ad', japanese: '広告（省略）' },
    { english: 'copy', japanese: 'コピー' },

    // メディア・放送・テレビ・ラジオ
    { english: 'media', japanese: 'メディア' },
    { english: 'broadcast', japanese: '放送' },
    { english: 'channel', japanese: 'チャンネル' },
    { english: 'show', japanese: 'ショー、番組' },

    // 映画・動画・映像
    { english: 'movie', japanese: '映画' },
    { english: 'film', japanese: '映画', linkNo: [50] },
    { english: 'video', japanese: '動画' },
    { english: 'animation', japanese: 'アニメーション' },
    { english: 'scene', japanese: 'シーン' },
    { english: 'trailer', japanese: '予告編' },
    { english: 'script', japanese: '台本、脚本' },

    // 演劇・舞台・パフォーマンス
    { english: 'play', japanese: '劇' },
    { english: 'drama', japanese: 'ドラマ' },
    { english: 'musical', japanese: 'ミュージカル' },
    { english: 'ballet', japanese: 'バレエ' },
    { english: 'dance', japanese: '踊り、ダンス' },
    { english: 'performance', japanese: '公演、演奏、演技' },
    { english: 'magic', japanese: '魔法' },

    // 音楽・楽曲・コンサート
    { english: 'song', japanese: '歌、楽曲' },
    { english: 'piece', japanese: '楽曲、作品' },
    { english: 'lyrics', japanese: '歌詞' },
    { english: 'concert', japanese: '音楽会、演奏会' },
    { english: 'band', japanese: 'バンド、楽団' },

    // 音楽のリズム・音符・ジャンル
    { english: 'rhythm', japanese: 'リズム' },
    { english: 'melody', japanese: 'メロディー' },
    { english: 'tone', japanese: '音、音色、調子' },
    { english: 'note', japanese: '音符、音' },
    { english: 'beat', japanese: '拍子' },
    { english: 'rock', japanese: 'ロック（音楽）', linkNo: [42] },
    { english: 'pop', japanese: 'ポップス' },

    // 楽器
    { english: 'instrument', japanese: '楽器' },
    { english: 'piano', japanese: 'ピアノ' },
    { english: 'guitar', japanese: 'ギター' },
    { english: 'violin', japanese: 'バイオリン' },
    { english: 'drum', japanese: '太鼓' },

    // 音楽録音
    { english: 'album', japanese: 'アルバム' },

    // 美術・芸術・デザイン
    { english: 'art', japanese: 'アート、芸術', linkNo: [55] },
    { english: 'craft', japanese: '工芸品、技術' },
    { english: 'design', japanese: 'デザイン、設計' },
    { english: 'painting', japanese: '絵、絵画作品' },

    // 写真・画像・視覚媒体
    { english: 'photo', japanese: '写真' },
    { english: 'photograph', japanese: '写真' },
    { english: 'picture', japanese: '写真、絵' },
    { english: 'image', japanese: '画像' },
    { english: 'slide', japanese: 'スライド', linkNo: [30] },
    { english: 'poster', japanese: 'ポスター' },

    // 展示・ギャラリー
    { english: 'exhibition', japanese: '展覧会' },

    // エンターテイメント・コミック
    { english: 'entertainment', japanese: '娯楽、エンターテイメント' },
    { english: 'comic', japanese: '漫画' },
    // 追加語彙
    { english: 'ending', japanese: '結末' },
  ];

  return <WordMatrix data={literatureData} columns={6} />;
};
