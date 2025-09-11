import React from 'react';
import styles from '@/shared/styles/styles.module.css';
import {
  Users,
  MapPin,
  Calendar,
  Navigation,
  User,
  Heart,
  Smile,
  Clock,
  BriefcaseBusiness,
  Palette,
  Crown,
  GraduationCap,
  Trophy,
  Settings,
  Globe,
  UserCheck,
  Eye,
  Stethoscope,
  Lightbulb,
  Calculator,
  ListOrdered,
  PieChart,
  BarChart3,
  Ruler,
  Snowflake,
  Sun,
  CalendarDays,
  Timer,
  PartyPopper,
  Sunrise,
  Hourglass,
  PersonStanding,
  Sparkles,
  Flame,
  Hand,
  Footprints,
  MapIcon,
  Network,
  MousePointer,
  Zap,
  Handshake,
} from 'lucide-react';

import { FamilyAndRelativesMatrix } from '../partsOfSpeech/nouns/FamilyAndRelativesMatrix';
import { RomanceAndMarriageMatrix } from '../partsOfSpeech/nouns/RomanceAndMarriageMatrix';
import { BasicIndividualsMatrix } from '../partsOfSpeech/nouns/GeneralPeopleMatrix';
import { TitlesAndAddressesMatrix } from '../partsOfSpeech/nouns/TitlesAndAddressesMatrix';
import { NumbersQuantityMatrix } from '../partsOfSpeech/nouns/NumbersQuantityMatrix';
import { TimeUnitsMatrix } from '../partsOfSpeech/nouns/TimeUnitsMatrix';
import { SeasonsMatrix } from '../partsOfSpeech/nouns/SeasonsMatrix';
import { MonthsMatrix } from '../partsOfSpeech/nouns/MonthsMatrix';
import { DatesMatrix } from '../partsOfSpeech/nouns/DatesMatrix';
import { DaysOfWeekMatrix } from '../partsOfSpeech/nouns/DaysOfWeekMatrix';
import { HolidaysMatrix } from '../partsOfSpeech/nouns/HolidaysMatrix';
import { PartsOfTheDayMatrix } from '../partsOfSpeech/nouns/PartsOfTheDayMatrix';
import { MeasurementUnitsMatrix } from '../partsOfSpeech/nouns/MeasurementUnitsMatrix';
import { TimeConceptsMatrix } from '../partsOfSpeech/nouns/TimeConceptsMatrix';
import { CardinalNumbersMatrix } from '../partsOfSpeech/numerals/CardinalNumbersMatrix';
import { OrdinalNumbersMatrix } from '../partsOfSpeech/numerals/OrdinalNumbersMatrix';
import { FractionsMatrix } from '../partsOfSpeech/numerals/FractionsMatrix';
import { PositionMatrix } from '../partsOfSpeech/prepositions/PositionMatrix';
import { DirectionMatrix } from '../partsOfSpeech/prepositions/DirectionMatrix';
import { TimeMatrix } from '../partsOfSpeech/prepositions/TimeMatrix';
import { MeansMatrix } from '../partsOfSpeech/prepositions/MeansMatrix';
import { LogicMatrix } from '../partsOfSpeech/prepositions/LogicMatrix';

import PronounMatrix from '../partsOfSpeech/pronouns/PronounMatrix';
import { BasicIndefinitePronouns } from '../partsOfSpeech/pronouns/BasicIndefinitePronouns';
import { DemonstrativePronounMatrix } from '../partsOfSpeech/pronouns/DemonstrativePronounMatrix';
import { SpecialIndefinitePronouns } from '../partsOfSpeech/pronouns/SpecialIndefinitePronouns';
import { CellData, SectionConfig, Theme } from '../../../../shared/types';
import { ArtsAndMediaAndPerformanceMatrix } from '../partsOfSpeech/nouns/ArtsAndMediaAndPerformanceMatrix';
import { AuthorityAndGeneralRolesMatrix } from '../partsOfSpeech/nouns/AuthorityAndGeneralRolesMatrix';
import { OccupationsAndJobsMatrix } from '../partsOfSpeech/nouns/OccupationsAndJobsMatrix';
import { SocialGroupsAndStatusMatrix } from '../partsOfSpeech/nouns/SocialGroupsAndStatusMatrix';
import { SchoolAndEducationMatrix } from '../partsOfSpeech/nouns/SchoolAndEducationMatrix';
import { SportsAndCompetitionMatrix } from '../partsOfSpeech/nouns/SportsAndCompetitionMatrix';
import { ServiceAndRolesMatrix } from '../partsOfSpeech/nouns/ServiceAndRolesMatrix';
import { BodyPartsMatrix } from '../partsOfSpeech/nouns/BodyPartsMatrix';
import { SensesAndPhysiologyMatrix } from '../partsOfSpeech/nouns/SensesAndPhysiologyMatrix';
import { HealthAndMedicalMatrix } from '../partsOfSpeech/nouns/HealthAndMedicalMatrix';
import { CoreStatesOfMindMatrix } from '../partsOfSpeech/nouns/CoreStatesOfMindMatrix';
import { EmotionsMatrix } from '../partsOfSpeech/nouns/EmotionsMatrix';
import { PersonalityAndAbilitiesMatrix } from '../partsOfSpeech/nouns/PersonalityAndAbilitiesMatrix';
import { MotivationAndDrive } from '../partsOfSpeech/nouns/DesiresAndInterestsMatrix';
import { BasicActionsMatrix } from '../partsOfSpeech/nouns/BasicActionsMatrix';
import { InterpersonalActionsMatrix } from '../partsOfSpeech/nouns/InterpersonalActionsMatrix';
import { MovementMatrix } from '../partsOfSpeech/nouns/MovementAndDirectionMatrix';
import { SpatialConceptsAndPositionAndDirectionMatrix } from '../partsOfSpeech/nouns/SpatialConceptsAndPositionAndDirectionMatrix';
import { NationalitiesAndPeoplesMatrix } from '../partsOfSpeech/nouns/NationalitiesAndPeoplesMatrix';
import { A4Cell } from '../common/A4Cell';

// 代名詞セクションの定義
const PRONOUN_SECTIONS: SectionConfig[] = [
  {
    title: '人称・所有・再帰代名詞',
    subTitle: 'Personal / Possessive / Reflexive Pronouns',
    component: <PronounMatrix />,
    icon: User,
  },

  {
    title: '不定代名詞（人・物・事）',
    subTitle: 'Indefinite Pronouns',
    component: <BasicIndefinitePronouns />,
    icon: Users,
  },
  {
    title: '不定代名詞（数量・全体・部分など）',
    subTitle: 'Indefinite Pronouns',
    component: <SpecialIndefinitePronouns />,
    icon: BarChart3,
  },
  {
    title: '指示代名詞・その他',
    subTitle: 'Demonstrative & Other Pronouns',
    component: <DemonstrativePronounMatrix />,
    icon: MousePointer,
  },
];

// 前置詞セクションの定義
const PREPOSITION_SECTIONS: SectionConfig[] = [
  {
    title: '位置',
    subTitle: 'Position',
    component: <PositionMatrix />,
    icon: MapPin,
  },
  {
    title: '方向',
    subTitle: 'Direction',
    component: <DirectionMatrix />,
    icon: Navigation,
  },
  {
    title: '時間',
    subTitle: 'Time',
    component: <TimeMatrix />,
    icon: Clock,
  },
  {
    title: '手段',
    subTitle: 'Means',
    component: <MeansMatrix />,
    icon: Hand,
  },
  {
    title: '論理',
    subTitle: 'Logic',
    component: <LogicMatrix />,
    icon: Lightbulb,
  },
];

const NOUNS_NUMERALS: SectionConfig[] = [
  {
    title: '符号・基数',
    subTitle: 'Signs & Cardinal Numbers',
    component: <CardinalNumbersMatrix />,
    icon: Calculator,
    index: 1,
  },
  {
    title: '序数',
    subTitle: 'Ordinal Numbers',
    component: <OrdinalNumbersMatrix />,
    icon: ListOrdered,
    index: 2,
  },
  {
    title: '分数',
    subTitle: 'Fractions',
    component: <FractionsMatrix />,
    icon: PieChart,
    index: 3,
  },
  {
    title: '数・量',
    subTitle: 'Numbers & Quantity',
    component: <NumbersQuantityMatrix />,
    icon: BarChart3,
    index: 4,
  },

  {
    title: '測定単位',
    subTitle: 'Measurement Units',
    component: <MeasurementUnitsMatrix />,
    icon: Ruler,
    index: 5,
  },
];

const NOUNS_DATE: SectionConfig[] = [
  {
    title: '時間の単位',
    subTitle: 'Time Units',
    component: <TimeUnitsMatrix />,
    icon: Timer,
    index: 6,
  },
  { title: '季節', subTitle: 'Seasons', component: <SeasonsMatrix />, icon: Snowflake, index: 7 },
  { title: '月', subTitle: 'Months', component: <MonthsMatrix />, icon: CalendarDays, index: 8 },
  { title: '日付', subTitle: 'Dates', component: <DatesMatrix />, icon: Calendar, index: 9 },
  {
    title: '曜日',
    subTitle: 'Days Of Week',
    component: <DaysOfWeekMatrix />,
    icon: Sun,
    index: 10,
  },
  {
    title: '祝日',
    subTitle: 'Holidays',
    component: <HolidaysMatrix />,
    icon: PartyPopper,
    index: 11,
  },
  {
    title: '一日の部分',
    subTitle: 'Parts Of The Day',
    component: <PartsOfTheDayMatrix />,
    icon: Sunrise,
    index: 12,
  },
  {
    title: '時間の概念',
    subTitle: 'Time Concepts',
    component: <TimeConceptsMatrix />,
    icon: Hourglass,
    index: 13,
  },
];

const NOUNS_FAMILY: SectionConfig[] = [
  {
    title: '家族・親戚',
    subTitle: 'Family & Relatives',
    component: <FamilyAndRelativesMatrix />,
    icon: Users,
    index: 14,
  },

  {
    title: '社会集団・立場',
    subTitle: 'Social Groups & Status',
    component: <SocialGroupsAndStatusMatrix />,
    icon: Network,
    index: 15,
  },

  {
    title: '基本的な人物',
    subTitle: 'Basic Individuals',
    component: <BasicIndividualsMatrix />,
    icon: User,
    index: 16,
  },

  {
    title: '職業・仕事',
    subTitle: 'Occupations & Jobs',
    component: <OccupationsAndJobsMatrix />,
    icon: BriefcaseBusiness,
    index: 17,
  },

  {
    title: '芸術・メディア・パフォーマンス',
    subTitle: 'Arts, Media & Performance',
    component: <ArtsAndMediaAndPerformanceMatrix />,
    icon: Palette,
    index: 19,
  },
];

const NOUNS_POSITION: SectionConfig[] = [
  {
    title: '権威・公的な役割',
    subTitle: 'Authority & Formal Roles',
    component: <AuthorityAndGeneralRolesMatrix />,
    icon: Crown,
    index: 19,
  },

  {
    title: '学校・教育',
    subTitle: 'School & Education',
    component: <SchoolAndEducationMatrix />,
    icon: GraduationCap,
    index: 20,
  },

  {
    title: 'スポーツ・競技',
    subTitle: 'Sports & Competition',
    component: <SportsAndCompetitionMatrix />,
    icon: Trophy,
    index: 21,
  },

  {
    title: 'サービス・役割',
    subTitle: 'Service Roles',
    component: <ServiceAndRolesMatrix />,
    icon: Settings,
    index: 22,
  },

  {
    title: '恋愛・結婚',
    subTitle: 'Romance & Marriage',
    component: <RomanceAndMarriageMatrix />,
    icon: Heart,
    index: 23,
  },

  {
    title: '敬称・呼び方',
    subTitle: 'Titles & Addresses',
    component: <TitlesAndAddressesMatrix />,
    icon: UserCheck,
    index: 24,
  },

  {
    title: '民族・言語',
    subTitle: 'Peoples & Language',
    component: <NationalitiesAndPeoplesMatrix />,
    icon: Globe,
    index: 25,
  },
];

const NOUNS_SECTIONS_7: SectionConfig[] = [
  {
    title: '身体部位',
    subTitle: 'Body Parts',
    component: <BodyPartsMatrix />,
    icon: PersonStanding,
    index: 26,
  },
  {
    title: '感覚・生理',
    subTitle: 'Senses & Physiology',
    component: <SensesAndPhysiologyMatrix />,
    icon: Eye,
    index: 27,
  },
  {
    title: '健康・医療',
    subTitle: 'Health & Medical',
    component: <HealthAndMedicalMatrix />,
    icon: Stethoscope,
    index: 28,
  },
  {
    title: '心・認知',
    subTitle: 'Mind & Cognition',
    component: <CoreStatesOfMindMatrix />,
    icon: Zap,
    index: 29,
  },
  { title: '感情', subTitle: 'Emotions', component: <EmotionsMatrix />, icon: Smile, index: 30 },
];

const NOUNS_SECTIONS_8: SectionConfig[] = [
  {
    title: '能力・資質',
    subTitle: 'Ability & Qualities',
    component: <PersonalityAndAbilitiesMatrix />,
    icon: Sparkles,
    index: 31,
  },
  {
    title: '動機・欲動',
    subTitle: 'Motivation & Drive',
    component: <MotivationAndDrive />,
    icon: Flame,
    index: 32,
  },
  {
    title: '基本動作',
    subTitle: 'Basic Actions',
    component: <BasicActionsMatrix />,
    icon: Hand,
    index: 33,
  },

  {
    title: '対人関係・行動',
    subTitle: 'Interpersonal Relationships & Actions',
    component: <InterpersonalActionsMatrix />,
    icon: Handshake,
    index: 34,
  },
  {
    title: '移動',
    subTitle: 'Movement',
    component: <MovementMatrix />,
    icon: Footprints,
    index: 35,
  },
  {
    title: '空間概念・位置',
    subTitle: 'Spatial Concepts & Position',
    component: <SpatialConceptsAndPositionAndDirectionMatrix />,
    icon: MapIcon,
    index: 36,
  },
];

// 各A4セルに表示するコンテンツ・題名を定義
export const pronounANdPrepositionAndNounsCellData: CellData[] = [
  {
    title: '代名詞',
    sections: PRONOUN_SECTIONS,
  },
  {
    title: '前置詞',
    sections: PREPOSITION_SECTIONS,
  },
  {
    title: '名詞',
    sections: NOUNS_NUMERALS,
    pages: '1/14',
  },

  {
    title: '名詞',
    sections: NOUNS_DATE,
    pages: '2/14',
  },
  {
    title: '名詞',
    sections: NOUNS_FAMILY,
    pages: '3/14',
  },
  {
    title: '名詞',
    sections: NOUNS_POSITION,
    pages: '4/14',
  },
  {
    title: '名詞',
    sections: NOUNS_SECTIONS_7,
    pages: '5/14',
  },
  {
    title: '名詞',
    sections: NOUNS_SECTIONS_8,
    pages: '6/14',
  },
];

/**
 * A1サイズ（841mm × 594mm）の英語学習ポスター
 * 8つのA4領域に分割されたレイアウト
 */
interface MixPosterProps {
  theme?: Theme;
}

export const MixPoster: React.FC<MixPosterProps> = ({ theme = 'blue' }) => {
  // テーマクラス名を生成
  const themeClassName = `theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`;

  return (
    <div className={`${styles.a1Poster} ${styles[themeClassName]}`}>
      <div className={styles.a1GridContainer}>
        {pronounANdPrepositionAndNounsCellData.map((cell, index) => (
          <A4Cell key={index} cell={cell} index={index} />
        ))}
      </div>
    </div>
  );
};
