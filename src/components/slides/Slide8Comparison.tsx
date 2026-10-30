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
          <span className="inline-flex items-center gap-2 border-2 border-paper bg-tomato px-3.5 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-paper">
            <Scale className="h-3.5 w-3.5" />
            <span>{SLIDE_8_COMPARISON.badge}</span>
          </span>

          <span className="hidden md:inline-flex items-center gap-1.5 border border-paper/40 bg-paper px-2.5 py-1 font-mono text-[11px] font-bold text-ink">
            <Terminal className="h-3.5 w-3.5 text-tomato" />
            <span>$ {SLIDE_8_COMPARISON.terminalCmd}</span>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2">
          <h1 className="misregister-title-dark font-serif text-3xl sm:text-5xl xl:text-[54px] font-black leading-[0.98] tracking-tight text-paper">
            <SplitText
              text={SLIDE_8_COMPARISON.title}
              delay={0.05}
              reducedMotion={reducedMotion}
            />
          </h1>
          <p className="font-sans text-base sm:text-lg xl:text-[20px] font-bold text-mustard">
            {SLIDE_8_COMPARISON.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content: Left Departure Board Table (8 cols) + Right Bar Chart (4 cols) */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-0">
        {/* Left: Airport Departure Board Comparison Matrix */}
        <div className="lg:col-span-8 flex flex-col">
          <TiltSpotlightCard
            theme="dark"
            codeTitle="// 08_departure_board_comparison.sql"
            showTape
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <div className="overflow-x-auto border-2 border-ink bg-cream">
                <table
                  className="w-full text-left border-collapse"
                  aria-label="Comparison of 5 Italian Erasmus+ Computer Science & IT programs"
                >
                  <thead>
                    <tr className="border-b-2 border-ink bg-ink font-mono text-[10px] font-extrabold uppercase tracking-wider text-paper">
                      <th className="py-2.5 px-2.5">University / Route</th>
                      <th className="py-2.5 px-2">Language</th>
                      <th className="py-2.5 px-2">Courses Relevance to IT</th>
                      <th className="py-2.5 px-2">Cost / mo</th>
                      <th className="py-2.5 px-2">Tech Environment</th>
                      <th className="py-2.5 px-2">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/20">
                    {SLIDE_8_COMPARISON.rows.map((row, idx) => {
                      const isSiena = row.isWinner;
                      return (
                        <motion.tr
                          key={row.university}
                          initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: 0.1 + idx * 0.07,
                          }}
                          onClick={() => onSelectSlide(idx + 3)}
                          className={`cursor-pointer transition-colors text-xs xl:text-[13px] text-ink ${
                            isSiena
                              ? 'bg-mustard/55 font-bold hover:bg-mustard/75'
                              : 'hover:bg-paleblue/50'
                          }`}
                        >
                          <td className="py-2.5 px-2.5 font-serif font-black">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center border border-ink bg-tomato font-mono text-[10px] font-bold text-paper">
                                {idx + 1}
                              </span>
                              <div>
                                <div>
                                  {row.university}{' '}
                                  <span className="font-mono text-[10px] text-ink/70">
                                    (RIX➔{row.iata.split(' ')[0]})
                                  </span>
                                </div>
                                {row.needsAgreementCheck && (
                                  <span className="inline-flex items-center gap-1 border border-ink bg-mustard px-1.5 py-0.2 font-mono text-[9px] font-extrabold text-ink">
                                    <AlertTriangle className="h-2.5 w-2.5" />
                                    Check EKA IT agreement
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-2 font-mono font-bold">
                            <span
                              className={`inline-block border border-ink px-1.5 py-0.5 text-[10px] font-extrabold uppercase ${
                                row.language.includes('English')
                                  ? 'bg-olive text-paper'
                                  : 'bg-paleblue text-ink'
                              }`}
                            >
                              {row.language}
                            </span>
                          </td>
                          <td className="py-2.5 px-2 font-sans font-bold text-ink">
                            {row.itRelevance}
                          </td>
                          <td className="py-2.5 px-2 font-mono font-extrabold text-tomato whitespace-nowrap">
                            {row.costPerMonth}
                          </td>
                          <td className="py-2.5 px-2 font-sans font-semibold text-ink">
                            {row.techEnvironment}
                          </td>
                          <td className="py-2.5 px-2 font-mono font-extrabold text-ink whitespace-nowrap">
                            {row.overallRating}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] font-bold text-ink/80">
                <span>// Click any row to open that university’s boarding pass</span>
                <span>1 CFU = 1 ECTS • 30 ECTS/semester • 0 EUR host tuition</span>
              </div>
            </div>
          </TiltSpotlightCard>
        </div>

        {/* Right: Animated Bar Chart of Living Costs */}
        <div className="lg:col-span-4 flex flex-col">
          <TiltSpotlightCard
            theme="dark"
            codeTitle="// 08_living_costs.chart"
            reducedMotion={reducedMotion}
            className="h-full"
          >
            <div className="p-4 h-full flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-1 text-tomato">
                <BarChart3 className="h-4 w-4" />
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider">
                  Cost Comparison
                </span>
              </div>
              <BarChart
                rows={SLIDE_8_COMPARISON.rows}
                title={SLIDE_8_COMPARISON.chartTitle}
                theme="dark"
                reducedMotion={reducedMotion}
              />
            </div>
          </TiltSpotlightCard>
        </div>
      </div>
    </div>
  );
};
