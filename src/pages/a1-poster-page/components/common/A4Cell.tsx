import React from 'react';
import styles from '@/shared/styles/styles.module.css';
import { CellData, SectionConfig } from '../../../../shared/types';
import { PosterSection } from './PosterSection';

interface A4CellProps {
  cell: CellData;
  index: number;
}

export const A4Cell: React.FC<A4CellProps> = ({ cell, index }) => {
  /**
   * セクションをレンダリングするヘルパー関数
   */
  const renderSection = (section: SectionConfig, sectionIndex: number) => (
    <PosterSection
      key={section.title}
      title={section.title}
      subTitle={section.subTitle}
      icon={section.icon}
      index={section.index ?? sectionIndex + 1}
    >
      {section.component}
    </PosterSection>
  );

  return (
    <div key={index} className={styles.a4Cell}>
      {/* 4隅の装飾 */}
      {/* <div className={`${styles.corner} ${styles.topLeft}`} />
      <div className={`${styles.corner} ${styles.topRight}`} />
      <div className={`${styles.corner} ${styles.bottomLeft}`} />
      <div className={`${styles.corner} ${styles.bottomRight}`} /> */}
      <h2 className={styles.a1TitleBox}>
        <span className={styles.a1TitleFont}>{cell.title}</span>
        <span className={styles.a1PagesFont}>{cell.pages}</span>
      </h2>
      {cell.sections.map(renderSection)}
      <div className={styles.footer}>
        <span className={styles.footerText}>© Sukima Study</span>
      </div>
    </div>
  );
};
