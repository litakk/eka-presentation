import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Code,
  Database,
  Network,
  Shield,
  Terminal,
} from 'lucide-react';
import { PROGRAM_SLIDES, SLIDE_1_TITLE } from '../../data/slides';
import { ItalyMap } from '../ItalyMap';
import {
  BarcodeStrip,
  HandwrittenNote,
  MagneticButton,
  PassportStamp,
  SplitText,
  TiltSpotlightCard,
} from '../ui/AnimatedPrimitives';

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
      {/* Left 7 columns: Editorial Travel Poster + Master Boarding Pass Cover */}
      <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 border-2 border-ink bg-cream px-3 py-1 font-mono text-xs font-bold text-ink shadow-ink-sm">
            <Terminal className="h-3.5 w-3.5 text-tomato" />
            <span>{SLIDE_1_TITLE.terminalCmd}</span>
          </div>
          <PassportStamp text={SLIDE_1_TITLE.stampText} variant="tomato" rotate={-3} />
        </div>

        <div className="inline-flex w-fit items-center gap-2 border-2 border-ink bg-mustard px-3.5 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-ink shadow-ink-sm">
          <span>{SLIDE_1_TITLE.badge}</span>
        </div>

        <h1 className="misregister-title font-serif text-4xl sm:text-6xl xl:text-[68px] font-black leading-[0.95] tracking-tight text-ink">
          <SplitText
            text={SLIDE_1_TITLE.title}
            delay={0.05}
            stagger={0.045}
            reducedMotion={reducedMotion}
          />
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <p className="font-sans text-lg sm:text-xl xl:text-[23px] font-bold text-olive max-w-2xl">
            {SLIDE_1_TITLE.subtitle}
          </p>
          <HandwrittenNote text={SLIDE_1_TITLE.handwrittenNote} />
        </div>

        {/* CS / IT Track Tags */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold text-ink">
          {[
            { icon: Brain, label: 'AI & Machine Learning' },
            { icon: Code, label: 'Software Architecture' },
            { icon: Database, label: 'Big Data & Cloud' },
            { icon: Shield, label: 'Cybersecurity' },
            { icon: Network, label: 'Distributed Systems' },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 border border-ink bg-cream px-2.5 py-1 shadow-[2px_2px_0px_#1B1B18]"
            >
              <Icon className="h-3.5 w-3.5 text-tomato" />
              <span>{label}</span>
            </span>
          ))}
        </div>

        {/* Master Boarding Manifest Card */}
        <TiltSpotlightCard
          theme="light"
          codeTitle="// FLIGHT_MANIFEST: RIX_RIGA_TO_ITALY.PASS"
          showTape
          reducedMotion={reducedMotion}
        >
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-tomato">
                {SLIDE_1_TITLE.routeTag}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {PROGRAM_SLIDES.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => onSelectSlide(city.slideNumber)}
                    className="border-2 border-ink bg-paper px-2.5 py-1 font-mono text-xs font-extrabold text-ink shadow-[2px_2px_0px_#1B1B18] hover:bg-mustard transition-colors"
                  >
                    0{city.programNumber}:{city.city} ({city.boardingPass.toIata.split(' ')[0]})
                  </button>
                ))}
              </div>
              <BarcodeStrip code="EKA-RIGA-ITALY-2026-CS-IT" className="pt-1" />
            </div>

            <MagneticButton
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2.5 bg-tomato px-5 py-3.5 font-mono text-sm sm:text-base font-extrabold uppercase tracking-wider text-paper hover:bg-ink hover:text-mustard transition-colors shrink-0"
            >
              <span>{SLIDE_1_TITLE.ctaText}</span>
              <ArrowRight className="h-5 w-5" />
            </MagneticButton>
          </div>
        </TiltSpotlightCard>
      </div>

      {/* Right 5 columns: Vintage Printed Italy Map Poster */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, rotate: 2, scale: 0.94 }}
        animate={{ opacity: 1, rotate: -1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.15 }}
        className="lg:col-span-5 hidden sm:flex items-center justify-center relative"
      >
        <div className="w-full max-w-[360px] xl:max-w-[395px] relative">
          <div
            aria-hidden="true"
            className="tape-strip pointer-events-none absolute -top-3 left-1/2 z-20 h-6 w-24 -translate-x-1/2 rotate-2"
          />
          <ItalyMap
            mode="hero"
            activeProgramNumber={1}
            theme="light"
            reducedMotion={reducedMotion}
            onSelectCity={onSelectSlide}
          />
        </div>
      </motion.div>
    </div>
  );
};
