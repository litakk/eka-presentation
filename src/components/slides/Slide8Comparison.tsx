import React from 'react';
import { motion } from 'framer-motion';
import { SLIDE_8_COMPARISON } from '../../data/slides';
import { BarChart } from '../BarChart';
import { BarcodeStrip, PassportStamp, SplitText } from '../ui/AnimatedPrimitives';

interface Slide8ComparisonProps {
  reducedMotion?: boolean;
  onSelectSlide: (n: number) => void;
}

export const Slide8Comparison: React.FC<Slide8ComparisonProps> = ({
  reducedMotion = false,
  onSelectSlide,
}) => {
  return (
    <div className="flex h-full w-full flex-col justify-between py-1">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2.5">
        <div>
          <span className="border-2 border-ink bg-ink px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-paper-cream shadow-ink-sm">
            {SLIDE_8_COMPARISON.badge}
          </span>
          <SplitText
            text={SLIDE_8_COMPARISON.title}
            as="h1"
            reducedMotion={reducedMotion}
            className="mt-1.5 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl"
          />
        </div>
        <PassportStamp text="0 EUR TUITION ALL 3" variant="olive" rotate={-2} />
      </div>

      {/* Main Grid: Compact 3-Row Table + Animated Cost Bar Chart */}
      <div className="my-auto grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
        {/* Left 7 Columns: Compact 3-Row Comparison Table */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-between border-2 border-ink bg-paper-cream p-4 shadow-ink lg:col-span-7"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink bg-paper-bg font-mono text-[11px] font-extrabold uppercase tracking-wider text-ink">
                  <th className="p-2.5">University</th>
                  <th className="p-2.5">Language</th>
                  <th className="p-2.5">Cost / Month</th>
                  <th className="p-2.5">IT Relevance</th>
                  <th className="p-2.5">Vibe</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-ink/20 font-sans text-xs sm:text-sm">
                {SLIDE_8_COMPARISON.rows.map((row) => (
                  <tr
                    key={row.university}
                    onClick={() => onSelectSlide(row.slideNumber)}
                    className={`cursor-pointer transition-colors hover:bg-mustard/30 ${
                      row.isWinner ? 'bg-olive/10 font-bold' : ''
                    }`}
                  >
                    <td className="p-3 font-display text-base font-black text-ink">
                      <div>{row.university}</div>
                      <div className="font-mono text-[10px] font-bold uppercase text-tomato">
                        {row.city}
                      </div>
                    </td>
                    <td className="p-3 font-bold text-ink">{row.language}</td>
                    <td className="p-3 font-mono font-extrabold text-ink">
                      {row.costRange}
                    </td>
                    <td className="p-3 font-semibold text-ink">{row.itRelevance}</td>
                    <td className="p-3 font-medium text-ink/85">{row.vibe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-dashed border-ink/35 pt-2 font-mono text-[11px] font-bold text-ink/75">
            <span>CLICK ANY UNIVERSITY ROW TO REVISIT ITS SLIDE</span>
            <span>1 CFU = 1 ECTS • 30 ECTS / SEM</span>
          </div>
        </motion.div>

        {/* Right 5 Columns: Animated Bar Chart for Monthly Cost Midpoints */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="border-2 border-ink bg-paper-cream p-5 shadow-ink lg:col-span-5"
        >
          <BarChart
            rows={SLIDE_8_COMPARISON.rows}
            title="Monthly Cost (Midpoint)"
            theme="light"
            reducedMotion={reducedMotion}
          />
        </motion.div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t-2 border-ink pt-2 font-mono text-xs font-bold uppercase tracking-wider text-ink/75">
        <span>SIENA SAVES ~250–325 EUR/MONTH VS. ROME &amp; MILAN</span>
        <BarcodeStrip code="COMPARE-3-IT-UNIS" />
      </div>
    </div>
  );
};
