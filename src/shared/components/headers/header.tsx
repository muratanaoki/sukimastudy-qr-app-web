import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './header.module.css';
import { SectionKey } from './utils/enum';
import type { NavSection } from './utils/type';
import { NAV_SECTIONS } from './utils/const';
import { SectionList } from './components/SectionList';
import { HamburgerButton } from './components/HamburgerButton';

const Header = () => {
  const [open, setOpen] = useState(false);
  // アコーディオン（ジャンル）開閉状態（定義から初期化）
  const initialOpen = useMemo(
    () =>
      NAV_SECTIONS.reduce(
        (acc: Record<SectionKey, boolean>, s: NavSection) => {
          acc[s.key] = s.key === SectionKey.Pronouns;
          return acc;
        },
        {} as Record<SectionKey, boolean>
      ),
    []
  );
  const [sectionsOpen, setSectionsOpen] = useState<Record<SectionKey, boolean>>(initialOpen);
  const toggleSection = useCallback(
    (key: SectionKey) => setSectionsOpen((s) => ({ ...s, [key]: !s[key] })),
    []
  );
  const location = useLocation();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

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

  // Esc キーでクローズ & フォーカス返却
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        // 次のフレームでフォーカス返却（クローズ後に安全に）
        requestAnimationFrame(() => {
          hamburgerRef.current?.focus();
        });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const handleToggleOpen = useCallback(() => setOpen((v) => !v), []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <header className={styles.header}>
        <div className={styles.left}>
          {/* ロゴ（リンク無し） */}
          <div className={styles.logo} role="img" aria-label="Sukima Study ロゴ">
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 19"
              shapeRendering="geometricPrecision"
              aria-hidden="true"
              focusable="false"
            >
              {/* 3本バー（下揃え）: 幅3 / 角丸1.5 / 高さ 5,10,16 */}
              <rect x="0" y="13.5" width="3" height="5" rx="1.5" fill="#90caf9" />
              <rect x="6" y="8.5" width="3" height="10" rx="1.5" fill="#42a5f5" />
              <rect x="12" y="2.5" width="3" height="16" rx="1.5" fill="#1976d2" />
            </svg>
            <span className={styles.wordmark} aria-hidden="true">
              <span className={styles.brandPrimary}>Sukima</span>
              <span className={styles.brandSecondary}>Study</span>
            </span>
          </div>
        </div>
        <div className={styles.right}>
          <HamburgerButton ref={hamburgerRef} open={open} onToggle={handleToggleOpen} />
        </div>
      </header>

      <nav
        id="global-nav"
        className={`${styles.nav} ${open ? styles.open : ''}`}
        aria-hidden={!open}
      >
        <SectionList
          sections={NAV_SECTIONS}
          sectionsOpen={sectionsOpen}
          onToggleSection={toggleSection}
        />
      </nav>
    </div>
  );
};

export default Header;
