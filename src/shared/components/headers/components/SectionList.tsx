import { memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../header.module.css';
import type { PosGroup } from '@/pages/pronouns-test-page/utils/type';

const formatNo = (idx: number) => `${String(idx + 1).padStart(2, '0')}.`;

export type SectionListProps = { posGroups: PosGroup[] };

// 開閉マップの初期値を作る（全て閉）
const createClosedMap = (posGroups: PosGroup[]): Record<string, boolean> => {
  const init: Record<string, boolean> = {};
  for (const pg of posGroups) init[pg.pos] = false;
  return init;
};

// 品詞ごとの開閉状態を管理する小さなフック
const usePosOpenMap = (posGroups: PosGroup[]) => {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => createClosedMap(posGroups));

  // posGroups が変わったとき、未知キーのみ初期化して既存状態は保持
  useEffect(() => {
    setOpenMap((m) => {
      const next = { ...m };
      let changed = false;
      for (const pg of posGroups) {
        if (!(pg.pos in next)) {
          next[pg.pos] = false;
          changed = true;
        }
      }
      return changed ? next : m;
    });
  }, [posGroups]);

  const toggle = useCallback((posKey: string) => {
    setOpenMap((m) => ({ ...m, [posKey]: !m[posKey] }));
  }, []);

  const isOpen = useCallback((posKey: string) => !!openMap[posKey], [openMap]);

  return { openMap, isOpen, toggle } as const;
};

type PosHeaderButtonProps = {
  title: string;
  open: boolean;
  controlsId: string;
  onClick: () => void;
};

const PosHeaderButton = ({ title, open, controlsId, onClick }: PosHeaderButtonProps) => (
  <button
    type="button"
    className={styles.sectionButton}
    aria-expanded={open}
    aria-controls={controlsId}
    onClick={onClick}
  >
    <span>{title}</span>
    <span className={styles.plusMinus} aria-hidden="true" data-open={open} />
  </button>
);

const GroupList = ({ posKey, groups }: { posKey: string; groups: PosGroup['groups'] }) => (
  <ul className={styles.subList} id={`nav-pos-${posKey}`}>
    {groups.map((g, idx) => (
      <li className={styles.subListItem} key={`${posKey}-${g.groupNo}`}>
        <Link className={styles.subLink} to={g.url}>
          <div className={styles.subListItemLeftBox}>
            <span className={styles.subListItemNo}>{formatNo(idx)}</span>
            <span className={styles.subListItemText}>{g.title}</span>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);

export const SectionList = memo(function SectionList({ posGroups }: SectionListProps) {
  const { isOpen, toggle } = usePosOpenMap(posGroups);

  return (
    <ul className={styles.navList}>
      {posGroups.map((pos) => {
        const open = isOpen(pos.pos);
        const controlsId = `nav-pos-${pos.pos}`;
        return (
          <li className={styles.navSection} key={pos.pos}>
            <PosHeaderButton
              title={pos.title}
              open={open}
              controlsId={controlsId}
              onClick={() => toggle(pos.pos)}
            />
            {open && <GroupList posKey={pos.pos} groups={pos.groups} />}
          </li>
        );
      })}
    </ul>
  );
});
