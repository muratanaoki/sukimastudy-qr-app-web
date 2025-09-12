import styles from './index.module.css';
import { DATA } from './utils/const';
import { useSpeech } from './hooks/useSpeech';
import { PronounCard } from './components/PronounCard';

export default function PronounsTestPage() {
  const speech = useSpeech();
  const filtered = DATA; // 今後フィルターや検索を入れる余地

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.section}>
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
