import { IrregularVerb } from '../../../../../../shared/types';
import { IrregularVerbMatrix, LightHeightClass } from '../../../common/IrregularVerbMatrix';
import styles from '@/shared/styles/styles.module.css';

/**
 * 不規則動詞のサンプルデータ
 */
const irregularVerbsData: IrregularVerb[] = [
  {
    infinitive: 'cost',
    past: 'cost',
    pastParticiple: 'cost',
    ing: 'costing',
    meaning: '費用がかかる、〜を要する',
  },
  {
    infinitive: 'cut',
    past: 'cut',
    pastParticiple: 'cut',
    ing: 'cutting',
    meaning: '〜を切る、〜を切り離す',
  },
  {
    infinitive: 'fit',
    past: 'fit / fitted',
    pastParticiple: 'fit / fitted',
    ing: 'fitting',
    meaning: '合う、〜に合う（形が合う）',
  },
  {
    infinitive: 'hit',
    past: 'hit',
    pastParticiple: 'hit',
    ing: 'hitting',
    meaning: 'あたる、〜を殴る、〜を打つ',
  },
  {
    infinitive: 'hurt',
    past: 'hurt',
    pastParticiple: 'hurt',
    ing: 'hurting',
    meaning: '〜の心を痛める',
  },
  {
    infinitive: 'let',
    past: 'let',
    pastParticiple: 'let',
    ing: 'letting',
    meaning: '（許可して）〜させる',
  },
  {
    infinitive: 'put',
    past: 'put',
    pastParticiple: 'put',
    ing: 'putting',
    meaning: '〜を置く、〜を配置する',
  },
  {
    infinitive: 'read',
    past: '　read *',
    pastParticiple: '　read *',
    ing: 'reading',
    meaning: '〜を読む',
  },
  {
    infinitive: 'set',
    past: 'set',
    pastParticiple: 'set',
    ing: 'setting',
    meaning: '〜を置く、〜を設定する、沈む（太陽等）',
  },
  {
    infinitive: 'shut',
    past: 'shut',
    pastParticiple: 'shut',
    ing: 'shutting',
    meaning: '〜を閉じる',
  },
  {
    infinitive: 'spread',
    past: 'spread',
    pastParticiple: 'spread',
    ing: 'spreading',
    meaning: '〜を塗る、〜を広げる',
  },
];

/**
 * IrregularVerbMatrixコンポーネントの使用例
 * @returns 不規則動詞一覧表を表示するReact要素
 */
export const AAAMatrix: React.FC = () => {
  return (
    <>
      <IrregularVerbMatrix
        data={irregularVerbsData}
        lightHeightClass={LightHeightClass.AAAandABA}
      />
      <p className={styles.remark}>
        ※ readの過去形・過去分詞形は、綴りは同じでも発音が [red] (レッド) に変わります。
      </p>
    </>
  );
};
