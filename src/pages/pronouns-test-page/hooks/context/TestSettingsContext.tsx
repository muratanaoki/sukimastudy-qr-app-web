import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { AnswerMode, ChoiceView, QuestionOrder } from '../../utils/domain/type';

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

// ---- 型とストレージI/Oヘルパー（コンポーネント外） ----
type SettingsState = {
  choiceView: ChoiceView;
  questionOrder: QuestionOrder;
  answerMode: AnswerMode;
};

const DEFAULT_SETTINGS: SettingsState = {
  choiceView: ChoiceView.Bottom4,
  questionOrder: QuestionOrder.Standard,
  answerMode: AnswerMode.Normal,
};

const loadFromStorage = (): SettingsState | null => {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const next: SettingsState = {
      choiceView: Object.values(ChoiceView).includes(parsed.choiceView)
        ? parsed.choiceView
        : DEFAULT_SETTINGS.choiceView,
      questionOrder: Object.values(QuestionOrder).includes(parsed.questionOrder)
        ? parsed.questionOrder
        : DEFAULT_SETTINGS.questionOrder,
      answerMode: Object.values(AnswerMode).includes(parsed.answerMode)
        ? parsed.answerMode
        : DEFAULT_SETTINGS.answerMode,
    };
    return next;
  } catch (e) {
    console.warn('Failed to restore settings from localStorage:', e);
    return null;
  }
};

export const TestSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);

  useEffect(() => {
    const restored = loadFromStorage();
    if (restored) setSettings(restored);
  }, []);

  const save = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      }
    } catch (e) {
      console.warn('Failed to save settings to localStorage:', e);
    }
  }, [settings]);

  // setter ラッパー（公開APIは現状維持）
  const setChoiceView = useCallback((v: ChoiceView) => {
    setSettings((s) => ({ ...s, choiceView: v }));
  }, []);
  const setQuestionOrder = useCallback((v: QuestionOrder) => {
    setSettings((s) => ({ ...s, questionOrder: v }));
  }, []);
  const setAnswerMode = useCallback((v: AnswerMode) => {
    setSettings((s) => ({ ...s, answerMode: v }));
  }, []);

  const value = useMemo(
    () => ({
      choiceView: settings.choiceView,
      setChoiceView,
      questionOrder: settings.questionOrder,
      setQuestionOrder,
      answerMode: settings.answerMode,
      setAnswerMode,
      save,
    }),
    [settings, setChoiceView, setQuestionOrder, setAnswerMode, save]
  );

  return <TestSettingsContext.Provider value={value}>{children}</TestSettingsContext.Provider>;
};

export const useTestSettingsContext = () => useContext(TestSettingsContext);
