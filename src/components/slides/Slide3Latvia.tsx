import React from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin } from 'lucide-react';
import { SLIDE_3_LATVIA } from '../../data/slides';
import {
  PassportStamp,
  SplitText,
} from '../ui/AnimatedPrimitives';

interface Slide3LatviaProps {
  reducedMotion?: boolean;
}

export const Slide3Latvia: React.FC<Slide3LatviaProps> = ({
  reducedMotion = false,
}) => {
  return (
    <div className="flex h-full w-full flex-col justify-between py-1">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2">
        <div className="flex items-center gap-2.5">
          <span className="border-2 border-ink bg-ink px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-paper-cream shadow-ink-sm">
            {SLIDE_3_LATVIA.badge}
          </span>
          <SplitText
            text={SLIDE_3_LATVIA.title}
            as="h1"
            reducedMotion={reducedMotion}
            className="font-display text-2xl font-black tracking-tight text-ink sm:text-4xl"
          />
        </div>

        {/* Erasmus Link Badge: From Riga to Italy (RIX -> Italy) */}
        <div className="inline-flex items-center gap-2 border-2 border-ink bg-tomato px-3.5 py-1.5 font-mono text-xs font-extrabold uppercase tracking-wider text-paper-cream shadow-ink-sm">
          <Plane className="h-4 w-4" />
          <span>{SLIDE_3_LATVIA.routeTag}</span>
        </div>
      </div>

      {/* Main Content Grid: 5 Verified Big-Number Facts + Baltic Map + Real Photo of Riga */}
      <div className="my-auto grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
        {/* Left 7 Columns: 5 Big-Number Facts */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
          {SLIDE_3_LATVIA.facts.map((fact, idx) => {
            const isWide = idx === 4;
            return (
              <motion.div
                key={fact.bigValue}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`border-2 border-ink bg-paper-cream p-4 shadow-ink-sm ${
                  isWide ? 'sm:col-span-2 bg-mustard/35' : ''
                }`}
              >
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-tomato">
                  FACT 0{idx + 1} // VERIFIED
                </div>
                <div className="mt-0.5 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  {fact.bigValue}
                </div>
                <div className="mt-1 font-sans text-sm font-bold text-ink/85 sm:text-base">
                  {fact.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right 5 Columns: Real Photo of Riga Old Town + Small Map of the Baltics with Pin on Riga */}
        <div className="flex flex-col gap-3.5 lg:col-span-5">
          {/* Taped Postcard Photo of Riga Old Town */}
          <div className="relative border-2 border-ink bg-paper-cream p-2 shadow-ink">
            <div aria-hidden="true" className="masking-tape" />
            <div className="relative h-44 w-full overflow-hidden border border-ink sm:h-48">
              <img
                src={SLIDE_3_LATVIA.image}
                alt={SLIDE_3_LATVIA.imageAlt}
                loading="lazy"
                className="duotone-photo h-full w-full object-cover"
              />
              <div aria-hidden="true" className="halftone-overlay absolute inset-0" />
              <div className="absolute bottom-2 left-2 border border-ink bg-paper-cream/95 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-ink">
                Riga Old Town (UNESCO)
              </div>
              <div className="absolute bottom-2 right-2 border border-ink bg-ink/90 px-2 py-0.5 font-mono text-[10px] text-paper-cream">
                {SLIDE_3_LATVIA.photoCredit}
              </div>
            </div>
          </div>

          {/* Small Map of the Baltics with Pin on Riga & Route to Italy */}
          <div className=" flex items-center justify-between gap-3 border-2 border-ink bg-paper-cream p-3 shadow-ink-sm">
            <div className="flex flex-col justify-between space-y-1.5">
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-extrabold uppercase text-tomato">
                <MapPin className="h-4 w-4" />
                <span>BALTIC SEA • RIGA (RIX)</span>
              </div>
              <p className="font-sans text-xs font-bold leading-snug text-ink/85 sm:text-sm">
                From Riga to Italy: direct Erasmus+ route for EKA students.
              </p>
              <PassportStamp text="DEPARTURE: RIX" variant="olive" rotate={-2} />
            </div>

            {/* Schematic Baltic States SVG Map (Estonia, Latvia with Riga pin, Lithuania) */}
            <svg
              viewBox="0 0 180 170"
              className="h-32 w-36 shrink-0 border border-ink bg-sky-pale/45 p-1"
              role="img"
              aria-label="Map of the Baltic states showing Estonia, Latvia with a pin on Riga, and Lithuania"
            >
              {/* Baltic Sea Label */}
              <text
                x="10"
                y="62"
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
                fill="#1B1B18"
                opacity="0.65"
              >
                BALTIC SEA
              </text>

              {/* Estonia */}
              <path
                d="M 78,16 L 138,14 L 146,46 L 114,56 L 76,48 Z"
                fill="#FAF6EE"
                stroke="#1B1B18"
                strokeWidth="1.8"
              />
              <text x="108" y="38" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="700" fill="#1B1B18">
                EST
              </text>

              {/* Latvia (Highlighted in Mustard) */}
              <path
                d="M 56,62 L 94,54 L 154,58 L 160,92 L 106,98 L 52,90 Z"
                fill="#E0A526"
                stroke="#1B1B18"
                strokeWidth="2.2"
              />
              <text x="128" y="80" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="800" fill="#1B1B18">
                LATVIA
              </text>

              {/* Lithuania */}
              <path
                d="M 58,94 L 142,98 L 148,136 L 96,146 L 56,126 Z"
                fill="#FAF6EE"
                stroke="#1B1B18"
                strokeWidth="1.8"
              />
              <text x="104" y="124" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="700" fill="#1B1B18">
                LTU
              </text>

              {/* Pin on Riga (Gulf of Riga) */}
              <circle cx="94" cy="74" r="5" fill="#C9472B" stroke="#FAF6EE" strokeWidth="1.5" />
              <rect x="34" y="65" width="52" height="16" fill="#C9472B" stroke="#1B1B18" strokeWidth="1.4" />
              <text x="60" y="76" textAnchor="middle" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="800" fill="#FAF6EE">
                ★ RIGA
              </text>

              {/* Dashed Plane Route RIX -> Italy (South-West) */}
              <path
                d="M 94,74 Q 60,122 18,158"
                fill="none"
                stroke="#C9472B"
                strokeWidth="2.2"
                strokeDasharray="4 3"
              />
              <text x="48" y="162" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="800" fill="#C9472B">
                ↙ TO ITALY
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
