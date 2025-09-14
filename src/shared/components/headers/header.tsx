import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './header.module.css';

// ナビ定義（ジャンル > 項目）
const NAV_SECTIONS = [
  {
    key: 'pronouns',
    title: '代名詞',
    items: [
      { no: '01.', label: '人称・所有・再帰代名詞', to: '' },
      { no: '02.', label: '不定代名詞（人・物・事）', to: '' },
      { no: '03.', label: '不定代名詞（数量・全体・部分など）', to: '' },
      { no: '04.', label: '指示代名詞・その他', to: '' },
    ],
  },
  { key: 'prepositions', title: '前置詞', items: [] },
  { key: 'nouns', title: '名詞', items: [] },
] as const;

type SectionKey = (typeof NAV_SECTIONS)[number]['key'];

const Header = () => {
  const [open, setOpen] = useState(false);
  // アコーディオン（ジャンル）開閉状態（定義から初期化）
  const initialOpen = useMemo(
    () =>
      NAV_SECTIONS.reduce(
        (acc, s) => {
          acc[s.key] = s.key === 'pronouns';
          return acc;
        },
        {} as Record<SectionKey, boolean>
      ),
    []
  );
  const [sectionsOpen, setSectionsOpen] = useState<Record<SectionKey, boolean>>(initialOpen);
  const toggleSection = (key: SectionKey) => setSectionsOpen((s) => ({ ...s, [key]: !s[key] }));
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
          {NAV_SECTIONS.map((section) => (
            <li className={styles.navSection} key={section.key}>
              <button
                type="button"
                className={styles.sectionButton}
                aria-expanded={sectionsOpen[section.key]}
                aria-controls={`nav-${section.key}`}
                onClick={() => toggleSection(section.key)}
              >
                {section.title}
              </button>
              {sectionsOpen[section.key] && section.items.length > 0 && (
                <ul id={`nav-${section.key}`} className={styles.subList}>
                  {section.items.map((item) => (
                    <li className={styles.subListItem} key={item.no}>
                      <Link className={styles.subLink} to={item.to}>
                        <div className={styles.subListItemBox}>
                          <span className={styles.subListItemNo}>{item.no}</span>
                          <span className={styles.subListItemText}>{item.label}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          {/* ルートが増えたら以下に追記 */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
