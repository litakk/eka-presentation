import React, { useRef } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { SlideTheme, TransitionType } from '../data/slides';

interface SlideShellProps {
  slideNumber: number;
  direction: 1 | -1;
  theme: SlideTheme;
  transitionType: TransitionType;
  reducedMotion?: boolean;
  onPrev: () => void;
  onNext: () => void;
  children: React.ReactNode;
}

const PREMIUM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getSlideVariants(
  type: TransitionType,
  direction: 1 | -1,
  reducedMotion: boolean
): Variants {
  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.15 } },
    };
  }

  switch (type) {
    case 'circle-clip':
      return {
        initial: {
          clipPath:
            direction > 0
              ? 'circle(0% at 18% 32%)'
              : 'circle(0% at 82% 32%)',
          opacity: 0.3,
        },
        animate: {
          clipPath: 'circle(150% at 50% 50%)',
          opacity: 1,
          transition: { duration: 0.78, ease: PREMIUM_EASE },
        },
        exit: {
          opacity: 0,
          scale: 0.98,
          transition: { duration: 0.45, ease: PREMIUM_EASE },
        },
      };

    case 'yellow-wipe':
      return {
        initial: {
          x: direction > 0 ? '100%' : '-100%',
          opacity: 0.85,
        },
        animate: {
          x: '0%',
          opacity: 1,
          transition: { duration: 0.72, ease: PREMIUM_EASE },
        },
        exit: {
          x: direction > 0 ? '-35%' : '35%',
          opacity: 0,
          transition: { duration: 0.55, ease: PREMIUM_EASE },
        },
      };

    case 'cloud-zoom':
      return {
        initial: {
          scale: direction > 0 ? 1.14 : 0.88,
          opacity: 0,
          filter: 'blur(8px)',
        },
        animate: {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.75, ease: PREMIUM_EASE },
        },
        exit: {
          scale: direction > 0 ? 0.9 : 1.1,
          opacity: 0,
          filter: 'blur(6px)',
          transition: { duration: 0.5, ease: PREMIUM_EASE },
        },
      };

    case 'card-flip':
      return {
        initial: {
          rotateY: direction > 0 ? 28 : -28,
          scale: 0.92,
          opacity: 0,
        },
        animate: {
          rotateY: 0,
          scale: 1,
          opacity: 1,
          transition: { duration: 0.76, ease: PREMIUM_EASE },
        },
        exit: {
          rotateY: direction > 0 ? -22 : 22,
          scale: 0.94,
          opacity: 0,
          transition: { duration: 0.48, ease: PREMIUM_EASE },
        },
      };

    case 'shared-morph':
    default:
      return {
        initial: {
          y: direction > 0 ? 36 : -36,
          opacity: 0,
        },
        animate: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.68, ease: PREMIUM_EASE },
        },
        exit: {
          y: direction > 0 ? -28 : 28,
          opacity: 0,
          transition: { duration: 0.45, ease: PREMIUM_EASE },
        },
      };
  }
}

export const SlideShell: React.FC<SlideShellProps> = ({
  slideNumber,
  direction,
  theme,
  transitionType,
  reducedMotion = false,
  onPrev,
  onNext,
  children,
}) => {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const variants = getSlideVariants(transitionType, direction, reducedMotion);
  const isDark = theme === 'dark';

  return (
    <main
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: '1400px' }}
      className={`relative flex h-screen w-screen flex-col justify-center overflow-hidden pt-3 pb-12 transition-colors duration-700 ${
        isDark ? 'bg-eu-navy text-eu-light' : 'bg-eu-light text-eu-navy'
      }`}
    >
      {/* Left/Right Edge Mouse Click Zones for quick presenter navigation */}
      <div
        onClick={onPrev}
        aria-hidden="true"
        title="Click left edge for previous slide"
        className="fixed left-0 top-12 bottom-12 z-30 w-5 cursor-w-resize opacity-0 hover:opacity-100 transition-opacity print:hidden"
      >
        <div className="h-full w-1 bg-eu-yellow/35" />
      </div>
      <div
        onClick={onNext}
        aria-hidden="true"
        title="Click right edge for next slide"
        className="fixed right-0 top-12 bottom-12 z-30 w-5 cursor-e-resize opacity-0 hover:opacity-100 transition-opacity print:hidden"
      >
        <div className="h-full w-1 ml-auto bg-eu-yellow/35" />
      </div>

      {/* Yellow Wipe Leading Edge Accent */}
      <AnimatePresence mode="sync">
        {transitionType === 'yellow-wipe' && !reducedMotion && (
          <motion.div
            key={`wipe-${slideNumber}`}
            initial={{ x: direction > 0 ? '100%' : '-100%' }}
            animate={{ x: direction > 0 ? '-105%' : '105%' }}
            transition={{ duration: 0.78, ease: PREMIUM_EASE }}
            aria-hidden="true"
            className="pointer-events-none fixed inset-y-0 left-0 z-40 w-16 bg-eu-yellow shadow-[0_0_50px_#FFCC00] print:hidden"
          />
        )}
      </AnimatePresence>

      {/* 16:9 Stage Container that scales harmoniously to 1920x1080, 1366x768, and mobile */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={slideNumber}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          aria-label={`Slide ${slideNumber} of 10`}
          className="relative z-10 mx-auto flex h-full w-full max-w-[1760px] flex-col justify-center px-5 sm:px-10 lg:px-16 py-2 sm:py-4 overflow-y-auto md:overflow-hidden"
        >
          {children}
        </motion.section>
      </AnimatePresence>
    </main>
  );
};

