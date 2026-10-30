import React from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Cpu, ExternalLink, Terminal } from 'lucide-react';
import { SLIDE_2_DEFINITION } from '../../data/slides';
import { StatCard } from '../StatCard';
import { SplitText } from '../ui/AnimatedPrimitives';

interface Slide2DefinitionProps {
  reducedMotion?: boolean;
}

export const Slide2Definition: React.FC<Slide2DefinitionProps> = ({
  reducedMotion = false,
}) => {
  return (
    <div className="flex h-full w-full flex-col justify-between py-2">
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <motion.div
            layoutId="slide-header-badge"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-eu-blue px-4 py-1 text-xs font-mono font-bold uppercase tracking-wider text-eu-yellow"
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>{SLIDE_2_DEFINITION.badge}</span>
          </motion.div>

          <span className="inline-flex items-center gap-1.5 rounded-md border border-eu-blue/20 bg-eu-sky/40 px-3 py-1 font-mono text-xs font-semibold text-eu-navy">
            <Terminal className="h-3.5 w-3.5 text-eu-blue" />
            <span>$ {SLIDE_2_DEFINITION.terminalCmd}</span>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
          <h1 className="font-display text-4xl sm:text-5xl xl:text-[58px] font-extrabold leading-[1.08] tracking-tight text-eu-navy">
            <SplitText
              text={SLIDE_2_DEFINITION.title}
              delay={0.05}
              reducedMotion={reducedMotion}
            />
          </h1>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-sans text-lg sm:text-xl xl:text-[24px] font-semibold text-eu-blue"
          >
            {SLIDE_2_DEFINITION.definition}
          </motion.p>
        </div>
      </div>

      {/* Middle: Four Animated Stat Cards */}
      <div className="my-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SLIDE_2_DEFINITION.stats.map((item, idx) => (
          <StatCard
            key={item.label}
            item={item}
            index={idx}
            theme="light"
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      {/* Bottom Footer Banner */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-eu-blue/20 bg-eu-blue px-6 py-4 text-eu-light shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-eu-yellow text-eu-navy">
            <CalendarClock className="h-5 w-5" />
          </span>
          <p className="font-sans text-base sm:text-lg xl:text-[22px] font-bold text-eu-light">
            {SLIDE_2_DEFINITION.footer}
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-eu-navy/70 border border-eu-yellow/40 px-4 py-1.5 font-mono text-xs font-bold text-eu-yellow whitespace-nowrap">
          <ExternalLink className="h-3.5 w-3.5" />
          {SLIDE_2_DEFINITION.source}
        </span>
      </motion.div>
    </div>
  );
};
