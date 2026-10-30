import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SlideTheme } from '../data/slides';

interface CloudsProps {
  theme: SlideTheme;
  isTransitioning: boolean;
  slideIndex: number;
  reducedMotion?: boolean;
}

export const Clouds: React.FC<CloudsProps> = ({
  theme,
  isTransitioning,
  slideIndex,
  reducedMotion = false,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  // 3 parallax depth layers reacting to mouse and slideIndex
  const layer1X = useTransform(smoothX, [-1, 1], [-18, 18]);
  const layer1Y = useTransform(smoothY, [-1, 1], [-10, 10]);

  const layer2X = useTransform(smoothX, [-1, 1], [32, -32]);
  const layer2Y = useTransform(smoothY, [-1, 1], [16, -16]);

  const layer3X = useTransform(smoothX, [-1, 1], [-48, 48]);
  const layer3Y = useTransform(smoothY, [-1, 1], [-24, 24]);

  useEffect(() => {
    if (reducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, reducedMotion]);

  const isDark = theme === 'dark';
  const shiftOffset = (slideIndex - 1) * -14;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0 print:hidden"
    >
      {/* Ambient gradient mesh */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_top_right,_rgba(11,42,107,0.85)_0%,_rgba(6,26,68,1)_70%)]'
            : 'bg-[radial-gradient(ellipse_at_top_left,_rgba(191,215,255,0.42)_0%,_rgba(246,244,236,1)_68%)]'
        }`}
      />

      {/* Subtle EU Yellow & Sky floating ambient orbs */}
      <motion.div
        style={reducedMotion ? undefined : { x: layer1X, y: layer1Y }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: shiftOffset * 0.6,
                scale: isTransitioning ? 1.08 : 1,
              }
        }
        transition={{ duration: isTransitioning ? 0.45 : 1.4, ease: 'easeOut' }}
        className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-25"
      >
        <div
          className={`h-full w-full rounded-full ${
            isDark ? 'bg-eu-sky/30' : 'bg-eu-sky/75'
          }`}
        />
      </motion.div>

      {/* Layer 1: Distant high-altitude stratus clouds */}
      <motion.div
        style={reducedMotion ? undefined : { x: layer1X, y: layer1Y }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: shiftOffset * 0.9 + (isTransitioning ? -35 : 0),
              }
        }
        transition={{ duration: isTransitioning ? 0.5 : 1.8, ease: 'easeOut' }}
        className={`absolute top-[6%] left-[4%] w-[440px] opacity-25 ${
          isDark ? 'text-eu-sky/35' : 'text-eu-sky/80'
        }`}
      >
        <svg viewBox="0 0 420 140" fill="currentColor" className="w-full h-auto">
          <path d="M68 110h272c28 0 50-18 50-42 0-21-18-39-42-41-10-28-39-47-72-47-30 0-56 16-69 40-9-5-20-8-32-8-31 0-56 22-60 51-27 3-47 23-47 47 0 0 0 0 0 0z" />
        </svg>
      </motion.div>

      {/* Layer 2: Mid-altitude cumulus cloud bank (right side) */}
      <motion.div
        style={reducedMotion ? undefined : { x: layer2X, y: layer2Y }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: shiftOffset * 1.4 + (isTransitioning ? -65 : 0),
              }
        }
        transition={{ duration: isTransitioning ? 0.45 : 1.5, ease: 'easeOut' }}
        className={`absolute top-[16%] right-[6%] w-[520px] opacity-20 ${
          isDark ? 'text-eu-sky/30' : 'text-eu-blue/10'
        }`}
      >
        <svg viewBox="0 0 500 160" fill="currentColor" className="w-full h-auto">
          <path d="M90 135h325c32 0 58-22 58-49 0-25-20-45-46-48-12-33-46-56-86-56-36 0-67 19-82 48-11-6-24-10-38-10-37 0-67 26-71 60-32 4-56 27-56 55z" />
        </svg>
      </motion.div>

      {/* Layer 3: Foreground soft sky cloud (bottom left) */}
      <motion.div
        style={reducedMotion ? undefined : { x: layer3X, y: layer3Y }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: shiftOffset * 2.1 + (isTransitioning ? -95 : 0),
              }
        }
        transition={{ duration: isTransitioning ? 0.4 : 1.3, ease: 'easeOut' }}
        className={`absolute -bottom-10 left-[12%] w-[600px] opacity-20 ${
          isDark ? 'text-eu-sky/25' : 'text-eu-sky/75'
        }`}
      >
        <svg viewBox="0 0 560 170" fill="currentColor" className="w-full h-auto">
          <path d="M100 150h360c36 0 65-24 65-54 0-27-22-50-51-53-14-36-51-62-95-62-40 0-74 21-91 53-12-7-27-11-42-11-41 0-74 29-79 67-35 4-62 30-62 60z" />
        </svg>
      </motion.div>

      {/* Subtle circuit / network grid lines for CS/IT aesthetic */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(191,215,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(191,215,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] ${
          isDark ? 'opacity-100' : 'opacity-65'
        }`}
      />
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full ${
          isDark ? 'opacity-15' : 'opacity-10'
        }`}
      >
        <g
          fill="none"
          stroke={isDark ? '#BFD7FF' : '#0B2A6B'}
          strokeWidth="1.2"
        >
          <path d="M 60,120 H 220 L 260,160 H 420" />
          <circle cx="60" cy="120" r="3.5" fill="#FFCC00" />
          <circle cx="420" cy="160" r="3.5" fill="#FFCC00" />
          <path d="M 1860,920 H 1680 L 1640,880 H 1480" />
          <circle cx="1860" cy="920" r="3.5" fill="#FFCC00" />
          <circle cx="1480" cy="880" r="3.5" fill="#FFCC00" />
          <path d="M 1760,180 H 1580 L 1540,220 H 1420" />
          <circle cx="1760" cy="180" r="3" fill="#BFD7FF" />
        </g>
      </svg>
    </div>
  );
};

