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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Slide Overview Grid"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-paper p-6 sm:p-10 text-ink overflow-y-auto border-8 border-ink print:hidden"
        >
          {/* Header */}
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-b-2 border-ink pb-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink bg-tomato text-paper shadow-ink-sm">
                <Plane className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-serif text-xl sm:text-3xl font-black text-ink">
                  Slide Overview • 11 Boarding Cards
                </h2>
                <p className="font-mono text-xs text-ink/75">
                  Click any card to jump directly • Press O or Esc to close
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <a
                href="/Erasmus-Italy-5-Study-Programs-Slides.pdf"
                download="Erasmus-Italy-5-Study-Programs-Slides.pdf"
                className="border-2 border-ink bg-mustard px-3.5 py-2 font-mono text-xs sm:text-sm font-extrabold text-ink shadow-ink-sm hover:bg-tomato hover:text-paper transition-colors"
              >
                Download PDF Backup
              </a>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close slide overview"
                className="border-2 border-ink bg-cream px-4 py-2 font-mono text-sm font-bold text-ink shadow-ink-sm hover:bg-tomato hover:text-paper flex items-center gap-2"
              >
                <span>Close</span>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 11-Slide Grid */}
          <div className="mx-auto my-5 grid w-full max-w-7xl grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {ALL_SLIDES_METADATA.map((s, idx) => {
              const isCurrent = s.slideNumber === currentSlide;

              return (
                <motion.button
                  key={s.id}
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.025, duration: 0.22 }}
                  onClick={() => {
                    onSelectSlide(s.slideNumber);
                    onClose();
                  }}
                  className={`group relative flex flex-col justify-between border-2 border-ink p-4 text-left transition-transform hover:-translate-y-0.5 ${
                    isCurrent
                      ? 'bg-mustard text-ink shadow-ink'
                      : 'bg-cream text-ink shadow-ink-sm hover:bg-paleblue/50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={`border border-ink px-2 py-0.5 font-mono text-xs font-extrabold uppercase tracking-wider ${
                        isCurrent
                          ? 'bg-tomato text-paper'
                          : 'bg-ink text-paper'
                      }`}
                    >
                      Slide {String(s.slideNumber).padStart(2, '0')} / 11
                    </span>
                    <span className="font-mono text-[11px] font-bold opacity-75">
                      {s.hash}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-black leading-snug mb-1 text-ink">
                      {s.title}
                    </h3>
                    <p className="font-sans text-xs font-medium text-ink/80 line-clamp-2">
                      {s.subtitle}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Shortcut Legend Footer */}
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 border-t-2 border-ink pt-3 font-mono text-xs text-ink">
            <div className="flex flex-wrap items-center gap-3">
              <span>[←/→/Space] Navigate</span>
              <span>[N] Speaker Notes</span>
              <span>[F] Fullscreen</span>
              <span>[M/S] Sound Toggle</span>
              <span>[R] Restart</span>
              <span>[O/Esc] Overview</span>
            </div>
            <span className="font-bold">EKA University of Applied Sciences • CS / IT Track</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
