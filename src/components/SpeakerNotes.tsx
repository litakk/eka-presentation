import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Clock, Eye, ArrowRight, Languages } from 'lucide-react';
import { SPEAKING_SCRIPTS } from '../data/slides';

interface SpeakerNotesProps {
  isOpen: boolean;
  slideNumber: number;
  onClose: () => void;
}

export const SpeakerNotes: React.FC<SpeakerNotesProps> = ({
  isOpen,
  slideNumber,
  onClose,
}) => {
  const [showUzbek, setShowUzbek] = useState(false);
  const script =
    SPEAKING_SCRIPTS[slideNumber - 1] || SPEAKING_SCRIPTS[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.22 }}
          className="fixed bottom-14 left-4 right-4 z-50 mx-auto max-w-4xl border-2 border-ink bg-paper-cream p-5 text-ink shadow-ink-lg print:hidden"
          aria-label="Speaker Notes Panel"
        >
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="border-2 border-ink bg-tomato px-2.5 py-0.5 font-mono text-xs font-extrabold uppercase text-paper-cream">
                SPEAKER NOTES // #slide-{slideNumber}
              </span>
              <span className=" font-display text-base font-black text-ink sm:text-lg">
                {script.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 border border-ink bg-mustard px-2.5 py-0.5 font-mono text-xs font-extrabold text-ink">
                <Clock className="h-3.5 w-3.5" />
                {script.timeRange} ({script.durationSeconds}s)
              </span>

              <button
                type="button"
                onClick={() => setShowUzbek((prev) => !prev)}
                className="inline-flex items-center gap-1 border border-ink bg-paper-bg px-2.5 py-0.5 font-mono text-xs font-bold text-ink hover:bg-sky-pale"
                title="Toggle Uzbek translation for study"
              >
                <Languages className="h-3.5 w-3.5" />
                <span>{showUzbek ? 'Hide UZ' : 'UZ Hint'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="border border-ink bg-paper-bg p-1 text-ink hover:bg-tomato hover:text-paper-cream"
                aria-label="Close speaker notes"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Goal & On-Screen Order */}
          <div className="mt-2.5 grid grid-cols-1 gap-3 border-b border-dashed border-ink/35 pb-2.5 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-olive">
                SLIDE GOAL
              </div>
              <p className="mt-0.5 font-sans text-xs font-bold text-ink/90 sm:text-sm">
                {script.goal}
              </p>
            </div>

            <div className="md:col-span-7">
              <div className="flex items-center gap-1 font-mono text-[10px] font-extrabold uppercase tracking-wider text-tomato">
                <Eye className="h-3 w-3" />
                <span>WHAT APPEARS ON SCREEN (IN ORDER)</span>
              </div>
              <ul className="mt-0.5 space-y-0.5 font-mono text-[11px] font-medium text-ink/85">
                {script.onScreenOrder.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Exact Words to Say */}
          <div className="mt-3">
            <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-tomato">
              EXACT WORDS TO SAY (B1 ENGLISH):
            </div>
            <p className="mt-1 font-sans text-base font-bold leading-relaxed text-ink sm:text-lg">
              {script.exactWords}
            </p>
          </div>

          {/* Transition Sentence to Next Slide */}
          <div className="mt-2.5 flex items-center gap-2 border-t border-dashed border-ink/35 pt-2 font-mono text-xs font-extrabold text-olive">
            <ArrowRight className="h-4 w-4 shrink-0" />
            <span>TRANSITION: “{script.transitionSentence}”</span>
          </div>

          {/* Optional Study Uzbek Translation (Hidden by Default) */}
          {showUzbek && (
            <div className="mt-2.5 border-2 border-ink bg-sky-pale/40 p-2.5 font-sans text-xs font-semibold text-ink">
              <span className="font-mono font-extrabold uppercase text-ink">
                O‘ZBEKCHA TARJIMA (TUSHUNISH UCHUN):{' '}
              </span>
              {script.uzbekTranslation}
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
