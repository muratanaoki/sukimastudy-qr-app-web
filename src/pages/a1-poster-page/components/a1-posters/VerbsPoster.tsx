import React from 'react';
import styles from '@/shared/styles/styles.module.css';
import { Theme } from '@/shared/types';
import VerbMatrix from '../partsOfSpeech/verbs/VerbMatrix';
import { EmotionDesireMatrix } from '../partsOfSpeech/verbs/basicActionsAndStates/EmotionDesireMatrix';
import { SensationMatrix } from '../partsOfSpeech/verbs/basicActionsAndStates/SensationMatrix';
import { ThoughtJudgmentMatrix } from '../partsOfSpeech/verbs/basicActionsAndStates/ThoughtJudgmentMatrix';
import { SpeakingConveyingMatrix } from '../partsOfSpeech/verbs/communication/SpeakingConveyingMatrix';
import { WritingReadingRecordingMatrix } from '../partsOfSpeech/verbs/communication/WritingReadingRecordingMatrix';
import { ArtsRecreationMatrix } from '../partsOfSpeech/verbs/performanceAndCreation/ArtsRecreationMatrix';
import { CreationDevelopmentMatrix } from '../partsOfSpeech/verbs/performanceAndCreation/CreationDevelopmentMatrix';
import { WorkLearningEffortsMatrix } from '../partsOfSpeech/verbs/performanceAndCreation/WorkLearningEffortsMatrix';
import { BodyActionsMatrixSimple } from '../partsOfSpeech/verbs/physicalActions/BodyActionsMatrixSimple';
import { ManipulatingObjectsMatrixSimple } from '../partsOfSpeech/verbs/physicalActions/ManipulatingObjectsMatrixSimple';
import { MovementMatrix } from '../partsOfSpeech/verbs/physicalActions/MovementMatrix';
import { ConflictDestructionMatrix } from '../partsOfSpeech/verbs/socialInteraction/ConflictDestructionMatrix';
import { EconomicActivitiesMatrix } from '../partsOfSpeech/verbs/socialInteraction/EconomicActivitiesMatrix';
import { RelationshipsCooperationMatrix } from '../partsOfSpeech/verbs/socialInteraction/RelationshipsCooperationMatrix';
import { ChangeOccurrenceMatrix } from '../partsOfSpeech/verbs/state/ChangeOccurrenceMatrix';
import { ExistenceStateMatrix } from '../partsOfSpeech/verbs/state/ExistenceStateMatrix';
import { NaturalPhenomenaMatrix } from '../partsOfSpeech/verbs/state/NaturalPhenomenaMatrix';
import { AAAMatrix } from '../partsOfSpeech/verbs/irregularVerb/AAAMatrix';
import { ABAMatrix } from '../partsOfSpeech/verbs/irregularVerb/ABAMatrix';
import { ABBMatrix } from '../partsOfSpeech/verbs/irregularVerb/ABBMatrix';
import { ABCMatrix } from '../partsOfSpeech/verbs/irregularVerb/ABCMatrix';
// ...existing code...
import { CellData, SectionConfig } from '../../../../shared/types';
import { A4Cell } from '../common/A4Cell';
import {
  Heart,
  Eye,
  Brain,
  MessageSquare,
  PenTool,
  Palette,
  Lightbulb,
  GraduationCap,
  Activity,
  Hand,
  MapPin,
  Swords,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  Cloud,
} from 'lucide-react';
import { AbilityMatrix } from '../partsOfSpeech/verbs/auxiliary/AbilityMatrix';
import { PermissionMatrix } from '../partsOfSpeech/verbs/auxiliary/PermissionMatrix';
import { FutureAndIntentionsAndPlansMatrix } from '../partsOfSpeech/verbs/auxiliary/FutureAndIntentionsAndPlansMatrix';
import { ObligationAndNecessityMatrix } from '../partsOfSpeech/verbs/auxiliary/ObligationAndNecessityMatrix';
import { AdviceAndRecommendationAndWarningMatrix } from '../partsOfSpeech/verbs/auxiliary/AdviceAndRecommendationAndWarningMatrix';
import { PossibilityAndInferenceMatrix } from '../partsOfSpeech/verbs/auxiliary/PossibilityAndInferenceMatrix';
import { RequestAndInvitationAndSuggestionMatrix } from '../partsOfSpeech/verbs/auxiliary/RequestAndInvitationAndSuggestionMatrix';
import { HabitAndIdiomaticMatrix } from '../partsOfSpeech/verbs/auxiliary/HabitAndIdiomaticMatrix';
import { HypotheticalMatrix } from '../partsOfSpeech/verbs/auxiliary/HypotheticalMatrix';

// 動詞A4セルごとの配列
const VERBS_SECTIONS_1: SectionConfig[] = [
  // 基本動作・状態
  {
    title: '感情・欲求',
    subTitle: 'Emotion & Desire',
    component: <EmotionDesireMatrix />,
    icon: Heart,
    index: 1,
  },
  {
    title: '感覚',
    subTitle: 'Sensation',
    component: <SensationMatrix />,
    icon: Eye,
    index: 2,
  },
  {
    title: '思考・判断',
    subTitle: 'Thought & Judgment',
    component: <ThoughtJudgmentMatrix />,
    icon: Brain,
    index: 3,
  },

  {
    title: '身体・生活',
    subTitle: 'Body & Life',
    component: <BodyActionsMatrixSimple />,
    icon: Activity,
    index: 4,
  },
];

const VERBS_SECTIONS_2: SectionConfig[] = [
  {
    title: '移動',
    subTitle: 'Movement',
    component: <MovementMatrix />,
    icon: MapPin,
    index: 5,
  },

  {
    title: '伝達',
    subTitle: 'Speaking & Communication',
    component: <SpeakingConveyingMatrix />,
    icon: MessageSquare,
    index: 6,
  },

  {
    title: '仕事・学習・努力',
    subTitle: 'Work, Learning & Efforts',
    component: <WorkLearningEffortsMatrix />,
    icon: GraduationCap,
    index: 7,
  },
];

const VERBS_SECTIONS_3: SectionConfig[] = [
  {
    title: '対人・働きかけ',
    subTitle: 'Interpersonal & Influence',
    component: <RelationshipsCooperationMatrix />,
    icon: Users,
    index: 8,
  },

  {
    title: '対立・破壊',
    subTitle: 'Conflict & Destruction',
    component: <ConflictDestructionMatrix />,
    icon: Swords,
    index: 9,
  },

  {
    title: '物の操作',
    subTitle: 'Manipulating Objects',
    component: <ManipulatingObjectsMatrixSimple />,
    icon: Hand,
    index: 10,
  },

  {
    title: '書く・読む・記録',
    subTitle: 'Writing, Reading & Recording',
    component: <WritingReadingRecordingMatrix />,
    icon: PenTool,
    index: 11,
  },
];

const VERBS_SECTIONS_4: SectionConfig[] = [
  {
    title: '制作・創造・開発',
    subTitle: 'Making, Creation & Development',
    component: <CreationDevelopmentMatrix />,
    icon: Lightbulb,
    index: 12,
  },
  // 実演・創作
  {
    title: '芸術・スポーツ・娯楽',
    subTitle: 'Arts, Sports & Recreation',
    component: <ArtsRecreationMatrix />,
    icon: Palette,
    index: 13,
  },

  {
    title: '経済活動',
    subTitle: 'Economic Activities',
    component: <EconomicActivitiesMatrix />,
    icon: DollarSign,
    index: 14,
  },

  // 状態・変化
  {
    title: '変化・発生',
    subTitle: 'Change & Occurrence',
    component: <ChangeOccurrenceMatrix />,
    icon: TrendingUp,
    index: 15,
  },
  {
    title: '存在・状態',
    subTitle: 'Existence & State',
    component: <ExistenceStateMatrix />,
    icon: CheckCircle,
    index: 16,
  },
  {
    title: '自然現象',
    subTitle: 'Natural Phenomena',
    component: <NaturalPhenomenaMatrix />,
    icon: Cloud,
    index: 17,
  },
];

// 助動詞セクションの定義
const AUXILIARY_VERBS_SECTIONS: SectionConfig[] = [
  {
    title: '能力',
    subTitle: 'Ability',
    component: <AbilityMatrix />,
    index: 1,
  },
  {
    title: '許可',
    subTitle: 'Permission',
    component: <PermissionMatrix />,
    index: 2,
  },
  {
    title: '依頼・勧誘・提案',
    subTitle: 'Request, Invitation & Suggestion',
    component: <RequestAndInvitationAndSuggestionMatrix />,
    index: 3,
  },
  {
    title: '義務・必要・不要',
    subTitle: 'Obligation & Necessity',
    component: <ObligationAndNecessityMatrix />,
    index: 4,
  },
  {
    title: '助言・推奨・警告',
    subTitle: 'Advice, Recommendation & Warning',
    component: <AdviceAndRecommendationAndWarningMatrix />,
    index: 5,
  },
  {
    title: '可能性・推量',
    subTitle: 'Possibility & Inference',
    component: <PossibilityAndInferenceMatrix />,
    index: 6,
  },
  {
    title: '未来・意志・予定',
    subTitle: 'Future, Intentions & Plans',
    component: <FutureAndIntentionsAndPlansMatrix />,
    index: 7,
  },
  {
    title: '習慣・慣用',
    subTitle: 'Habit & Idiomatic',
    component: <HabitAndIdiomaticMatrix />,
    index: 8,
  },
  {
    title: '仮定',
    subTitle: 'Hypothetical',
    component: <HypotheticalMatrix />,
    index: 9,
  },
];

// 不規則動詞A4セルごとの配列
const IRREGULAR_VERBS_SECTIONS_1: SectionConfig[] = [
  // 基本・補助動詞系
  {
    title: '動詞の活用',
    subTitle: '原形・過去形・過去分詞の変化',
    component: <VerbMatrix />,
    index: 1,
  },
  {
    title: 'AAA型',
    subTitle: '原形、過去形、過去分詞がすべて同じ',
    component: <AAAMatrix />,
    index: 2,
  },
  {
    title: 'ABA型',
    subTitle: '原形と過去分詞が同じ',
    component: <ABAMatrix />,
    index: 3,
  },
];

const IRREGULAR_VERBS_SECTIONS_2: SectionConfig[] = [
  {
    title: 'ABB型',
    subTitle: '過去形と過去分詞が同じ',
    component: <ABBMatrix />,
    index: 4,
  },
];

const IRREGULAR_VERBS_SECTIONS_3: SectionConfig[] = [
  {
    title: 'ABC型',
    subTitle: '原形、過去形、過去分詞がすべて違う',
    component: <ABCMatrix />,
    index: 5,
  },
];

/**
 * A1サイズ（841mm × 594mm）の英語学習ポスター
 * 8つのA4領域に分割されたレイアウト
 */
interface VerbsPosterProps {
  theme?: Theme;
}

export const VerbsPoster: React.FC<VerbsPosterProps> = ({ theme = 'pink' }) => {
  // 各A4セルに表示するコンテンツと題名を定義
  const cellData: CellData[] = [
    {
      title: '動詞',
      sections: VERBS_SECTIONS_1,
      pages: '1/4',
    },
    {
      title: '動詞',
      sections: VERBS_SECTIONS_2,
      pages: '2/4',
    },
    {
      title: '動詞',
      sections: VERBS_SECTIONS_3,
      pages: '3/4',
    },
    {
      title: '動詞',
      sections: VERBS_SECTIONS_4,
      pages: '4/4',
    },
    {
      title: '助動詞・準助動詞',
      sections: AUXILIARY_VERBS_SECTIONS,
    },
    {
      title: '不規則動詞',
      sections: IRREGULAR_VERBS_SECTIONS_1,
      pages: '1/3',
    },
    {
      title: '不規則動詞',
      sections: IRREGULAR_VERBS_SECTIONS_2,
      pages: '2/3',
    },
    {
      title: '不規則動詞',
      sections: IRREGULAR_VERBS_SECTIONS_3,
      pages: '3/3',
    },
  ];

  // テーマクラス名を生成
  const themeClassName = `theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`;

  return (
    <div className={`${styles.a1Poster} ${styles[themeClassName]}`}>
      <div className={styles.a1GridContainer}>
        {cellData.map((cell, index) => (
          <A4Cell key={index} cell={cell} index={index} />
        ))}
      </div>
    </div>
  );
};
