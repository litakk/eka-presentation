import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Crown,
  Sparkles,
  Terminal,
  TrendingUp,
} from 'lucide-react';
import { PROGRAM_SLIDES, SLIDE_9_WINNER } from '../../data/slides';
import { trophyStarLottieData } from '../../assets/lottie/animations';
import { soundManager } from '../../utils/sound';
import { SplitText, TiltSpotlightCard } from '../ui/AnimatedPrimitives';
import { LottieIcon } from '../ui/LottieIcon';

interface Slide9WinnerProps {
  reducedMotion?: boolean;
  onSelectSlide: (slide: number) => void;
}

export const Slide9Winner: React.FC<Slide9WinnerProps> = ({
  reducedMotion = false,
  onSelectSlide,
}) => {
  useEffect(() => {
    soundManager.playWinnerChord();
    if (reducedMotion) return;

    const timer = window.setTimeout(() => {
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { x: 0.42, y: 0.45 },
          colors: ['#FFCC00', '#0B2A6B', '#BFD7FF', '#F6F4EC'],
          disableForReducedMotion: true,
        });
      } catch {
        // Ignore in headless environments
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [reducedMotion]);

  const triggerExtraConfetti = () => {
    if (reducedMotion) return;
    try {
      confetti({
        particleCount: 55,
        spread: 85,
        origin: { x: 0.42, y: 0.5 },
        colors: ['#FFCC00', '#0B2A6B', '#BFD7FF'],
      });
    } catch {
      // Ignore
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col justify-between gap-3.5 py-1">
      {/* Overhead Cinematic Spotlight Beam on Winner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-[15%] h-[560px] w-[520px] -rotate-6 bg-[radial-gradient(ellipse_at_top,rgba(255,204,0,0.28)_0%,rgba(255,204,0,0.06)_52%,transparent_75%)] blur-2xl"
      />

      {/* Header */}
      <div className="relative z-10 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <motion.div
            layoutId="slide-header-badge"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-eu-yellow/60 bg-eu-yellow/20 px-4 py-1 text-xs font-mono font-bold uppercase tracking-wider text-eu-yellow"
          >
            <Crown className="h-3.5 w-3.5 text-eu-yellow" />
            <span>{SLIDE_9_WINNER.badge}</span>
          </motion.div>

          <span className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-eu-sky/25 bg-eu-navy/85 px-2.5 py-1 font-mono text-[11px] text-eu-sky">
            <Terminal className="h-3.5 w-3.5 text-eu-yellow" />
            <span>$ {SLIDE_9_WINNER.terminalCmd}</span>
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl xl:text-[58px] font-extrabold leading-[1.06] tracking-tight text-eu-light">
          <SplitText
            text={SLIDE_9_WINNER.title}
            delay={0.05}
            reducedMotion={reducedMotion}
          />
        </h1>
      </div>

      {/* Main Content: Winner Card (scaled up with glowing yellow outline) + 4 Dimmed Contenders */}
      <div className="relative z-10 grid flex-1 grid-cols-1 lg:grid-cols-12 gap-5 items-center min-h-0">
        {/* Left 7 Cols: Winner Spotlight Card (University of Siena) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1.01, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <TiltSpotlightCard
            theme="dark"
            highlight
            codeTitle="// winner_verdict_siena_cs.json"
            reducedMotion={reducedMotion}
          >
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-eu-yellow/30 pb-3.5 mb-4">
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    onClick={triggerExtraConfetti}
                    title="Click for confetti burst"
                    className="h-13 w-13 rounded-2xl bg-eu-navy border-2 border-eu-yellow flex items-center justify-center shadow-[0_0_24px_rgba(255,204,0,0.45)]"
                  >
                    <LottieIcon
                      animationData={trophyStarLottieData}
                      loop={!reducedMotion}
                      autoplay={!reducedMotion}
                      size={44}
                    />
                  </button>
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-eu-yellow px-2.5 py-0.5 font-mono text-xs font-extrabold uppercase tracking-wider text-eu-navy">
                      <Sparkles className="h-3.5 w-3.5" />
                      WINNER: {SLIDE_9_WINNER.winnerShort}
                    </span>
                    <h2 className="mt-1 font-display text-2xl sm:text-4xl font-extrabold text-eu-light">
                      {SLIDE_9_WINNER.winnerUniversity}
                    </h2>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-eu-sky">
                    Living Cost
                  </div>
                  <div className="font-mono text-lg sm:text-xl font-extrabold text-eu-yellow">
                    {SLIDE_9_WINNER.winnerCost}
                  </div>
                  <div className="text-xs text-eu-sky max-w-[290px]">
                    {SLIDE_9_WINNER.winnerProgram}
                  </div>
                </div>
              </div>

              {/* Three Reasons */}
              <div className="space-y-2.5">
                {SLIDE_9_WINNER.reasons.map((reason, idx) => (
                  <motion.div
                    key={reason.title}
                    initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.28 + idx * 0.11 }}
                    className="flex items-start gap-3 rounded-xl border border-eu-yellow/25 bg-eu-navy/75 p-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-eu-yellow mt-0.5" />
                    <div>
                      <h3 className="font-display text-base xl:text-lg font-bold text-eu-yellow">
                        {reason.title}
                      </h3>
                      <p className="font-sans text-xs xl:text-sm text-eu-light/95 leading-snug">
                        {reason.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltSpotlightCard>
        </motion.div>

        {/* Right 5 Cols: Other 4 Programs Dimmed for Contrast + Runner-Up Notes */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-eu-sky/85">
            // Other 4 contenders compared:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PROGRAM_SLIDES.filter((p) => p.id !== 'siena').map((prog, idx) => (
              <motion.button
                key={prog.id}
                type="button"
                onClick={() => onSelectSlide(prog.slideNumber)}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.55, scale: 0.97 }}
                whileHover={{ opacity: 0.98, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.22 + idx * 0.08 }}
                className="rounded-xl border border-eu-sky/20 bg-eu-navy/75 p-3.5 text-left transition-all focus:outline-none focus:ring-2 focus:ring-eu-yellow"
              >
                <div className="flex items-center justify-between font-mono text-[11px] font-bold text-eu-sky">
                  <span>0{prog.programNumber}. {prog.city}</span>
                  <span className="text-eu-yellow">{prog.overallRating.split(' ')[0]}</span>
                </div>
                <div className="mt-1 font-display text-sm font-bold text-eu-light truncate">
                  {prog.university}
                </div>
                <div className="mt-0.5 font-mono text-xs text-eu-yellow font-semibold">
                  {prog.livingCost}
                </div>
                <div className="mt-0.5 text-[11px] text-eu-sky/80 truncate">
                  {prog.itRelevance}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Runner-up callout (Urbino & Milan) */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="rounded-xl border border-eu-sky/30 bg-eu-blue/85 p-3.5 flex items-start gap-2.5"
          >
            <TrendingUp className="h-5 w-5 shrink-0 text-eu-yellow mt-0.5" />
            <p className="font-sans text-xs xl:text-sm font-semibold text-eu-light leading-snug">
              {SLIDE_9_WINNER.runnerUpNote}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
