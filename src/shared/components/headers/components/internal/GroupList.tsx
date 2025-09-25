import { Link } from 'react-router-dom';
import styles from './groupList.module.css';
import type { PosGroup } from '@/pages/pronouns-test-page/utils/type';

const formatNo = (idx: number) => `${String(idx + 1).padStart(2, '0')}.`;

export const GroupList = ({ posKey, groups, onLinkClick }: { posKey: string; groups: PosGroup['groups']; onLinkClick: () => void }) => (
  <ul className={styles.subList} id={`nav-pos-${posKey}`}>
    {groups.map((g, idx) => (
      <li className={styles.subListItem} key={`${posKey}-${g.groupNo}`}>
        <Link className={styles.subLink} to={g.url} onClick={onLinkClick}>
          <div className={styles.subListItemLeftBox}>
            <span className={styles.subListItemNo}>{formatNo(idx)}</span>
            <span className={styles.subListItemText}>{g.title}</span>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);
