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
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 26, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.55,
        delay: 0.14 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <TiltSpotlightCard
        theme={theme}
        codeTitle={`// 0${index + 1}_${item.codeTag.toLowerCase()}.ts`}
        reducedMotion={reducedMotion}
        className="h-full flex flex-col justify-between"
      >
        <div className="p-6 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`inline-flex h-12 w-12 items-center justify-center rounded-xl p-2.5 ${
                isDark
                  ? 'bg-eu-yellow text-eu-navy'
                  : 'bg-eu-blue text-eu-yellow'
              }`}
            >
              <TechIcon name={item.iconName} className="h-6 w-6" />
            </div>
            <span
              className={`font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                isDark
                  ? 'bg-eu-navy/70 text-eu-yellow border border-eu-yellow/30'
                  : 'bg-eu-sky/50 text-eu-blue border border-eu-blue/20'
              }`}
            >
              {item.codeTag}
            </span>
          </div>

          <div>
            <div
              className={`font-mono text-slide-h1 font-extrabold tracking-tight mb-2 ${
                isDark ? 'text-eu-yellow' : 'text-eu-blue'
              }`}
            >
              <AnimatedCounter
                value={item.value}
                prefix={item.prefix}
                suffix={item.suffix}
                decimals={item.decimals}
                delay={220 + index * 110}
                reducedMotion={reducedMotion}
                onComplete={() => {
                  if (index === 3) soundManager.playDing(659.25);
                }}
              />
            </div>
            <h3
              className={`font-display text-slide-body font-bold leading-snug ${
                isDark ? 'text-eu-light' : 'text-eu-navy'
              }`}
            >
              {item.label}
            </h3>
            <p
              className={`mt-1.5 text-slide-meta font-medium ${
                isDark ? 'text-eu-sky' : 'text-eu-blue/80'
              }`}
            >
              {item.sublabel}
            </p>
          </div>
        </div>
      </TiltSpotlightCard>
    </motion.div>
  );
};
