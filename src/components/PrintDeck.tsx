import React from 'react';
import { Slide1Title } from './slides/Slide1Title';
import { Slide2Hook } from './slides/Slide2Hook';
import { Slide3Latvia } from './slides/Slide3Latvia';
import { Slide4Erasmus } from './slides/Slide4Erasmus';
import { ProgramSlideView } from './slides/ProgramSlideView';
import { Slide8Comparison } from './slides/Slide8Comparison';
import { Slide9Winner } from './slides/Slide9Winner';
import { Slide10Finale } from './slides/Slide10Finale';
import { ALL_SLIDES_METADATA, PROGRAM_SLIDES } from '../data/slides';

export const PrintDeck: React.FC = () => {
  const noop = () => {};

  const renderSlide = (n: number) => {
    switch (n) {
      case 1:
        return <Slide1Title reducedMotion onNext={noop} onSelectSlide={noop} />;
      case 2:
        return <Slide2Hook reducedMotion />;
      case 3:
        return <Slide3Latvia reducedMotion />;
      case 4:
        return <Slide4Erasmus reducedMotion />;
      case 5:
        return <ProgramSlideView data={PROGRAM_SLIDES[0]} reducedMotion />;
      case 6:
        return <ProgramSlideView data={PROGRAM_SLIDES[1]} reducedMotion />;
      case 7:
        return <ProgramSlideView data={PROGRAM_SLIDES[2]} reducedMotion />;
      case 8:
        return <Slide8Comparison reducedMotion onSelectSlide={noop} />;
      case 9:
        return <Slide9Winner reducedMotion onSelectSlide={noop} />;
      case 10:
        return <Slide10Finale reducedMotion onRestartDeck={noop} />;
      default:
        return null;
    }
  };

  return (
    <div className="print-deck">
      {ALL_SLIDES_METADATA.map((meta) => {
        const isDark = meta.theme === 'dark';
        return (
          <section
            key={meta.id}
            className={`print-slide relative flex h-[1080px] w-[1920px] flex-col justify-center overflow-hidden px-16 py-12 ${
              isDark ? 'bg-paper-ink text-paper-cream' : 'bg-paper-bg text-paper-ink'
            }`}
          >
            {renderSlide(meta.slideNumber)}
            <div className="absolute bottom-4 right-8 font-mono text-xs font-bold uppercase tracking-widest opacity-65">
              Slide {String(meta.slideNumber).padStart(2, '0')} / {ALL_SLIDES_METADATA.length} • EKA Erasmus+ Italy (3 CS Programs)
            </div>
          </section>
        );
      })}
    </div>
  );
};
