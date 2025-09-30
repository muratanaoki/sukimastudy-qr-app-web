import styles from './testResult.module.css';
import { ResultSummary } from './test-result/ResultSummary';
import { ResultStats } from './test-result/ResultStats';
import { ResultActions } from './test-result/ResultActions';
import { ResultWordSections, useResultSections } from './test-result/ResultWordSections';
import type { AnswerRecord } from '../../hooks/useTestRunner';
import { useSpeech } from '../../hooks/useSpeech';
import { useCallback, useEffect, useState } from 'react';
import { getScoreMeta } from '../../utils/score';

type TestResultProps = {
  total: number;
  correctAnswers: number;
  scorePercentage: number;
  answerHistory: AnswerRecord[];
  onClose: () => void;
};

const RESULT_ICON_SIZE_REM = 9.375; // 150px based on 16px root font-size

const convertRemToPixels = (rem: number): number => {
  if (typeof window === 'undefined') {
    return rem * 16;
  }

  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const baseFontSize = Number.isNaN(rootFontSize) ? 16 : rootFontSize;

  return rem * baseFontSize;
};

const useResponsiveRemSize = (remSize: number): number => {
  const calculateSize = useCallback(() => convertRemToPixels(remSize), [remSize]);

  const [size, setSize] = useState<number>(calculateSize);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setSize(calculateSize());

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateSize]);

  return size;
};

export const TestResult = ({
  total,
  correctAnswers,
  scorePercentage,
  answerHistory,
  onClose,
}: TestResultProps) => {
  const { rating, medalColor } = getScoreMeta(scorePercentage);
  const iconSize = useResponsiveRemSize(RESULT_ICON_SIZE_REM);
  const speech = useSpeech();
  const sections = useResultSections(answerHistory);

  return (
    <div className={styles.testResult}>
      <ResultSummary
        rating={rating}
        medalColor={medalColor}
        iconSize={iconSize}
        scorePercentage={scorePercentage}
      />

      <ResultStats total={total} correctAnswers={correctAnswers} />

      <ResultActions onClose={onClose} />

      <ResultWordSections sections={sections} speech={speech} />
    </div>
  );
};

export default TestResult;
