import styles from '../learningEnglishPage.module.css';
import type { PronounGroup } from '../utils/type';
import { useCallback } from 'react';
import { Key } from '@/shared/utils/enum';

export type GroupTabsProps = {
  items: PronounGroup[];
  activeGroupNo: number;
  onChange: (groupNo: number) => void;
  ariaLabel?: string;
};

export function GroupTabs({
  items,
  activeGroupNo,
  onChange,
  ariaLabel = 'グループ',
}: GroupTabsProps) {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== Key.ArrowLeft && e.key !== Key.ArrowRight) return;
      e.preventDefault();
      if (!items || items.length === 0) return;
      const idx = items.findIndex((g) => g.groupNo === activeGroupNo);
      const nextIdx =
        e.key === Key.ArrowRight
          ? (idx + 1) % items.length
          : (idx - 1 + items.length) % items.length;
      const next = items[nextIdx];
      onChange(next.groupNo);
      const nextTab = document.getElementById(`tab-${next.groupNo}`);
      if (nextTab) (nextTab as HTMLButtonElement).focus();
    },
    [items, activeGroupNo, onChange]
  );

  return (
    <div
      className={styles.tabBar}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      {items.map(({ groupNo, icon: IconComp, abbr }) => {
        const isActive = groupNo === activeGroupNo;
        return (
          <button
            key={groupNo}
            id={`tab-${groupNo}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${groupNo}`}
            tabIndex={isActive ? 0 : -1}
            className={isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => onChange(groupNo)}
            type="button"
          >
            <IconComp className={styles.tabIcon} aria-hidden="true" />
            <span className={styles.tabAbbr}>{abbr}</span>
          </button>
        );
      })}
    </div>
  );
}
