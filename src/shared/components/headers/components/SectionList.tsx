import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from '../header.module.css';
import type { NavSection } from '../utils/type';
import { SectionKey } from '../utils/enum';

const formatNo = (idx: number) => `${String(idx + 1).padStart(2, '0')}.`;

export type SectionListProps = {
  sections: NavSection[];
  sectionsOpen: Record<SectionKey, boolean>;
  onToggleSection: (key: SectionKey) => void;
};

export const SectionList = memo(function SectionList({
  sections,
  sectionsOpen,
  onToggleSection,
}: SectionListProps) {
  return (
    <ul className={styles.navList}>
      {sections.map((section) => (
        <li className={styles.navSection} key={section.key}>
          <button
            type="button"
            className={styles.sectionButton}
            aria-expanded={sectionsOpen[section.key]}
            aria-controls={`nav-${section.key}`}
            onClick={() => onToggleSection(section.key)}
          >
            {section.title}
            <span
              className={styles.plusMinus}
              aria-hidden="true"
              data-open={sectionsOpen[section.key]}
            />
          </button>
          {sectionsOpen[section.key] && section.items.length > 0 && (
            <ul id={`nav-${section.key}`} className={styles.subList}>
              {section.items.map((item, idx) => (
                <li className={styles.subListItem} key={item.label}>
                  <Link className={styles.subLink} to={item.to}>
                    <div className={styles.subListItemLeftBox}>
                      <span className={styles.subListItemNo}>{formatNo(idx)}</span>
                      <span className={styles.subListItemText}>{item.label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
});
