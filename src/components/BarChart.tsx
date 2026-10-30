import React from 'react';
import { motion } from 'framer-motion';
import { ComparisonRow, SlideTheme } from '../data/slides';
import { AnimatedCounter } from './ui/AnimatedPrimitives';

interface BarChartProps {
  rows: ComparisonRow[];
  title: string;
  theme: SlideTheme;
  reducedMotion?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  rows,
  title,
  theme,
  reducedMotion = false,
}) => {
  const isDark = theme === 'dark';
  const maxCost = 1300;

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-slide-h2 font-bold">{title}</h3>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
              isDark
                ? 'bg-eu-yellow/20 text-eu-yellow'
                : 'bg-eu-blue text-eu-yellow'
            }`}
          >
            Middle of Range
          </span>
        </div>

        <div className="space-y-4">
          {rows.map((row, idx) => {
            const widthPct = Math.round((row.costMid / maxCost) * 100);
            const isSiena = row.isWinner;

            return (
              <div key={row.university} className="space-y-1.5">
                <div className="flex items-baseline justify-between text-slide-meta">
                  <span className="font-display font-bold flex items-center gap-2">
                    <span>{row.university}</span>
                    {isSiena && (
                      <span className="rounded-full bg-eu-yellow px-2 py-0.5 text-[11px] font-extrabold uppercase text-eu-navy">
                        Best Value EN
                      </span>
                    )}
                  </span>
                  <span
                    className={`font-display font-extrabold ${
                      isSiena
                        ? isDark
                          ? 'text-eu-yellow'
                          : 'text-eu-blue'
                        : ''
                    }`}
                  >
                    <AnimatedCounter
                      value={row.costMid}
                      suffix=" EUR/mo"
                      delay={200 + idx * 100}
                      reducedMotion={reducedMotion}
                    />
                    <span className="ml-1.5 text-xs font-normal opacity-75">
                      ({row.costPerMonth})
                    </span>
                  </span>
                </div>

                <div
                  className={`h-5 w-full overflow-hidden rounded-full p-0.5 ${
                    isDark ? 'bg-eu-navy/80' : 'bg-eu-sky/45'
                  }`}
                >
                  <motion.div
                    initial={reducedMotion ? { width: `${widthPct}%` } : { width: '0%' }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{
                      duration: 0.9,
                      delay: 0.2 + idx * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`h-full rounded-full ${
                      isSiena
                        ? 'bg-eu-yellow shadow-[0_0_16px_rgba(255,204,0,0.65)]'
                        : isDark
                        ? 'bg-eu-sky'
                        : 'bg-eu-blue'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p
        className={`mt-4 text-xs font-medium ${
          isDark ? 'text-eu-sky/80' : 'text-eu-navy/75'
        }`}
      >
        Midpoint calculated from official monthly range (e.g., Siena 600–950 EUR → 775 EUR).
      </p>
    </div>
  );
};

