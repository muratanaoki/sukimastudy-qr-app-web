import styles from './posHeaderButton.module.css';

export type PosHeaderButtonProps = {
  title: string;
  open: boolean;
  controlsId: string;
  onClick: () => void;
};

export const PosHeaderButton = ({ title, open, controlsId, onClick }: PosHeaderButtonProps) => (
  <button
    type="button"
    className={styles.sectionButton}
    aria-expanded={open}
    aria-controls={controlsId}
    onClick={onClick}
  >
    <span>{title}</span>
    <span className={styles.plusMinus} aria-hidden="true" data-open={open} />
  </button>
);
