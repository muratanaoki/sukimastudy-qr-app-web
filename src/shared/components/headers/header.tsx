import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styles from './header.module.css';

const Header = () => {
  const [open, setOpen] = useState(false);
  // アコーディオン（ジャンル）開閉状態
  const [sectionsOpen, setSectionsOpen] = useState({
    pronouns: true,
    prepositions: false,
    nouns: false,
  });
  const toggleSection = (key: keyof typeof sectionsOpen) =>
    setSectionsOpen((s) => ({ ...s, [key]: !s[key] }));
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

  // Lock page scroll when nav is open
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.classList.add('no-scroll');
    } else {
      root.classList.remove('no-scroll');
    }
    return () => root.classList.remove('no-scroll');
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
          {/* 代名詞セクション */}
          <li className={styles.navSection}>
            <button
              type="button"
              className={styles.sectionButton}
              aria-expanded={sectionsOpen.pronouns}
              aria-controls="nav-pronouns"
              onClick={() => toggleSection('pronouns')}
            >
              代名詞
            </button>
            {sectionsOpen.pronouns && (
              <ul id="nav-pronouns" className={styles.subList}>
                <li className={styles.subListItem}>
                  <Link className={styles.subLink} to="">
                    <div className={styles.subListItemBox}>
                      <span className={styles.subListItemNo}>01.</span>
                      <span className={styles.subListItemText}>人称・所有・再帰代名詞</span>
                    </div>
                  </Link>
                </li>
                <li className={styles.subListItem}>
                  <Link className={styles.subLink} to="">
                    <div className={styles.subListItemBox}>
                      <span className={styles.subListItemNo}>02.</span>
                      <span className={styles.subListItemText}> 不定代名詞（人・物・事）</span>
                    </div>
                  </Link>
                </li>
                <li className={styles.subListItem}>
                  <Link className={styles.subLink} to="">
                    <div className={styles.subListItemBox}>
                      <span className={styles.subListItemNo}>03.</span>
                      <span className={styles.subListItemText}>
                        不定代名詞（数量・全体・部分など）
                      </span>
                    </div>
                  </Link>
                </li>
                <li className={styles.subListItem}>
                  <Link className={styles.subLink} to="">
                    <div className={styles.subListItemBox}>
                      <span className={styles.subListItemNo}>04.</span>
                      <span className={styles.subListItemText}> 指示代名詞・その他</span>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* 前置詞セクション（項目は後日） */}
          <li className={styles.navSection}>
            <button
              type="button"
              className={styles.sectionButton}
              aria-expanded={sectionsOpen.prepositions}
              onClick={() => toggleSection('prepositions')}
            >
              前置詞
            </button>
            {sectionsOpen.prepositions && (
              <ul className={styles.subList}>{/* TODO: 項目が決まり次第ここへ追加 */}</ul>
            )}
          </li>

          {/* 名詞セクション（項目は後日） */}
          <li className={styles.navSection}>
            <button
              type="button"
              className={styles.sectionButton}
              aria-expanded={sectionsOpen.nouns}
              onClick={() => toggleSection('nouns')}
            >
              名詞
            </button>
            {sectionsOpen.nouns && (
              <ul className={styles.subList}>{/* TODO: 項目が決まり次第ここへ追加 */}</ul>
            )}
          </li>
          {/* ルートが増えたら以下に追記 */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
