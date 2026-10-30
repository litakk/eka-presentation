import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  HeartPulse,
  PlaneTakeoff,
} from 'lucide-react';
import { ProgramSlideData } from '../../data/slides';
import { CourseTable } from '../CourseTable';
import { ItalyMap } from '../ItalyMap';
import {
  AnimatedCounter,
  BarcodeStrip,
  HandwrittenNote,
  PassportStamp,
  SplitText,
  TiltSpotlightCard,
} from '../ui/AnimatedPrimitives';

interface ProgramSlideViewProps {
  data: ProgramSlideData;
  reducedMotion?: boolean;
  onSelectSlide: (slide: number) => void;
}

export const ProgramSlideView: React.FC<ProgramSlideViewProps> = ({
  data,
  reducedMotion = false,
  onSelectSlide,
}) => {
  const isDark = data.theme === 'dark';
  const bp = data.boardingPass;

  return (
    <div className="flex h-full w-full flex-col justify-between gap-2.5 py-0.5">
      {/* BOARDING PASS HEADER TICKET (RIX -> Nearest Airport Code, Gate/Seat/Class fields, Barcode & Stamp) */}
      <header className="relative border-2 border-ink bg-cream text-ink shadow-ink">
        {/* Top Airline Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink bg-tomato px-3.5 py-1 text-paper">
          <div className="flex items-center gap-2 font-mono text-xs font-extrabold uppercase tracking-widest">
            <PlaneTakeoff className="h-3.5 w-3.5" />
            <span>
              BOARDING PASS #{String(data.programNumber).padStart(2, '0')} • FLIGHT {bp.flightCode} • {data.ekaStatusBadge}
            </span>
          </div>

          {/* Required Visible Badge for 5th University (Milano-Bicocca) */}
          {data.agreementWarningBadge ? (
            <div className="inline-flex items-center gap-1.5 border-2 border-ink bg-mustard px-2.5 py-0.5 font-mono text-xs font-extrabold text-ink shadow-[2px_2px_0px_#1B1B18]">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-ink" />
              <span>{data.agreementWarningBadge}</span>
            </div>
          ) : (
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
              // 1 ITALIAN CFU = 1 EKA ECTS
            </span>
          )}
        </div>

        {/* Main Boarding Pass Stub Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left 6 cols: University Title & Program */}
          <div className="lg:col-span-6 p-3">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="border border-ink bg-mustard px-2 py-0.2 font-mono text-[11px] font-extrabold uppercase">
                PASS 0{data.programNumber} / 05
              </span>
              <span className="font-mono text-xs font-bold text-ink/75">
                {data.city}, {data.country} ({data.region})
              </span>
              <HandwrittenNote text={bp.handwrittenNote} className="hidden xl:inline-flex" />
            </div>

            <motion.h1
              layoutId="program-university-title"
              className="misregister-title font-serif text-2xl sm:text-4xl xl:text-[44px] font-black leading-[0.98] tracking-tight text-ink"
            >
              <SplitText
                text={`${data.university} — ${data.city}`}
                delay={0.03}
                reducedMotion={reducedMotion}
              />
            </motion.h1>

            <p className="mt-1 font-sans text-xs sm:text-sm xl:text-[15px] font-bold text-olive">
              {data.program}
            </p>
          </div>

          {/* Center 4 cols: Airport Route (RIX -> IATA) & Gate / Seat / Class Fields for ECTS, Language, Cost */}
          <div className="lg:col-span-4 border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-ink p-3 bg-paper/65">
            <div className="flex items-center justify-between border-b border-ink/25 pb-1.5 mb-1.5">
              <div>
                <div className="font-mono text-[9px] font-bold uppercase text-ink/70">
                  ORIGIN
                </div>
                <div className="font-mono text-lg font-extrabold text-ink leading-none">
                  {bp.fromIata} <span className="text-xs font-normal">Riga</span>
                </div>
              </div>
              <div className="font-mono text-base font-extrabold text-tomato">
                ──✈──►
              </div>
              <div className="text-right">
                <div className="font-mono text-[9px] font-bold uppercase text-ink/70">
                  NEAREST AIRPORT
                </div>
                <div className="font-mono text-lg font-extrabold text-tomato leading-none">
                  {bp.toIata}
                </div>
                <div className="font-mono text-[9px] text-ink/75">
                  {bp.toAirportName}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
              <div className="border border-ink bg-cream px-1.5 py-1">
                <div className="text-[9px] font-bold text-ink/65">GATE / CREDITS</div>
                <div className="font-extrabold text-ink truncate">{data.totalEcts.split('•')[0]}</div>
              </div>
              <div className="border border-ink bg-cream px-1.5 py-1">
                <div className="text-[9px] font-bold text-ink/65">CLASS / LANG</div>
                <div className="font-extrabold text-olive truncate">
                  {data.id === 'siena' ? '100% ENGLISH' : data.id === 'milan' ? 'MIXED EN/IT' : 'ITALIAN / EN'}
                </div>
              </div>
              <div className="border border-ink bg-mustard/50 px-1.5 py-1">
                <div className="text-[9px] font-bold text-ink/65">SEAT / COST</div>
                <div className="font-extrabold text-ink truncate">
                  ~{data.livingCostMid} EUR/mo
                </div>
              </div>
            </div>
          </div>

          {/* Right 2 cols: Perforated Stub with Stamp & Barcode */}
          <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-between perforated-divider p-2.5 bg-cream">
            <PassportStamp
              text={bp.stampText}
              variant={
                data.id === 'siena'
                  ? 'olive'
                  : data.agreementWarningBadge
                  ? 'mustard'
                  : 'tomato'
              }
              rotate={-3}
              className="mb-1.5 text-[10px] px-2 py-0.5"
            />
            <BarcodeStrip code={bp.barcodeText} className="w-full" />
          </div>
        </div>
      </header>

      {/* Main Content Grid (Identical 12-col layout across Slides 3–7 for easy comparison) */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch min-h-0">
        {/* Left Card (4 cols): Major Study Courses with ECTS */}
        <div className="lg:col-span-4 flex flex-col">
          <TiltSpotlightCard
            theme={data.theme}
            codeTitle={`// courses/${data.id}.manifest`}
            showTape
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-3.5 h-full">
              <CourseTable
                courses={data.courses}
                coursesNote={data.coursesNote}
                placeholder={data.coursesPlaceholder}
                theme={data.theme}
                reducedMotion={reducedMotion}
              />
            </div>
          </TiltSpotlightCard>
        </div>

        {/* Middle Card (3 cols): Campus + Split-Flap Living Cost Breakdown + Medical */}
        <div className="lg:col-span-3 flex flex-col">
          <TiltSpotlightCard
            theme={data.theme}
            codeTitle="// campus_and_living.sh"
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-3.5 flex flex-col justify-between h-full space-y-2">
              {/* Campus & Tech Environment */}
              <div className="border-2 border-ink bg-paper p-2.5">
                <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-olive flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-tomato" />
                  <span>// campus &amp; tech labs</span>
                </div>
                <p className="mt-1 font-sans text-xs xl:text-[13px] font-semibold leading-snug text-ink">
                  {data.campus}
                </p>
              </div>

              {/* Living Cost Breakdown with Split-Flap Midpoint */}
              <div className="border-2 border-ink bg-mustard/30 p-2.5">
                <div className="flex items-center justify-between font-mono text-[10px] font-extrabold uppercase text-ink">
                  <span>Monthly Living Cost</span>
                  <span className="bg-ink text-paper px-1.5 py-0.2">{data.livingCost}</span>
                </div>

                <div className="mt-1.5 grid grid-cols-1 gap-0.5 font-mono text-[11px] text-ink">
                  <div className="flex justify-between">
                    <span className="text-ink/75">Rent:</span>
                    <span className="font-bold">{data.livingCostBreakdown.rent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/75">Food:</span>
                    <span className="font-bold">{data.livingCostBreakdown.food}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/75">Transport:</span>
                    <span className="font-bold">{data.livingCostBreakdown.transport}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between border-t border-ink/30 pt-1">
                    <span className="font-bold">Board Midpoint:</span>
                    <AnimatedCounter
                      value={data.livingCostMid}
                      suffix=" EUR"
                      splitFlap
                      reducedMotion={reducedMotion}
                      className="text-xs font-extrabold"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Support */}
              <div className="border-2 border-ink bg-paper p-2 flex items-start gap-2">
                <HeartPulse className="h-4 w-4 shrink-0 mt-0.5 text-tomato" />
                <div>
                  <div className="font-mono text-[10px] font-extrabold uppercase text-ink/75">
                    Medical &amp; Insurance
                  </div>
                  <p className="font-sans text-xs font-bold leading-snug text-ink">
                    {data.medical}
                  </p>
                </div>
              </div>
            </div>
          </TiltSpotlightCard>
        </div>

        {/* Right Card (3 cols): Additional Info + Duotone/Halftone Real City Photo */}
        <div className="lg:col-span-3 flex flex-col">
          <TiltSpotlightCard
            theme={data.theme}
            codeTitle="// field_notes.md"
            showTape
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-3.5 flex flex-col justify-between h-full">
              <div>
                <h3 className="font-serif text-lg xl:text-xl font-black text-ink mb-2">
                  Additional Info &amp; Tech Scene
                </h3>

                <ul className="space-y-1.5">
                  {data.goodToKnow.map((fact, idx) => (
                    <motion.li
                      key={fact}
                      initial={reducedMotion ? false : { opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.32, delay: 0.14 + idx * 0.07 }}
                      className="flex items-start gap-2 text-xs xl:text-[13px] font-semibold leading-snug text-ink"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-olive" />
                      <span>{fact}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Duotone / Halftone Editorial Crop of City Photo */}
              <div className="mt-2 relative overflow-hidden border-2 border-ink h-28 xl:h-32 bg-tomato shadow-ink-sm">
                <img
                  src={data.image}
                  alt={data.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale contrast-125 mix-blend-multiply opacity-90 transition-transform duration-500 hover:scale-105"
                />
                <div className="halftone-overlay pointer-events-none absolute inset-0 opacity-20" />
                <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between border border-ink bg-cream px-2 py-0.5 font-mono text-[10px] font-extrabold text-ink">
                  <span className="truncate pr-2">{data.vibe}</span>
                  <span className="bg-tomato text-paper px-1.5 py-0.2 shrink-0">
                    {data.overallRating}
                  </span>
                </div>
              </div>
            </div>
          </TiltSpotlightCard>
        </div>

        {/* Far Right Card (2 cols): Vintage Printed Italy Map with Ink Plane */}
        <div className="lg:col-span-2 hidden lg:flex flex-col justify-center">
          <TiltSpotlightCard
            theme={isDark ? 'dark' : 'light'}
            codeTitle="// map_route.svg"
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-2 flex flex-col justify-between h-full">
              <ItalyMap
                mode="program"
                activeProgramNumber={data.programNumber}
                theme={data.theme}
                reducedMotion={reducedMotion}
                onSelectCity={onSelectSlide}
                className="w-full my-auto"
              />
            </div>
          </TiltSpotlightCard>
        </div>
      </div>
    </div>
  );
};
