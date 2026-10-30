import React from 'react';
import { PROGRAM_SLIDES } from '../../data/slides';
import { ProgramSlideView } from './ProgramSlideView';

interface SlideProps {
  reducedMotion?: boolean;
  onSelectSlide: (slide: number) => void;
}

export const Slide6Urbino: React.FC<SlideProps> = ({ reducedMotion, onSelectSlide }) => (
  <ProgramSlideView
    data={PROGRAM_SLIDES[3]}
    reducedMotion={reducedMotion}
    onSelectSlide={onSelectSlide}
  />
);

