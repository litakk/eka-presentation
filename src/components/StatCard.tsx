import React from 'react';
import { motion } from 'framer-motion';
import { SlideTheme, StatCardItem } from '../data/slides';
import {
  AnimatedCounter,
  TechIcon,
  TiltSpotlightCard,
} from './ui/AnimatedPrimitives';
import { soundManager } from '../utils/sound';

interface StatCardProps {
  item: StatCardItem;
  index: number;
  theme: SlideTheme;
  reducedMotion?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  item,
  index,
  theme,
  reducedMotion = false,
}) => {
  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 22, rotate: index % 2 === 0 ? -1.5 : 1.5 }
      }
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 340,
        damping: 22,
        delay: 0.12 + index * 0.09,
      }}
      className="h-full"
    >
      <TiltSpotlightCard
        theme={theme}
        codeTitle={`// STUB_0${index + 1}: ${item.codeTag}`}
        showTape={index % 2 === 0}
        reducedMotion={reducedMotion}
        className="h-full"
      >
        <div className="p-5 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between border-b-2 border-dashed border-ink/25 pb-3 mb-3">
            <div className="inline-flex h-11 w-11 items-center justify-center border-2 border-ink bg-tomato text-paper shadow-ink-sm">
              <TechIcon name={item.iconName} className="h-5 w-5" />
            </div>
            <span className="border border-ink bg-mustard px-2 py-0.5 font-mono text-[11px] font-extrabold uppercase tracking-wider text-ink">
              {item.codeTag}
            </span>
          </div>

          <div>
            {/* Airport Split-Flap Departure Board Counter */}
            <div className="mb-3">
              <AnimatedCounter
                value={item.value}
                prefix={item.prefix}
                suffix={item.suffix}
                decimals={item.decimals}
                delay={180 + index * 110}
                splitFlap
                reducedMotion={reducedMotion}
                className="text-xl xl:text-2xl font-extrabold"
                onComplete={() => {
                  if (index === 3) soundManager.playDing(659.25);
                }}
              />
            </div>

            <h3 className="font-serif text-xl xl:text-2xl font-black leading-tight text-ink">
              {item.label}
            </h3>
            <p className="mt-1.5 font-sans text-xs xl:text-sm font-semibold text-ink/80">
              {item.sublabel}
            </p>
          </div>
        </div>
      </TiltSpotlightCard>
    </motion.div>
  );
};
