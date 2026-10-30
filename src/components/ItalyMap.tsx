import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { motion } from 'framer-motion';
import { PROGRAM_SLIDES, SlideTheme } from '../data/slides';

gsap.registerPlugin(MotionPathPlugin);

interface ItalyMapProps {
  /** 1..5 corresponding to Milan(1), Siena(2), Urbino(3), Perugia(4), Teramo(5) */
  activeProgramNumber?: number;
  mode?: 'program' | 'hero' | 'return';
  theme: SlideTheme;
  reducedMotion?: boolean;
  onSelectCity?: (slideNumber: number) => void;
  className?: string;
}

const ITALY_MAINLAND_PATH =
  'M 118,68 L 146,56 L 178,48 L 210,55 L 245,44 L 284,52 L 315,72 L 308,98 L 278,108 L 262,135 L 265,168 L 284,210 L 315,248 L 328,282 L 348,318 L 385,346 L 428,368 L 456,396 L 468,422 L 452,434 L 424,412 L 398,402 L 388,428 L 404,462 L 392,498 L 368,528 L 348,536 L 340,512 L 354,478 L 345,442 L 320,408 L 288,376 L 254,342 L 234,312 L 208,278 L 190,238 L 174,198 L 148,176 L 116,184 L 94,168 L 88,136 L 102,102 Z';

const SICILY_PATH =
  'M 248,532 L 296,526 L 336,536 L 342,554 L 318,582 L 274,574 L 242,552 Z';

const SARDINIA_PATH =
  'M 104,316 L 138,308 L 148,346 L 142,402 L 114,414 L 96,386 L 98,342 Z';

// Ordered data-packet route segments:
// 1: Riga (NE border) -> 1. Milan (168,122)
// 2: 1. Milan (168,122) -> 2. Siena (214,245)
// 3: 2. Siena (214,245) -> 3. Urbino (256,232)
// 4: 3. Urbino (256,232) -> 4. Perugia (246,268)
// 5: 4. Perugia (246,268) -> 5. Teramo (292,298)
// 6: Return flight 5. Teramo (292,298) -> Riga, Latvia (465,18)
const SEGMENT_PATHS: Record<number, string> = {
  1: 'M 435,24 Q 290,52 168,122',
  2: 'M 168,122 Q 165,195 214,245',
  3: 'M 214,245 Q 235,222 256,232',
  4: 'M 256,232 Q 262,252 246,268',
  5: 'M 246,268 Q 272,285 292,298',
  6: 'M 292,298 Q 375,165 465,18',
};

export const ItalyMap: React.FC<ItalyMapProps> = ({
  activeProgramNumber = 1,
  mode = 'program',
  theme,
  reducedMotion = false,
  onSelectCity,
  className = '',
}) => {
  const activeRouteRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  const activeSegmentIndex =
    mode === 'return' ? 6 : mode === 'hero' ? 1 : activeProgramNumber;

  useEffect(() => {
    const pathEl = activeRouteRef.current;
    const planeEl = planeRef.current;
    if (!pathEl || !planeEl) return;

    const ctx = gsap.context(() => {
      const totalLen = pathEl.getTotalLength() || 220;
      gsap.killTweensOf([pathEl, planeEl]);

      if (reducedMotion) {
        gsap.set(pathEl, { strokeDasharray: totalLen, strokeDashoffset: 0, opacity: 1 });
        gsap.set(planeEl, {
          motionPath: {
            path: pathEl,
            align: pathEl,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 1,
          },
          opacity: 1,
        });
        return;
      }

      gsap.set(pathEl, {
        strokeDasharray: totalLen,
        strokeDashoffset: totalLen,
        opacity: 1,
      });

      gsap.set(planeEl, { opacity: 1, scale: 1 });

      const tl = gsap.timeline({ delay: 0.12 });

      tl.to(
        pathEl,
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        planeEl,
        {
          duration: 1.2,
          ease: 'power2.inOut',
          motionPath: {
            path: pathEl,
            align: pathEl,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 1,
          },
        },
        0
      );
    });

    return () => ctx.revert();
  }, [activeSegmentIndex, reducedMotion]);

  const isDark = theme === 'dark';

  const completedIndices: number[] = [];
  for (let i = 1; i < activeSegmentIndex; i++) {
    completedIndices.push(i);
  }

  return (
    <div className={`relative select-none ${className}`}>
      <svg
        viewBox="0 0 500 600"
        className="h-full w-full overflow-visible drop-shadow-[0_12px_28px_rgba(6,26,68,0.35)]"
        role="img"
        aria-label="Animated IT data-packet map of Italy showing EKA Computer Science partner cities: Milan, Siena, Urbino, Perugia, and Teramo"
      >
        <defs>
          <linearGradient id="italyFillDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2A6B" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#061A44" stopOpacity="0.96" />
          </linearGradient>
          <linearGradient id="italyFillLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BFD7FF" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#0B2A6B" stopOpacity="0.22" />
          </linearGradient>
          <filter id="mapPinGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tech radar / network rings */}
        <circle
          cx="250"
          cy="300"
          r="210"
          fill="none"
          stroke={isDark ? 'rgba(191,215,255,0.14)' : 'rgba(11,42,107,0.14)'}
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        <circle
          cx="250"
          cy="300"
          r="135"
          fill="none"
          stroke={isDark ? 'rgba(255,204,0,0.14)' : 'rgba(11,42,107,0.12)'}
          strokeWidth="1"
          strokeDasharray="2 5"
        />

        {/* Italy Peninsula, Sicily & Sardinia */}
        <g
          fill={isDark ? 'url(#italyFillDark)' : 'url(#italyFillLight)'}
          stroke={isDark ? '#BFD7FF' : '#0B2A6B'}
          strokeWidth="2.2"
          strokeLinejoin="round"
        >
          <path d={ITALY_MAINLAND_PATH} />
          <path d={SICILY_PATH} />
          <path d={SARDINIA_PATH} />
        </g>

        {/* Riga Node Indicator at top-right */}
        <g transform="translate(366, 14)">
          <rect
            x="0"
            y="0"
            width="124"
            height="26"
            rx="8"
            fill={isDark ? '#061A44' : '#0B2A6B'}
            stroke="#FFCC00"
            strokeWidth="1.3"
          />
          <text
            x="62"
            y="17"
            textAnchor="middle"
            fill="#FFCC00"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            {mode === 'return' ? '↗ ACK: RIGA (RIX)' : '↙ SYN: RIGA (RIX)'}
          </text>
        </g>

        {/* Previously transmitted data packet routes */}
        {completedIndices.map((idx) => (
          <g key={`done-${idx}`}>
            <path
              d={SEGMENT_PATHS[idx]}
              fill="none"
              stroke={isDark ? 'rgba(255,204,0,0.28)' : 'rgba(11,42,107,0.28)'}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={SEGMENT_PATHS[idx]}
              fill="none"
              stroke={isDark ? '#FFCC00' : '#0B2A6B'}
              strokeWidth="2"
              strokeDasharray="3 6"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Active glowing data-packet route */}
        <path
          ref={activeRouteRef}
          d={SEGMENT_PATHS[activeSegmentIndex]}
          fill="none"
          stroke="#FFCC00"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#mapPinGlow)"
        />

        {/* City Nodes (1. Milan -> 2. Siena -> 3. Urbino -> 4. Perugia -> 5. Teramo) */}
        {PROGRAM_SLIDES.map((city) => {
          const isCurrent =
            mode === 'program' && city.programNumber === activeProgramNumber;
          const isVisited =
            mode === 'return' ||
            mode === 'hero' ||
            city.programNumber < activeProgramNumber;

          const labelOffsets: Record<string, { dx: number; dy: number; anchor: 'start' | 'end' }> = {
            milan: { dx: -12, dy: -10, anchor: 'end' },
            siena: { dx: -14, dy: -2, anchor: 'end' },
            urbino: { dx: 14, dy: -8, anchor: 'start' },
            perugia: { dx: -14, dy: 16, anchor: 'end' },
            teramo: { dx: 14, dy: 10, anchor: 'start' },
          };
          const offset = labelOffsets[city.id] || { dx: 12, dy: 4, anchor: 'start' };

          return (
            <g
              key={city.id}
              transform={`translate(${city.mapCoords.x}, ${city.mapCoords.y})`}
              className={onSelectCity ? 'cursor-pointer' : ''}
              onClick={() => onSelectCity?.(city.slideNumber)}
              role={onSelectCity ? 'button' : undefined}
              tabIndex={onSelectCity ? 0 : undefined}
              aria-label={`Jump to ${city.university} in ${city.city}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCity?.(city.slideNumber);
                }
              }}
            >
              {isCurrent && (
                <>
                  <circle
                    r="18"
                    fill="rgba(255, 204, 0, 0.25)"
                    className="animate-ping"
                  />
                  <circle r="11" fill="rgba(255, 204, 0, 0.38)" />
                </>
              )}

              <circle
                r={isCurrent ? 6.5 : isVisited ? 5.2 : 4.5}
                fill={
                  isCurrent
                    ? '#FFCC00'
                    : isVisited
                    ? isDark
                      ? '#BFD7FF'
                      : '#0B2A6B'
                    : isDark
                    ? 'rgba(191,215,255,0.4)'
                    : 'rgba(11,42,107,0.35)'
                }
                stroke={isCurrent ? '#061A44' : '#F6F4EC'}
                strokeWidth="2"
              />

              <text
                x={offset.dx}
                y={offset.dy}
                textAnchor={offset.anchor}
                fill={
                  isCurrent
                    ? '#FFCC00'
                    : isDark
                    ? '#F6F4EC'
                    : '#061A44'
                }
                fontSize={isCurrent ? '12.5' : '11'}
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
                className="select-none"
              >
                0{city.programNumber}:{city.city}
              </text>
            </g>
          );
        })}

        {/* Animated Plane + Data Packet Pulse on the Italy Map */}
        <g ref={planeRef} filter="url(#mapPinGlow)">
          <circle cx="-11" cy="0" r="3" fill="#FFCC00" />
          <path
            d="M 14,0 L -10,-9 L -5,-1 L -10,9 Z"
            fill="#FFCC00"
            stroke="#061A44"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      {mode === 'program' && (
        <motion.div
          key={activeProgramNumber}
          initial={{ opacity: 0, scale: 0.88, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.2 }}
          className={`mt-1 flex items-center justify-between rounded-xl px-2.5 py-1.5 font-mono text-[11px] font-bold border ${
            isDark
              ? 'bg-eu-navy/90 border-eu-yellow/50 text-eu-light'
              : 'bg-eu-blue text-eu-light border-eu-blue'
          }`}
        >
          <span className="flex items-center gap-1.5 text-eu-yellow">
            <span className="inline-block h-2 w-2 rounded-full bg-eu-yellow animate-pulse" />
            NODE 0{activeProgramNumber}/05:{' '}
            {PROGRAM_SLIDES[activeProgramNumber - 1]?.city.toUpperCase()}
          </span>
          <span className="opacity-85 truncate max-w-[110px]">
            {PROGRAM_SLIDES[activeProgramNumber - 1]?.country}
          </span>
        </motion.div>
      )}
    </div>
  );
};
