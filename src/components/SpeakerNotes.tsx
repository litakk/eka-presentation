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
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="dialog"
          aria-label="Presenter Speaker Notes"
          className="fixed bottom-16 right-6 z-50 w-[min(460px,92vw)] rounded-2xl border-2 border-eu-yellow/70 bg-eu-navy/95 p-5 text-eu-light shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl print:hidden"
        >
          <div className="flex items-center justify-between border-b border-eu-sky/20 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-eu-yellow text-eu-navy">
                <Mic className="h-4 w-4" />
              </span>
              <div>
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-eu-yellow">
                  Speaker Notes • Slide {slideNumber}/10
                </h4>
                <p className="text-xs text-eu-sky">{slideMeta.title}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close speaker notes (shortcut N)"
              className="rounded-lg p-1.5 text-eu-sky hover:bg-eu-blue hover:text-eu-light focus:outline-none focus:ring-2 focus:ring-eu-yellow"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="font-sans text-base leading-relaxed text-eu-light">
            “{slideMeta.speakerNotes}”
          </p>

          <div className="mt-3 flex items-center justify-between border-t border-eu-sky/15 pt-2 text-[11px] text-eu-sky/80">
            <span>Press N to hide • Arrow keys / Space to advance</span>
            <span className="font-mono text-eu-yellow">{slideMeta.hash}</span>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

