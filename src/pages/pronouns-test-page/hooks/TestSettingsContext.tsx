import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { AnswerMode, ChoiceView, QuestionOrder } from '../utils/type';

const STORAGE_KEY = 'testSettings';

export type TestSettingsValue = {
  choiceView: ChoiceView;
  setChoiceView: (v: ChoiceView) => void;
  questionOrder: QuestionOrder;
  setQuestionOrder: (v: QuestionOrder) => void;
  answerMode: AnswerMode;
  setAnswerMode: (v: AnswerMode) => void;
  save: () => void;
};

export const TestSettingsContext = createContext<TestSettingsValue | null>(null);

export const TestSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [choiceView, setChoiceView] = useState<ChoiceView>(ChoiceView.Bottom4);
  const [questionOrder, setQuestionOrder] = useState<QuestionOrder>(QuestionOrder.Standard);
  const [answerMode, setAnswerMode] = useState<AnswerMode>(AnswerMode.Normal);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (Object.values(ChoiceView).includes(parsed.choiceView)) setChoiceView(parsed.choiceView);
        if (Object.values(QuestionOrder).includes(parsed.questionOrder))
          setQuestionOrder(parsed.questionOrder);
        if (Object.values(AnswerMode).includes(parsed.answerMode)) setAnswerMode(parsed.answerMode);
      }
    } catch (e) {
      console.warn('Failed to restore settings from localStorage:', e);
    }
  }, []);

  const save = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        const toSave = { choiceView, questionOrder, answerMode };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      }
    } catch (e) {
      console.warn('Failed to save settings to localStorage:', e);
    }
  }, [choiceView, questionOrder, answerMode]);

  const value = useMemo(
    () => ({
      choiceView,
      setChoiceView,
      questionOrder,
      setQuestionOrder,
      answerMode,
      setAnswerMode,
      save,
    }),
    [choiceView, questionOrder, answerMode, save]
  );

  return <TestSettingsContext.Provider value={value}>{children}</TestSettingsContext.Provider>;
};

export const useTestSettingsContext = () => useContext(TestSettingsContext);
