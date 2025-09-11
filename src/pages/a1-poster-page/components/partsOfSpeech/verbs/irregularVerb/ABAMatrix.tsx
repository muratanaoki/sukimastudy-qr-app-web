import { IrregularVerb } from '../../../../../../shared/types';
import { IrregularVerbMatrix, LightHeightClass } from '../../../common/IrregularVerbMatrix';

/**
 * 不規則動詞のサンプルデータ
 */
const irregularVerbsData: IrregularVerb[] = [
  {
    infinitive: 'become',
    past: 'became',
    pastParticiple: 'become',
    ing: 'becoming',
    meaning: '〜になる',
  },
  {
    infinitive: 'come',
    past: 'came',
    pastParticiple: 'come',
    ing: 'coming',
    meaning: '来る、到着する',
  },
  { infinitive: 'run', past: 'ran', pastParticiple: 'run', ing: 'running', meaning: '走る' },
];

export const ABAMatrix: React.FC = () => {
  return (
    <IrregularVerbMatrix data={irregularVerbsData} lightHeightClass={LightHeightClass.AAAandABA} />
  );
};
