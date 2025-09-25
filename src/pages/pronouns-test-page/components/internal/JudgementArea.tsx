import React from 'react';
import JudgementControls from './JudgementControls';

export type JudgementAreaProps = {
  showTranslation: boolean;
  onReveal: () => void;
  onDontKnow: () => void;
  onKnow: () => void;
  revealButtonText?: string;
};

export const JudgementArea: React.FC<JudgementAreaProps> = ({
  showTranslation,
  onReveal,
  onDontKnow,
  onKnow,
  revealButtonText,
}) => {
  return (
    <JudgementControls
      showTranslation={showTranslation}
      onReveal={onReveal}
      onDontKnow={onDontKnow}
      onKnow={onKnow}
      revealButtonText={revealButtonText}
    />
  );
};

export default JudgementArea;
