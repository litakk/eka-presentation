import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookMarked,
  ExternalLink,
  HelpCircle,
  PlaneTakeoff,
  Terminal,
} from 'lucide-react';
import { SLIDE_10_THANKS, SLIDE_11_FINALE } from '../../data/slides';
import { ItalyMap } from '../ItalyMap';
import {
  MagneticButton,
  PassportStamp,
  SplitText,
  TiltSpotlightCard,
} from '../ui/AnimatedPrimitives';

interface Slide10ThanksProps {
  reducedMotion?: boolean;
  onNext: () => void;
  onSelectSlide: (slide: number) => void;
}

export const Slide10Thanks: React.FC<Slide10ThanksProps> = ({
  reducedMotion = false,
  onNext,
  onSelectSlide,
}) => {
  // Preload Slide 11 hamster video and poster during Slide 10 so Slide 11 starts with zero lag
  useEffect(() => {
    const linkVideo = document.createElement('link');
    linkVideo.rel = 'preload';
    linkVideo.as = 'video';
    linkVideo.href = SLIDE_11_FINALE.videoMp4;
    document.head.appendChild(linkVideo);

    const img = new Image();
    img.src = SLIDE_11_FINALE.posterUrl;

    return () => {
      document.head.removeChild(linkVideo);
    };
  }, []);

  return (
    <div className="grid h-full w-full grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8 py-1">
      {/* Left 7 Cols: Official Clickable Sources Logbook */}
      <div className="lg:col-span-7 flex flex-col justify-center space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 border-2 border-paper bg-tomato px-3.5 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-paper">
              <PlaneTakeoff className="h-3.5 w-3.5" />
              <span>{SLIDE_10_THANKS.badge}</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1.5 border border-paper/40 bg-paper px-2.5 py-1 font-mono text-[11px] font-bold text-ink">
              <Terminal className="h-3.5 w-3.5 text-tomato" />
              <span>$ {SLIDE_10_THANKS.terminalCmd}</span>
            </span>
          </div>

          <PassportStamp text="VERIFIED LOGBOOK" variant="mustard" rotate={2} />
        </div>

        <h1 className="misregister-title-dark font-serif text-4xl sm:text-5xl xl:text-[56px] font-black leading-[0.98] tracking-tight text-paper">
          <SplitText
            text={SLIDE_10_THANKS.title}
            delay={0.05}
            reducedMotion={reducedMotion}
          />
        </h1>

        <p className="font-sans text-base sm:text-lg xl:text-[21px] font-bold text-mustard">
          {SLIDE_10_THANKS.subtitle}
        </p>

        {/* Sources & Official References Card */}
        <TiltSpotlightCard
          theme="dark"
          codeTitle="// 10_verified_official_sources.bib"
          showTape
          reducedMotion={reducedMotion}
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2.5 text-ink">
              <span className="inline-flex h-7 w-7 items-center justify-center border border-ink bg-tomato text-paper">
                <BookMarked className="h-4 w-4" />
              </span>
              <h2 className="font-serif text-lg xl:text-xl font-black">
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
                  transition={{ duration: 0.32, delay: 0.14 + idx * 0.05 }}
                  className="group flex flex-col justify-between border-2 border-ink bg-paper p-2.5 hover:bg-mustard transition-colors"
                >
                  <div className="flex items-center justify-between gap-1 font-mono text-xs font-extrabold text-ink">
                    <span className="truncate">{src.label}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-tomato group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="mt-0.5 font-sans text-[11px] font-semibold text-ink/80">
                    {src.note}
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-t-2 border-dashed border-ink pt-3">
              <p className="font-sans text-xs sm:text-sm font-bold text-ink flex items-center gap-2">
                <HelpCircle className="h-4 w-4 shrink-0 text-tomato" />
                <span>{SLIDE_10_THANKS.disclaimer}</span>
              </p>

              <MagneticButton
                type="button"
                onClick={onNext}
                className="inline-flex items-center gap-2 bg-tomato px-4 py-2 font-mono text-xs font-extrabold uppercase text-paper hover:bg-ink hover:text-mustard transition-colors shrink-0"
              >
                <span>Grand Finale (Slide 11)</span>
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </TiltSpotlightCard>
      </div>

      {/* Right 5 Cols: Vintage Printed Map with Plane Returning to Latvia (Riga) */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="lg:col-span-5 hidden sm:flex flex-col items-center justify-center"
      >
        <TiltSpotlightCard
          theme="dark"
          codeTitle="// return_flight_to_riga.route"
          reducedMotion={reducedMotion}
          className="w-full max-w-[365px]"
        >
          <div className="p-3.5">
            <div className="mb-2 flex items-center justify-between font-mono text-xs font-extrabold uppercase text-ink">
              <span>Return Flight</span>
              <span className="border border-ink bg-mustard px-2 py-0.5 text-ink">
                PSR ➔ RIX (RIGA)
              </span>
            </div>
            <ItalyMap
              mode="return"
              activeProgramNumber={5}
              theme="dark"
              reducedMotion={reducedMotion}
              onSelectCity={onSelectSlide}
            />
          </div>
        </TiltSpotlightCard>
      </motion.div>
    </div>
  );
};
