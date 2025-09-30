import { useEffect, useState } from 'react';
import { AnswerMode, ChoiceView, QuestionOrder } from '../../utils/domain/type';
import { useTestSettingsContext } from './TestSettingsContext';

const STORAGE_KEY = 'testSettings';

const isEnumValue = <T extends Record<string, string>>(enm: T, val: unknown): val is T[keyof T] =>
  typeof val === 'string' && Object.values(enm).includes(val as any);

// Provider が無い場合のフォールバック実装
const useLocalTestSettings = () => {
  const [choiceView, setChoiceView] = useState<ChoiceView>(ChoiceView.Bottom4);
  const [questionOrder, setQuestionOrder] = useState<QuestionOrder>(QuestionOrder.Standard);
  const [answerMode, setAnswerMode] = useState<AnswerMode>(AnswerMode.Normal);

  // restore on mount
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (isEnumValue(ChoiceView, parsed.choiceView)) setChoiceView(parsed.choiceView);
        if (isEnumValue(QuestionOrder, parsed.questionOrder))
          setQuestionOrder(parsed.questionOrder);
        if (isEnumValue(AnswerMode, parsed.answerMode)) setAnswerMode(parsed.answerMode);
      }
    } catch (e) {
      console.warn('Failed to restore settings from localStorage:', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = () => {
    try {
      if (typeof window !== 'undefined') {
        const toSave = { choiceView, questionOrder, answerMode };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      }
    } catch (e) {
      console.warn('Failed to save settings to localStorage:', e);
    }
  };

  return {
    choiceView,
    setChoiceView,
    questionOrder,
    setQuestionOrder,
    answerMode,
    setAnswerMode,
    save,
  } as const;
};

export const useTestSettings = () => {
  const ctx = useTestSettingsContext();
  const local = useLocalTestSettings();
  return ctx ?? local;
};
