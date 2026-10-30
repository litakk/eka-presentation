import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, BarChart3, Scale, Terminal } from 'lucide-react';
import { SLIDE_8_COMPARISON } from '../../data/slides';
import { BarChart } from '../BarChart';
import { SplitText, TiltSpotlightCard } from '../ui/AnimatedPrimitives';

interface Slide8ComparisonProps {
  reducedMotion?: boolean;
  onSelectSlide: (slide: number) => void;
}

export const Slide8Comparison: React.FC<Slide8ComparisonProps> = ({
  reducedMotion = false,
  onSelectSlide,
}) => {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-3 py-1">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <motion.div
            layoutId="slide-header-badge"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-eu-blue px-4 py-1 text-xs font-mono font-bold uppercase tracking-wider text-eu-yellow"
          >
            <Scale className="h-3.5 w-3.5" />
            <span>{SLIDE_8_COMPARISON.badge}</span>
          </motion.div>

          <span className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-eu-blue/20 bg-eu-sky/40 px-2.5 py-1 font-mono text-[11px] font-semibold text-eu-navy">
            <Terminal className="h-3.5 w-3.5 text-eu-blue" />
            <span>{SLIDE_8_COMPARISON.terminalCmd}</span>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2">
          <h1 className="font-display text-3xl sm:text-5xl xl:text-[54px] font-extrabold leading-[1.08] tracking-tight text-eu-navy">
            <SplitText
              text={SLIDE_8_COMPARISON.title}
              delay={0.05}
              reducedMotion={reducedMotion}
            />
          </h1>
          <p className="font-sans text-base sm:text-lg xl:text-[21px] font-semibold text-eu-blue">
            {SLIDE_8_COMPARISON.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content: Left Comparison Table (8 cols) + Right Animated Bar Chart (4 cols) */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-0">
        {/* Left: Animated Comparison Table */}
        <div className="lg:col-span-8 flex flex-col">
          <TiltSpotlightCard
            theme="light"
            codeTitle="// 08_it_benchmark_matrix.sql"
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-4 sm:p-5 flex flex-col justify-between h-full">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-left border-collapse"
                  aria-label="Comparison of 5 Italian Erasmus+ Computer Science & IT programs"
                >
                  <thead>
                    <tr className="border-b-2 border-eu-blue/20 font-mono text-[11px] font-extrabold uppercase tracking-wider text-eu-blue">
                      <th className="py-2.5 px-2">University</th>
                      <th className="py-2.5 px-2">Language</th>
                      <th className="py-2.5 px-2">IT Course Relevance</th>
                      <th className="py-2.5 px-2">Cost / mo</th>
                      <th className="py-2.5 px-2">Tech Environment</th>
                      <th className="py-2.5 px-2">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-eu-blue/10">
                    {SLIDE_8_COMPARISON.rows.map((row, idx) => {
                      const isSiena = row.isWinner;
                      return (
                        <motion.tr
                          key={row.university}
                          initial={reducedMotion ? false : { opacity: 0, x: -24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.42,
                            delay: 0.12 + idx * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          onClick={() => onSelectSlide(idx + 3)}
                          className={`cursor-pointer transition-colors text-xs xl:text-[14px] ${
                            isSiena
                              ? 'bg-eu-yellow/40 font-bold hover:bg-eu-yellow/55'
                              : 'hover:bg-eu-sky/30'
                          }`}
                        >
                          <td className="py-3 px-2 font-display font-extrabold text-eu-navy">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-eu-blue font-mono text-[11px] font-bold text-eu-yellow">
                                {idx + 1}
                              </span>
                              <div>
                                <div>{row.university}</div>
                                {row.needsAgreementCheck && (
                                  <span className="inline-flex items-center gap-1 rounded bg-eu-yellow px-1.5 py-0.2 font-mono text-[9px] font-extrabold text-eu-navy">
                                    <AlertTriangle className="h-2.5 w-2.5" />
                                    Verify EKA IT slot
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2 font-mono font-bold">
                            <span
                              className={`inline-block rounded px-2 py-0.5 text-[11px] ${
                                row.language.includes('English')
                                  ? 'bg-eu-blue text-eu-yellow'
                                  : 'bg-eu-sky/60 text-eu-navy'
                              }`}
                            >
                              {row.language}
                            </span>
                          </td>
                          <td className="py-3 px-2 font-sans font-semibold text-eu-navy">
                            {row.itRelevance}
                          </td>
                          <td className="py-3 px-2 font-mono font-bold text-eu-blue whitespace-nowrap">
                            {row.costPerMonth}
                          </td>
                          <td className="py-3 px-2 font-sans font-medium text-eu-navy">
                            {row.techEnvironment}
                          </td>
                          <td className="py-3 px-2 font-mono font-extrabold text-eu-navy whitespace-nowrap">
                            {row.overallRating}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-eu-blue/85">
                <span>// Click any row to inspect that university’s full IT curriculum</span>
                <span className="font-bold text-eu-navy">1 CFU = 1 ECTS • 30 ECTS/semester</span>
              </div>
            </div>
          </TiltSpotlightCard>
        </div>

        {/* Right: Animated Bar Chart of Living Costs */}
        <div className="lg:col-span-4 flex flex-col">
          <TiltSpotlightCard
            theme="light"
            codeTitle="// 08_cost_midpoint.chart"
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-4 sm:p-5 h-full flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-1 text-eu-blue">
                <BarChart3 className="h-4 w-4" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Living Cost Benchmark
                </span>
              </div>
              <BarChart
                rows={SLIDE_8_COMPARISON.rows}
                title={SLIDE_8_COMPARISON.chartTitle}
                theme="light"
                reducedMotion={reducedMotion}
              />
            </div>
          </TiltSpotlightCard>
        </div>
      </div>
    </div>
  );
};
