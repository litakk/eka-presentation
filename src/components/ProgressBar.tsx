import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Grid,
  HelpCircle,
  Maximize2,
  Mic,
  RotateCcw,
  Timer,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ALL_SLIDES_METADATA, SlideTheme } from '../data/slides';

interface ProgressBarProps {
  currentSlide: number;
  totalSlides: number;
  theme: SlideTheme;
  notesOpen: boolean;
  scriptOpen?: boolean;
  qaOpen?: boolean;
  rehearsalOpen?: boolean;
  soundEnabled: boolean;
  onSelectSlide: (slide: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleNotes: () => void;
  onToggleScript?: () => void;
  onToggleQA?: () => void;
  onToggleRehearsal?: () => void;
  onToggleOverview: () => void;
  onToggleSound: () => void;
  onRestart: () => void;
  onToggleFullscreen: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentSlide,
  totalSlides,
  notesOpen,
  scriptOpen = false,
  qaOpen = false,
  rehearsalOpen = false,
  soundEnabled,
  onSelectSlide,
  onPrev,
  onNext,
  onToggleNotes,
  onToggleScript,
  onToggleQA,
  onToggleRehearsal,
  onToggleOverview,
  onToggleSound,
  onRestart,
  onToggleFullscreen,
}) => {
  const progressPct = (currentSlide / totalSlides) * 100;

  return (
    <>
      {/* Top Flat Editorial Progress Bar */}
      <div
        className="fixed left-0 right-0 top-0 z-50 h-2 border-b-2 border-ink bg-paper print:hidden"
        role="progressbar"
        aria-valuenow={currentSlide}
        aria-valuemin={1}
        aria-valuemax={totalSlides}
        aria-label={`Presentation progress: slide ${currentSlide} of ${totalSlides}`}
      >
        <motion.div
          className="h-full bg-tomato"
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>

      {/* Bottom Editorial Control Strip */}
      <footer
        aria-label="Slide navigation controls"
        className="fixed bottom-0 left-0 right-0 z-40 flex h-12 items-center justify-between border-t-2 border-ink bg-cream px-4 text-ink sm:px-8 print:hidden"
      >
        {/* Left: Slide Counter + Current Title */}
        <div className="flex items-center gap-3">
          <span
            data-testid="slide-counter"
            className="border-2 border-ink bg-mustard px-2.5 py-0.5 font-mono text-xs font-extrabold tracking-wider text-ink shadow-[2px_2px_0px_#1B1B18] sm:text-sm"
          >
            {String(currentSlide).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
          <span className="hidden max-w-[260px] truncate font-mono text-xs font-bold uppercase tracking-wider text-ink/80 lg:inline-block">
            {ALL_SLIDES_METADATA[currentSlide - 1]?.title}
          </span>
        </div>

        {/* Center: Clickable Progress Ticket Dots (1..10) */}
        <nav
          aria-label="Slide progress dots"
          className="flex items-center gap-1 sm:gap-1.5"
        >
          {ALL_SLIDES_METADATA.map((s) => {
            const active = s.slideNumber === currentSlide;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSlide(s.slideNumber)}
                aria-label={`Go to slide ${s.slideNumber}: ${s.title}`}
                aria-current={active ? 'step' : undefined}
                title={`${s.slideNumber}. ${s.title}`}
                className="group p-0.5 focus:outline-none"
              >
                <span
                  className={`block border border-ink transition-all duration-200 ${
                    active
                      ? 'h-3 w-6 bg-tomato shadow-[2px_2px_0px_#1B1B18]'
                      : 'h-2.5 w-2.5 bg-paper group-hover:bg-mustard'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right: Keyboard Shortcut Buttons & Prev/Next */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentSlide <= 1}
            aria-label="Previous slide"
            title="Previous slide (←)"
            className="border border-ink bg-paper p-1.5 hover:bg-mustard focus:outline-none disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={currentSlide >= totalSlides}
            aria-label="Next slide"
            title="Next slide (→ or Space)"
            className="border border-ink bg-paper p-1.5 hover:bg-mustard focus:outline-none disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="mx-1 hidden h-5 w-0.5 bg-ink/30 sm:block" />

          <button
            type="button"
            onClick={onToggleNotes}
            aria-label="Toggle speaker notes (N)"
            aria-pressed={notesOpen}
            title="Speaker Notes (N)"
            className={`border border-ink p-1.5 transition-colors focus:outline-none ${
              notesOpen
                ? 'bg-tomato font-bold text-paper'
                : 'bg-paper hover:bg-mustard'
            }`}
          >
            <Mic className="h-4 w-4" />
          </button>

          {onToggleScript && (
            <button
              type="button"
              onClick={onToggleScript}
              aria-label="Toggle full speaking script (P)"
              aria-pressed={scriptOpen}
              title="Full Speaking Script (P)"
              className={`border border-ink p-1.5 transition-colors focus:outline-none ${
                scriptOpen
                  ? 'bg-tomato font-bold text-paper'
                  : 'bg-paper hover:bg-mustard'
              }`}
            >
              <FileText className="h-4 w-4" />
            </button>
          )}

          {onToggleQA && (
            <button
              type="button"
              onClick={onToggleQA}
              aria-label="Toggle Q&A Cheat Sheet (Q)"
              aria-pressed={qaOpen}
              title="Teacher Q&A Cheat Sheet (Q)"
              className={`border border-ink p-1.5 transition-colors focus:outline-none ${
                qaOpen
                  ? 'bg-olive font-bold text-paper'
                  : 'bg-paper hover:bg-mustard'
              }`}
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          )}

          {onToggleRehearsal && (
            <button
              type="button"
              onClick={onToggleRehearsal}
              aria-label="Toggle Rehearsal Timer (T)"
              aria-pressed={rehearsalOpen}
              title="Rehearsal Timer Mode (T)"
              className={`border border-ink p-1.5 transition-colors focus:outline-none ${
                rehearsalOpen
                  ? 'bg-olive font-bold text-paper'
                  : 'bg-paper hover:bg-mustard'
              }`}
            >
              <Timer className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onToggleOverview}
            aria-label="Toggle slide overview grid (O)"
            title="Slide Overview (O or Esc)"
            className="border border-ink bg-paper p-1.5 hover:bg-mustard focus:outline-none"
          >
            <Grid className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute UI sounds (M or S)' : 'Unmute UI sounds (M or S)'}
            aria-pressed={soundEnabled}
            title="Toggle Sound (M or S)"
            className={`hidden border border-ink p-1.5 transition-colors focus:outline-none sm:inline-flex ${
              soundEnabled
                ? 'bg-olive text-paper'
                : 'bg-paper hover:bg-mustard'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={onRestart}
            aria-label="Restart presentation (Home)"
            title="Restart (Home)"
            className="hidden border border-ink bg-paper p-1.5 hover:bg-mustard focus:outline-none sm:inline-flex"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-label="Toggle fullscreen (F)"
            title="Fullscreen (F)"
            className="hidden border border-ink bg-paper p-1.5 hover:bg-mustard focus:outline-none sm:inline-flex"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </>
  );
};
