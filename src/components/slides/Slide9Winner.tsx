import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2 } from 'lucide-react';
import { SLIDE_9_WINNER } from '../../data/slides';
import { BarcodeStrip, PassportStamp, SplitText } from '../ui/AnimatedPrimitives';
import { soundManager } from '../../utils/sound';

interface Slide9WinnerProps {
  reducedMotion?: boolean;
  onSelectSlide: (n: number) => void;
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
          particleCount: 70,
          spread: 70,
          origin: { x: 0.5, y: 0.45 },
          colors: ['#C9472B', '#E0A526', '#3F5B3A', '#FAF6EE'],
        });
      } catch {
        // Ignore if canvas unavailable
      }
    }, 320);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <div className="relative flex h-full w-full flex-col justify-between py-2 text-paper-cream">
      {/* Soft Editorial Spotlight Circle in Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-mustard/25 bg-mustard/5"
      />

      {/* Top Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b-2 border-paper-cream/30 pb-2.5">
        <div className="flex items-center gap-3">
          <span className="border-2 border-paper-cream bg-tomato px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-widest text-paper-cream">
            {SLIDE_9_WINNER.badge}
          </span>
          <SplitText
            text={SLIDE_9_WINNER.title}
            as="h1"
            reducedMotion={reducedMotion}
            className="font-display text-2xl font-black tracking-tight text-paper-cream sm:text-4xl"
          />
        </div>

        <button
          type="button"
          onClick={() => onSelectSlide(5)}
          className="border-2 border-paper-cream bg-mustard px-3 py-1 font-mono text-xs font-extrabold uppercase text-ink transition-transform hover:-translate-y-0.5"
        >
          View Siena Slide (05)
        </button>
      </div>

      {/* Main Winner Statement Banner with Stamp "MY CHOICE" */}
      <motion.div
        initial={reducedMotion ? false : { scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="relative z-10 my-2 flex flex-wrap items-center justify-between gap-4 border-2 border-paper-cream bg-paper-cream p-5 text-ink shadow-[6px_6px_0px_#C9472B]"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-ink bg-mustard">
            <Award className="h-8 w-8 text-ink" />
          </div>
          <div>
            <div className="font-mono text-xs font-extrabold uppercase tracking-widest text-tomato">
              WINNER AMONG THE 3 UNIVERSITIES
            </div>
            <h2 className="font-display text-2xl font-black leading-tight text-ink sm:text-4xl">
              “{SLIDE_9_WINNER.statement}”
            </h2>
          </div>
        </div>

        <PassportStamp
          text={SLIDE_9_WINNER.stampText}
          variant="tomato"
          rotate={-6}
          className="text-base px-4 py-1.5"
        />
      </motion.div>

      {/* 3 Clear Verified Reasons */}
      <div className="relative z-10 my-auto grid grid-cols-1 gap-4 md:grid-cols-3">
        {SLIDE_9_WINNER.reasons.map((reason, idx) => (
          <motion.div
            key={reason.num}
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + idx * 0.12 }}
            className="flex flex-col justify-between border-2 border-paper-cream bg-ink p-4 shadow-[4px_4px_0px_#E0A526]"
          >
            <div>
              <div className="flex items-center justify-between border-b border-dashed border-paper-cream/30 pb-2">
                <span className="font-display text-2xl font-black text-mustard">
                  REASON {reason.num}
                </span>
                <CheckCircle2 className="h-5 w-5 text-mustard" />
              </div>
              <h3 className="mt-2.5 font-display text-lg font-black text-paper-cream sm:text-xl">
                {reason.title}
              </h3>
              <p className="mt-2 font-sans text-sm font-medium leading-relaxed text-paper-cream/90">
                {reason.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Honest Note About What the Other Two Do Better */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t-2 border-paper-cream/30 pt-2.5">
        <p className="font-mono text-xs font-bold text-mustard">
          ★ FAIR NOTE: {SLIDE_9_WINNER.runnerUpNote}
        </p>
        <BarcodeStrip code="SIENA-MY-CHOICE-01" className="bg-paper-cream px-2 py-0.5" />
      </div>
    </div>
  );
};
