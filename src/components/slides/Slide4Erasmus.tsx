import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { SLIDE_4_ERASMUS } from '../../data/slides';
import {
  AnimatedCounter,
  BarcodeStrip,
  PassportStamp,
  SplitText,
} from '../ui/AnimatedPrimitives';

interface Slide4ErasmusProps {
  reducedMotion?: boolean;
}

export const Slide4Erasmus: React.FC<Slide4ErasmusProps> = ({
  reducedMotion = false,
}) => {
  return (
    <div className="flex h-full w-full flex-col justify-between py-2">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-3">
        <div>
          <span className="border-2 border-ink bg-tomato px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-paper-cream shadow-ink-sm">
            {SLIDE_4_ERASMUS.badge}
          </span>
          <SplitText
            text={SLIDE_4_ERASMUS.title}
            as="h1"
            reducedMotion={reducedMotion}
            className="mt-2 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl"
          />
        </div>
        <PassportStamp text="1 CFU = 1 ECTS" variant="olive" rotate={-3} />
      </div>

      {/* Short Definition */}
      <p className="max-w-3xl font-sans text-lg font-bold text-ink/90 sm:text-xl">
        {SLIDE_4_ERASMUS.definition}
      </p>

      {/* 4 Big Split-Flap Stat Cards */}
      <div className="my-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SLIDE_4_ERASMUS.stats.map((stat, idx) => {
          const cardBgs = ['bg-paper-cream', 'bg-mustard', 'bg-paper-cream', 'bg-sky-pale'];
          return (
            <motion.div
              key={stat.id}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative flex flex-col justify-between border-2 border-ink ${cardBgs[idx]} p-5 shadow-ink`}
            >
              <div className="flex items-center justify-between border-b border-dashed border-ink/40 pb-2 font-mono text-xs font-bold uppercase text-ink/75">
                <span>RULE 0{idx + 1}</span>
                <CheckCircle2 className="h-4 w-4 text-olive" />
              </div>

              <div className="my-4 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
                <AnimatedCounter
                  value={stat.numericValue}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  reducedMotion={reducedMotion}
                />
              </div>

              <div className="font-sans text-base font-extrabold text-ink">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deadlines Footer Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-2 border-ink bg-paper-cream px-5 py-3.5 shadow-ink-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border-2 border-ink bg-tomato text-paper-cream">
            <Calendar className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-black text-ink sm:text-xl">
            {SLIDE_4_ERASMUS.deadlineNote}
          </span>
        </div>
        <BarcodeStrip code="EKA-ERASMUS-RULES" />
      </div>
    </div>
  );
};
