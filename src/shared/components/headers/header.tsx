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
  {
    key: 'prepositions',
    title: '前置詞',
    items: [
      { no: '01.', label: '位置', to: '' },
      { no: '02.', label: '方向', to: '' },
      { no: '03.', label: '時間', to: '' },
      { no: '04.', label: '手段', to: '' },
      { no: '05.', label: '論理', to: '' },
    ],
  },
  {
    key: 'nouns',
    title: '名詞',
    items: [
      { no: '01.', label: '符号・基数', to: '' },
      { no: '02.', label: '序数', to: '' },
      { no: '03.', label: '分数', to: '' },
      { no: '04.', label: '数・量', to: '' },
      { no: '05.', label: '測定単位', to: '' },
      { no: '06.', label: '時間の単位', to: '' },
      { no: '07.', label: '季節', to: '' },
      { no: '08.', label: '月', to: '' },
      { no: '09.', label: '日付', to: '' },
      { no: '10.', label: '曜日', to: '' },
      { no: '11.', label: '祝日', to: '' },
      { no: '12.', label: '一日の部分', to: '' },
      { no: '13.', label: '時間の概念', to: '' },
      { no: '14.', label: '家族・親戚', to: '' },
      { no: '15.', label: '社会集団・立場', to: '' },
      { no: '16.', label: '基本的な人物', to: '' },
      { no: '17.', label: '職業・仕事', to: '' },
      { no: '18.', label: '芸術・メディア・パフォーマンス', to: '' },
      { no: '19.', label: '権威・公的な役割', to: '' },
      { no: '20.', label: '学校・教育', to: '' },
      { no: '21.', label: 'スポーツ・競技', to: '' },
      { no: '22.', label: 'サービス・役割', to: '' },
      { no: '23.', label: '恋愛・結婚', to: '' },
      { no: '24.', label: '敬称・呼び方', to: '' },
      { no: '25.', label: '民族・言語', to: '' },
      { no: '26.', label: '身体部位', to: '' },
      { no: '27.', label: '感覚・生理', to: '' },
      { no: '28.', label: '健康・医療', to: '' },
      { no: '29.', label: '心・認知', to: '' },
      { no: '30.', label: '感情', to: '' },
      { no: '31.', label: '能力・資質', to: '' },
      { no: '32.', label: '動機・欲動', to: '' },
      { no: '33.', label: '基本動作', to: '' },
      { no: '34.', label: '対人関係・行動', to: '' },
      { no: '35.', label: '移動', to: '' },
      { no: '36.', label: '空間概念・位置', to: '' },
      { no: '37.', label: '日常生活・家事', to: '' },
      { no: '38.', label: '日用品・道具', to: '' },
      { no: '39.', label: '食事・料理', to: '' },
      { no: '40.', label: '建物・住居', to: '' },
      { no: '41.', label: '衣類・ファッション', to: '' },
      { no: '42.', label: '趣味・余暇', to: '' },
      { no: '43.', label: 'メディア・コンテンツ', to: '' },
      { no: '44.', label: 'スポーツ', to: '' },
      { no: '45.', label: '天体・宇宙', to: '' },
      { no: '46.', label: '国', to: '' },
      { no: '47.', label: '地理・地形', to: '' },
      { no: '48.', label: '環境・天気', to: '' },
      { no: '49.', label: '植物', to: '' },
      { no: '50.', label: '動物', to: '' },
      { no: '51.', label: 'IT・機械・技術', to: '' },
      { no: '52.', label: '科学・現象', to: '' },
      { no: '53.', label: '状態・元素', to: '' },
      { no: '54.', label: '物質・材料', to: '' },
      { no: '55.', label: '形状・構造', to: '' },
      { no: '56.', label: '社会・文化', to: '' },
      { no: '57.', label: '宗教', to: '' },
      { no: '58.', label: '経済・金融', to: '' },
      { no: '59.', label: '情報・伝達', to: '' },
      { no: '60.', label: '学校・学習', to: '' },
      { no: '61.', label: '属性・基準', to: '' },
      { no: '62.', label: '思考・論理', to: '' },
      { no: '63.', label: '状況・文脈', to: '' },
      { no: '64.', label: '方法・過程', to: '' },
      { no: '65.', label: '種類・比較', to: '' },
      { no: '66.', label: '目標・挑戦', to: '' },
      { no: '67.', label: '問題・課題', to: '' },
      { no: '68.', label: '解決・成果', to: '' },
    ],
  },
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
