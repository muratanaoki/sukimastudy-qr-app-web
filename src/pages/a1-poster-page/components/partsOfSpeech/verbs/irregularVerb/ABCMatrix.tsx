import { IrregularVerb } from '../../../../../../shared/types';
import { IrregularVerbMatrix, LightHeightClass } from '../../../common/IrregularVerbMatrix';
import styles from '@/shared/styles/styles.module.css';

/**
 * 不規則動詞のサンプルデータ
 */
const irregularVerbsData: IrregularVerb[] = [
  {
    infinitive: 'bear',
    past: 'bore',
    pastParticiple: 'borne / born',
    ing: 'bearing',
    meaning: '〜を産む',
  },
  {
    infinitive: 'begin',
    past: 'began',
    pastParticiple: 'begun',
    ing: 'beginning',
    meaning: '始まる、〜を始める（丁寧）',
  },
  { infinitive: 'bite', past: 'bit', pastParticiple: 'bitten', ing: 'biting', meaning: '〜を噛む' },
  {
    infinitive: 'blow',
    past: 'blew',
    pastParticiple: 'blown',
    ing: 'blowing',
    meaning: '息を吹く、〜を吹く、風が吹く',
  },
  {
    infinitive: 'break',
    past: 'broke',
    pastParticiple: 'broken',
    ing: 'breaking',
    meaning: '〜を壊す、〜を割る',
  },
  {
    infinitive: 'choose',
    past: 'chose',
    pastParticiple: 'chosen',
    ing: 'choosing',
    meaning: '〜を選ぶ（慎重）',
  },
  {
    infinitive: 'draw',
    past: 'drew',
    pastParticiple: 'drawn',
    ing: 'drawing',
    meaning: '絵を描く、引き分ける、〜をひく（くじ）',
  },
  {
    infinitive: 'drink',
    past: 'drank',
    pastParticiple: 'drunk',
    ing: 'drinking',
    meaning: '〜を飲む',
  },
  {
    infinitive: 'drive',
    past: 'drove',
    pastParticiple: 'driven',
    ing: 'driving',
    meaning: '〜を運転する',
  },
  { infinitive: 'eat', past: 'ate', pastParticiple: 'eaten', ing: 'eating', meaning: '〜を食べる' },
  { infinitive: 'fall', past: 'fell', pastParticiple: 'fallen', ing: 'falling', meaning: '落ちる' },
  {
    infinitive: 'fly',
    past: 'flew',
    pastParticiple: 'flown',
    ing: 'flying',
    meaning: '飛ぶ、〜を飛ばす',
  },
  {
    infinitive: 'forget',
    past: 'forgot',
    pastParticiple: 'forgotten',
    ing: 'forgetting',
    meaning: '〜を忘れる',
  },
  {
    infinitive: 'freeze',
    past: 'froze',
    pastParticiple: 'frozen',
    ing: 'freezing',
    meaning: '凍る、〜を凍らせる',
  },
  {
    infinitive: 'get',
    past: 'got',
    pastParticiple: 'gotten',
    ing: 'getting',
    meaning: '〜を手に入れる、〜になる（口語的）',
  },
  {
    infinitive: 'give',
    past: 'gave',
    pastParticiple: 'given',
    ing: 'giving',
    meaning: '〜を与える',
  },
  {
    infinitive: 'go',
    past: 'went',
    pastParticiple: 'gone',
    ing: 'going',
    meaning: '行く、移動する',
  },
  {
    infinitive: 'grow',
    past: 'grew',
    pastParticiple: 'grown',
    ing: 'growing',
    meaning: '増える、〜を育てる（自然育成）',
  },
  { infinitive: 'hide', past: 'hid', pastParticiple: 'hidden', ing: 'hiding', meaning: '〜を隠す' },
  {
    infinitive: 'know',
    past: 'knew',
    pastParticiple: 'known',
    ing: 'knowing',
    meaning: '〜を知っている、〜と面識がある',
  },
  { infinitive: '　lie *', past: 'lay', pastParticiple: 'lain', ing: 'lying', meaning: '横になる' },
  {
    infinitive: 'ride',
    past: 'rode',
    pastParticiple: 'ridden',
    ing: 'riding',
    meaning: '〜に乗る',
  },
  {
    infinitive: 'rise',
    past: 'rose',
    pastParticiple: 'risen',
    ing: 'rising',
    meaning: '上がる、昇る（太陽等）',
  },
  {
    infinitive: 'see',
    past: 'saw',
    pastParticiple: 'seen',
    ing: 'seeing',
    meaning: '〜を見る（自然に目に入る）',
  },
  {
    infinitive: 'shake',
    past: 'shook',
    pastParticiple: 'shaken',
    ing: 'shaking',
    meaning: '揺れる、〜を振る（動作全般）',
  },
  {
    infinitive: 'show',
    past: 'showed',
    pastParticiple: 'shown',
    ing: 'showing',
    meaning: '〜を見せる',
  },
  { infinitive: 'sing', past: 'sang', pastParticiple: 'sung', ing: 'singing', meaning: '歌う' },
  {
    infinitive: 'speak',
    past: 'spoke',
    pastParticiple: 'spoken',
    ing: 'speaking',
    meaning: '話す、〜を話す（言語）',
  },
  {
    infinitive: 'steal',
    past: 'stole',
    pastParticiple: 'stolen',
    ing: 'stealing',
    meaning: '〜を盗む',
  },
  { infinitive: 'swim', past: 'swam', pastParticiple: 'swum', ing: 'swimming', meaning: '泳ぐ' },
  {
    infinitive: 'take',
    past: 'took',
    pastParticiple: 'taken',
    ing: 'taking',
    meaning: '〜を取る、〜を持っていく',
  },
  {
    infinitive: 'throw',
    past: 'threw',
    pastParticiple: 'thrown',
    ing: 'throwing',
    meaning: '〜を投げる',
  },
  {
    infinitive: 'wake',
    past: 'woke',
    pastParticiple: 'woken',
    ing: 'waking',
    meaning: '目を覚ます、〜を起こす',
  },
  {
    infinitive: 'wear',
    past: 'wore',
    pastParticiple: 'worn',
    ing: 'wearing',
    meaning: '〜を身につけている',
  },
  {
    infinitive: 'write',
    past: 'wrote',
    pastParticiple: 'written',
    ing: 'writing',
    meaning: '〜を書く',
  },
];

export const ABCMatrix: React.FC = () => {
  return (
    <>
      <IrregularVerbMatrix data={irregularVerbsData} lightHeightClass={LightHeightClass.ABC} />
      <p className={styles.remark}>
        ※ lie には「横になる」(lie-lay-lain-lying) と「嘘をつく」(lie-lied-lied-lying)
        の2つの全く異なる活用があります。
      </p>
    </>
  );
};
