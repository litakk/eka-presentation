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

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 24 });

  const layer1X = useTransform(smoothX, [-1, 1], [-14, 14]);
  const layer1Y = useTransform(smoothY, [-1, 1], [-8, 8]);

  const layer2X = useTransform(smoothX, [-1, 1], [24, -24]);
  const layer2Y = useTransform(smoothY, [-1, 1], [12, -12]);

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
  const shiftOffset = (slideIndex - 1) * -12;
  const formattedSlideNum = String(slideIndex).padStart(2, '0');

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0 print:hidden"
    >
      {/* Flat Editorial Paper / Ink Background (NO gradients) */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark ? 'bg-ink' : 'bg-paper'
        }`}
      />

      {/* Editorial Framing Rules & Crop Marks */}
      <div
        className={`absolute inset-4 border pointer-events-none ${
          isDark ? 'border-paper/15' : 'border-ink/15'
        }`}
      />

      {/* Oversized Graphic Slide Number (01–11) as a bold poster element */}
      <div
        className={`pointer-events-none absolute -bottom-10 right-6 font-serif text-[180px] sm:text-[240px] xl:text-[310px] font-black leading-none tracking-tighter select-none ${
          isDark ? 'text-paper/[0.05]' : 'text-ink/[0.055]'
        }`}
      >
        {formattedSlideNum}
      </div>

      {/* Paper-Cut Cloud 1 (Top Left) — Flat Pale Blue / Cream with Ink Outline */}
      <motion.div
        style={reducedMotion ? undefined : { x: layer1X, y: layer1Y }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: shiftOffset * 0.8 + (isTransitioning ? -28 : 0),
              }
        }
        transition={{ duration: isTransitioning ? 0.45 : 1.4, ease: 'easeOut' }}
        className="absolute top-[5%] left-[3%] w-[260px] opacity-80"
      >
        <svg viewBox="0 0 420 140" className="w-full h-auto overflow-visible">
          {/* Hard offset shadow */}
          <path
            d="M74 116h272c28 0 50-18 50-42 0-21-18-39-42-41-10-28-39-47-72-47-30 0-56 16-69 40-9-5-20-8-32-8-31 0-56 22-60 51-27 3-47 23-47 47z"
            fill="#1B1B18"
            opacity={isDark ? '0.45' : '0.12'}
          />
          <path
            d="M68 110h272c28 0 50-18 50-42 0-21-18-39-42-41-10-28-39-47-72-47-30 0-56 16-69 40-9-5-20-8-32-8-31 0-56 22-60 51-27 3-47 23-47 47z"
            fill={isDark ? '#3F5B3A' : '#CFE0E6'}
            stroke="#1B1B18"
            strokeWidth="3"
          />
        </svg>
      </motion.div>

      {/* Paper-Cut Cloud 2 (Top Right) */}
      <motion.div
        style={reducedMotion ? undefined : { x: layer2X, y: layer2Y }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: shiftOffset * 1.1 + (isTransitioning ? -45 : 0),
              }
        }
        transition={{ duration: isTransitioning ? 0.4 : 1.3, ease: 'easeOut' }}
        className="absolute top-[11%] right-[4%] w-[290px] opacity-75"
      >
        <svg viewBox="0 0 500 160" className="w-full h-auto overflow-visible">
          <path
            d="M96 141h325c32 0 58-22 58-49 0-25-20-45-46-48-12-33-46-56-86-56-36 0-67 19-82 48-11-6-24-10-38-10-37 0-67 26-71 60-32 4-56 27-56 55z"
            fill="#1B1B18"
            opacity={isDark ? '0.45' : '0.12'}
          />
          <path
            d="M90 135h325c32 0 58-22 58-49 0-25-20-45-46-48-12-33-46-56-86-56-36 0-67 19-82 48-11-6-24-10-38-10-37 0-67 26-71 60-32 4-56 27-56 55z"
            fill={isDark ? '#1B1B18' : '#FAF6EE'}
            stroke={isDark ? '#F2EADB' : '#1B1B18'}
            strokeWidth="3"
          />
        </svg>
      </motion.div>
    </div>
  );
};
