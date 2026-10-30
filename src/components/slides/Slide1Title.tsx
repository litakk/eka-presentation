import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Code,
  Cpu,
  Database,
  Network,
  Shield,
  Terminal,
} from 'lucide-react';
import { PROGRAM_SLIDES, SLIDE_1_TITLE } from '../../data/slides';
import { planeLottieData } from '../../assets/lottie/animations';
import { ItalyMap } from '../ItalyMap';
import { MagneticButton, SplitText, TiltSpotlightCard } from '../ui/AnimatedPrimitives';
import { LottieIcon } from '../ui/LottieIcon';

interface Slide1TitleProps {
  reducedMotion?: boolean;
  onNext: () => void;
  onSelectSlide: (slide: number) => void;
}

export const Slide1Title: React.FC<Slide1TitleProps> = ({
  reducedMotion = false,
  onNext,
  onSelectSlide,
}) => {
  return (
    <div className="grid h-full w-full grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-10">
      {/* Left 7 columns: Terminal Prompt + Hero Typography + Boarding Pass CTA */}
      <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
        {/* Terminal Command Line Prompt */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-eu-sky/25 bg-eu-navy/90 px-3.5 py-1.5 font-mono text-xs text-eu-sky shadow-md"
        >
          <Terminal className="h-3.5 w-3.5 text-eu-yellow" />
          <span>{SLIDE_1_TITLE.terminalCmd}</span>
        </motion.div>

        <motion.div
          layoutId="slide-header-badge"
          initial={reducedMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex w-fit items-center gap-2.5 rounded-full border border-eu-yellow/50 bg-eu-blue/85 px-4 py-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-eu-yellow shadow-lg"
        >
          <Cpu className="h-4 w-4 text-eu-yellow" />
          <span>{SLIDE_1_TITLE.badge}</span>
        </motion.div>

        <h1 className="font-display text-4xl sm:text-5xl xl:text-[62px] font-extrabold leading-[1.06] tracking-tight text-eu-light">
          <SplitText
            text={SLIDE_1_TITLE.title}
            delay={0.08}
            stagger={0.05}
            reducedMotion={reducedMotion}
          />
        </h1>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="font-sans text-lg sm:text-xl xl:text-[25px] xl:leading-[1.4] font-medium text-eu-sky max-w-2xl"
        >
          {SLIDE_1_TITLE.subtitle}
        </motion.p>

        {/* Tech Stack / CS Domain Chips */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="flex flex-wrap items-center gap-2 font-mono text-xs text-eu-sky/90"
        >
          {[
            { icon: Brain, label: 'Artificial Intelligence' },
            { icon: Code, label: 'Software Engineering' },
            { icon: Database, label: 'Big Data & Cloud' },
            { icon: Shield, label: 'Cybersecurity' },
            { icon: Network, label: 'Distributed Systems' },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-md border border-eu-sky/20 bg-eu-navy/65 px-2.5 py-1"
            >
              <Icon className="h-3.5 w-3.5 text-eu-yellow" />
              <span>{label}</span>
            </span>
          ))}
        </motion.div>

        {/* Interactive Flight Route Strip */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.44 }}
          className="pt-1"
        >
          <TiltSpotlightCard
            theme="dark"
            codeTitle="// packet_routing_table.json"
            reducedMotion={reducedMotion}
          >
            <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-eu-navy/90 border border-eu-yellow/40 flex items-center justify-center overflow-hidden">
                  <LottieIcon
                    animationData={planeLottieData}
                    loop={!reducedMotion}
                    autoplay={!reducedMotion}
                    size={44}
                  />
                </div>
                <div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-eu-yellow">
                    {SLIDE_1_TITLE.routeTag}
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    {PROGRAM_SLIDES.map((city) => (
                      <button
                        key={city.id}
                        type="button"
                        onClick={() => onSelectSlide(city.slideNumber)}
                        className="rounded-lg border border-eu-sky/30 bg-eu-navy/75 px-2.5 py-1 font-mono text-xs font-bold text-eu-light hover:border-eu-yellow hover:bg-eu-yellow hover:text-eu-navy transition-colors"
                      >
                        0{city.programNumber}:{city.city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <MagneticButton
                type="button"
                onClick={onNext}
                className="inline-flex items-center gap-2.5 rounded-xl bg-eu-yellow px-5 py-3 font-mono text-sm sm:text-base font-extrabold text-eu-navy shadow-[0_0_25px_rgba(255,204,0,0.45)] hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span>{SLIDE_1_TITLE.ctaText}</span>
                <ArrowRight className="h-5 w-5" />
              </MagneticButton>
            </div>
          </TiltSpotlightCard>
        </motion.div>
      </div>

      {/* Right 5 columns: Animated Globe Ring + Italy Data-Packet Map */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="lg:col-span-5 hidden sm:flex items-center justify-center relative"
      >
        <motion.div
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute h-[360px] w-[360px] xl:h-[430px] xl:w-[430px] rounded-full border border-dashed border-eu-yellow/30"
        />
        <motion.div
          animate={reducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute h-[300px] w-[300px] xl:h-[360px] xl:w-[360px] rounded-full border border-eu-sky/20"
        />

        <div className="w-full max-w-[360px] xl:max-w-[400px]">
          <ItalyMap
            mode="hero"
            activeProgramNumber={1}
            theme="dark"
            reducedMotion={reducedMotion}
            onSelectCity={onSelectSlide}
          />
        </div>
      </motion.div>
    </div>
  );
};
