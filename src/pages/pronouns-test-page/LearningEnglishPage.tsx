import styles from './index.module.css';
import { DATA } from './utils/const';
import { useSpeech } from './hooks/useSpeech';
import { PronounCard } from './components/PronounCard';
import { User } from 'lucide-react';

export default function LearningEnglishPage() {
  const speech = useSpeech();
  // 今後フィルターや検索を入れる余地
  const { groupNo, title, items } = DATA;

  return (
    <div className={styles.container}>
      <main>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h1 className={styles.titleNumber}>{String(groupNo).padStart(2, '0')}.</h1>
            <h1 className={styles.title}>{title}</h1>
            <User className={styles.headerIcon} />
          </div>
          <ul className={styles.cardGrid}>
            {items.map((it) => (
              <PronounCard key={it.index} item={it} speech={speech} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
