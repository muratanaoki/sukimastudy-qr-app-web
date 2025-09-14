import { Link, useLocation } from 'react-router-dom';
import { memo, useCallback, useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import styles from './header.module.css';

// 型定義
export enum SectionKey {
  Pronouns = 'pronouns',
  Prepositions = 'prepositions',
  Nouns = 'nouns',
}

type NavItem = {
  label: string;
  to: string;
};

type NavSection = {
  key: SectionKey;
  title: string;
  items: NavItem[];
};

// ナビ定義（ジャンル > 項目）
const NAV_SECTIONS: NavSection[] = [
  {
    key: SectionKey.Pronouns,
    title: '代名詞',
    items: [
      { label: '人称・所有・再帰代名詞', to: '' },
      { label: '不定代名詞（人・物・事）', to: '' },
      { label: '不定代名詞（数量・全体・部分など）', to: '' },
      { label: '指示代名詞・その他', to: '' },
    ],
  },
  {
    key: SectionKey.Prepositions,
    title: '前置詞',
    items: [
      { label: '位置', to: '' },
      { label: '方向', to: '' },
      { label: '時間', to: '' },
      { label: '手段', to: '' },
      { label: '論理', to: '' },
    ],
  },
  {
    key: SectionKey.Nouns,
    title: '名詞',
    items: [
      { label: '符号・基数', to: '' },
      { label: '序数', to: '' },
      { label: '分数', to: '' },
      { label: '数・量', to: '' },
      { label: '測定単位', to: '' },
      { label: '時間の単位', to: '' },
      { label: '季節', to: '' },
      { label: '月', to: '' },
      { label: '日付', to: '' },
      { label: '曜日', to: '' },
      { label: '祝日', to: '' },
      { label: '一日の部分', to: '' },
      { label: '時間の概念', to: '' },
      { label: '家族・親戚', to: '' },
      { label: '社会集団・立場', to: '' },
      { label: '基本的な人物', to: '' },
      { label: '職業・仕事', to: '' },
      { label: '芸術・メディア・パフォーマンス', to: '' },
      { label: '権威・公的な役割', to: '' },
      { label: '学校・教育', to: '' },
      { label: 'スポーツ・競技', to: '' },
      { label: 'サービス・役割', to: '' },
      { label: '恋愛・結婚', to: '' },
      { label: '敬称・呼び方', to: '' },
      { label: '民族・言語', to: '' },
      { label: '身体部位', to: '' },
      { label: '感覚・生理', to: '' },
      { label: '健康・医療', to: '' },
      { label: '心・認知', to: '' },
      { label: '感情', to: '' },
      { label: '能力・資質', to: '' },
      { label: '動機・欲動', to: '' },
      { label: '基本動作', to: '' },
      { label: '対人関係・行動', to: '' },
      { label: '移動', to: '' },
      { label: '空間概念・位置', to: '' },
      { label: '日常生活・家事', to: '' },
      { label: '日用品・道具', to: '' },
      { label: '食事・料理', to: '' },
      { label: '建物・住居', to: '' },
      { label: '衣類・ファッション', to: '' },
      { label: '趣味・余暇', to: '' },
      { label: 'メディア・コンテンツ', to: '' },
      { label: 'スポーツ', to: '' },
      { label: '天体・宇宙', to: '' },
      { label: '国', to: '' },
      { label: '地理・地形', to: '' },
      { label: '環境・天気', to: '' },
      { label: '植物', to: '' },
      { label: '動物', to: '' },
      { label: 'IT・機械・技術', to: '' },
      { label: '科学・現象', to: '' },
      { label: '状態・元素', to: '' },
      { label: '物質・材料', to: '' },
      { label: '形状・構造', to: '' },
      { label: '社会・文化', to: '' },
      { label: '宗教', to: '' },
      { label: '経済・金融', to: '' },
      { label: '情報・伝達', to: '' },
      { label: '学校・学習', to: '' },
      { label: '属性・基準', to: '' },
      { label: '思考・論理', to: '' },
      { label: '状況・文脈', to: '' },
      { label: '方法・過程', to: '' },
      { label: '種類・比較', to: '' },
      { label: '目標・挑戦', to: '' },
      { label: '問題・課題', to: '' },
      { label: '解決・成果', to: '' },
    ],
  },
];

// 番号フォーマッタ: 01. / 02. ...
const formatNo = (idx: number) => `${String(idx + 1).padStart(2, '0')}.`;

// --- 内部コンポーネント（同一ファイル内） ---

type HamburgerButtonProps = {
  open: boolean;
  onToggle: () => void;
};

const HamburgerButton = memo(
  forwardRef<HTMLButtonElement, HamburgerButtonProps>(function HamburgerButton(
    { open, onToggle },
    ref
  ) {
    return (
      <button
        type="button"
        className={styles.hamburger}
        aria-label="メインメニュー"
        aria-expanded={open}
        aria-controls="global-nav"
        data-open={open}
        onClick={onToggle}
        ref={ref}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>
    );
  })
);

type SectionListProps = {
  sections: NavSection[];
  sectionsOpen: Record<SectionKey, boolean>;
  onToggleSection: (key: SectionKey) => void;
};

const SectionList = memo(function SectionList({
  sections,
  sectionsOpen,
  onToggleSection,
}: SectionListProps) {
  return (
    <ul className={styles.navList}>
      {sections.map((section) => (
        <li className={styles.navSection} key={section.key}>
          <button
            type="button"
            className={styles.sectionButton}
            aria-expanded={sectionsOpen[section.key]}
            aria-controls={`nav-${section.key}`}
            onClick={() => onToggleSection(section.key)}
          >
            {section.title}
          </button>
          {sectionsOpen[section.key] && section.items.length > 0 && (
            <ul id={`nav-${section.key}`} className={styles.subList}>
              {section.items.map((item, idx) => (
                <li className={styles.subListItem} key={item.label}>
                  <Link className={styles.subLink} to={item.to}>
                    <div className={styles.subListItemLeftBox}>
                      <span className={styles.subListItemNo}>{formatNo(idx)}</span>
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
  );
});

const Header = () => {
  const [open, setOpen] = useState(false);
  // アコーディオン（ジャンル）開閉状態（定義から初期化）
  const initialOpen = useMemo(
    () =>
      NAV_SECTIONS.reduce(
        (acc, s) => {
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
          {/* ロゴ（未実装のため空） */}
          <div className={styles.logo} aria-label="logo" />
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
