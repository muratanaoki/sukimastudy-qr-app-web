// Interrogative components
import { BasicInterrogativesMatrix } from '../partsOfSpeech/interrogative/BasicInterrogativesMatrix';
import { HowExpressionsMatrix } from '../partsOfSpeech/interrogative/HowExpressionsMatrix';

import React from 'react';
import styles from '@/shared/styles/styles.module.css';
import { Theme } from '@/shared/types';

import { A4Cell } from '../common/A4Cell';

import { CoordinatingConjunctionsMatrix } from '../partsOfSpeech/conjunctions/CoordinatingConjunctionsMatrix';
import { CorrelativeConjunctionsMatrix } from '../partsOfSpeech/conjunctions/CorrelativeConjunctionsMatrix';
import { SubordinatingConjunctionsMatrix } from '../partsOfSpeech/conjunctions/SubordinatingConjunctionsMatrix';
import { PrimaryInterjectionsMatrix } from '../partsOfSpeech/interjections/PrimaryInterjectionsMatrix';
import { AdverbsOfDegreeMatrix } from '../partsOfSpeech/adverbs/AdverbsOfDegreeMatrix';
import { AdverbsOfPlaceDirectionMatrix } from '../partsOfSpeech/adverbs/AdverbsOfPlaceDirectionMatrix';
import { AdverbsOfMannerMatrix } from '../partsOfSpeech/adverbs/AdverbsOfMannerMatrix';
import { CertaintyOpinionAdverbsMatrix } from '../partsOfSpeech/adverbs/CertaintyOpinionAdverbsMatrix';
import { ConjunctiveLogicalAdverbsMatrix } from '../partsOfSpeech/adverbs/ConjunctiveLogicalAdverbsMatrix';
import { AdverbsOfTimeFrequencyMatrix } from '../partsOfSpeech/adverbs/AdverbsOfTimeFrequencyMatrix';
import { ResponseAndInquiryMatrix } from '../partsOfSpeech/adverbs/ResponseAndInquiryMatrix';
import { PersonalityAttitudeMatrix } from '../partsOfSpeech/adjectives/PersonalityAttitudeMatrix';
import { AppearanceHealthStatusMatrix } from '../partsOfSpeech/adjectives/AppearanceHealthStatusMatrix';
import { EmotionsMoodsMatrix } from '../partsOfSpeech/adjectives/EmotionsMoodsMatrix';
import { AbilitySkillMatrix } from '../partsOfSpeech/adjectives/AbilitySkillMatrix';
import { SizeShapeWeightMatrix } from '../partsOfSpeech/adjectives/SizeShapeWeightMatrix';
import { ColorAdjectivesMatrix } from '../partsOfSpeech/adjectives/ColorAdjectivesMatrix';
import { TextureFeelMatrix } from '../partsOfSpeech/adjectives/TextureFeelMatrix';
import { LightWeatherMatrix } from '../partsOfSpeech/adjectives/LightWeatherMatrix';
import { PhysicalStateMatrix } from '../partsOfSpeech/adjectives/PhysicalStateMatrix';
import { SoundMatrix } from '../partsOfSpeech/adjectives/SoundMatrix';
import { TimeOrderMatrix } from '../partsOfSpeech/adjectives/TimeOrderMatrix';
import { SpeedFrequencyMatrix } from '../partsOfSpeech/adjectives/SpeedFrequencyMatrix';
import { LocationDirectionMatrix } from '../partsOfSpeech/adjectives/LocationDirectionMatrix';
import { GeographyNationalityMatrix } from '../partsOfSpeech/adjectives/GeographyNationalityMatrix';
import { GeneralEvaluationMatrix } from '../partsOfSpeech/adjectives/GeneralEvaluationMatrix';
import { ValuePriceMatrix } from '../partsOfSpeech/adjectives/ValuePriceMatrix';
import { ImportanceUsefulnessMatrix } from '../partsOfSpeech/adjectives/ImportanceUsefulnessMatrix';
import { CorrectnessTruthMatrix } from '../partsOfSpeech/adjectives/CorrectnessTruthMatrix';
import { DifficultyPossibilityMatrix } from '../partsOfSpeech/adjectives/DifficultyPossibilityMatrix';
import { QuantityDegreeMatrix } from '../partsOfSpeech/adjectives/QuantityDegreeMatrix';
import { UniquenessSimilarityMatrix } from '../partsOfSpeech/adjectives/UniquenessSimilarityMatrix';
import { SocialCulturalFieldsMatrix } from '../partsOfSpeech/adjectives/SocialCulturalFieldsMatrix';
import { IrregularChangesMatrix } from '../partsOfSpeech/comparativeAndSuperlative/IrregularChangesMatrix';
import { RegularChangesMatrix1 } from '../partsOfSpeech/comparativeAndSuperlative/RegularChangesMatrix1';
import { RegularChangesMatrix2 } from '../partsOfSpeech/comparativeAndSuperlative/RegularChangesMatrix2';
import { RegularChangesMatrix3 } from '../partsOfSpeech/comparativeAndSuperlative/RegularChangesMatrix3';
import { MostAndmoreMatrix } from '../partsOfSpeech/comparativeAndSuperlative/MostAndmoreMatrix';
import { CellData, SectionConfig } from '../../../../shared/types';
import {
  Heart,
  User,
  Zap,
  Hand,
  Maximize,
  Activity,
  Sun,
  Palette,
  Volume2,
  Globe,
  MapPin,
  Clock,
  Gauge,
  Star,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Target,
  BarChart,
  Fingerprint,
  Users,
  Thermometer,
  TrendingUp,
  Eye,
  Link,
  MessageCircle,
  Brain,
} from 'lucide-react';
import { ArticlesMatrix } from '../partsOfSpeech/articles/ArticlesMatrix';

const SECTIONS: SectionConfig[] = [
  {
    title: '不規則に変化する単語',
    subTitle: 'good → better のように、形が大きく変化する',
    component: <IrregularChangesMatrix />,
  },
  {
    title: '語尾が「-y」の単語',
    subTitle: 'happy → happier のように、y を i に変えて -er/-est をつける',
    component: <RegularChangesMatrix1 />,
  },
  {
    title: '最後の文字を重ねる単語',
    subTitle: 'big → bigger のように、最後の文字を重ねて -er/-est をつける',
    component: <RegularChangesMatrix2 />,
  },
  {
    title: '語尾が「-e」の単語',
    subTitle: 'nice → nicer のように、-r/-st だけをつける',
    component: <RegularChangesMatrix3 />,
  },
  {
    title: 'more / most をつける単語',
    subTitle: 'beautiful など、つづりが長い語には more / most をつける',
    component: <MostAndmoreMatrix />,
  },
];

const ARTICLE_SECTIONS: SectionConfig[] = [
  {
    title: '冠詞',
    subTitle: 'Articles',
    component: <ArticlesMatrix />,
  },
];

// 疑問詞セクションの定義
const INTERROGATIVE_SECTIONS: SectionConfig[] = [
  {
    title: '基本疑問詞',
    component: <BasicInterrogativesMatrix />,
  },
  {
    title: 'How表現',
    component: <HowExpressionsMatrix />,
  },
];

// 接続詞セクションの定義
const CONJUNCTION_SECTIONS: SectionConfig[] = [
  {
    title: '等位接続詞',
    subTitle: '同じ重要度の要素をつなぐ',
    component: <CoordinatingConjunctionsMatrix />,
  },
  {
    title: '従位接続詞',
    subTitle: '主節と従属節をつなぐ',
    component: <SubordinatingConjunctionsMatrix />,
  },
  {
    title: '相関接続詞',
    subTitle: 'ペアで使用する',
    component: <CorrelativeConjunctionsMatrix />,
  },
];

// 感嘆詞セクションの定義
const INTERJECTION_SECTIONS: SectionConfig[] = [
  {
    title: '間投詞',
    subTitle: '感情、応答、呼びかけ、相槌などを瞬時に表現する言葉',
    component: <PrimaryInterjectionsMatrix />,
  },
];

// 副詞A4セルごとの配列
const ADVERB_SECTIONS_1: SectionConfig[] = [
  {
    title: '程度',
    subTitle: 'Degree',
    component: <AdverbsOfDegreeMatrix />,
    icon: TrendingUp,
    index: 1,
  },
  {
    title: '様子',
    subTitle: 'Manner',
    component: <AdverbsOfMannerMatrix />,
    icon: Eye,
    index: 2,
  },
  {
    title: '接続・論理',
    subTitle: 'Conjunctive & Logical',
    component: <ConjunctiveLogicalAdverbsMatrix />,
    icon: Link,
    index: 3,
  },
];
const ADVERB_SECTIONS_2: SectionConfig[] = [
  {
    title: '応答・疑問',
    subTitle: 'Response & Inquiry',
    component: <ResponseAndInquiryMatrix />,
    icon: MessageCircle,
    index: 4,
  },
  {
    title: '確信・意見',
    subTitle: 'Certainty & Opinion',
    component: <CertaintyOpinionAdverbsMatrix />,
    icon: Brain,
    index: 5,
  },
  {
    title: '場所・方向',
    subTitle: 'Place & Direction',
    component: <AdverbsOfPlaceDirectionMatrix />,
    icon: MapPin,
    index: 6,
  },
  {
    title: '時・頻度',
    subTitle: 'Time & Frequency',
    component: <AdverbsOfTimeFrequencyMatrix />,
    icon: Clock,
    index: 7,
  },
];

// 形容詞A4セルごとの配列
const ADJECTIVE_SECTIONS_1: SectionConfig[] = [
  {
    title: '性格・態度',
    subTitle: 'Personality & Attitude',
    component: <PersonalityAttitudeMatrix />,
    icon: User,
    index: 1,
  },
  {
    title: '感情・気分',
    subTitle: 'Emotions & Moods',
    component: <EmotionsMoodsMatrix />,
    icon: Heart,
    index: 2,
  },
  {
    title: '外見・健康',
    subTitle: 'Appearance & Health',
    component: <AppearanceHealthStatusMatrix />,
    icon: Activity,
    index: 3,
  },
  {
    title: '能力・技能',
    subTitle: 'Ability & Skills',
    component: <AbilitySkillMatrix />,
    icon: Zap,
    index: 4,
  },
];
const ADJECTIVE_SECTIONS_2: SectionConfig[] = [
  {
    title: '質感・感触',
    subTitle: 'Texture & Feel',
    component: <TextureFeelMatrix />,
    icon: Hand,
    index: 5,
  },
  {
    title: '大きさ・形・重さ',
    subTitle: 'Size, Shape & Weight',
    component: <SizeShapeWeightMatrix />,
    icon: Maximize,
    index: 6,
  },
  {
    title: '物理的状態',
    subTitle: 'Physical State',
    component: <PhysicalStateMatrix />,
    icon: Thermometer,
    index: 7,
  },

  {
    title: '光・天気',
    subTitle: 'Light & Weather',
    component: <LightWeatherMatrix />,
    icon: Sun,
    index: 8,
  },
  {
    title: '色',
    subTitle: 'Colors',
    component: <ColorAdjectivesMatrix />,
    icon: Palette,
    index: 9,
  },
  {
    title: '音',
    subTitle: 'Sound',
    component: <SoundMatrix />,
    icon: Volume2,
    index: 10,
  },
];
const ADJECTIVE_SECTIONS_3: SectionConfig[] = [
  {
    title: '地理・国籍',
    subTitle: 'Geography & Nationality',
    component: <GeographyNationalityMatrix />,
    icon: Globe,
    index: 11,
  },
  {
    title: '位置・方向',
    subTitle: 'Location & Direction',
    component: <LocationDirectionMatrix />,
    icon: MapPin,
    index: 12,
  },
  {
    title: '時間・順序',
    subTitle: 'Time & Order',
    component: <TimeOrderMatrix />,
    icon: Clock,
    index: 13,
  },
  {
    title: '速度・頻度',
    subTitle: 'Speed & Frequency',
    component: <SpeedFrequencyMatrix />,
    icon: Gauge,
    index: 14,
  },
  {
    title: '総合評価',
    subTitle: 'General Evaluation',
    component: <GeneralEvaluationMatrix />,
    icon: CheckCircle,
    index: 15,
  },
];

const ADJECTIVE_SECTIONS_4: SectionConfig[] = [
  {
    title: '価値・価格',
    subTitle: 'Value & Price',
    component: <ValuePriceMatrix />,
    icon: DollarSign,
    index: 16,
  },
  {
    title: '重要性・有用性',
    subTitle: 'Importance & Usefulness',
    component: <ImportanceUsefulnessMatrix />,
    icon: Star,
    index: 17,
  },
  {
    title: '正確性・真実',
    subTitle: 'Correctness & Truth',
    component: <CorrectnessTruthMatrix />,
    icon: Target,
    index: 18,
  },
  {
    title: '難易度・可能性',
    subTitle: 'Difficulty & Possibility',
    component: <DifficultyPossibilityMatrix />,
    icon: AlertCircle,
    index: 19,
  },
  {
    title: '量・程度',
    subTitle: 'Quantity & Degree',
    component: <QuantityDegreeMatrix />,
    icon: BarChart,
    index: 20,
  },
  {
    title: '独特性・類似性',
    subTitle: 'Uniqueness & Similarity',
    component: <UniquenessSimilarityMatrix />,
    icon: Fingerprint,
    index: 21,
  },
  {
    title: '社会・文化分野',
    subTitle: 'Social & Cultural Fields',
    component: <SocialCulturalFieldsMatrix />,
    icon: Users,
    index: 22,
  },
];

/**
 * A1サイズ（841mm × 594mm）の英語学習ポスター
 * 8つのA4領域に分割されたレイアウト
 */

// A4ポスターのデータをエクスポート（印刷ページで使用）
export const A1Poster1CellData: CellData[] = [
  {
    title: '形容詞',
    pages: '1/4',
    sections: ADJECTIVE_SECTIONS_1,
  },
  {
    title: '形容詞',
    pages: '2/4',
    sections: ADJECTIVE_SECTIONS_2,
  },
  {
    title: '形容詞',
    pages: '3/4',
    sections: ADJECTIVE_SECTIONS_3,
  },
  {
    title: '形容詞',
    pages: '4/4',
    sections: ADJECTIVE_SECTIONS_4,
  },
  {
    title: '副詞',
    pages: '1/2',
    sections: ADVERB_SECTIONS_1,
  },
  {
    title: '副詞',
    pages: '2/2',
    sections: ADVERB_SECTIONS_2,
  },
  {
    title: '比較級・最上級',
    sections: SECTIONS,
  },
  {
    title: '冠詞・疑問詞・接続詞・感嘆詞',
    sections: [
      ...ARTICLE_SECTIONS,
      ...INTERROGATIVE_SECTIONS,
      ...CONJUNCTION_SECTIONS,
      ...INTERJECTION_SECTIONS,
    ],
  },
];

interface AdjectiveAndAdverbPosterProps {
  theme?: Theme;
}

export const AdjectiveAndAdverbPoster: React.FC<AdjectiveAndAdverbPosterProps> = ({
  theme = 'purple',
}) => {
  // 各A4セルに表示するコンテンツと題名を定義
  const cellData: CellData[] = A1Poster1CellData;

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
