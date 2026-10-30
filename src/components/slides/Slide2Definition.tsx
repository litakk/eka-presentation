import React from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, ExternalLink, Terminal } from 'lucide-react';
import { SLIDE_2_DEFINITION } from '../../data/slides';
import { StatCard } from '../StatCard';
import { PassportStamp, SplitText } from '../ui/AnimatedPrimitives';

interface Slide2DefinitionProps {
  reducedMotion?: boolean;
}

export const Slide2Definition: React.FC<Slide2DefinitionProps> = ({
  reducedMotion = false,
}) => {
  return (
    <div className="flex h-full w-full flex-col justify-between py-1">
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="border-2 border-paper bg-tomato px-3.5 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-paper">
              {SLIDE_2_DEFINITION.badge}
            </span>

            <span className="inline-flex items-center gap-1.5 border border-paper/40 bg-paper text-ink px-3 py-1 font-mono text-xs font-bold">
              <Terminal className="h-3.5 w-3.5 text-tomato" />
              <span>$ {SLIDE_2_DEFINITION.terminalCmd}</span>
            </span>
          </div>

          <PassportStamp text="1 CFU = 1 ECTS" variant="mustard" rotate={2} />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2">
          <h1 className="misregister-title-dark font-serif text-4xl sm:text-5xl xl:text-[58px] font-black leading-[0.98] tracking-tight text-paper">
            <SplitText
              text={SLIDE_2_DEFINITION.title}
              delay={0.05}
              reducedMotion={reducedMotion}
            />
          </h1>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="font-sans text-lg sm:text-xl xl:text-[22px] font-bold text-mustard"
          >
            {SLIDE_2_DEFINITION.definition}
          </motion.p>
        </div>
      </div>

      {/* Middle: Four Split-Flap Boarding Rules Cards */}
      <div className="my-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SLIDE_2_DEFINITION.stats.map((item, idx) => (
          <StatCard
            key={item.label}
            item={item}
            index={idx}
            theme="dark"
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      {/* Bottom Footer Ticket Strip */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-2 border-ink bg-mustard px-5 py-3.5 text-ink shadow-[5px_5px_0px_#C9472B]"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink bg-paper text-ink">
            <CalendarClock className="h-5 w-5 text-tomato" />
          </span>
          <p className="font-sans text-base sm:text-lg xl:text-[20px] font-extrabold text-ink">
            {SLIDE_2_DEFINITION.footer}
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-3.5 py-1 font-mono text-xs font-extrabold text-ink whitespace-nowrap">
          <ExternalLink className="h-3.5 w-3.5 text-tomato" />
          {SLIDE_2_DEFINITION.source}
        </span>
      </motion.div>
    </div>
  );
};
