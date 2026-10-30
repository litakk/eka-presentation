import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Clock, FileText, ArrowRight } from 'lucide-react';
import { SPEAKING_SCRIPTS, PRESENTATION_META } from '../data/slides';

interface ScriptModalProps {
  isOpen: boolean;
  currentSlide: number;
  onSelectSlide: (slideNumber: number) => void;
  onClose: () => void;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 sm:p-6 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Full Presentation Speaking Script Overview"
        >
          <motion.div
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            className="flex max-h-[88vh] w-full max-w-5xl flex-col border-2 border-ink bg-paper-bg text-ink shadow-ink-lg"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink bg-paper-cream px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-tomato px-3 py-1 font-mono text-xs font-extrabold uppercase text-paper-cream">
                  <FileText className="h-3.5 w-3.5" />
                  KEY [P] • FULL SPEAKING SCRIPT
                </span>
                <h2 className="font-display text-xl font-black text-ink sm:text-2xl">
                  All 10 Slides with Timing ({PRESENTATION_META.targetDurationMinutes})
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="border-2 border-ink bg-paper-bg px-3 py-1 font-mono text-xs font-extrabold uppercase text-ink hover:bg-tomato hover:text-paper-cream"
              >
                <span className="inline-flex items-center gap-1">
                  <X className="h-4 w-4" /> Close (P / Esc)
                </span>
              </button>
            </div>

            {/* Scrollable Script List */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {SPEAKING_SCRIPTS.map((item) => {
                const isActive = item.slideNumber === currentSlide;
                return (
                  <div
                    key={item.slideNumber}
                    className={`border-2 border-ink p-4 shadow-ink-sm ${
                      isActive ? 'bg-mustard/25' : 'bg-paper-cream'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-ink/35 pb-2">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSlide(item.slideNumber);
                            onClose();
                          }}
                          className="border-2 border-ink bg-ink px-2.5 py-0.5 font-mono text-xs font-extrabold text-paper-cream hover:bg-tomato"
                        >
                          Go to Slide {String(item.slideNumber).padStart(2, '0')}
                        </button>
                        <h3 className="font-display text-lg font-black text-ink">
                          {item.title}
                        </h3>
                      </div>

                      <span className="inline-flex items-center gap-1 border border-ink bg-mustard px-2.5 py-0.5 font-mono text-xs font-extrabold text-ink">
                        <Clock className="h-3.5 w-3.5" />
                        {item.timeRange} ({item.durationSeconds}s)
                      </span>
                    </div>

                    <div className="mt-2 font-mono text-xs font-bold text-olive">
                      Goal: {item.goal}
                    </div>

                    <div className="mt-2 rounded-none border border-ink/25 bg-paper-bg p-2.5 font-mono text-[11px] text-ink/85">
                      <div className="font-extrabold uppercase text-tomato">
                        On Screen Order:
                      </div>
                      {item.onScreenOrder.map((step) => (
                        <div key={step}>{step}</div>
                      ))}
                    </div>

                    <p className="mt-2.5 font-sans text-sm font-bold leading-relaxed text-ink sm:text-base">
                      {item.exactWords}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5 font-mono text-xs font-extrabold text-olive">
                      <ArrowRight className="h-3.5 w-3.5" />
                      <span>Transition: “{item.transitionSentence}”</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-ink bg-paper-cream px-5 py-2.5 font-mono text-xs font-bold text-ink/80">
              <span>
                PRINTABLE FILE IN PROJECT ROOT: SCRIPT.md (WITH FULL UZBEK TRANSLATIONS &amp; Q&amp;A)
              </span>
              <span>TOTAL TARGET: 9:00 (540 SECONDS)</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
