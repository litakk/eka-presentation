import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlaneTakeoff } from 'lucide-react';
import {
  PRESENTATION_META,
  PROGRAM_SLIDES,
  SLIDE_1_TITLE,
} from '../../data/slides';
import { ItalyMap } from '../ItalyMap';
import {
  BarcodeStrip,
  MagneticButton,
  PassportStamp,
  SplitText,
} from '../ui/AnimatedPrimitives';

interface Slide1TitleProps {
  reducedMotion?: boolean;
  onNext: () => void;
  onSelectSlide: (n: number) => void;
}

export const Slide1Title: React.FC<Slide1TitleProps> = ({
  reducedMotion = false,
  onNext,
  onSelectSlide,
}) => {
  return (
    <div className="grid h-full w-full grid-cols-1 items-center gap-6 lg:grid-cols-12">
      {/* Left 7 Columns: Boarding Pass Cover & Real Photo of Italy */}
      <div className="flex flex-col justify-center space-y-4 lg:col-span-7">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="border-2 border-ink bg-ink px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-paper-cream shadow-ink-sm">
            {SLIDE_1_TITLE.badge}
          </span>
          <PassportStamp text="BOARDING PASS" variant="olive" rotate={-3} />
        </div>

        <div>
          <SplitText
            text={SLIDE_1_TITLE.title}
            as="h1"
            reducedMotion={reducedMotion}
            className="misregister-title font-display text-4xl font-black leading-[0.96] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          />
          <p className="mt-2 font-sans text-base font-semibold text-ink/85 sm:text-lg">
            {SLIDE_1_TITLE.subtitle}
          </p>
        </div>

        {/* Taped Editorial Postcard Photo of Italy (Siena Piazza del Campo) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="relative max-w-xl border-2 border-ink bg-paper-cream p-2 shadow-ink"
        >
          <div aria-hidden="true" className="masking-tape" />
          <div className="relative h-44 w-full overflow-hidden border border-ink sm:h-48">
            <img
              src={SLIDE_1_TITLE.image}
              alt={SLIDE_1_TITLE.imageAlt}
              className="duotone-photo h-full w-full object-cover"
            />
            <div aria-hidden="true" className="halftone-overlay absolute inset-0" />
            <div className="absolute bottom-2 left-2 border border-ink bg-paper-cream/95 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
              ITALY • SIENA • MILAN • ROME
            </div>
            <div className="absolute bottom-2 right-2 border border-ink bg-ink/90 px-2 py-0.5 font-mono text-[10px] font-medium text-paper-cream">
              {SLIDE_1_TITLE.photoCredit}
            </div>
          </div>
        </motion.div>

        {/* 3 Clickable Destination Pills + Start CTA */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <MagneticButton
            onClick={onNext}
            className="inline-flex items-center gap-2.5 border-2 border-ink bg-tomato px-5 py-2.5 font-display text-base font-black uppercase tracking-wider text-paper-cream shadow-ink transition-transform hover:-translate-y-0.5"
          >
            <PlaneTakeoff className="h-5 w-5" />
            <span>{SLIDE_1_TITLE.ctaText}</span>
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>

          {PROGRAM_SLIDES.map((prog, idx) => (
            <button
              key={prog.id}
              type="button"
              onClick={() => onSelectSlide(prog.slideNumber)}
              className="border-2 border-ink bg-paper-cream px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-ink-sm transition-colors hover:bg-mustard"
            >
              0{idx + 1}. {prog.shortName} ({prog.boardingPass.toCode})
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t-2 border-dashed border-ink/35 pt-2 font-mono text-[11px] font-bold uppercase tracking-wider text-ink/75">
          <span>{PRESENTATION_META.presenter}</span>
          <BarcodeStrip code="RIX-ITALY-3CS" className="hidden sm:flex" />
        </div>
      </div>

      {/* Right 5 Columns: Vintage Map of Italy with the 3 Universities */}
      <div className="flex items-center justify-center lg:col-span-5">
        <div className="w-full max-w-[360px]">
          <ItalyMap
            mode="hero"
            theme="light"
            reducedMotion={reducedMotion}
            onSelectCity={onSelectSlide}
          />
        </div>
      </div>
    </div>
  );
};
