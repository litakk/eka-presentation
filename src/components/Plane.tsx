import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { SlideTheme } from '../data/slides';

gsap.registerPlugin(MotionPathPlugin);

interface PlaneProps {
  slideNumber: number;
  direction: 1 | -1;
  theme: SlideTheme;
  reducedMotion?: boolean;
}

const TRANSITION_PATHS: Record<number, string> = {
  // Slide 1: Takeoff from bottom-left, loop around the title, exit top-right
  1: 'M -80,920 C 260,820 420,260 880,220 C 1260,190 1320,580 960,560 C 640,540 1180,220 2020,120',
  // Slide 2: Sweeping arc from left to right
  2: 'M -80,680 C 480,260 1120,760 2000,260',
  // Slide 3 (Milan): Swoop into northern Italy
  3: 'M -60,280 C 560,120 1140,460 2000,240',
  // Slide 4 (Rome): Descending arc toward central-south
  4: 'M -60,240 C 520,620 1240,200 2000,480',
  // Slide 5 (Siena): Graceful Tuscan wave
  5: 'M -60,580 C 620,180 1180,540 2000,220',
  // Slide 6 (Urbino): Adriatic climb
  6: 'M -60,440 C 640,680 1220,180 2000,320',
  // Slide 7 (Teramo): Gran Sasso mountain ridge arc
  7: 'M -60,300 C 580,140 1240,640 2000,360',
  // Slide 8 (Comparison): High-altitude overview cruise
  8: 'M -60,720 C 640,320 1260,320 2000,180',
  // Slide 9 (Winner - Siena): Victory loop
  9: 'M -60,640 C 520,200 1140,180 2000,420',
  // Slide 10 (Final slide): Flies back northeast toward Latvia (Riga) off the top-right
  10: 'M 220,860 C 680,640 1220,380 1980,-60',
};

export const Plane: React.FC<PlaneProps> = ({
  slideNumber,
  direction,
  theme,
  reducedMotion = false,
}) => {
  const planeGroupRef = useRef<SVGGElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const planeEl = planeGroupRef.current;
    const trailEl = trailPathRef.current;
    const glowEl = glowPathRef.current;
    if (!planeEl || !trailEl || !glowEl) return;

    const ctx = gsap.context(() => {
      const length = glowEl.getTotalLength() || 2400;
      const isTitle = slideNumber === 1;
      const isFinal = slideNumber === 10;
      const duration = isTitle ? 2.8 : isFinal ? 2.4 : 1.35;

      gsap.killTweensOf([planeEl, trailEl, glowEl]);

      // Reset trail visibility
      gsap.set(glowEl, {
        strokeDasharray: length,
        strokeDashoffset: direction >= 0 ? length : -length,
        opacity: 0.85,
      });
      gsap.set(trailEl, {
        opacity: 0.75,
      });
      gsap.set(planeEl, { opacity: 1, scale: isTitle ? 1.15 : 1 });

      const tl = gsap.timeline();

      // Animate plane along the SVG path
      tl.to(
        planeEl,
        {
          duration,
          ease: isTitle ? 'power2.inOut' : 'power3.out',
          motionPath: {
            path: glowEl,
            align: glowEl,
            autoRotate: direction >= 0 ? true : 180,
            alignOrigin: [0.5, 0.5],
            start: direction >= 0 ? 0 : 1,
            end: direction >= 0 ? 1 : 0,
          },
        },
        0
      );

      // Draw continuous glow line behind plane
      tl.to(
        glowEl,
        {
          strokeDashoffset: 0,
          duration: duration * 0.92,
          ease: isTitle ? 'power2.inOut' : 'power3.out',
        },
        0
      );

      // Fade out dotted contrail smoothly after plane passes
      tl.to(
        [trailEl, glowEl],
        {
          opacity: isFinal ? 0.35 : 0,
          duration: 0.9,
          ease: 'power2.out',
        },
        duration * 0.65
      );
    });

    return () => ctx.revert();
  }, [slideNumber, direction, reducedMotion]);

  if (reducedMotion) return null;

  const activePath = TRANSITION_PATHS[slideNumber] || TRANSITION_PATHS[2];
  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none print:hidden"
    >
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="planeTrailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFCC00" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFCC00" stopOpacity="0.65" />
            <stop offset="100%" stopColor={isDark ? '#BFD7FF' : '#0B2A6B'} stopOpacity="0.9" />
          </linearGradient>
          <filter id="planeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Continuous motion guide & contrail glow */}
        <path
          ref={glowPathRef}
          d={activePath}
          fill="none"
          stroke="url(#planeTrailGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0"
        />

        {/* Dotted fading trail */}
        <path
          ref={trailPathRef}
          d={activePath}
          fill="none"
          stroke={isDark ? '#FFCC00' : '#0B2A6B'}
          strokeWidth="2.5"
          strokeDasharray="6 12"
          strokeLinecap="round"
          opacity="0"
        />

        {/* Paper-plane / Erasmus+ aircraft vector */}
        <g ref={planeGroupRef} filter="url(#planeGlow)" opacity="0">
          {/* Contrail spark */}
          <circle cx="-22" cy="0" r="4" fill="#FFCC00" opacity="0.8" />
          {/* Paper airplane fuselage & wings oriented toward +X (0 deg) */}
          <path
            d="M 26,0 L -18,-15 L -9,-2 L -18,15 Z"
            fill="#FFCC00"
            stroke={isDark ? '#F6F4EC' : '#0B2A6B'}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M 26,0 L -9,-2 L -13,7 L -4,2 Z"
            fill="#0B2A6B"
            opacity="0.85"
          />
        </g>
      </svg>
    </div>
  );
};

