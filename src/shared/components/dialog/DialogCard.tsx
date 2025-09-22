import React from 'react';
import styles from './dialog.module.css';
import { CloseButton } from '@/shared/components/close-button/CloseButton';

export type DialogCardProps = {
  onClose: () => void;
  title: React.ReactNode;
  titleId?: string; // aria-labelledby に使う id
  // Lucide などのアイコンコンポーネント or 任意ノード
  Icon?: React.ComponentType<any> | React.ReactNode;
  // 右上のアクション（設定ボタンなど）
  headerRight?: React.ReactNode;
  // 下部のアクション行（PrimaryButton など）
  actions?: React.ReactNode;
  children?: React.ReactNode;
};

export const DialogCard: React.FC<DialogCardProps> = ({
  onClose,
  title,
  titleId = 'dialog-title',
  Icon,
  headerRight,
  actions,
  children,
}) => {
  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) return <div className={styles.iconWrap}>{Icon}</div>;
    const Cmp = Icon as React.ComponentType<any>;
    return (
      <div className={styles.iconWrap}>
        <Cmp className={styles.icon} />
      </div>
    );
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className={styles.card}>
        {renderIcon()}
        <div className={styles.inner}>
          <div className={styles.headerRightRow}>
            <CloseButton onClose={onClose} />
            {headerRight}
          </div>
          <h2 id={titleId} className={styles.header}>
            {title}
          </h2>
          {children}
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default DialogCard;
