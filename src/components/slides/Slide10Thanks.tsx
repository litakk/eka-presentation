import React from 'react';
import { motion } from 'framer-motion';
import {
  BookMarked,
  ExternalLink,
  HelpCircle,
  PlaneTakeoff,
  RotateCcw,
  Terminal,
} from 'lucide-react';
import { SLIDE_10_THANKS } from '../../data/slides';
import { ItalyMap } from '../ItalyMap';
import {
  MagneticButton,
  SplitText,
  TiltSpotlightCard,
} from '../ui/AnimatedPrimitives';

interface Slide10ThanksProps {
  reducedMotion?: boolean;
  onRestart: () => void;
  onSelectSlide: (slide: number) => void;
}

export const Slide10Thanks: React.FC<Slide10ThanksProps> = ({
  reducedMotion = false,
  onRestart,
  onSelectSlide,
}) => {
  return (
    <div className="grid h-full w-full grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8 py-1">
      {/* Left 7 Cols: Thank You, Q&A, Official Clickable Sources & Disclaimer */}
      <div className="lg:col-span-7 flex flex-col justify-center space-y-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <motion.div
            layoutId="slide-header-badge"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-eu-blue px-4 py-1 text-xs font-mono font-bold uppercase tracking-wider text-eu-yellow"
          >
            <PlaneTakeoff className="h-3.5 w-3.5" />
            <span>{SLIDE_10_THANKS.badge}</span>
          </motion.div>

          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-eu-blue/20 bg-eu-sky/40 px-2.5 py-1 font-mono text-[11px] font-semibold text-eu-navy">
            <Terminal className="h-3.5 w-3.5 text-eu-blue" />
            <span>$ {SLIDE_10_THANKS.terminalCmd}</span>
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl xl:text-[58px] font-extrabold leading-[1.06] tracking-tight text-eu-navy">
          <SplitText
            text={SLIDE_10_THANKS.title}
            delay={0.05}
            reducedMotion={reducedMotion}
          />
        </h1>

        <p className="font-sans text-base sm:text-lg xl:text-[22px] font-semibold text-eu-blue">
          {SLIDE_10_THANKS.subtitle}
        </p>

        {/* Sources & Official References Card */}
        <TiltSpotlightCard
          theme="light"
          codeTitle="// 10_verified_official_sources.bib"
          reducedMotion={reducedMotion}
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2.5 text-eu-navy">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-eu-blue text-eu-yellow">
                <BookMarked className="h-4 w-4" />
              </span>
              <h2 className="font-display text-slide-h2 font-bold">
                {SLIDE_10_THANKS.sourcesTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SLIDE_10_THANKS.sourceLinks.map((src, idx) => (
                <motion.a
                  key={src.label}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.16 + idx * 0.06 }}
                  className="group flex flex-col justify-between rounded-xl border border-eu-blue/15 bg-eu-sky/25 p-2.5 hover:border-eu-blue hover:bg-eu-sky/45 transition-colors"
                >
                  <div className="flex items-center justify-between gap-1 font-mono text-xs font-bold text-eu-navy">
                    <span className="truncate">{src.label}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-eu-blue group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="mt-0.5 font-sans text-[11px] text-eu-blue/85">
                    {src.note}
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-t border-eu-blue/15 pt-3">
              <p className="font-sans text-xs sm:text-sm font-bold text-eu-blue flex items-center gap-2">
                <HelpCircle className="h-4 w-4 shrink-0 text-eu-blue" />
                <span>{SLIDE_10_THANKS.disclaimer}</span>
              </p>

              <MagneticButton
                type="button"
                onClick={onRestart}
                className="inline-flex items-center gap-2 rounded-xl bg-eu-blue px-4 py-2 font-mono text-xs font-bold text-eu-yellow shadow-md hover:bg-eu-navy transition-colors shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Restart (R)</span>
              </MagneticButton>
            </div>
          </div>
        </TiltSpotlightCard>
      </div>

      {/* Right 5 Cols: Italy Map with Plane Returning to Latvia (Riga) */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.2 }}
        className="lg:col-span-5 hidden sm:flex flex-col items-center justify-center"
      >
        <TiltSpotlightCard
          theme="light"
          codeTitle="// return_packet_riga.route"
          reducedMotion={reducedMotion}
          className="w-full max-w-[370px]"
        >
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-eu-blue">
              <span>Return Packet Route</span>
              <span className="rounded bg-eu-yellow px-2 py-0.5 text-eu-navy">
                TERAMO ➔ RIGA (RIX)
              </span>
            </div>
            <ItalyMap
              mode="return"
              activeProgramNumber={5}
              theme="light"
              reducedMotion={reducedMotion}
              onSelectCity={onSelectSlide}
            />
          </div>
        </TiltSpotlightCard>
      </motion.div>
    </div>
  );
};
