import React from 'react';
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
    <JudgementControls
      showTranslation={showTranslation}
      onReveal={onReveal}
      onDontKnow={onDontKnow}
      onKnow={onKnow}
    />
  );
};

export default JudgementArea;
