import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styles from './header.module.css';

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [open]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <header className={styles.header}>
        <div className={styles.left}>
          {/* ロゴ（未実装のため空） */}
          <div className={styles.logo} aria-label="logo" />
        </div>
        <div className={styles.right}>
          <button
            type="button"
            className={styles.hamburger}
            aria-label="メインメニュー"
            aria-expanded={open}
            aria-controls="global-nav"
            data-open={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </header>

      <nav
        id="global-nav"
        className={`${styles.nav} ${open ? styles.open : ''}`}
        aria-hidden={!open}
      >
        <ul className={styles.navList}>
          <li>
            <Link className={styles.navLink} to="/pronouns-test-page">
              代名詞テスト
            </Link>
          </li>
          {/* ルートが増えたら以下に追記 */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
