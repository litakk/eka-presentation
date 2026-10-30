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
  1: 'M -80,920 C 260,820 420,260 880,220 C 1260,190 1320,580 960,560 C 640,540 1180,220 2020,120',
  2: 'M -80,680 C 480,260 1120,760 2000,260',
  3: 'M -60,280 C 560,120 1140,460 2000,240',
  4: 'M -60,240 C 520,620 1240,200 2000,480',
  5: 'M -60,580 C 620,180 1180,540 2000,220',
  6: 'M -60,440 C 640,680 1220,180 2000,320',
  7: 'M -60,300 C 580,140 1240,640 2000,360',
  8: 'M -60,720 C 640,320 1260,320 2000,180',
  9: 'M -60,640 C 520,200 1140,180 2000,420',
  // Slide 10: Plane flies off to the right toward Latvia / Finale curtain
  10: 'M 120,840 C 680,620 1220,340 2020,140',
  // Slide 11 (Hamster Finale): Small paper plane circling gently in the top corner
  11: 'M 1420,180 C 1580,80 1780,120 1760,260 C 1740,380 1500,360 1440,240 C 1390,140 1620,90 1840,160',
};

export const Plane: React.FC<PlaneProps> = ({
  slideNumber,
  direction,
  theme,
  reducedMotion = false,
}) => {
  const planeGroupRef = useRef<SVGGElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);
  const guidePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const planeEl = planeGroupRef.current;
    const trailEl = trailPathRef.current;
    const guideEl = guidePathRef.current;
    if (!planeEl || !trailEl || !guideEl) return;

    const ctx = gsap.context(() => {
      const isTitle = slideNumber === 1;
      const isFinale = slideNumber === 11;
      const duration = isTitle ? 2.6 : isFinale ? 6.5 : 1.25;

      gsap.killTweensOf([planeEl, trailEl]);

      gsap.set(trailEl, {
        opacity: isFinale ? 0.55 : 0.85,
      });
      gsap.set(planeEl, { opacity: 1, scale: isTitle ? 1.15 : isFinale ? 0.9 : 1 });

      const tl = gsap.timeline({
        repeat: isFinale ? -1 : 0,
      });

      tl.to(
        planeEl,
        {
          duration,
          ease: isFinale ? 'none' : isTitle ? 'power2.inOut' : 'power3.out',
          motionPath: {
            path: guideEl,
            align: guideEl,
            autoRotate: direction >= 0 || isFinale ? true : 180,
            alignOrigin: [0.5, 0.5],
            start: direction >= 0 || isFinale ? 0 : 1,
            end: direction >= 0 || isFinale ? 1 : 0,
          },
        },
        0
      );

      if (!isFinale) {
        tl.to(
          trailEl,
          {
            opacity: 0,
            duration: 0.75,
            ease: 'power2.out',
          },
          duration * 0.65
        );
      }
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
        {/* Hidden continuous motion guide path */}
        <path ref={guidePathRef} d={activePath} fill="none" stroke="none" />

        {/* Editorial Dashed Ink Trail */}
        <path
          ref={trailPathRef}
          d={activePath}
          fill="none"
          stroke={isDark ? '#E0A526' : '#C9472B'}
          strokeWidth="2.5"
          strokeDasharray="8 10"
          strokeLinecap="round"
          opacity="0"
        />

        {/* Hand-drawn Ink & Paper Airplane */}
        <g ref={planeGroupRef} opacity="0">
          {/* Hard shadow */}
          <path
            d="M 30,4 L -16,-12 L -7,1 L -16,18 Z"
            fill="#1B1B18"
            opacity="0.35"
          />
          {/* Main paper wing */}
          <path
            d="M 28,0 L -18,-15 L -9,-2 L -18,15 Z"
            fill="#FAF6EE"
            stroke="#1B1B18"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Tomato red inner fold */}
          <path
            d="M 28,0 L -9,-2 L -13,8 L -3,2 Z"
            fill="#C9472B"
            stroke="#1B1B18"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};
