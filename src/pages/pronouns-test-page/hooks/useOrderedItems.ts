import { useEffect, useMemo, useState } from 'react';
import { QuestionOrder } from '../utils/type';
import type { PronounItem } from '../utils/type';

export const useOrderedItems = (
  open: boolean,
  items: PronounItem[] | undefined,
  questionOrder: QuestionOrder
) => {
  const [ordered, setOrdered] = useState<PronounItem[]>(items ?? []);

  // items / questionOrder / open に応じて並びを再構築
  useEffect(() => {
    if (!items?.length) {
      setOrdered([]);
      return;
    }
    if (questionOrder !== QuestionOrder.Random) {
      setOrdered(items);
      return;
    }
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setOrdered(arr);
  }, [items, questionOrder, open]);

  // メモ化は参照安定性確保のため（必要に応じて省略可）
  return useMemo(() => ordered, [ordered]);
};

export default useOrderedItems;
