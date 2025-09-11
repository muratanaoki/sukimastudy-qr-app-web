import React from 'react';
import styles from '@/shared/styles/styles.module.css';
import { Theme } from '@/shared/types';
import {
  Home,
  ShoppingCart,
  UtensilsCrossed,
  Building,
  Shirt,
  GamepadIcon,
  MonitorPlay,
  Trophy,
  MapPin,
  Cloud,
  Leaf,
  Cat,
  Cpu,
  Atom,
  Package,
  Shapes,
  Users,
  Church,
  DollarSign,
  MessageCircle,
  BookOpen,
  Award,
  Brain,
  Signpost,
  Wrench,
  GitCompare,
  Target,
  AlertTriangle,
  CheckCircle,
  Globe,
  Star,
  FlaskConical,
} from 'lucide-react';

import { ThinkingAndLogicMatrix } from '../partsOfSpeech/nouns/ThinkingAndLogicMatrix';
import { SituationAndContextMatrix } from '../partsOfSpeech/nouns/SituationAndContextMatrix';
import { AttributesAndStandardsMatrix } from '../partsOfSpeech/nouns/AttributesAndStandardsMatrix';
import { AnimalsMatrix } from '../partsOfSpeech/nouns/AnimalsMatrix';
import { SportsMatrix } from '../partsOfSpeech/nouns/SportsMatrix';
import { PlantsMatrix } from '../partsOfSpeech/nouns/PlantsMatrix';
import { GeographyAndLandformsMatrix } from '../partsOfSpeech/nouns/GeographyAndLandformsMatrix';
import { CelestialSpaceMatrix } from '../partsOfSpeech/nouns/CelestialSpaceMatrix';
import { EnvironmentWeatherMatrix } from '../partsOfSpeech/nouns/EnvironmentWeatherMatrix';
import { TechnologyAndEngineeringMatrix } from '../partsOfSpeech/nouns/TechnologyAndEngineeringMatrix';
import { ScienceAndPhenomenaMatrix } from '../partsOfSpeech/nouns/ScienceAndPhenomenaMatrix';
import { CellData, SectionConfig } from '../../../../shared/types';
import { SocialStructuresAndSystemsMatrix } from '../partsOfSpeech/nouns/SocietyAndCultureMatrix';
import { EconomyAndFinanceMatrix } from '../partsOfSpeech/nouns/EconomyAndFinanceMatrix';
import { InformationAndCommunicationMatrix } from '../partsOfSpeech/nouns/InformationAndCommunicationAndLanguageMatrix';
import { SchoolAndLearningMatrix } from '../partsOfSpeech/nouns/SchoolAndLearningMatrix';
import { ReligionMatrix } from '../partsOfSpeech/nouns/ReligionMatrix';
import { RecreationMatrix } from '../partsOfSpeech/nouns/RecreationMatrix';
import { CountriesMatrix } from '../partsOfSpeech/nouns/CountriesMatrix';
import { TypesAndComparisonMatrix } from '../partsOfSpeech/nouns/TypesAndComparisonMatrix';
import { MethodsAndProcessMatrix } from '../partsOfSpeech/nouns/MethodsAndProcessMatrix';
import { GoalsAndPlanningMatrix } from '../partsOfSpeech/nouns/GoalsAndPlanningMatrix';
import { ProblemsAndChallengesMatrix } from '../partsOfSpeech/nouns/ProblemsAndChallengesMatrix';
import { SolutionsAndAchievementsMatrix } from '../partsOfSpeech/nouns/SolutionsAndAchievementsMatrix';
import { StatesAndElementsMatrix } from '../partsOfSpeech/nouns/StatesAndElementsMatrix';
import { MaterialsAndSubstancesMatrix } from '../partsOfSpeech/nouns/MaterialsAndSubstancesMatrix';
import { ShapeAndStructureMatrix } from '../partsOfSpeech/nouns/ShapeAndStructureMatrix';
import { A4Cell } from '../common/A4Cell';
import { DailyLifeAndHouseworkMatrix } from '../partsOfSpeech/nouns/DailyLifeAndHouseworkMatrix';
import { DailyGoodsAndToolsMatrix } from '../partsOfSpeech/nouns/DailyGoodsAndToolsMatrix';
import { IngredientsMatrix } from '../partsOfSpeech/nouns/IngredientsMatrix';
import { BuildingsAndDwellingsMatrix } from '../partsOfSpeech/nouns/BuildingsAndDwellingsMatrix';
import { ClothingAndFashionMatrix } from '../partsOfSpeech/nouns/ClothingAndFashionMatrix';
import { MediaAndContentMatrix } from '../partsOfSpeech/nouns/MediaAndContentMatrix';

// スライスで分割していたNOUNS_SECTIONSをバラして各定数に

const dailyLifeSections: SectionConfig[] = [
  {
    title: '日常生活・家事',
    subTitle: 'Daily Life & Housework',
    component: <DailyLifeAndHouseworkMatrix />,
    icon: Home,
    index: 37,
  },
  {
    title: '日用品・道具',
    subTitle: 'Daily Goods & Tools',
    component: <DailyGoodsAndToolsMatrix />,
    icon: ShoppingCart,
    index: 38,
  },
  {
    title: '食事・料理',
    subTitle: 'Meals & Cooking',
    component: <IngredientsMatrix />,
    icon: UtensilsCrossed,
    index: 39,
  },
];
const goodsAndMediaSections: SectionConfig[] = [
  {
    title: '建物・住居',
    subTitle: 'Buildings & Dwellings',
    component: <BuildingsAndDwellingsMatrix />,
    icon: Building,
    index: 40,
  },
  {
    title: '衣類・ファッション',
    subTitle: 'Clothing & Fashion',
    component: <ClothingAndFashionMatrix />,
    icon: Shirt,
    index: 41,
  },
  {
    title: '趣味・余暇',
    subTitle: 'Hobby & Recreation',
    component: <RecreationMatrix />,
    icon: GamepadIcon,
    index: 42,
  },
];
const entertainmentSections: SectionConfig[] = [
  {
    title: 'メディア・コンテンツ',
    subTitle: 'Media & Content',
    component: <MediaAndContentMatrix />,
    icon: MonitorPlay,
    index: 43,
  },
  {
    title: 'スポーツ',
    subTitle: 'Sports',
    component: <SportsMatrix />,
    icon: Trophy,
    index: 44,
  },
];
const natureSections: SectionConfig[] = [
  {
    title: '天体・宇宙',
    subTitle: 'Celestial & Space',
    component: <CelestialSpaceMatrix />,
    icon: Star,
    index: 45,
  },
  {
    title: '国',
    subTitle: 'Countries',
    component: <CountriesMatrix />,
    icon: Globe,
    index: 46,
  },
  {
    title: '地理・地形',
    subTitle: 'Geography & Landforms',
    component: <GeographyAndLandformsMatrix />,
    icon: MapPin,
    index: 47,
  },
];
const scienceAndTechSections: SectionConfig[] = [
  {
    title: '環境・天気',
    subTitle: 'Environment & Weather',
    component: <EnvironmentWeatherMatrix />,
    icon: Cloud,
    index: 48,
  },
  { title: '植物', subTitle: 'Plants', component: <PlantsMatrix />, icon: Leaf, index: 49 },
  { title: '動物', subTitle: 'Animals', component: <AnimalsMatrix />, icon: Cat, index: 50 },
  {
    title: 'IT・機械・技術',
    subTitle: 'IT, Machines & Technology',
    component: <TechnologyAndEngineeringMatrix />,
    icon: Cpu,
    index: 51,
  },
];

const societySections: SectionConfig[] = [
  {
    title: '科学・現象',
    subTitle: 'Science & Phenomena',
    component: <ScienceAndPhenomenaMatrix />,
    icon: FlaskConical,
    index: 52,
  },

  {
    title: '状態・元素',
    subTitle: 'States & Elements',
    component: <StatesAndElementsMatrix />,
    icon: Atom,
    index: 53,
  },

  {
    title: '物質・材料',
    subTitle: 'Materials & Substances',
    component: <MaterialsAndSubstancesMatrix />,
    icon: Package,
    index: 54,
  },
  {
    title: '形状・構造',
    subTitle: 'Shape & Structure',
    component: <ShapeAndStructureMatrix />,
    icon: Shapes,
    index: 55,
  },

  {
    title: '社会・文化',
    subTitle: 'Society & Culture',
    component: <SocialStructuresAndSystemsMatrix />,
    icon: Users,
    index: 56,
  },
  { title: '宗教', subTitle: 'Religion', component: <ReligionMatrix />, icon: Church, index: 57 },
];

const abstractNounSections: SectionConfig[] = [
  {
    title: '経済・金融',
    subTitle: 'Economy & Finance',
    component: <EconomyAndFinanceMatrix />,
    icon: DollarSign,
    index: 58,
  },
  {
    title: '情報・伝達',
    subTitle: 'Information, Communication',
    component: <InformationAndCommunicationMatrix />,
    icon: MessageCircle,
    index: 59,
  },

  {
    title: '学校・学習',
    subTitle: 'School & Learning',
    component: <SchoolAndLearningMatrix />,
    icon: BookOpen,
    index: 60,
  },
];

const religionSections: SectionConfig[] = [
  {
    title: '属性・基準',
    subTitle: 'Attributes & Standards',
    component: <AttributesAndStandardsMatrix />,
    icon: Award,
    index: 61,
  },
  {
    title: '思考・論理',
    subTitle: 'Thinking & Logic',
    component: <ThinkingAndLogicMatrix />,
    icon: Brain,
    index: 62,
  },
  {
    title: '状況・文脈',
    subTitle: 'Situation & Condition',
    component: <SituationAndContextMatrix />,
    icon: Signpost,
    index: 63,
  },

  {
    title: '方法・過程',
    subTitle: 'Methods & Process',
    component: <MethodsAndProcessMatrix />,
    icon: Wrench,
    index: 64,
  },
  {
    title: '種類・比較',
    subTitle: 'Types & Comparison',
    component: <TypesAndComparisonMatrix />,
    icon: GitCompare,
    index: 65,
  },

  {
    title: '目標・挑戦',
    subTitle: 'Goals & Planning',
    component: <GoalsAndPlanningMatrix />,
    icon: Target,
    index: 66,
  },

  {
    title: '問題・課題',
    subTitle: 'Problems & Challenges',
    component: <ProblemsAndChallengesMatrix />,
    icon: AlertTriangle,
    index: 67,
  },

  {
    title: '解決・成果',
    subTitle: 'Solutions & Achievements',
    component: <SolutionsAndAchievementsMatrix />,
    icon: CheckCircle,
    index: 68,
  },
];

/**
 * A1サイズ（841mm × 594mm）の英語学習ポスター
 * 8つのA4領域に分割されたレイアウト
 */
interface NounsPosterProps {
  theme?: Theme;
}

// 各A4セルに表示するコンテンツ・題名を定義
export const nounsCellData: CellData[] = [
  {
    title: '名詞',
    sections: dailyLifeSections,
    pages: '7/14',
  },
  {
    title: '名詞',
    sections: goodsAndMediaSections,
    pages: '8/14',
  },
  {
    title: '名詞',
    sections: entertainmentSections,
    pages: '9/14',
  },
  {
    title: '名詞',
    sections: natureSections,
    pages: '10/14',
  },
  {
    title: '名詞',
    sections: scienceAndTechSections,
    pages: '11/14',
  },
  {
    title: '名詞',
    sections: societySections,
    pages: '12/14',
  },

  {
    title: '名詞',
    sections: abstractNounSections,
    pages: '13/14',
  },
  {
    title: '名詞',
    sections: religionSections,
    pages: '14/14',
  },
];

export const NounsPoster: React.FC<NounsPosterProps> = ({ theme = 'green' }) => {
  // テーマクラス名を生成
  const themeClassName = `theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`;

  return (
    <div className={`${styles.a1Poster} ${styles[themeClassName]}`}>
      <div className={styles.a1GridContainer}>
        {nounsCellData.map((cell, index) => (
          <A4Cell key={index} cell={cell} index={index} />
        ))}
      </div>
    </div>
  );
};
