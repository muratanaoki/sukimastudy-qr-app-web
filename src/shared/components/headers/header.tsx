import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './header.module.css';
import { SectionKey } from './utils/enum';
import type { NavSection } from './utils/type';
import { NAV_SECTIONS } from './utils/const';
import { SectionList } from './components/SectionList';
import { HamburgerButton } from './components/HamburgerButton';
import logoPng from '../../images/logo.png';
import { useHeaderHeightVar } from '../../hooks/useHeaderHeightVar';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useEscapeToClose } from '../../hooks/useEscapeToClose';
import { useNoScrollClass } from '../../hooks/useNoScrollClass';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
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

  // ルート変更でクローズ
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // 外側クリックでクローズ
  useOnClickOutside(wrapperRef, open, () => setOpen(false));

  // ナビ開時は body スクロールを止める
  useNoScrollClass(open);

  // ヘッダー高さを CSS 変数へ
  useHeaderHeightVar(headerRef);

  // Esc でクローズ + フォーカス返却
  useEscapeToClose(hamburgerRef, open, () => setOpen(false));

  const handleToggleOpen = useCallback(() => setOpen((v) => !v), []);

  return (
    <div ref={wrapperRef}>
      <header ref={headerRef} className={styles.header}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src={logoPng} alt="Sukima Study ロゴ" className={styles.logoImage} />
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
