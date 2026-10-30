import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Home,
  ExternalLink,
} from 'lucide-react';
import { SLIDE_10_FINALE } from '../../data/slides';
import { BarcodeStrip, HandwrittenNote } from '../ui/AnimatedPrimitives';
import { soundManager } from '../../utils/sound';

interface Slide10FinaleProps {
  reducedMotion?: boolean;
  onRestartDeck: () => void;
}

const FLOATING_BITS = [
  { id: 1, x: '12%', y: '18%', color: '#C9472B', shape: 'rect', rotate: 18, delay: 0.1 },
  { id: 2, x: '84%', y: '22%', color: '#E0A526', shape: 'star', rotate: -14, delay: 0.4 },
  { id: 3, x: '18%', y: '72%', color: '#3F5B3A', shape: 'rect', rotate: -24, delay: 0.7 },
  { id: 4, x: '78%', y: '66%', color: '#C9472B', shape: 'star', rotate: 22, delay: 0.2 },
  { id: 5, x: '27%', y: '28%', color: '#E0A526', shape: 'rect', rotate: 35, delay: 0.5 },
  { id: 6, x: '71%', y: '30%', color: '#3F5B3A', shape: 'rect', rotate: -18, delay: 0.9 },
];

export const Slide10Finale: React.FC<Slide10FinaleProps> = ({
  reducedMotion = false,
  onRestartDeck,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [needsManualPlay, setNeedsManualPlay] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [typedQuestions, setTypedQuestions] = useState<string>('');
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const fireEditorialConfetti = useCallback(() => {
    if (reducedMotion) return;
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { x: 0.5, y: 0.55 },
        colors: ['#C9472B', '#E0A526', '#3F5B3A', '#1B1B18', '#CFE0E6'],
      });
    } catch {
      // Ignore if canvas unavailable
    }
  }, [reducedMotion]);

  const startPlayback = useCallback(async (preferUnmuted = true) => {
    const vid = videoRef.current;
    if (!vid) return;

    setHasEnded(false);
    setTypedQuestions('');
    setNeedsManualPlay(false);

    try {
      vid.currentTime = 0;
    } catch {
      // Ignore seek error before metadata
    }

    if (preferUnmuted) {
      vid.muted = false;
      setIsMuted(false);
      try {
        await vid.play();
        return;
      } catch {
        // Browser blocked unmuted autoplay; fall back to muted autoplay
      }
    }

    try {
      vid.muted = true;
      setIsMuted(true);
      await vid.play();
    } catch {
      setNeedsManualPlay(true);
    }
  }, []);

  useEffect(() => {
    startPlayback(true);
  }, [startPlayback]);

  useEffect(() => {
    if (!hasEnded) {
      setTypedQuestions('');
      return;
    }
    const target = SLIDE_10_FINALE.endQuestionText;
    if (reducedMotion) {
      setTypedQuestions(target);
      return;
    }
    let idx = 0;
    const interval = window.setInterval(() => {
      idx += 1;
      setTypedQuestions(target.slice(0, idx));
      if (idx >= target.length) {
        window.clearInterval(interval);
      }
    }, 55);
    return () => window.clearInterval(interval);
  }, [hasEnded, reducedMotion]);

  const toggleVideoSound = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const nextMuted = !vid.muted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
    if (vid.paused && !hasEnded) {
      vid.play().catch(() => {});
    }
  }, [hasEnded]);

  const replayVideo = useCallback(() => {
    soundManager.playDing();
    startPlayback(true);
  }, [startPlayback]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        e.stopPropagation();
        toggleVideoSound();
      } else if ((e.key === 'r' || e.key === 'R') && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        replayVideo();
      }
    };

    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true });
  }, [replayVideo, toggleVideoSound]);

  const handleVideoEnded = () => {
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
    }
    setHasEnded(true);
    soundManager.playWinnerChord();
    fireEditorialConfetti();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: nx * 16, y: ny * 12 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex h-full w-full flex-col justify-between py-1 select-none"
    >
      {/* Parallax Background Confetti & Circling Paper Plane */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          transition: 'transform 220ms ease-out',
        }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {FLOATING_BITS.map((bit) => (
          <motion.div
            key={bit.id}
            style={{ left: bit.x, top: bit.y }}
            animate={
              reducedMotion
                ? {}
                : {
                    y: [0, -10, 0, 6, 0],
                    rotate: [bit.rotate, bit.rotate + 16, bit.rotate - 10, bit.rotate],
                  }
            }
            transition={{
              duration: 5.5 + (bit.id % 3),
              repeat: Infinity,
              delay: bit.delay,
              ease: 'easeInOut',
            }}
            className="absolute"
          >
            {bit.shape === 'rect' ? (
              <div
                style={{ backgroundColor: bit.color }}
                className="h-3 w-5 border border-ink shadow-[1px_1px_0px_#1B1B18]"
              />
            ) : (
              <Sparkles
                className="h-4 w-4"
                style={{ color: bit.color }}
                strokeWidth={2.2}
              />
            )}
          </motion.div>
        ))}

        {!reducedMotion && (
          <motion.div
            animate={{
              x: [0, 38, 0, -38, 0],
              y: [0, -16, -28, -12, 0],
              rotate: [-8, 12, 22, -16, -8],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[22%] top-[22%] hidden lg:block"
          >
            <svg width="42" height="42" viewBox="0 0 64 64" fill="none">
              <path
                d="M6 30 L58 10 L38 56 L28 36 L6 30 Z"
                fill="#FAF6EE"
                stroke="#1B1B18"
                strokeWidth="2.5"
              />
              <path
                d="M58 10 L28 36 L34 48"
                fill="#C9472B"
                stroke="#1B1B18"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Top Header Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2">
        <div className="flex items-center gap-3">
          <span className="border-2 border-ink bg-tomato px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-paper-cream shadow-ink-sm">
            {SLIDE_10_FINALE.badge}
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/80">
            {SLIDE_10_FINALE.subtitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleVideoSound}
            className="inline-flex items-center gap-1.5 border-2 border-ink bg-paper-cream px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink shadow-ink-sm"
          >
            {isMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-tomato" />
                <span>Muted (Press S)</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-olive" />
                <span>Sound On (Press S)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="inline-flex items-center gap-1.5 border-2 border-ink bg-mustard px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink shadow-ink-sm"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Replay (R)</span>
          </button>
        </div>
      </div>

      {/* Center Stage: Thank You + Hamster Video Cutout */}
      <div className="relative z-10 my-auto grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
        <div className="flex flex-col items-start lg:col-span-5">
          <h1 className="misregister-title font-display text-5xl font-black uppercase tracking-tight text-ink sm:text-6xl">
            {SLIDE_10_FINALE.title}
          </h1>

          <HandwrittenNote
            text="“That’s the end of our presentation!” →"
            className="mt-2"
          />

          <div className="mt-4 min-h-[84px] w-full max-w-md">
            {(hasEnded || reducedMotion) ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-2 border-ink bg-paper-cream p-3.5 shadow-ink"
              >
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-tomato">
                  Q&amp;A OPEN • PRESS [Q] FOR TEACHER Q&amp;A CHEAT SHEET
                </div>
                <div className="mt-1 font-display text-2xl font-black text-ink sm:text-3xl">
                  {typedQuestions || SLIDE_10_FINALE.endQuestionText}
                  <span className="terminal-cursor ml-1 text-tomato">_</span>
                </div>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={replayVideo}
                    className="inline-flex items-center gap-1.5 border-2 border-ink bg-tomato px-3 py-1 font-mono text-xs font-bold uppercase text-paper-cream shadow-ink-sm"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Replay (R)
                  </button>
                  <button
                    type="button"
                    onClick={onRestartDeck}
                    className="inline-flex items-center gap-1.5 border-2 border-ink bg-paper-bg px-3 py-1 font-mono text-xs font-bold uppercase text-ink shadow-ink-sm"
                  >
                    <Home className="h-3.5 w-3.5" />
                    Slide 01 (Home)
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="border-2 border-dashed border-ink/40 bg-paper-cream/70 p-3 font-mono text-xs font-bold text-ink/80">
                12s Hamster Finale playing… ([S] sound • [R] replay • [Q] Q&amp;A sheet)
              </div>
            )}
          </div>
        </div>

        {/* Right 7 Columns: Hamster Cutout Stage with Multiply Blend & Rotating FINE Stamp */}
        <div className="relative flex flex-col items-center justify-center lg:col-span-7">
          <motion.div
            animate={reducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute -right-2 -top-3 z-20 flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-double border-tomato bg-paper-cream/95 p-2 text-center shadow-ink-sm sm:right-4"
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-dashed border-tomato">
              <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-tomato">
                ITALIA
              </span>
              <span className="font-display text-xl font-black uppercase text-tomato">
                {SLIDE_10_FINALE.stampText}
              </span>
              <span className="font-mono text-[8px] font-bold uppercase text-ink">
                ★ RIX → IT ★
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { scale: 0.8, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 15 }}
            className="relative flex flex-col items-center"
          >
            <div className="relative flex flex-col items-center justify-center border-2 border-ink bg-[#F2EADB] px-7 pt-5 pb-4 shadow-ink-lg">
              <div aria-hidden="true" className="masking-tape" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 rounded-full border border-dashed border-ink/25 bg-[#FAF6EE]"
              />

              <div className="relative z-10 flex items-center justify-center bg-[#FAF6EE] px-4 py-1.5">
                {!videoError ? (
                  <video
                    ref={videoRef}
                    poster={SLIDE_10_FINALE.posterUrl}
                    playsInline
                    preload="auto"
                    onEnded={handleVideoEnded}
                    onError={() => setVideoError(true)}
                    onClick={() => {
                      if (needsManualPlay) {
                        startPlayback(true);
                      } else {
                        toggleVideoSound();
                      }
                    }}
                    className="h-[220px] w-[220px] cursor-pointer object-contain mix-blend-multiply sm:h-[260px] sm:w-[260px]"
                  >
                    <source src={SLIDE_10_FINALE.videoMp4} type="video/mp4" />
                    <source src={SLIDE_10_FINALE.videoWebm} type="video/webm" />
                  </video>
                ) : (
                  <img
                    src={SLIDE_10_FINALE.posterUrl}
                    alt="Fluffy hamster finale poster"
                    className="h-[220px] w-[220px] object-contain mix-blend-multiply sm:h-[260px] sm:w-[260px]"
                  />
                )}

                {needsManualPlay && !videoError && (
                  <button
                    type="button"
                    onClick={() => startPlayback(true)}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-paper-bg/75 p-4 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center border-2 border-ink bg-tomato text-paper-cream shadow-ink">
                      <Play className="h-7 w-7 fill-current" />
                    </span>
                    <span className="mt-2 border border-ink bg-paper-cream px-2.5 py-0.5 font-mono text-xs font-bold uppercase text-ink">
                      Play Hamster Finale
                    </span>
                  </button>
                )}
              </div>

              <div
                aria-hidden="true"
                className="relative z-10 -mt-1.5 h-3.5 w-40 rounded-full bg-ink/20"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Compact Official Sources Footer */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t-2 border-ink pt-2">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold text-ink/80">
          <span className="uppercase text-tomato">OFFICIAL SOURCES:</span>
          {SLIDE_10_FINALE.sources.map((src) => (
            <a
              key={src.label}
              href={src.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 border border-ink/40 bg-paper-cream px-2 py-0.5 hover:bg-mustard"
            >
              <span>{src.label}</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          ))}
        </div>
        <BarcodeStrip code="EKA-CS-FINALE-10" className="h-4" />
      </div>
    </div>
  );
};
