import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { JudgementButtonType } from '../../utils/type';
import { shouldFlash } from '../../utils/domain/function';
import { useFlashDisplay } from '../ui/useFlashDisplay';
import type { UseSoundEffectsReturn } from '@/shared/hooks/useSoundEffects';
import {
  createPlaybackAudibilityVerifier,
  createPlaybackRetrier,
} from '@/shared/utils/audio/playbackRetry';
import type { SoundKey } from '@/shared/utils/audio/soundEffectManager';
import { createPlaybackDiagnostics } from '@/shared/utils/audio/playbackDiagnostics';
import { FLASH_DURATION_MS, JUDGEMENT_BUTTON_TYPE } from '../../utils/constants/pronounData';
import { ChoiceView } from '../../utils/enum';

/**
 * 「わかる/わからない」など判定ボタンの押下処理を一元化するフック。
 * - 押下後の UI 演出（フラッシュ）とサウンド再生の同期を取りつつ、自動で次の問題へ進める。
 * - 効果音再生失敗時にはリトライと診断ログ生成も行い、後段で復旧 UI を表示できるようにする。
 */

type AdvanceHandler = (isCorrect?: boolean) => void;

const SOUND_SYNC_DELAY_MS = 60;
type SoundEffectsForJudgement = Pick<
  UseSoundEffectsReturn,
  | 'playCorrectSound'
  | 'playIncorrectSound'
  | 'enableAudio'
  | 'notifyPlaybackFailure'
  | 'getAudioElement'
>;

export const useJudgementHandler = (
  choiceView: ChoiceView,
  advance: AdvanceHandler,
  questionKey: string | number,
  soundEffects: SoundEffectsForJudgement
) => {
  const [selectedJudgement, setSelectedJudgement] = useState<JudgementButtonType | null>(null);
  const { isFlashing, startFlash, cancelFlash: cancelFlashInternal } = useFlashDisplay();
  const {
    playCorrectSound,
    playIncorrectSound,
    enableAudio,
    notifyPlaybackFailure,
    getAudioElement,
  } = soundEffects;
  const advanceTimerRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);

  // 効果音再生が失敗した際、自動でリトライしつつ enableAudio を促すヘルパー
  const playbackRetrier = useMemo(
    () =>
      createPlaybackRetrier({
        enableAudio,
        notifyPlaybackFailure,
      }),
    [enableAudio, notifyPlaybackFailure]
  );

  // ボタン種別ごとのメタ情報（正誤判定・使用するサウンド・失敗時文言）
  const judgementMeta = useMemo<
    Record<
      JudgementButtonType,
      {
        isCorrect: boolean;
        playSound: () => Promise<boolean>;
        failureContext: string;
        soundKey: SoundKey;
      }
    >
  >(
    () => ({
      [JUDGEMENT_BUTTON_TYPE.KNOW]: {
        isCorrect: true,
        playSound: () => playCorrectSound(),
        failureContext: '正解',
        soundKey: 'correct',
      },
      [JUDGEMENT_BUTTON_TYPE.DONT_KNOW]: {
        isCorrect: false,
        playSound: () => playIncorrectSound(),
        failureContext: '不正解',
        soundKey: 'incorrect',
      },
    }),
    [playCorrectSound, playIncorrectSound]
  );
  // 効果音とアニメーションの終了を待つためのタイマーを安全に破棄
  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  // 効果音の同期を取るため、少し遅らせて次の問題へ進める
  const scheduleAdvance = useCallback(
    (isCorrect: boolean) => {
      clearAdvanceTimer();
      if (cancelledRef.current) return;
      advanceTimerRef.current = window.setTimeout(() => {
        advance(isCorrect);
        advanceTimerRef.current = null;
      }, SOUND_SYNC_DELAY_MS);
    },
    [advance, clearAdvanceTimer]
  );

  const finalizeJudgement = useCallback(
    (isCorrect: boolean) => {
      if (cancelledRef.current) return;
      scheduleAdvance(isCorrect);
    },
    [scheduleAdvance]
  );

  // 音声再生時に診断ログとリトライ機構を挟み込む
  const playJudgementSound = useCallback(
    (meta: {
      playSound: () => Promise<boolean>;
      failureContext: string;
      soundKey: SoundKey;
      label: string;
    }) => {
      const diagnostics = createPlaybackDiagnostics({
        label: `Judgement:${meta.label}`,
        context: meta.failureContext,
      });

      void playbackRetrier({
        play: meta.playSound,
        failureContext: meta.failureContext,
        logLabel: 'Judgement',
        verify: createPlaybackAudibilityVerifier({
          getAudioElement: () => getAudioElement(meta.soundKey),
          diagnostics,
        }),
        diagnostics,
      });
    },
    [playbackRetrier, getAudioElement]
  );

  // ボタン押下時のメインフロー。演出開始→音再生→完了後 advance を呼び出す。
  const handleJudgementAnswer = useCallback(
    (buttonType: JudgementButtonType) => {
      const meta = judgementMeta[buttonType];
      if (!meta) return;

      cancelledRef.current = false;
      clearAdvanceTimer();
      clearFallbackTimer();
      setSelectedJudgement(buttonType);

      if (!cancelledRef.current) {
        playJudgementSound({
          playSound: meta.playSound,
          failureContext: meta.failureContext,
          soundKey: meta.soundKey,
          label: meta.isCorrect ? 'Correct' : 'Incorrect',
        });
      }

      if (shouldFlash(choiceView)) {
        fallbackTimerRef.current = window.setTimeout(() => {
          fallbackTimerRef.current = null;
          finalizeJudgement(meta.isCorrect);
        }, FLASH_DURATION_MS + SOUND_SYNC_DELAY_MS);
        startFlash(() => {
          clearFallbackTimer();
          finalizeJudgement(meta.isCorrect);
        });
      } else {
        finalizeJudgement(meta.isCorrect);
      }
    },
    [
      choiceView,
      startFlash,
      clearAdvanceTimer,
      clearFallbackTimer,
      finalizeJudgement,
      playJudgementSound,
      judgementMeta,
    ]
  );

  // 問題が切り替わったタイミングで内部状態を初期化
  useEffect(() => {
    setSelectedJudgement(null);
    cancelledRef.current = false;
    clearAdvanceTimer();
    clearFallbackTimer();
  }, [questionKey, clearAdvanceTimer, clearFallbackTimer]);

  // アンマウント時にもタイマーを確実に破棄
  useEffect(() => {
    return () => {
      clearAdvanceTimer();
      clearFallbackTimer();
    };
  }, [clearAdvanceTimer, clearFallbackTimer]);

  const cancelFlashWithTimers = useCallback(() => {
    cancelledRef.current = true;
    clearAdvanceTimer();
    clearFallbackTimer();
    setSelectedJudgement(null);
    cancelFlashInternal();
  }, [clearAdvanceTimer, clearFallbackTimer, cancelFlashInternal]);

  return {
    selectedJudgement,
    handleJudgementAnswer,
    isFlashing,
    cancelFlash: cancelFlashWithTimers,
  };
};
