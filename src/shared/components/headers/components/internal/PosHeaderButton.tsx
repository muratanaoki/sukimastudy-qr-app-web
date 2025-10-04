import styles from './posHeaderButton.module.css';

export type PosHeaderButtonProps = {
  title: string;
  subtitle?: string;
  open: boolean;
  controlsId: string;
  onClick: () => void;
};

export const PosHeaderButton = ({
  title,
  subtitle,
  open,
  controlsId,
  onClick,
}: PosHeaderButtonProps) => (
  <button
    type="button"
    className={styles.sectionButton}
    aria-expanded={open}
    aria-controls={controlsId}
    onClick={onClick}
  >
    <div className={styles.titleWrapper}>
      <p className={styles.title}>{title}</p>
      <p className={styles.subTitle}>{subtitle}</p>
    </div>
    <span className={styles.plusMinus} aria-hidden="true" data-open={open} />
  </button>
);
