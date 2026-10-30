import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plane, X } from 'lucide-react';
import { ALL_SLIDES_METADATA } from '../data/slides';

interface OverviewProps {
  isOpen: boolean;
  currentSlide: number;
  onSelectSlide: (slide: number) => void;
  onClose: () => void;
}

export const Overview: React.FC<OverviewProps> = ({
  isOpen,
  currentSlide,
  onSelectSlide,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Slide Overview Grid"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-eu-navy/95 p-6 sm:p-10 text-eu-light overflow-y-auto print:hidden"
        >
          {/* Header */}
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-eu-sky/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-eu-yellow text-eu-navy">
                <Plane className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-eu-light">
                  Slide Overview • Erasmus+ in Italy
                </h2>
                <p className="text-xs sm:text-sm text-eu-sky">
                  Click any slide to jump directly • Press O or Esc to close
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <a
                href="/Erasmus-Italy-5-Study-Programs-Slides.pdf"
                download="Erasmus-Italy-5-Study-Programs-Slides.pdf"
                className="rounded-xl border border-eu-yellow/50 bg-eu-yellow/15 px-3.5 py-2 font-display text-xs sm:text-sm font-bold text-eu-yellow hover:bg-eu-yellow hover:text-eu-navy transition-colors"
              >
                Download PDF Backup
              </a>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close slide overview"
                className="rounded-xl border border-eu-sky/30 bg-eu-blue/60 px-4 py-2 font-display text-sm font-bold text-eu-light hover:border-eu-yellow hover:text-eu-yellow focus:outline-none focus:ring-2 focus:ring-eu-yellow flex items-center gap-2"
              >
                <span>Close</span>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 10-Slide Grid */}
          <div className="mx-auto my-6 grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ALL_SLIDES_METADATA.map((s, idx) => {
              const isCurrent = s.slideNumber === currentSlide;
              const isSlideDark = s.theme === 'dark';

              return (
                <motion.button
                  key={s.id}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.3 }}
                  onClick={() => {
                    onSelectSlide(s.slideNumber);
                    onClose();
                  }}
                  className={`group relative flex flex-col justify-between rounded-2xl p-5 text-left transition-all focus:outline-none focus:ring-2 focus:ring-eu-yellow ${
                    isCurrent
                      ? 'border-2 border-eu-yellow bg-eu-blue shadow-[0_0_30px_rgba(255,204,0,0.3)] scale-[1.02]'
                      : isSlideDark
                      ? 'border border-eu-sky/25 bg-eu-blue/55 hover:border-eu-yellow/70 hover:bg-eu-blue/80'
                      : 'border border-eu-sky/35 bg-eu-light text-eu-navy hover:border-eu-yellow'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-4">
                    <span
                      className={`font-display text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        isCurrent
                          ? 'bg-eu-yellow text-eu-navy'
                          : isSlideDark
                          ? 'bg-eu-navy/80 text-eu-yellow'
                          : 'bg-eu-blue text-eu-yellow'
                      }`}
                    >
                      Slide {String(s.slideNumber).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[11px] opacity-65">
                      {s.hash}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`font-display text-base font-bold leading-snug mb-1 ${
                        isCurrent || isSlideDark ? 'text-eu-light' : 'text-eu-navy'
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`text-xs line-clamp-2 ${
                        isCurrent || isSlideDark
                          ? 'text-eu-sky'
                          : 'text-eu-blue/80'
                      }`}
                    >
                      {s.subtitle}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Shortcut Legend Footer */}
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-eu-sky/20 pt-4 text-xs text-eu-sky">
            <div className="flex flex-wrap items-center gap-4">
              <span>
                <kbd className="rounded bg-eu-blue px-2 py-0.5 font-mono text-eu-yellow">
                  ← / → / Space
                </kbd>{' '}
                Navigate
              </span>
              <span>
                <kbd className="rounded bg-eu-blue px-2 py-0.5 font-mono text-eu-yellow">
                  N
                </kbd>{' '}
                Speaker Notes
              </span>
              <span>
                <kbd className="rounded bg-eu-blue px-2 py-0.5 font-mono text-eu-yellow">
                  F
                </kbd>{' '}
                Fullscreen
              </span>
              <span>
                <kbd className="rounded bg-eu-blue px-2 py-0.5 font-mono text-eu-yellow">
                  M
                </kbd>{' '}
                Sound Toggle
              </span>
              <span>
                <kbd className="rounded bg-eu-blue px-2 py-0.5 font-mono text-eu-yellow">
                  R
                </kbd>{' '}
                Restart
              </span>
              <span>
                <kbd className="rounded bg-eu-blue px-2 py-0.5 font-mono text-eu-yellow">
                  O / Esc
                </kbd>{' '}
                Overview
              </span>
            </div>
            <span>EKA University of Applied Sciences • Erasmus+ Italy</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
