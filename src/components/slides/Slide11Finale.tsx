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
} from 'lucide-react';
import { SLIDE_11_FINALE } from '../../data/slides';
import {
  BarcodeStrip,
  HandwrittenNote,
} from '../ui/AnimatedPrimitives';
import { soundManager } from '../../utils/sound';

interface Slide11FinaleProps {
  reducedMotion?: boolean;
  onRestartDeck: () => void;
}

const FLOATING_BITS = [
  { id: 1, x: '12%', y: '18%', color: '#C9472B', shape: 'rect', rotate: 18, delay: 0.1 },
  { id: 2, x: '84%', y: '22%', color: '#E0A526', shape: 'star', rotate: -14, delay: 0.4 },
  { id: 3, x: '18%', y: '74%', color: '#3F5B3A', shape: 'rect', rotate: -24, delay: 0.7 },
  { id: 4, x: '78%', y: '68%', color: '#C9472B', shape: 'star', rotate: 22, delay: 0.2 },
  { id: 5, x: '27%', y: '30%', color: '#E0A526', shape: 'rect', rotate: 35, delay: 0.5 },
  { id: 6, x: '71%', y: '32%', color: '#3F5B3A', shape: 'rect', rotate: -18, delay: 0.9 },
  { id: 7, x: '14%', y: '48%', color: '#1B1B18', shape: 'star', rotate: 12, delay: 0.3 },
  { id: 8, x: '88%', y: '46%', color: '#E0A526', shape: 'rect', rotate: -28, delay: 0.6 },
];

export const Slide11Finale: React.FC<Slide11FinaleProps> = ({
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
        origin: { x: 0.5, y: 0.58 },
        colors: ['#C9472B', '#E0A526', '#3F5B3A', '#1B1B18', '#CFE0E6'],
      });
      window.setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 55,
          origin: { x: 0.15, y: 0.65 },
          colors: ['#C9472B', '#E0A526', '#3F5B3A', '#1B1B18'],
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 55,
          origin: { x: 0.85, y: 0.65 },
          colors: ['#C9472B', '#E0A526', '#3F5B3A', '#1B1B18'],
        });
      }, 220);
    } catch {
      // Fallback if canvas is unavailable
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
      // Ignore seek error if metadata isn't ready yet
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
      // Both unmuted and muted autoplay were blocked
      setNeedsManualPlay(true);
    }
  }, []);

  // Auto-start when Slide 11 mounts
  useEffect(() => {
    startPlayback(true);
  }, [startPlayback]);

  // Typing effect for "Any questions?" once video ends
  useEffect(() => {
    if (!hasEnded) {
      setTypedQuestions('');
      return;
    }
    const target = SLIDE_11_FINALE.endQuestionText;
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

  // Listen for S (sound toggle) and R (replay video) on Slide 11
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
    setParallax({ x: nx * 18, y: ny * 14 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex h-full w-full flex-col justify-between py-1 select-none"
    >
      {/* Gentle Parallax Background Layer with Floating Confetti Paper Pieces & Tiny Stars */}
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
                className="h-3 w-5 border border-paper-ink shadow-[1px_1px_0px_#1B1B18]"
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

        {/* Small Paper Plane Circling Around Stage */}
        {!reducedMotion && (
          <motion.div
            animate={{
              x: [0, 42, 0, -42, 0],
              y: [0, -18, -32, -14, 0],
              rotate: [-8, 12, 24, -18, -8],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-[19%] top-[24%] hidden lg:block"
          >
            <svg width="46" height="46" viewBox="0 0 64 64" fill="none">
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

      {/* Top Editorial Header Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b-2 border-paper-ink pb-2">
        <div className="flex items-center gap-3">
          <span className="bg-paper-red px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-paper-cream border border-paper-ink shadow-ink-sm">
            SLIDE 11 // ARRIVAL GATE
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-paper-ink/80">
            {SLIDE_11_FINALE.subtitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleVideoSound}
            className="inline-flex items-center gap-1.5 border-2 border-paper-ink bg-paper-cream px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-paper-ink shadow-ink-sm transition-transform hover:-translate-y-0.5"
            title="Press S to toggle hamster video sound"
          >
            {isMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-paper-red" />
                <span>Sound Muted (Press S)</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-paper-olive" />
                <span>Sound On (Press S)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="inline-flex items-center gap-1.5 border-2 border-paper-ink bg-paper-mustard px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-paper-ink shadow-ink-sm transition-transform hover:-translate-y-0.5"
            title="Press R to replay hamster video"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Replay (R)</span>
          </button>
        </div>
      </div>

      {/* Center Stage: Hamster Cutout Video with Multiply Blend + Slow Rotating FINE Stamp */}
      <div className="relative z-10 my-auto grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
        {/* Left Column: Editorial Headline & Typing "Any questions?" */}
        <div className="flex flex-col items-start lg:col-span-5">
          <div className="mb-2 inline-flex items-center gap-2 border border-paper-ink bg-paper-cream px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest text-paper-olive">
            <span>// process.exit(0) — PRESENTATION COMPLETE</span>
          </div>

          <h1 className="misregister-title font-display text-5xl font-black uppercase tracking-tight text-paper-ink sm:text-6xl lg:text-7xl">
            {SLIDE_11_FINALE.title}
          </h1>

          <p className="mt-3 max-w-md font-sans text-sm font-medium leading-relaxed text-paper-ink/85 sm:text-base">
            “That’s the end of our presentation!” — 5 Italian partner &amp; CS study routes
            from Riga (<span className="font-mono font-bold">RIX</span>) reviewed and stamped.
          </p>

          {/* Handwritten Note Pointing to the Dancing Hamster */}
          <HandwrittenNote
            text="Official EKA CS mascot closing announcement →"
            className="mt-3"
          />

          {/* "Any questions?" Fade-In + Typing Effect on Video End (or always visible in print/reducedMotion) */}
          <div className="mt-5 min-h-[88px] w-full max-w-md">
            {(hasEnded || reducedMotion) ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-2 border-paper-ink bg-paper-cream p-3.5 shadow-ink"
              >
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-paper-red">
                  FLOOR OPEN FOR CLASS &amp; TEACHER Q&amp;A
                </div>
                <div className="mt-1 font-display text-2xl font-black text-paper-ink sm:text-3xl">
                  {typedQuestions || SLIDE_11_FINALE.endQuestionText}
                  <span className="terminal-cursor ml-1 text-paper-red">_</span>
                </div>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={replayVideo}
                    className="inline-flex items-center gap-1.5 border-2 border-paper-ink bg-paper-red px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-paper-cream shadow-ink-sm transition-transform hover:-translate-y-0.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Replay Hamster (R)
                  </button>
                  <button
                    type="button"
                    onClick={onRestartDeck}
                    className="inline-flex items-center gap-1.5 border-2 border-paper-ink bg-paper-bg px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-paper-ink shadow-ink-sm transition-transform hover:-translate-y-0.5"
                  >
                    <Home className="h-3.5 w-3.5" />
                    Slide 01 (Home)
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="border-2 border-dashed border-paper-ink/40 bg-paper-cream/60 p-3 font-mono text-xs text-paper-ink/75">
                <span className="font-bold text-paper-red">LIVE FINALE:</span> Listen to the
                closing message… (<span className="font-bold">S</span> toggles audio,{' '}
                <span className="font-bold">R</span> replays).
              </div>
            )}
          </div>
        </div>

        {/* Center/Right Column: Hamster Cutout Stage with Spotlight, Multiply Blend & Rotating "FINE" Stamp */}
        <div className="relative flex flex-col items-center justify-center lg:col-span-7">
          {/* Slow Rotating Italian "FINE" Stamp in the Corner */}
          <motion.div
            animate={reducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute -right-2 -top-4 z-20 flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-double border-paper-red bg-paper-cream/90 p-2 text-center shadow-ink-sm sm:right-4 sm:h-28 sm:w-28"
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-dashed border-paper-red">
              <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-paper-red">
                CINEMA ITALIA
              </span>
              <span className="font-display text-xl font-black uppercase tracking-tighter text-paper-red sm:text-2xl">
                {SLIDE_11_FINALE.stampText}
              </span>
              <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-paper-ink">
                ★ RIX → IT ★
              </span>
            </div>
          </motion.div>

          {/* Bouncy Entrance Container for the Hamster Cutout */}
          <motion.div
            initial={reducedMotion ? false : { scale: 0.78, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 15,
              mass: 0.9,
            }}
            className="relative flex flex-col items-center"
          >
            {/* Paper Stage Card with Soft Round Spotlight & Multiply Blend so White Video BG Disappears */}
            <div className="relative flex flex-col items-center justify-center border-2 border-paper-ink bg-[#F2EADB] px-8 pt-6 pb-5 shadow-ink-lg">
              {/* Masking Tape Strip at Top Center */}
              <div aria-hidden="true" className="masking-tape" />

              {/* Soft Round Spotlight Behind the Hamster */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 rounded-full bg-[#FAF6EE] border border-dashed border-paper-ink/25"
              />

              {/* Video Wrapper using mix-blend-mode: multiply so pure white video background melts into #FAF6EE/#F2EADB */}
              <div className="relative z-10 flex items-center justify-center bg-[#FAF6EE] px-4 py-2">
                {!videoError ? (
                  <video
                    ref={videoRef}
                    poster={SLIDE_11_FINALE.posterUrl}
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
                    className="h-[250px] w-[250px] cursor-pointer object-contain mix-blend-multiply sm:h-[300px] sm:w-[300px]"
                  >
                    <source src={SLIDE_11_FINALE.videoMp4} type="video/mp4" />
                    <source src={SLIDE_11_FINALE.videoWebm} type="video/webm" />
                  </video>
                ) : (
                  <img
                    src={SLIDE_11_FINALE.posterUrl}
                    alt="Fluffy hamster finale poster"
                    className="h-[250px] w-[250px] object-contain mix-blend-multiply sm:h-[300px] sm:w-[300px]"
                  />
                )}

                {/* Big Play Button Overlay if Browser Blocked Autoplay */}
                {needsManualPlay && !videoError && (
                  <button
                    type="button"
                    onClick={() => startPlayback(true)}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-paper-bg/75 p-4 text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center border-2 border-paper-ink bg-paper-red text-paper-cream shadow-ink transition-transform hover:scale-105">
                      <Play className="h-8 w-8 fill-current" />
                    </span>
                    <span className="mt-2 border border-paper-ink bg-paper-cream px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-paper-ink shadow-ink-sm">
                      Click to Play Hamster Finale
                    </span>
                  </button>
                )}
              </div>

              {/* Ground Drop Shadow Under the Hamster */}
              <div
                aria-hidden="true"
                className="relative z-10 -mt-2 h-4 w-44 rounded-full bg-paper-ink/20"
              />

              {/* Caption Footer Inside the Stage Frame */}
              <div className="relative z-10 mt-3 flex w-full items-center justify-between gap-4 border-t border-dashed border-paper-ink/40 pt-2 font-mono text-[10px] font-bold uppercase tracking-widest text-paper-ink/75">
                <span>FILE: PUBLIC/MEDIA/HAMSTER.MP4</span>
                <span>BLEND: MULTIPLY // PAPER CUTOUT</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Boarding Stub Footer */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t-2 border-paper-ink pt-2">
        <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-wider text-paper-ink/80">
          <span>EKA RIGA • COMPUTER SCIENCE ERASMUS+</span>
          <span>•</span>
          <span>SHORTCUTS: [S] SOUND • [R] REPLAY VIDEO • [HOME] RESTART DECK</span>
        </div>
        <BarcodeStrip code="EKA-CS-FINALE-11" className="h-5" />
      </div>
    </div>
  );
};
