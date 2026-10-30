import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mic, X } from 'lucide-react';
import { ALL_SLIDES_METADATA } from '../data/slides';

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
  const slideMeta =
    ALL_SLIDES_METADATA.find((s) => s.slideNumber === slideNumber) ||
    ALL_SLIDES_METADATA[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ opacity: 0, y: 20, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-label="Presenter Speaker Notes"
          className="fixed bottom-16 right-6 z-50 w-[min(460px,92vw)] border-2 border-ink bg-cream p-5 text-ink shadow-ink-lg print:hidden"
        >
          <div
            aria-hidden="true"
            className="tape-strip pointer-events-none absolute -top-2.5 left-1/2 h-5 w-24 -translate-x-1/2 rotate-1"
          />

          <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center border border-ink bg-tomato text-paper">
                <Mic className="h-4 w-4" />
              </span>
              <div>
                <h4 className="font-mono text-xs font-extrabold uppercase tracking-wider text-tomato">
                  Speaker Cue Card • Slide {slideNumber}/11
                </h4>
                <p className="font-serif text-xs font-bold text-ink">{slideMeta.title}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close speaker notes (shortcut N)"
              className="border border-ink bg-paper p-1 text-ink hover:bg-tomato hover:text-paper"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="font-sans text-base font-medium leading-relaxed text-ink">
            “{slideMeta.speakerNotes}”
          </p>

          <div className="mt-3 flex items-center justify-between border-t border-ink/25 pt-2 font-mono text-[11px] text-ink/75">
            <span>Press N to hide • Arrow keys / Space to advance</span>
            <span className="font-bold text-tomato">{slideMeta.hash}</span>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
