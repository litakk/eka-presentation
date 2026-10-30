import React from 'react';
import { PROGRAM_SLIDES } from '../../data/slides';
import { ProgramSlideView } from './ProgramSlideView';

interface SlideProps {
  reducedMotion?: boolean;
  onSelectSlide: (slide: number) => void;
}

export const Slide7Teramo: React.FC<SlideProps> = ({ reducedMotion, onSelectSlide }) => (
  <ProgramSlideView
    data={PROGRAM_SLIDES[4]}
    reducedMotion={reducedMotion}
    onSelectSlide={onSelectSlide}
  />
);

