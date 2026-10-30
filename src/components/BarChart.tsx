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
    <div className="flex flex-col h-full justify-between text-ink">
      <div>
        <div className="flex items-center justify-between mb-3 border-b-2 border-ink pb-2">
          <h3 className="font-serif text-lg xl:text-xl font-black">{title}</h3>
          <span className="border border-ink bg-mustard px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase">
            Midpoint EUR
          </span>
        </div>

        <div className="space-y-3">
          {rows.map((row, idx) => {
            const widthPct = Math.round((row.costMid / maxCost) * 100);
            const isSiena = row.isWinner;

            return (
              <div key={row.university} className="space-y-1">
                <div className="flex items-baseline justify-between text-xs xl:text-sm">
                  <span className="font-serif font-black flex items-center gap-1.5">
                    <span>{row.university}</span>
                    {isSiena && (
                      <span className="border border-ink bg-olive px-1.5 py-0.2 font-mono text-[9px] font-extrabold uppercase text-paper">
                        BEST CHOICE
                      </span>
                    )}
                  </span>
                  <span className="font-mono font-extrabold text-ink">
                    <AnimatedCounter
                      value={row.costMid}
                      suffix=" EUR"
                      delay={160 + idx * 90}
                      reducedMotion={reducedMotion}
                    />
                    <span className="ml-1 text-[10px] font-normal text-ink/75">
                      ({row.costPerMonth})
                    </span>
                  </span>
                </div>

                <div className="h-5 w-full border-2 border-ink bg-paper p-0.5">
                  <motion.div
                    initial={reducedMotion ? { width: `${widthPct}%` } : { width: '0%' }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{
                      duration: 0.75,
                      delay: 0.15 + idx * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`h-full ${
                      isSiena
                        ? 'bg-olive'
                        : idx === 0
                        ? 'bg-tomato'
                        : 'bg-mustard'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 border-t border-dashed border-ink/30 pt-2 font-mono text-[10px] font-semibold text-ink/80">
        // Midpoint calculated from monthly range (Siena 600–950 EUR ➔ 775 EUR).
      </p>
    </div>
  );
};
