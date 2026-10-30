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

const PAPER_SPRING = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 26,
};

function getSlideVariants(
  type: TransitionType,
  direction: 1 | -1,
  reducedMotion: boolean
): Variants {
  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.18 } },
      exit: { opacity: 0, transition: { duration: 0.14 } },
    };
  }

  switch (type) {
    case 'curtain-wipe':
      return {
        initial: {
          clipPath: 'inset(0 50% 0 50%)',
          scale: 0.96,
          opacity: 0.5,
        },
        animate: {
          clipPath: 'inset(0 0% 0 0%)',
          scale: 1,
          opacity: 1,
          transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.4 },
        },
      };

    case 'circle-clip':
      return {
        initial: {
          clipPath:
            direction > 0
              ? 'circle(0% at 18% 32%)'
              : 'circle(0% at 82% 32%)',
          opacity: 0.4,
        },
        animate: {
          clipPath: 'circle(150% at 50% 50%)',
          opacity: 1,
          transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
        },
        exit: {
          opacity: 0,
          rotate: direction > 0 ? -1.5 : 1.5,
          transition: { duration: 0.4 },
        },
      };

    case 'yellow-wipe':
      return {
        initial: {
          x: direction > 0 ? '90%' : '-90%',
          rotate: direction > 0 ? 2 : -2,
          opacity: 0,
        },
        animate: {
          x: '0%',
          rotate: 0,
          opacity: 1,
          transition: PAPER_SPRING,
        },
        exit: {
          x: direction > 0 ? '-30%' : '30%',
          opacity: 0,
          transition: { duration: 0.4 },
        },
      };

    case 'cloud-zoom':
      return {
        initial: {
          scale: direction > 0 ? 1.08 : 0.92,
          rotate: direction > 0 ? -1.5 : 1.5,
          opacity: 0,
        },
        animate: {
          scale: 1,
          rotate: 0,
          opacity: 1,
          transition: PAPER_SPRING,
        },
        exit: {
          scale: 0.95,
          opacity: 0,
          transition: { duration: 0.38 },
        },
      };

    case 'card-flip':
      return {
        initial: {
          rotateY: direction > 0 ? 22 : -22,
          rotateZ: direction > 0 ? 1.5 : -1.5,
          scale: 0.94,
          opacity: 0,
        },
        animate: {
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          transition: PAPER_SPRING,
        },
        exit: {
          rotateY: direction > 0 ? -18 : 18,
          opacity: 0,
          transition: { duration: 0.38 },
        },
      };

    case 'shared-morph':
    default:
      return {
        initial: {
          y: direction > 0 ? 32 : -32,
          rotate: direction > 0 ? 1.2 : -1.2,
          opacity: 0,
        },
        animate: {
          y: 0,
          rotate: 0,
          opacity: 1,
          transition: PAPER_SPRING,
        },
        exit: {
          y: direction > 0 ? -24 : 24,
          opacity: 0,
          transition: { duration: 0.35 },
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
      className={`relative flex h-screen w-screen flex-col justify-center overflow-hidden pt-3 pb-12 transition-colors duration-500 ${
        isDark ? 'bg-ink text-paper' : 'bg-paper text-ink'
      }`}
    >
      {/* Left/Right Edge Mouse Click Zones */}
      <div
        onClick={onPrev}
        aria-hidden="true"
        title="Click left edge for previous slide"
        className="fixed left-0 top-12 bottom-12 z-30 w-5 cursor-w-resize opacity-0 hover:opacity-100 transition-opacity print:hidden"
      >
        <div className="h-full w-1.5 bg-tomato" />
      </div>
      <div
        onClick={onNext}
        aria-hidden="true"
        title="Click right edge for next slide"
        className="fixed right-0 top-12 bottom-12 z-30 w-5 cursor-e-resize opacity-0 hover:opacity-100 transition-opacity print:hidden"
      >
        <div className="h-full w-1.5 ml-auto bg-tomato" />
      </div>

      {/* Theatre Curtain / Mustard Wipe Edge */}
      <AnimatePresence mode="sync">
        {(transitionType === 'yellow-wipe' || transitionType === 'curtain-wipe') &&
          !reducedMotion && (
            <motion.div
              key={`wipe-${slideNumber}`}
              initial={{ x: direction > 0 ? '100%' : '-100%' }}
              animate={{ x: direction > 0 ? '-105%' : '105%' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
              className="pointer-events-none fixed inset-y-0 left-0 z-40 w-20 border-x-4 border-ink bg-tomato print:hidden"
            />
          )}
      </AnimatePresence>

      {/* 16:9 Stage Container */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={slideNumber}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          aria-label={`Slide ${slideNumber} of 11`}
          className="relative z-10 mx-auto flex h-full w-full max-w-[1760px] flex-col justify-center px-5 sm:px-10 lg:px-14 py-2 sm:py-3 overflow-y-auto md:overflow-hidden"
        >
          {children}
        </motion.section>
      </AnimatePresence>
    </main>
  );
};
