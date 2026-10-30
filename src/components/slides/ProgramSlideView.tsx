import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Euro,
  Globe,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { ProgramSlideData } from '../../data/slides';
import { CourseTable } from '../CourseTable';
import { ItalyMap } from '../ItalyMap';
import {
  AnimatedCounter,
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

  return (
    <div className="flex h-full w-full flex-col justify-between gap-2.5 py-1">
      {/* Top Header: Number + University + City + Country, EKA Status / Agreement Warning Badge, Program, Language & Total ECTS */}
      <header className="flex flex-col gap-2 border-b border-current/15 pb-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <motion.span
              layoutId="program-number-pill"
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-wider ${
                isDark
                  ? 'bg-eu-yellow text-eu-navy'
                  : 'bg-eu-blue text-eu-yellow'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>IT_NODE 0{data.programNumber} / 05</span>
            </motion.span>

            <span
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs font-bold border ${
                isDark
                  ? 'border-eu-sky/30 bg-eu-navy/70 text-eu-sky'
                  : 'border-eu-blue/20 bg-eu-sky/45 text-eu-blue'
              }`}
            >
              <MapPin className="h-3.5 w-3.5 text-eu-yellow" />
              <span>
                {data.city}, {data.country} ({data.region})
              </span>
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-xs font-bold ${
                data.agreementWarningBadge
                  ? 'bg-eu-navy/80 text-eu-sky border border-eu-sky/30'
                  : isDark
                  ? 'bg-eu-yellow/20 text-eu-yellow border border-eu-yellow/40'
                  : 'bg-eu-blue text-eu-yellow'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{data.ekaStatusBadge}</span>
            </span>
          </div>

          {/* Required Visible Badge for 5th University (Milano-Bicocca) */}
          {data.agreementWarningBadge && (
            <motion.div
              initial={reducedMotion ? false : { scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-eu-yellow bg-eu-yellow px-3.5 py-1 font-mono text-xs sm:text-sm font-extrabold text-eu-navy shadow-[0_0_24px_rgba(255,204,0,0.5)]"
            >
              <AlertTriangle className="h-4 w-4 shrink-0 text-eu-navy" />
              <span>{data.agreementWarningBadge}</span>
            </motion.div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2">
          <motion.h1
            layoutId="program-university-title"
            className="font-display text-3xl sm:text-4xl xl:text-[52px] font-extrabold leading-[1.06] tracking-tight"
          >
            <span
              className={`font-mono ${
                isDark ? 'text-eu-yellow' : 'text-eu-blue'
              }`}
            >
              0{data.programNumber}.
            </span>{' '}
            <SplitText
              text={`${data.university} — ${data.city}, ${data.country}`}
              delay={0.04}
              reducedMotion={reducedMotion}
            />
          </motion.h1>

          {/* Sub-line with Program, Language & Total ECTS */}
          <div className="flex flex-wrap items-center gap-1.5 lg:justify-end">
            <div
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-sans text-xs sm:text-sm xl:text-[16px] font-bold border ${
                isDark
                  ? 'bg-eu-blue/85 border-eu-sky/30 text-eu-light'
                  : 'bg-white border-eu-blue/20 text-eu-navy shadow-sm'
              }`}
            >
              <Cpu
                className={`h-4 w-4 shrink-0 ${
                  isDark ? 'text-eu-yellow' : 'text-eu-blue'
                }`}
              />
              <span>{data.program}</span>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs font-bold ${
                isDark
                  ? 'bg-eu-navy/90 text-eu-yellow border border-eu-yellow/40'
                  : 'bg-eu-blue text-eu-yellow'
              }`}
            >
              <Globe className="h-3.5 w-3.5 shrink-0" />
              <span>{data.language}</span>
            </div>

            <div className="inline-flex items-center rounded-lg bg-eu-yellow px-2.5 py-1.5 font-mono text-xs font-extrabold text-eu-navy">
              <span>{data.totalEcts}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid: Left Card (Courses & ECTS) + Middle Card (Campus & Living Breakdown) + Right Card (Additional Info) + Map */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch min-h-0">
        {/* Left Card (4 cols): Major IT Study Courses with ECTS */}
        <div className="lg:col-span-4 flex flex-col">
          <TiltSpotlightCard
            theme={data.theme}
            codeTitle={`// 01_${data.id}_courses.cfg`}
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-4 h-full">
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

        {/* Middle Card (3 cols): Campus & Tech Environment + Living Cost Breakdown + Medical */}
        <div className="lg:col-span-3 flex flex-col">
          <TiltSpotlightCard
            theme={data.theme}
            codeTitle={`// 02_campus_and_costs.sh`}
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-4 flex flex-col justify-between h-full space-y-2.5">
              {/* Campus & Tech Environment */}
              <div
                className={`rounded-xl p-2.5 border ${
                  isDark
                    ? 'bg-eu-navy/60 border-eu-sky/15'
                    : 'bg-eu-sky/25 border-eu-blue/10'
                }`}
              >
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider opacity-80 flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-eu-yellow" />
                  <span>Campus &amp; Tech Environment</span>
                </div>
                <p className="mt-1 font-sans text-xs xl:text-[14px] font-semibold leading-snug">
                  {data.campus}
                </p>
              </div>

              {/* Living Cost Breakdown (Rent, Food, Transport, Total) */}
              <div
                className={`rounded-xl p-3 border ${
                  isDark
                    ? 'bg-eu-navy/80 border-eu-yellow/40'
                    : 'bg-eu-blue text-eu-light border-eu-blue'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-eu-yellow">
                  <span>Monthly Living Cost</span>
                  <Euro className="h-3.5 w-3.5" />
                </div>
                <div className="mt-0.5 font-mono text-lg xl:text-xl font-extrabold text-eu-yellow">
                  {data.livingCost}
                </div>
                <div className="mt-1.5 grid grid-cols-1 gap-1 border-t border-white/15 pt-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="opacity-75">Rent:</span>
                    <span className="font-bold">{data.livingCostBreakdown.rent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Food:</span>
                    <span className="font-bold">{data.livingCostBreakdown.food}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Transport:</span>
                    <span className="font-bold">{data.livingCostBreakdown.transport}</span>
                  </div>
                  <div className="flex justify-between text-eu-yellow pt-0.5">
                    <span>Midpoint:</span>
                    <AnimatedCounter
                      value={data.livingCostMid}
                      suffix=" EUR/mo"
                      reducedMotion={reducedMotion}
                      className="font-extrabold"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Support */}
              <div
                className={`rounded-xl p-2.5 border flex items-start gap-2 ${
                  isDark
                    ? 'bg-eu-navy/60 border-eu-sky/15'
                    : 'bg-eu-sky/25 border-eu-blue/10'
                }`}
              >
                <HeartPulse
                  className={`h-4 w-4 shrink-0 mt-0.5 ${
                    isDark ? 'text-eu-yellow' : 'text-eu-blue'
                  }`}
                />
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider opacity-75">
                    Medical Support
                  </div>
                  <p className="font-sans text-xs xl:text-[13px] font-semibold leading-snug">
                    {data.medical}
                  </p>
                </div>
              </div>
            </div>
          </TiltSpotlightCard>
        </div>

        {/* Right Card (3 cols): Additional Info (Tech/Startup, Internships, Scholarships, Deadlines, Italian level) + Photo */}
        <div className="lg:col-span-3 flex flex-col">
          <TiltSpotlightCard
            theme={data.theme}
            codeTitle={`// 03_additional_info.md`}
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="font-display text-slide-h2 font-bold mb-2">
                  Tech Scene &amp; Good to Know
                </h3>

                <ul className="space-y-2">
                  {data.goodToKnow.map((fact, idx) => (
                    <motion.li
                      key={fact}
                      initial={reducedMotion ? false : { opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.38, delay: 0.18 + idx * 0.08 }}
                      className="flex items-start gap-2 text-xs xl:text-[14px] font-medium leading-snug"
                    >
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 mt-0.5 ${
                          isDark ? 'text-eu-yellow' : 'text-eu-blue'
                        }`}
                      />
                      <span>{fact}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bundled Optimized WebP City Photograph */}
              <div className="mt-2.5 relative overflow-hidden rounded-xl border border-current/15 h-28 xl:h-32">
                <img
                  src={data.image}
                  alt={data.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eu-navy/90 via-eu-navy/25 to-transparent" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between font-mono text-[11px] font-bold text-eu-light">
                  <span className="truncate pr-2">{data.vibe}</span>
                  <span className="rounded bg-eu-yellow px-1.5 py-0.5 text-[10px] text-eu-navy shrink-0">
                    {data.overallRating.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>
          </TiltSpotlightCard>
        </div>

        {/* Far Right Card (2 cols): Small Italy Map with Data-Packet Plane & Pin */}
        <div className="lg:col-span-2 hidden lg:flex flex-col justify-center">
          <TiltSpotlightCard
            theme={data.theme}
            codeTitle="// 04_route.map"
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-2.5 flex flex-col justify-between h-full">
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
