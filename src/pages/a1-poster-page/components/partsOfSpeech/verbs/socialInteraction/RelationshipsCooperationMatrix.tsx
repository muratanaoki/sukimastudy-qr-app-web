import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 関係と協力の動詞マトリクスを表示するコンポーネント
 */
export const RelationshipsCooperationMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 出会う・紹介・友達・デート・結婚・招待・訪問・待つ・フォロー・集める・共有・祝う（意味が近い順）
    { english: 'meet', japanese: '会う、〜に会う' },
    { english: 'date', japanese: 'デートする、〜とデートする' },
    { english: 'marry', japanese: '結婚する、〜と結婚する' },
    { english: 'invite', japanese: '〜を招待する' },
    { english: 'visit', japanese: '〜を訪問する' },
    { english: 'wait', japanese: '待つ' },
    { english: 'follow', japanese: '従う、〜に従う' },
    { english: 'gather', japanese: '集まる、〜を集める' },
    { english: 'share', japanese: '〜を共有する' },
    { english: 'celebrate', japanese: '〜を祝う' },

    // 協力・助ける・支援・救う・守る・保護・世話・申し出・許可・所属・依存・尊敬・興味（意味が近い順）
    { english: 'help', japanese: '助ける、〜を助ける' },
    { english: 'support', japanese: '〜を支援する' },
    { english: 'cheer', japanese: '〜を応援する' },
    { english: 'save', japanese: '救う、〜を助ける', linkNo: [11, 14] },
    { english: 'protect', japanese: '〜を守る、〜を保護する' },
    { english: 'offer', japanese: '〜を申し出る、〜を提供する' },
    { english: 'provide', japanese: '〜を提供する' },
    { english: 'raise', japanese: '〜を育てる（世話をする）', linkNo: [10] },
    { english: 'feed', japanese: '〜に餌をやる、〜を養う' },
    { english: 'allow', japanese: '〜を許可する' },
    { english: 'let', japanese: '（許可して）〜させる' },
    { english: 'depend', japanese: '頼る、依存する' },
    { english: 'respect', japanese: '〜を尊敬する' },
    { english: 'interest', japanese: '〜に興味を持たせる' },
    { english: 'avoid', japanese: '〜を避ける' },
    { english: 'prevent', japanese: '〜を防ぐ' },
    { english: 'steal', japanese: '〜を盗む' },

    // 同意・反対（意味が近い順）
    { english: 'agree', japanese: '同意する' },
    { english: 'disagree', japanese: '反対する' },
    { english: 'join', japanese: '〜に参加する' },
  ];

  return <WordMatrix data={data} columns={5} />;
};
