import React from 'react';
import styles from '../testDialog.module.css';
import JudgementControls from './JudgementControls';

export type JudgementAreaProps = {
  showTranslation: boolean;
  onReveal: () => void;
  onDontKnow: () => void;
  onKnow: () => void;
};

export const JudgementArea: React.FC<JudgementAreaProps> = ({
  showTranslation,
  onReveal,
  onDontKnow,
  onKnow,
}) => {
  return (
    <div className={styles.actionsRow}>
      <JudgementControls
        showTranslation={showTranslation}
        onReveal={onReveal}
        onDontKnow={onDontKnow}
        onKnow={onKnow}
      />
    </div>
  );
};

export default JudgementArea;
