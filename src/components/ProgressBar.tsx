import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  Maximize2,
  Mic,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ALL_SLIDES_METADATA, SlideTheme } from '../data/slides';

interface ProgressBarProps {
  currentSlide: number;
  totalSlides: number;
  theme: SlideTheme;
  notesOpen: boolean;
  soundEnabled: boolean;
  onSelectSlide: (slide: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleNotes: () => void;
  onToggleOverview: () => void;
  onToggleSound: () => void;
  onRestart: () => void;
  onToggleFullscreen: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentSlide,
  totalSlides,
  theme,
  notesOpen,
  soundEnabled,
  onSelectSlide,
  onPrev,
  onNext,
  onToggleNotes,
  onToggleOverview,
  onToggleSound,
  onRestart,
  onToggleFullscreen,
}) => {
  const progressPct = (currentSlide / totalSlides) * 100;
  const isDark = theme === 'dark';

  return (
    <>
      {/* Top Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-eu-navy/35 print:hidden"
        role="progressbar"
        aria-valuenow={currentSlide}
        aria-valuemin={1}
        aria-valuemax={totalSlides}
        aria-label={`Presentation progress: slide ${currentSlide} of ${totalSlides}`}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-eu-sky via-eu-yellow to-eu-yellow shadow-[0_0_12px_rgba(255,204,0,0.85)]"
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Bottom Navigation Bar & Slide Counter */}
      <footer
        aria-label="Slide navigation controls"
        className={`fixed bottom-0 left-0 right-0 z-40 flex h-12 items-center justify-between px-4 sm:px-8 backdrop-blur-md border-t transition-colors duration-500 print:hidden ${
          isDark
            ? 'bg-eu-navy/85 border-eu-sky/15 text-eu-light'
            : 'bg-eu-light/90 border-eu-blue/15 text-eu-navy'
        }`}
      >
        {/* Left: Slide Counter + Current Title */}
        <div className="flex items-center gap-3">
          <span
            data-testid="slide-counter"
            className={`font-display text-sm font-extrabold tracking-wider px-2.5 py-0.5 rounded-md ${
              isDark
                ? 'bg-eu-yellow text-eu-navy'
                : 'bg-eu-blue text-eu-yellow'
            }`}
          >
            {String(currentSlide).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
          <span className="hidden md:inline-block font-display text-xs font-semibold uppercase tracking-wider opacity-80 truncate max-w-[260px]">
            {ALL_SLIDES_METADATA[currentSlide - 1]?.title}
          </span>
        </div>

        {/* Center: Clickable Progress Dots */}
        <nav
          aria-label="Slide progress dots"
          className="flex items-center gap-1.5 sm:gap-2"
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
                className={`group relative flex items-center justify-center p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-eu-yellow rounded-full`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    active
                      ? isDark
                        ? 'h-2.5 w-7 bg-eu-yellow shadow-[0_0_10px_rgba(255,204,0,0.8)]'
                        : 'h-2.5 w-7 bg-eu-blue'
                      : isDark
                      ? 'h-2 w-2 bg-eu-sky/40 group-hover:bg-eu-sky/80'
                      : 'h-2 w-2 bg-eu-blue/30 group-hover:bg-eu-blue/70'
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
            className="rounded-lg p-1.5 disabled:opacity-30 hover:bg-current/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-eu-yellow"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={currentSlide >= totalSlides}
            aria-label="Next slide"
            title="Next slide (→ or Space)"
            className="rounded-lg p-1.5 disabled:opacity-30 hover:bg-current/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-eu-yellow"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="mx-1 h-4 w-px bg-current/20 hidden sm:block" />

          <button
            type="button"
            onClick={onToggleNotes}
            aria-label="Toggle speaker notes (N)"
            aria-pressed={notesOpen}
            title="Speaker Notes (N)"
            className={`rounded-lg p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-eu-yellow ${
              notesOpen
                ? 'bg-eu-yellow text-eu-navy font-bold'
                : 'hover:bg-current/10'
            }`}
          >
            <Mic className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onToggleOverview}
            aria-label="Toggle slide overview grid (O)"
            title="Slide Overview (O or Esc)"
            className="rounded-lg p-1.5 hover:bg-current/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-eu-yellow"
          >
            <Grid className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute UI sounds (M)' : 'Unmute UI sounds (M)'}
            aria-pressed={soundEnabled}
            title="Toggle UI Sounds (M)"
            className={`hidden sm:inline-flex rounded-lg p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-eu-yellow ${
              soundEnabled
                ? 'bg-eu-yellow text-eu-navy'
                : 'hover:bg-current/10 opacity-75'
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
            aria-label="Restart presentation from slide 1 (R)"
            title="Restart (R)"
            className="hidden sm:inline-flex rounded-lg p-1.5 hover:bg-current/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-eu-yellow"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-label="Toggle fullscreen (F)"
            title="Fullscreen (F)"
            className="hidden sm:inline-flex rounded-lg p-1.5 hover:bg-current/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-eu-yellow"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </>
  );
};

