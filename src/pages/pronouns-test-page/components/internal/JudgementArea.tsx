import React from 'react';
import JudgementControls from './JudgementControls';
import type { JudgementButtonType } from '../../utils/type';

export type JudgementAreaProps = {
  showTranslation: boolean;
  isFlashing?: boolean;
  onReveal: () => void;
  onDontKnow: () => void;
  onKnow: () => void;
  revealButtonText?: string;
  disabled?: boolean;
  selectedButton?: JudgementButtonType | null;
};

export const JudgementArea: React.FC<JudgementAreaProps> = ({
  showTranslation,
  isFlashing = false,
  onReveal,
  onDontKnow,
  onKnow,
  revealButtonText,
  disabled = false,
  selectedButton = null,
}) => {
  return (
    <JudgementControls
      showTranslation={showTranslation}
      isFlashing={isFlashing}
      onReveal={onReveal}
      onDontKnow={onDontKnow}
      onKnow={onKnow}
      revealButtonText={revealButtonText}
      disabled={disabled}
      selectedButton={selectedButton}
    />
  );
};

export default JudgementArea;
