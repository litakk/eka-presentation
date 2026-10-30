import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { motion } from 'framer-motion';
import { PROGRAM_SLIDES, SlideTheme } from '../data/slides';

gsap.registerPlugin(MotionPathPlugin);

interface ItalyMapProps {
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

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(
        pathEl,
        {
          strokeDashoffset: 0,
          duration: 1.15,
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        planeEl,
        {
          duration: 1.15,
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

  const completedIndices: number[] = [];
  for (let i = 1; i < activeSegmentIndex; i++) {
    completedIndices.push(i);
  }

  return (
    <div className={`relative select-none ${className}`}>
      {/* Vintage Printed Map Sheet */}
      <div className="border-2 border-ink bg-paper p-2 shadow-ink-sm">
        <svg
          viewBox="0 0 500 600"
          className="h-full w-full overflow-visible"
          role="img"
          aria-label="Vintage printed map of Italy showing EKA Computer Science partner cities and airport codes"
        >
          {/* Vintage cartographic grid lines */}
          <g stroke="#1B1B18" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="3 5">
            <line x1="0" y1="150" x2="500" y2="150" />
            <line x1="0" y1="300" x2="500" y2="300" />
            <line x1="0" y1="450" x2="500" y2="450" />
            <line x1="160" y1="0" x2="160" y2="600" />
            <line x1="340" y1="0" x2="340" y2="600" />
          </g>

          {/* Compass Rose in Bottom-Left */}
          <g transform="translate(56, 520)" stroke="#1B1B18" strokeWidth="1.5">
            <circle cx="0" cy="0" r="24" fill="#FAF6EE" />
            <path d="M 0,-22 L 5,0 L 0,22 L -5,0 Z" fill="#C9472B" />
            <path d="M -22,0 L 0,-5 L 22,0 L 0,5 Z" fill="#1B1B18" />
            <text
              x="0"
              y="-28"
              textAnchor="middle"
              fontSize="10"
              fontWeight="800"
              fontFamily="Fraunces, serif"
              fill="#1B1B18"
              stroke="none"
            >
              N
            </text>
          </g>

          {/* Hard offset ink drop shadow under Italy landmass */}
          <g
            transform="translate(5, 5)"
            fill="#1B1B18"
            opacity="0.2"
          >
            <path d={ITALY_MAINLAND_PATH} />
            <path d={SICILY_PATH} />
            <path d={SARDINIA_PATH} />
          </g>

          {/* Italy Peninsula, Sicily & Sardinia — Flat Mustard/Olive Vintage Print */}
          <g
            fill="#E0A526"
            fillOpacity="0.42"
            stroke="#1B1B18"
            strokeWidth="2.5"
            strokeLinejoin="round"
          >
            <path d={ITALY_MAINLAND_PATH} />
            <path d={SICILY_PATH} />
            <path d={SARDINIA_PATH} />
          </g>

          {/* Riga Stamp Tag at top-right */}
          <g transform="translate(348, 12)">
            <rect
              x="0"
              y="0"
              width="140"
              height="26"
              fill="#FAF6EE"
              stroke="#1B1B18"
              strokeWidth="2"
            />
            <text
              x="70"
              y="17"
              textAnchor="middle"
              fill="#1B1B18"
              fontSize="10"
              fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
            >
              {mode === 'return' ? '↗ TO RIGA (RIX)' : '↙ FROM RIGA (RIX)'}
            </text>
          </g>

          {/* Previously flown segments (dashed ink lines) */}
          {completedIndices.map((idx) => (
            <path
              key={`done-${idx}`}
              d={SEGMENT_PATHS[idx]}
              fill="none"
              stroke="#1B1B18"
              strokeWidth="2.2"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
          ))}

          {/* Active route line drawn in Tomato Red */}
          <path
            ref={activeRouteRef}
            d={SEGMENT_PATHS[activeSegmentIndex]}
            fill="none"
            stroke="#C9472B"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* City Flag/Sticker Pins */}
          {PROGRAM_SLIDES.map((city) => {
            const isCurrent =
              mode === 'program' && city.programNumber === activeProgramNumber;

            const labelOffsets: Record<string, { dx: number; dy: number }> = {
              milan: { dx: -88, dy: -26 },
              siena: { dx: -92, dy: -16 },
              urbino: { dx: 12, dy: -24 },
              perugia: { dx: -96, dy: 8 },
              teramo: { dx: 12, dy: 4 },
            };
            const offset = labelOffsets[city.id] || { dx: 12, dy: -10 };

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
                {/* Pin dot & flag pole */}
                <circle
                  r={isCurrent ? 6 : 4.5}
                  fill={isCurrent ? '#C9472B' : '#1B1B18'}
                  stroke="#FAF6EE"
                  strokeWidth="1.5"
                />

                {/* Sticker / Flag Label */}
                <g transform={`translate(${offset.dx}, ${offset.dy})`}>
                  <rect
                    x="0"
                    y="0"
                    width="82"
                    height="20"
                    fill={isCurrent ? '#C9472B' : '#FAF6EE'}
                    stroke="#1B1B18"
                    strokeWidth="1.8"
                  />
                  <text
                    x="41"
                    y="13.5"
                    textAnchor="middle"
                    fill={isCurrent ? '#FAF6EE' : '#1B1B18'}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {city.programNumber}.{city.city}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Ink-Drawn Paper Plane on the Map */}
          <g ref={planeRef}>
            <path
              d="M 15,0 L -10,-9 L -5,-1 L -10,9 Z"
              fill="#FAF6EE"
              stroke="#1B1B18"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M 15,0 L -5,-1 L -7,5 Z"
              fill="#C9472B"
            />
          </g>
        </svg>
      </div>

      {mode === 'program' && (
        <motion.div
          key={activeProgramNumber}
          initial={{ opacity: 0, rotate: -2, scale: 0.92 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 360, damping: 20 }}
          className="mt-1.5 flex items-center justify-between border-2 border-ink bg-mustard px-2.5 py-1 font-mono text-[10px] font-extrabold text-ink shadow-ink-sm"
        >
          <span>
            RIX ➔ {PROGRAM_SLIDES[activeProgramNumber - 1]?.boardingPass.toIata}
          </span>
          <span>
            STOP 0{activeProgramNumber}/05
          </span>
        </motion.div>
      )}
    </div>
  );
};
