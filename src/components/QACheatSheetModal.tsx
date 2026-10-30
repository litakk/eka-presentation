import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, HelpCircle, Languages } from 'lucide-react';
import { QA_CHEAT_SHEET } from '../data/slides';

interface QACheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QACheatSheetModal: React.FC<QACheatSheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showUzbek, setShowUzbek] = useState(false);

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
          aria-label="Teacher Q&A Cheat Sheet"
        >
          <motion.div
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            className="flex max-h-[88vh] w-full max-w-4xl flex-col border-2 border-ink bg-paper-bg text-ink shadow-ink-lg"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink bg-paper-cream px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-olive px-3 py-1 font-mono text-xs font-extrabold uppercase text-paper-cream">
                  <HelpCircle className="h-3.5 w-3.5" />
                  KEY [Q] • Q&amp;A CHEAT SHEET
                </span>
                <h2 className="font-display text-xl font-black text-ink sm:text-2xl">
                  7 Likely Teacher Questions (2-Sentence Answers)
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowUzbek((prev) => !prev)}
                  className="inline-flex items-center gap-1 border-2 border-ink bg-mustard px-2.5 py-1 font-mono text-xs font-extrabold text-ink"
                >
                  <Languages className="h-3.5 w-3.5" />
                  <span>{showUzbek ? 'Hide UZ' : 'Show UZ'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="border-2 border-ink bg-paper-bg px-3 py-1 font-mono text-xs font-extrabold uppercase text-ink hover:bg-tomato hover:text-paper-cream"
                >
                  <span className="inline-flex items-center gap-1">
                    <X className="h-4 w-4" /> Close (Q / Esc)
                  </span>
                </button>
              </div>
            </div>

            {/* Q&A Items */}
            <div className="flex-1 space-y-3.5 overflow-y-auto p-5">
              {QA_CHEAT_SHEET.map((item) => (
                <div
                  key={item.id}
                  className="border-2 border-ink bg-paper-cream p-4 shadow-ink-sm"
                >
                  <h3 className="font-display text-lg font-black text-tomato">
                    {item.question}
                  </h3>
                  <p className="mt-1.5 font-sans text-sm font-bold leading-relaxed text-ink sm:text-base">
                    {item.answer}
                  </p>
                  {showUzbek && (
                    <p className="mt-2 border-t border-dashed border-ink/30 pt-2 font-sans text-xs font-semibold text-ink/80">
                      <span className="font-mono font-extrabold text-olive">UZ: </span>
                      {item.uzbek}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t-2 border-ink bg-paper-cream px-5 py-2.5 font-mono text-xs font-bold text-ink/80">
              <span>
                IF ANYTHING ELSE IS UNKNOWN: “I would check this with the EKA Erasmus+ coordinator.”
              </span>
              <span>PRESS [Q] ANYTIME</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
