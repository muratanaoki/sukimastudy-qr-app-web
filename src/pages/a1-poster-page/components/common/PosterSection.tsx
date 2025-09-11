import React from 'react';
import styles from '@/shared/styles/styles.module.css';

import type { LucideIcon } from 'lucide-react';

interface PosterSectionProps {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  index?: number;
}

/**
 * ポスターセクションの共通コンポーネント
 */
export const PosterSection: React.FC<PosterSectionProps> = ({
  title,
  subTitle,
  children,
  icon: Icon,
  index,
}) => {
  // タイトルまたはサブタイトルが存在する場合のみヘッダーを表示
  const shouldShowHeader = (title && title.trim() !== '') || (subTitle && subTitle.trim() !== '');

  if (!shouldShowHeader) {
    return <div className={styles.matrixSection}>{children}</div>;
  }

  return (
    <>
      <div>
        <div className={styles.categoryTitleBox}>
          <h2 className={styles.categoryTitleBorder}>
            <div>
              <span className={styles.categoryTitleNo}>
                {index !== undefined && `${String(index).padStart(2, '0')}. `}
              </span>
              <span className={styles.categoryTitle}>{title}</span>
              {subTitle && subTitle.trim() !== '' && (
                <span className={styles.japaneseTranslation}>（{subTitle}）</span>
              )}
            </div>
            {Icon && <Icon className={styles.iconMm20} />}
          </h2>
        </div>
        <div className={styles.matrixSection}>{children}</div>
      </div>
    </>
  );
};
