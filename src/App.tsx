import React, { useCallback, useEffect, useState } from 'react';
import {
  ALL_SLIDES_METADATA,
  PROGRAM_SLIDES,
} from './data/slides';
import { Clouds } from './components/Clouds';
import { Plane } from './components/Plane';
import { ProgressBar } from './components/ProgressBar';
import { SpeakerNotes } from './components/SpeakerNotes';
import { Overview } from './components/Overview';
import { SlideShell } from './components/SlideShell';
import { CursorGlow } from './components/ui/AnimatedPrimitives';
import { Slide1Title } from './components/slides/Slide1Title';
import { Slide2Definition } from './components/slides/Slide2Definition';
import { Slide3Milan } from './components/slides/Slide3Milan';
import { Slide4Rome } from './components/slides/Slide4Rome';
import { Slide5Siena } from './components/slides/Slide5Siena';
import { Slide6Urbino } from './components/slides/Slide6Urbino';
import { Slide7Teramo } from './components/slides/Slide7Teramo';
import { Slide8Comparison } from './components/slides/Slide8Comparison';
import { Slide9Winner } from './components/slides/Slide9Winner';
import { Slide10Thanks } from './components/slides/Slide10Thanks';
import { Slide11Finale } from './components/slides/Slide11Finale';
import { PrintDeck } from './components/PrintDeck';
import { soundManager } from './utils/sound';

const TOTAL_SLIDES = ALL_SLIDES_METADATA.length;

function parseSlideFromHash(hash: string): number {
  const match = hash.match(/^#slide-(\d+)$/i);
  if (!match) return 1;
  const num = parseInt(match[1], 10);
  if (Number.isNaN(num) || num < 1 || num > TOTAL_SLIDES) return 1;
  return num;
}

export const App: React.FC = () => {
  const isPrintMode =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('print') === 'true';

  const [currentSlide, setCurrentSlide] = useState<number>(() =>
    typeof window !== 'undefined' ? parseSlideFromHash(window.location.hash) : 1
  );
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [notesOpen, setNotesOpen] = useState<boolean>(false);
  const [overviewOpen, setOverviewOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // Preload all city WebP images and hamster poster so transitions have zero lag
  useEffect(() => {
    PROGRAM_SLIDES.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
    const poster = new Image();
    poster.src = '/media/hamster-poster.jpg';
  }, []);

  // Respect prefers-reduced-motion & monitor FPS on weak projectors/laptops
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (ev: MediaQueryListEvent) => setReducedMotion(ev.matches);
    mq.addEventListener('change', onChange);

    let frames = 0;
    const start = performance.now();
    let rafId = 0;
    const checkFps = (now: number) => {
      frames++;
      if (frames >= 45) {
        const elapsed = now - start;
        const fps = (frames * 1000) / elapsed;
        if (fps < 28) {
          setReducedMotion(true);
        }
        return;
      }
      rafId = requestAnimationFrame(checkFps);
    };
    rafId = requestAnimationFrame(checkFps);

    return () => {
      mq.removeEventListener('change', onChange);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Ensure initial URL hash is set and sync with browser hashchange
  useEffect(() => {
    if (isPrintMode) return;
    if (!window.location.hash || !/^#slide-\d+$/i.test(window.location.hash)) {
      window.history.replaceState(null, '', `#slide-${currentSlide}`);
    }

    const handleHashChange = () => {
      const target = parseSlideFromHash(window.location.hash);
      setCurrentSlide((prev) => {
        if (target !== prev) {
          setDirection(target > prev ? 1 : -1);
          soundManager.playWhoosh();
        }
        return target;
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentSlide, isPrintMode]);

  const goToSlide = useCallback(
    (target: number) => {
      const clamped = Math.max(1, Math.min(TOTAL_SLIDES, target));
      setCurrentSlide((prev) => {
        if (clamped === prev) return prev;
        setDirection(clamped > prev ? 1 : -1);
        setIsTransitioning(true);
        soundManager.playWhoosh();
        window.history.pushState(null, '', `#slide-${clamped}`);
        window.setTimeout(() => setIsTransitioning(false), 680);
        return clamped;
      });
    },
    []
  );

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev >= TOTAL_SLIDES) return prev;
      const next = prev + 1;
      setDirection(1);
      setIsTransitioning(true);
      soundManager.playWhoosh();
      window.history.pushState(null, '', `#slide-${next}`);
      window.setTimeout(() => setIsTransitioning(false), 680);
      return next;
    });
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev <= 1) return prev;
      const next = prev - 1;
      setDirection(-1);
      setIsTransitioning(true);
      soundManager.playWhoosh();
      window.history.pushState(null, '', `#slide-${next}`);
      window.setTimeout(() => setIsTransitioning(false), 680);
      return next;
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundManager.setEnabled(next);
      return next;
    });
  }, []);

  const handleRestart = useCallback(() => {
    setOverviewOpen(false);
    goToSlide(1);
  }, [goToSlide]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    if (isPrintMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          if (!overviewOpen) goNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (!overviewOpen) goPrev();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          setNotesOpen((prev) => !prev);
          break;
        case 'o':
        case 'O':
          e.preventDefault();
          setOverviewOpen((prev) => !prev);
          break;
        case 'Escape':
          e.preventDefault();
          if (notesOpen) {
            setNotesOpen(false);
          } else {
            setOverviewOpen((prev) => !prev);
          }
          break;
        case 'm':
        case 'M':
        case 's':
        case 'S':
          e.preventDefault();
          toggleSound();
          break;
        case 'r':
        case 'R':
          // On Slide 11, R replays the hamster video (captured in Slide11Finale); elsewhere restarts deck
          if (currentSlide !== 11 || e.shiftKey) {
            e.preventDefault();
            handleRestart();
          }
          break;
        case 'Home':
          e.preventDefault();
          handleRestart();
          break;
        case 'End':
          e.preventDefault();
          goToSlide(TOTAL_SLIDES);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentSlide,
    goNext,
    goPrev,
    goToSlide,
    handleRestart,
    isPrintMode,
    notesOpen,
    overviewOpen,
    toggleFullscreen,
    toggleSound,
  ]);

  if (isPrintMode) {
    return <PrintDeck />;
  }

  const slideMeta =
    ALL_SLIDES_METADATA[currentSlide - 1] || ALL_SLIDES_METADATA[0];

  const renderCurrentSlide = () => {
    switch (currentSlide) {
      case 1:
        return (
          <Slide1Title
            reducedMotion={reducedMotion}
            onNext={goNext}
            onSelectSlide={goToSlide}
          />
        );
      case 2:
        return <Slide2Definition reducedMotion={reducedMotion} />;
      case 3:
        return (
          <Slide3Milan
            reducedMotion={reducedMotion}
            onSelectSlide={goToSlide}
          />
        );
      case 4:
        return (
          <Slide4Rome
            reducedMotion={reducedMotion}
            onSelectSlide={goToSlide}
          />
        );
      case 5:
        return (
          <Slide5Siena
            reducedMotion={reducedMotion}
            onSelectSlide={goToSlide}
          />
        );
      case 6:
        return (
          <Slide6Urbino
            reducedMotion={reducedMotion}
            onSelectSlide={goToSlide}
          />
        );
      case 7:
        return (
          <Slide7Teramo
            reducedMotion={reducedMotion}
            onSelectSlide={goToSlide}
          />
        );
      case 8:
        return (
          <Slide8Comparison
            reducedMotion={reducedMotion}
            onSelectSlide={goToSlide}
          />
        );
      case 9:
        return (
          <Slide9Winner
            reducedMotion={reducedMotion}
            onSelectSlide={goToSlide}
          />
        );
      case 10:
        return (
          <Slide10Thanks
            reducedMotion={reducedMotion}
            onNext={goNext}
            onSelectSlide={goToSlide}
          />
        );
      case 11:
      default:
        return (
          <Slide11Finale
            reducedMotion={reducedMotion}
            onRestartDeck={handleRestart}
          />
        );
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-paper-bg text-paper-ink select-none">
      {/* Subtle Paper Grain Overlay */}
      <div
        aria-hidden="true"
        className="paper-grain pointer-events-none fixed inset-0 z-30 opacity-[0.045] print:hidden"
      />

      {/* Editorial Reticle Cursor (no neon glow) */}
      <CursorGlow theme={slideMeta.theme} disabled={reducedMotion} />

      {/* Editorial Paper Cutout Clouds & Registration Marks */}
      <Clouds
        theme={slideMeta.theme}
        isTransitioning={isTransitioning}
        slideIndex={currentSlide}
        reducedMotion={reducedMotion}
      />

      {/* Signature Paper-Plane Flying Across Screen During Transitions */}
      <Plane
        slideNumber={currentSlide}
        direction={direction}
        theme={slideMeta.theme}
        reducedMotion={reducedMotion}
      />

      {/* Slide Stage with Editorial Transitions */}
      <SlideShell
        slideNumber={currentSlide}
        direction={direction}
        theme={slideMeta.theme}
        transitionType={slideMeta.transition}
        reducedMotion={reducedMotion}
        onPrev={goPrev}
        onNext={goNext}
      >
        {renderCurrentSlide()}
      </SlideShell>

      {/* Speaker Notes Overlay (Toggled with N) */}
      <SpeakerNotes
        isOpen={notesOpen}
        slideNumber={currentSlide}
        onClose={() => setNotesOpen(false)}
      />

      {/* Slide Overview Grid (Toggled with O or Esc) */}
      <Overview
        isOpen={overviewOpen}
        currentSlide={currentSlide}
        onSelectSlide={goToSlide}
        onClose={() => setOverviewOpen(false)}
      />

      {/* Top Flight Progress Bar & Bottom Navigation Controls */}
      <ProgressBar
        currentSlide={currentSlide}
        totalSlides={TOTAL_SLIDES}
        theme={slideMeta.theme}
        notesOpen={notesOpen}
        soundEnabled={soundEnabled}
        onSelectSlide={goToSlide}
        onPrev={goPrev}
        onNext={goNext}
        onToggleNotes={() => setNotesOpen((prev) => !prev)}
        onToggleOverview={() => setOverviewOpen((prev) => !prev)}
        onToggleSound={toggleSound}
        onRestart={handleRestart}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
};

export default App;
