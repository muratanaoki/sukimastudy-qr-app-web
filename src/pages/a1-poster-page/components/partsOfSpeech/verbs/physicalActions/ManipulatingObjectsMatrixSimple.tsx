import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 物を操作する動詞マトリクスのテーブルを表示するコンポーネント
 */
export const ManipulatingObjectsMatrixSimple: React.FC = () => {
  const data: WordPairArray = [
    // 取る・拾う・選び出す・集める・手に入れる（意味が近い順）
    { english: 'take', japanese: '〜を取る、〜を持っていく' },
    { english: 'get', japanese: '〜を手に入れる', linkNo: [15] },
    { english: 'receive', japanese: '〜を受け取る' },
    { english: 'pick', japanese: '〜を拾う', linkNo: [3] },
    { english: 'collect', japanese: '〜を集める' },

    // 与える
    { english: 'give', japanese: '〜を与える' },

    // 荷造り・詰める
    { english: 'pack', japanese: '荷造りする、〜を詰める' },

    // 持つ・運ぶ・持ってくる・持ち帰る（意味が近い順）
    { english: 'hold', japanese: '〜を持つ、〜を握る', linkNo: [14] },
    { english: 'carry', japanese: '〜を運ぶ、〜を持つ' },
    { english: 'bring', japanese: '〜を持ってくる' },

    // 置く・配置・片付ける・設定・設置（意味が近い順）
    { english: 'put', japanese: '〜を置く、〜を配置する' },
    { english: 'place', japanese: '〜を置く、〜を配置する' },
    { english: 'set', japanese: '〜を置く、〜を設定する', linkNo: [17] },

    // 開ける・閉める・鍵をかける（意味が近い順）
    { english: 'open', japanese: '〜を開ける' },
    { english: 'close', japanese: '〜を閉める' },
    { english: 'shut', japanese: '〜を閉じる' },
    { english: 'lock', japanese: '〜に鍵をかける' },

    // 結ぶ・留める
    { english: 'tie', japanese: '〜を結ぶ' },

    // 着る・脱ぐ・服関連（意味が近い順）
    { english: 'wear', japanese: '〜を身につけている' },
    { english: 'dress', japanese: '服を着る、〜に服を着せる' },

    // 洗う・きれいにする・乾かす・ブラシ（意味が近い順）
    { english: 'wash', japanese: '〜を洗う' },
    { english: 'clean', japanese: '〜をきれいにする' },
    { english: 'dry', japanese: '〜を乾かす' },
    { english: 'brush', japanese: '〜にブラシをかける' },

    // 隠す・覆う（意味が近い順）
    { english: 'hide', japanese: '〜を隠す' },
    { english: 'cover', japanese: '〜を覆う、〜を隠す' },

    // 加える・混ぜる・満たす・注ぐ・塗る（意味が近い順）
    { english: 'add', japanese: '〜を加える、〜を足す', linkNo: [6] },
    { english: 'mix', japanese: '〜を混ぜる' },
    { english: 'fill', japanese: '〜を満たす' },
    { english: 'pour', japanese: '〜を注ぐ' },
    { english: 'spread', japanese: '〜を塗る、〜を広げる' },

    // 切る
    { english: 'cut', japanese: '〜を切る、〜を切り離す' },

    // 修理・植える・掛ける（意味が近い順）
    { english: 'fix', japanese: '〜を修理する（口語的）' },
    { english: 'repair', japanese: '〜を修理する（丁寧）' },
    { english: 'plant', japanese: '〜を植える' },
    { english: 'hang', japanese: '〜を掛ける、〜を吊るす' },

    // 押す・引く・持ち上げる・落とす（意味が近い順）
    { english: 'push', japanese: '〜を押す（物を動かす）' },
    { english: 'press', japanese: '〜を押す（圧力を加える）' },
    { english: 'pull', japanese: '〜を引っぱる' },
    { english: 'lift', japanese: '〜を持ち上げる' },
    { english: 'drop', japanese: '落ちる、〜を落とす' },

    // 投げる・打つ・捕まえる・ノック・吹く（意味が近い順）
    { english: 'throw', japanese: '〜を投げる' },
    { english: 'hit', japanese: '〜を打つ', linkNo: [9] },
    { english: 'catch', japanese: '〜を捕まえる' },
    { english: 'knock', japanese: 'ノックする' },
    { english: 'blow', japanese: '息を吹く、〜を吹く', linkNo: [17] },

    // 上げる・下げる（意味が近い順）
    { english: 'raise', japanese: '〜を上げる', linkNo: [8] },

    // 回す・つける・消す・ひっくり返す
    { english: 'turn', japanese: '回す、〜をめくる', linkNo: [5, 15] },

    // 送る・使う
    { english: 'use', japanese: '〜を使う' },

    { english: 'draw', japanese: '〜をひく（くじ）', linkNo: [13] },
  ];

  return <WordMatrix data={data} columns={5} />;
};
