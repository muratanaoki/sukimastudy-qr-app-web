import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnswerMode, ChoiceView } from '../../utils/enum';

type Params = {
  answerMode: AnswerMode;
  choiceView: ChoiceView;
  term?: string | null;
  currentIndexOrKey: number | string; // 問題切替のリセットトリガー
  open?: boolean; // ダイアログ再オープンでのリセット用
};

/**
 * Listening モードの単語マスクと一時表示（ボタン）のロジックを内包。
 * - 4択: 通常は "?"、ボタン押下で単語を一時表示
 * - 選択肢なし: "和訳表示" と連動させたい場合は外側で制御（このフックは 4択の制御にフォーカス）
 */
export const useListeningWordMask = ({
  answerMode,
  choiceView,
  term,
  currentIndexOrKey,
  open,
}: Params) => {
  const [revealed, setRevealed] = useState(false);

  // 問題切替で自動リセット
  useEffect(() => {
    setRevealed(false);
  }, [currentIndexOrKey]);

  // ダイアログ再オープン時もリセット
  useEffect(() => {
    if (open) setRevealed(false);
  }, [open]);

  const displayTerm = useMemo(() => {
    const t = term ?? '-';
    if (answerMode !== AnswerMode.Listening) return t;
    if (choiceView === ChoiceView.None) return t; // このフックではノータッチ（外側で制御）
    return revealed ? t : '?';
  }, [term, answerMode, choiceView, revealed]);

  const shouldShowRevealButton = useMemo(() => {
    // ボタンは Listening モードかつ Bottom4 のときに常に表示。
    // 表示/非表示は revealed ではなくアイコンで切り替える（Eye / EyeOff）。
    return answerMode === AnswerMode.Listening && choiceView === ChoiceView.Bottom4;
  }, [answerMode, choiceView]);

  // クリックで表示・非表示をトグルするようにする
  const reveal = useCallback(() => setRevealed((r) => !r), []);

  return { displayTerm, shouldShowRevealButton, reveal, revealed } as const;
};

export default useListeningWordMask;
