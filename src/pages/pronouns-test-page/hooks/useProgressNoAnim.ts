import { useEffect, useRef } from 'react';

/**
 * 問題切替、またはprogressが増加した（=リセットされた）フレームだけ
 * プログレスバーのtransitionを無効化するためのフック。
 */
export const useProgressNoAnim = (resetKey: string | number, timeLeftPct: number): boolean => {
  const prevKeyRef = useRef(resetKey);
  const prevPctRef = useRef(timeLeftPct);

  const keyChanged = prevKeyRef.current !== resetKey;
  const pctIncreased = timeLeftPct > prevPctRef.current;
  const noAnim = keyChanged || pctIncreased;

  useEffect(() => {
    prevKeyRef.current = resetKey;
  }, [resetKey]);

  useEffect(() => {
    prevPctRef.current = timeLeftPct;
  }, [timeLeftPct]);

  return noAnim;
};
