import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, Cpu, MessageSquare } from 'lucide-react';
import { SLIDE_2_HOOK } from '../../data/slides';
import { BarcodeStrip, PassportStamp } from '../ui/AnimatedPrimitives';

interface Slide2HookProps {
  reducedMotion?: boolean;
}

export const Slide2Hook: React.FC<Slide2HookProps> = ({ reducedMotion = false }) => {
  const fullQuestion = SLIDE_2_HOOK.question;
  const [typedText, setTypedText] = useState<string>(
    reducedMotion ? fullQuestion : ''
  );

  useEffect(() => {
    if (reducedMotion) {
      setTypedText(fullQuestion);
      return;
    }
    setTypedText('');
    let idx = 0;
    const timer = window.setInterval(() => {
      idx += 2;
      setTypedText(fullQuestion.slice(0, idx));
      if (idx >= fullQuestion.length) {
        window.clearInterval(timer);
      }
    }, 28);
    return () => window.clearInterval(timer);
  }, [fullQuestion, reducedMotion]);

  const hintIcons = [Compass, Users, Cpu];

  return (
    <div className="relative flex h-full w-full flex-col justify-between py-2">
      {/* Flying Paper Plane Trail Across the Top While Question Types Out */}
      <div className="relative flex items-center justify-between border-b-2 border-ink pb-3">
        <div className="flex items-center gap-2.5">
          <span className="border-2 border-ink bg-tomato px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-paper-cream shadow-ink-sm">
            {SLIDE_2_HOOK.badge}
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/70">
            ASK 2–3 CLASSMATES
          </span>
        </div>

        {!reducedMotion && (
          <motion.div
            initial={{ x: -240, y: 6, rotate: -6, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: 4, opacity: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="hidden items-center gap-2 sm:flex"
          >
            <span className="border-t-2 border-dashed border-tomato w-28" />
            <svg width="38" height="38" viewBox="0 0 64 64" fill="none">
              <path
                d="M6 30 L58 10 L38 56 L28 36 L6 30 Z"
                fill="#FAF6EE"
                stroke="#1B1B18"
                strokeWidth="2.8"
              />
              <path
                d="M58 10 L28 36 L34 48"
                fill="#C9472B"
                stroke="#1B1B18"
                strokeWidth="2.2"
              />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Center Stage: Big Visual Discussion Question */}
      <div className="my-auto flex flex-col items-start justify-center">
        <div className="relative w-full border-2 border-ink bg-paper-cream p-6 shadow-ink-lg sm:p-10">
          <div aria-hidden="true" className="masking-tape" />

          <div className="mb-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-tomato">
              <MessageSquare className="h-4 w-4" />
              QUESTION FOR THE CLASS
            </span>
            <PassportStamp text="0 EUR TUITION" variant="olive" rotate={3} />
          </div>

          <h1 className="font-display text-3xl font-black leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            “{typedText}”
            <span className="terminal-cursor ml-1 text-tomato">_</span>
          </h1>

          {/* Three Small Hints That Animate In */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SLIDE_2_HOOK.hints.map((hint, idx) => {
              const Icon = hintIcons[idx] || Compass;
              const bgColors = ['bg-mustard', 'bg-sky-pale', 'bg-paper-bg'];
              return (
                <motion.div
                  key={hint}
                  initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: reducedMotion ? 0 : 0.9 + idx * 0.22,
                    type: 'spring',
                    stiffness: 280,
                    damping: 18,
                  }}
                  className={`flex items-center gap-3 border-2 border-ink ${bgColors[idx]} px-4 py-3.5 shadow-ink-sm`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink bg-paper-cream">
                    <Icon className="h-5 w-5 text-ink" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/70">
                      HINT 0{idx + 1}
                    </div>
                    <div className="font-display text-xl font-black text-ink sm:text-2xl">
                      {hint}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Cue Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-ink pt-2.5">
        <div className="inline-flex items-center gap-2 border-2 border-ink bg-olive px-3.5 py-1 font-display text-base font-black tracking-wide text-paper-cream shadow-ink-sm">
          <span>➔ {SLIDE_2_HOOK.closingCue}</span>
        </div>
        <BarcodeStrip code="HOOK-EUROPE-IT" />
      </div>
    </div>
  );
};
