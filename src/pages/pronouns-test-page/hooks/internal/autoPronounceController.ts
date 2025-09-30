export const createAutoPronounceController = () => {
  let lastSpoken: string | null = null;
  let scheduled: string | null = null;

  const reset = () => {
    lastSpoken = null;
    scheduled = null;
  };

  const shouldSchedule = (term: string | null): term is string => {
    if (!term) return false;
    if (term === lastSpoken) return false;
    if (term === scheduled) return false;
    return true;
  };

  const markScheduled = (term: string) => {
    scheduled = term;
  };

  const markSpoken = (term: string) => {
    lastSpoken = term;
    if (scheduled === term) {
      scheduled = null;
    }
  };

  const clearScheduled = (term: string) => {
    if (scheduled === term) {
      scheduled = null;
    }
  };

  const hasSpoken = () => lastSpoken !== null;

  return {
    reset,
    shouldSchedule,
    markScheduled,
    markSpoken,
    clearScheduled,
    hasSpoken,
  } as const;
};

export type AutoPronounceController = ReturnType<typeof createAutoPronounceController>;
