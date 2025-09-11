import { LucideIcon } from 'lucide-react';

/**
 * 英語と日本語の単語/フレーズのペア
 */
export interface WordPair {
  english: string;
  japanese: string;
  linkNo?: number[];
}

/**
 * 英語と日本語の単語/フレーズのペアの配列
 */
export type WordPairArray = WordPair[];

export interface IrregularVerb {
  /** 原形 */
  infinitive: string;
  /** 過去形 */
  past: string;
  /** 過去分詞形 */
  pastParticiple: string;
  /** ...ing形 */
  ing: string;
  /** 意味 */
  meaning: string;
}

export interface SectionConfig {
  title?: string;
  subTitle?: string;
  component: React.ReactElement;
  icon?: LucideIcon;
  index?: number;
}

export interface CellData {
  title: string;
  pages?: string;
  sections: SectionConfig[];
}

export type Theme = 'pink' | 'green' | 'blue' | 'purple';
