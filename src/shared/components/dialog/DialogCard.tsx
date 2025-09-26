import React, { useEffect, useRef } from 'react';
import styles from './dialog.module.css';
import { CloseButton } from '@/shared/components/close-button/CloseButton';
import { useNoScrollClass } from '../../hooks/useNoScrollClass';

export type DialogCardProps = {
  onClose: () => void;
  title: React.ReactNode;
  titleId?: string; // aria-labelledby に使う id
  // Lucide などのアイコンコンポーネント or 任意ノード
  Icon?: React.ComponentType<any> | React.ReactNode;
  // 左上のアクション（設定ボタンなど）
  headerLeft?: React.ReactNode;
  // 下部のアクション行（PrimaryButton など）
  actions?: React.ReactNode;
  children?: React.ReactNode;
  closeOnEscape?: boolean;
  closeOnOverlay?: boolean;
  lockScroll?: boolean;
};

export const DialogCard: React.FC<DialogCardProps> = ({
  onClose,
  title,
  titleId = 'dialog-title',
  Icon,
  headerLeft,
  actions,
  children,
  closeOnEscape = false,
  closeOnOverlay = false,
  lockScroll = false,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useNoScrollClass(lockScroll);

  useEffect(() => {
    if (!closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEscape, onClose]);

  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) return <div className={styles.iconWrap}>{Icon}</div>;
    const Cmp = Icon as React.ComponentType<any>;
    return (
      <div className={styles.iconWrap}>
        <Cmp strokeWidth={2.2} className={styles.icon} />
      </div>
    );
  };

  const handleOverlayMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlay) return;
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={handleOverlayMouseDown}
    >
      <div className={styles.card}>
        {renderIcon()}
        <div className={styles.inner}>
          <div className={styles.headerRightRow}>
            {headerLeft}
            <div className={styles.closeWrap}>
              <CloseButton onClose={onClose} />
            </div>
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
