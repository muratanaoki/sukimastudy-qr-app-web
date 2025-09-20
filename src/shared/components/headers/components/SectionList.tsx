import { memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../header.module.css';
import type { PosGroup } from '@/pages/pronouns-test-page/utils/type';

const formatNo = (idx: number) => `${String(idx + 1).padStart(2, '0')}.`;

export type SectionListProps = { posGroups: PosGroup[] };

export const SectionList = memo(function SectionList({ posGroups }: SectionListProps) {
  // 各品詞（pos）ごとの開閉状態（初期は閉＝プラス表示）
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const pg of posGroups) init[pg.pos] = false;
    return init;
  });

  // posGroups が変わった場合に未登録キーを初期化
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

  const togglePos = useCallback((posKey: string) => {
    setOpenMap((m) => ({ ...m, [posKey]: !m[posKey] }));
  }, []);

  return (
    <ul className={styles.navList}>
      {posGroups.map((pos) => (
        <li className={styles.navSection} key={pos.pos}>
          <button
            type="button"
            className={styles.sectionButton}
            aria-expanded={!!openMap[pos.pos]}
            aria-controls={`nav-pos-${pos.pos}`}
            onClick={() => togglePos(pos.pos)}
          >
            <span>{pos.title}</span>
            <span className={styles.plusMinus} aria-hidden="true" data-open={!!openMap[pos.pos]} />
          </button>
          {openMap[pos.pos] && (
            <ul className={styles.subList} id={`nav-pos-${pos.pos}`}>
              {pos.groups.map((g, idx) => (
                <li className={styles.subListItem} key={`${pos.pos}-${g.groupNo}`}>
                  <Link className={styles.subLink} to={g.url}>
                    <div className={styles.subListItemLeftBox}>
                      <span className={styles.subListItemNo}>{formatNo(idx)}</span>
                      <span className={styles.subListItemText}>{g.title}</span>
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
