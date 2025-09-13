import styles from './index.module.css';
import { DATA } from './utils/const';
import { useSpeech } from './hooks/useSpeech';
import { PronounCard } from './components/PronounCard';
import { User } from 'lucide-react';

export default function PronounsTestPage() {
  const speech = useSpeech();
  const filtered = DATA; // 今後フィルターや検索を入れる余地

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h1 className={styles.titleNumber}>01.</h1>
            <h1 className={styles.title}>人称・所有・再帰代名詞</h1>
            <div className={styles.titleIcon}>
              <User className={styles.headerIcon} />
            </div>
          </div>
          <ul className={styles.cardGrid}>
            {filtered.map((it) => (
              <PronounCard key={it.index} item={it} speech={speech} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
