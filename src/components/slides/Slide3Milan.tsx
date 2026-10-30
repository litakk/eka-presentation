import React from 'react';
import { PROGRAM_SLIDES } from '../../data/slides';
import { ProgramSlideView } from './ProgramSlideView';

interface SlideProps {
  reducedMotion?: boolean;
  onSelectSlide: (slide: number) => void;
}

export const Slide3Milan: React.FC<SlideProps> = ({ reducedMotion, onSelectSlide }) => (
  <ProgramSlideView
    data={PROGRAM_SLIDES[0]}
    reducedMotion={reducedMotion}
    onSelectSlide={onSelectSlide}
  />
);

