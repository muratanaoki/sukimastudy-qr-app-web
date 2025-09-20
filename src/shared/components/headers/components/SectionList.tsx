import { memo } from 'react';
import styles from '../header.module.css';
import type { PosGroup } from '@/pages/pronouns-test-page/utils/type';
import { usePosOpenMap } from '../hooks/usePosOpenMap';
import { PosHeaderButton } from './internal/PosHeaderButton';
import { GroupList } from './internal/GroupList';

export type SectionListProps = { posGroups: PosGroup[] };

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
