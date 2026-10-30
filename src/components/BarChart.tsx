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
  reducedMotion = false,
}) => {
  const maxCost = 1300;

  return (
    <div className="flex h-full flex-col justify-between text-ink">
      <div>
        <div className="mb-3 flex items-center justify-between border-b-2 border-ink pb-2">
          <h3 className="font-display text-lg font-black xl:text-xl">{title}</h3>
          <span className="border border-ink bg-mustard px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase">
            Midpoint / Mo
          </span>
        </div>

        <div className="space-y-4">
          {rows.map((row, idx) => {
            const widthPct = Math.round((row.costMidpoint / maxCost) * 100);
            const isSiena = row.isWinner;

            return (
              <div key={row.university} className="space-y-1.5">
                <div className="flex items-baseline justify-between text-xs xl:text-sm">
                  <span className="flex items-center gap-1.5 font-display font-black">
                    <span>{row.university}</span>
                    {isSiena && (
                      <span className="border border-ink bg-olive px-1.5 py-0.5 font-mono text-[9px] font-extrabold uppercase text-paper-cream">
                        MY CHOICE
                      </span>
                    )}
                  </span>
                  <span className="font-mono font-extrabold text-ink">
                    <AnimatedCounter
                      value={row.costMidpoint}
                      suffix=" EUR"
                      delay={160 + idx * 90}
                      reducedMotion={reducedMotion}
                    />
                    <span className="ml-1 text-[10px] font-normal text-ink/75">
                      ({row.costRange})
                    </span>
                  </span>
                </div>

                <div className="h-6 w-full border-2 border-ink bg-paper-bg p-0.5">
                  <motion.div
                    initial={reducedMotion ? { width: `${widthPct}%` } : { width: '0%' }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{
                      duration: 0.75,
                      delay: 0.15 + idx * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`h-full ${
                      isSiena ? 'bg-olive' : idx === 1 ? 'bg-tomato' : 'bg-mustard'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 border-t border-dashed border-ink/30 pt-2 font-mono text-[10px] font-semibold text-ink/80">
        // Midpoint of monthly living cost range (Siena 600–950 ➔ 775 EUR).
      </p>
    </div>
  );
};
