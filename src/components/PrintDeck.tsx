import React from 'react';
import { Slide1Title } from './slides/Slide1Title';
import { Slide2Definition } from './slides/Slide2Definition';
import { Slide3Milan } from './slides/Slide3Milan';
import { Slide4Rome } from './slides/Slide4Rome';
import { Slide5Siena } from './slides/Slide5Siena';
import { Slide6Urbino } from './slides/Slide6Urbino';
import { Slide7Teramo } from './slides/Slide7Teramo';
import { Slide8Comparison } from './slides/Slide8Comparison';
import { Slide9Winner } from './slides/Slide9Winner';
import { Slide10Thanks } from './slides/Slide10Thanks';
import { ALL_SLIDES_METADATA } from '../data/slides';

export const PrintDeck: React.FC = () => {
  const noop = () => {};

  const renderSlide = (n: number) => {
    switch (n) {
      case 1:
        return <Slide1Title reducedMotion onNext={noop} onSelectSlide={noop} />;
      case 2:
        return <Slide2Definition reducedMotion />;
      case 3:
        return <Slide3Milan reducedMotion onSelectSlide={noop} />;
      case 4:
        return <Slide4Rome reducedMotion onSelectSlide={noop} />;
      case 5:
        return <Slide5Siena reducedMotion onSelectSlide={noop} />;
      case 6:
        return <Slide6Urbino reducedMotion onSelectSlide={noop} />;
      case 7:
        return <Slide7Teramo reducedMotion onSelectSlide={noop} />;
      case 8:
        return <Slide8Comparison reducedMotion onSelectSlide={noop} />;
      case 9:
        return <Slide9Winner reducedMotion onSelectSlide={noop} />;
      case 10:
        return <Slide10Thanks reducedMotion onRestart={noop} onSelectSlide={noop} />;
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
            className={`print-slide relative flex h-[1080px] w-[1920px] flex-col justify-center px-16 py-12 overflow-hidden ${
              isDark ? 'bg-eu-navy text-eu-light' : 'bg-eu-light text-eu-navy'
            }`}
          >
            {renderSlide(meta.slideNumber)}
            <div className="absolute bottom-4 right-8 font-display text-sm font-bold opacity-60">
              Slide {String(meta.slideNumber).padStart(2, '0')} / 10 • EKA Erasmus+ Italy
            </div>
          </section>
        );
      })}
    </div>
  );
};

