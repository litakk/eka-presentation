import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Building2,
  HeartPulse,
  Info,
} from 'lucide-react';
import { ProgramSlideData } from '../../data/slides';
import { BarcodeStrip, PassportStamp } from '../ui/AnimatedPrimitives';

interface ProgramSlideViewProps {
  data: ProgramSlideData;
  reducedMotion?: boolean;
}

export const ProgramSlideView: React.FC<ProgramSlideViewProps> = ({
  data,
  reducedMotion = false,
}) => {
  return (
    <div className="flex h-full w-full flex-col justify-between py-1">
      {/* Boarding Pass Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="border-2 border-ink bg-ink px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-widest text-paper-cream shadow-ink-sm">
            {data.orderLabel} • {data.boardingPass.fromCode} ➔ {data.boardingPass.toCode}
          </span>

          {/* EKA IT Agreement Badge */}
          {data.ekaItPartnerConfirmed ? (
            <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-olive px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-paper-cream shadow-ink-sm">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {data.agreementBadge}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-mustard px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-ink shadow-ink-sm">
              <AlertTriangle className="h-3.5 w-3.5 text-tomato" />
              {data.agreementBadge}
            </span>
          )}
        </div>

        <PassportStamp
          text={data.boardingPass.stampText}
          variant={data.ekaItPartnerConfirmed ? 'olive' : 'tomato'}
          rotate={-3}
        />
      </div>

      {/* Main 2-Column Boarding-Pass Layout (Same for Slides 5, 6, 7) */}
      <div className="my-auto grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        {/* Left 6 Columns: Large Real Photo of University with Caption Overlay & Corner Credit */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="relative flex flex-col border-2 border-ink bg-paper-cream p-2.5 shadow-ink-lg lg:col-span-6"
        >
          <div aria-hidden="true" className="masking-tape" />

          <div className="relative flex-1 min-h-[260px] sm:min-h-[340px] w-full overflow-hidden border-2 border-ink">
            <img
              src={data.image}
              alt={data.imageAlt}
              loading="lazy"
              className="duotone-photo h-full w-full object-cover"
            />
            <div aria-hidden="true" className="halftone-overlay absolute inset-0" />

            {/* University Name + City Caption Overlay */}
            <div className="absolute bottom-3 left-3 right-3 border-2 border-ink bg-paper-cream/95 px-4 py-2.5 shadow-ink-sm">
              <h1 className="font-display text-2xl font-black leading-tight text-ink sm:text-3xl">
                {data.university}
              </h1>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-tomato">
                {data.city}, {data.country} • GATE {data.boardingPass.gate}
              </div>
            </div>

            {/* Tiny Credit Line in Top-Right Photo Corner */}
            <div className="absolute right-2 top-2 border border-ink bg-ink/90 px-2 py-0.5 font-mono text-[10px] font-medium text-paper-cream">
              {data.photoCredit}
            </div>
          </div>
        </motion.div>

        {/* Right 6 Columns: Program + Language, 3 Courses with ECTS, Campus, Cost+Medical, Additional Info */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex flex-col justify-between space-y-3 border-2 border-ink bg-paper-cream p-5 shadow-ink lg:col-span-6"
        >
          {/* 1. Program Name + Language of Instruction */}
          <div className="border-b-2 border-dashed border-ink/35 pb-3">
            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-tomato">
              PROGRAM &amp; LANGUAGE
            </div>
            <h2 className="mt-0.5 font-display text-xl font-black leading-snug text-ink sm:text-2xl">
              {data.programName}
            </h2>
            <div className="mt-1.5 inline-block border border-ink bg-mustard px-2.5 py-0.5 font-mono text-xs font-extrabold uppercase text-ink">
              Language: {data.language}
            </div>
          </div>

          {/* 2. 3 Main Courses with ECTS */}
          <div className="border-b-2 border-dashed border-ink/35 pb-3">
            <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-olive">
              <BookOpen className="h-3.5 w-3.5" />
              <span>3 MAIN COURSES (1 CFU = 1 ECTS)</span>
            </div>
            <div className="space-y-2">
              {data.courses.map((course) => (
                <div
                  key={course.name}
                  className="flex items-center justify-between border-2 border-ink bg-paper-bg px-3.5 py-2 shadow-ink-sm"
                >
                  <span className="font-sans text-sm font-extrabold text-ink sm:text-base">
                    {course.name}
                  </span>
                  <span className="ml-2 shrink-0 border border-ink bg-paper-cream px-2 py-0.5 font-mono text-xs font-extrabold text-tomato">
                    {course.ects}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Campus + 4. Cost & Medical + 5. Additional Info (3 Short Lines) */}
          <div className="space-y-2 text-sm sm:text-base">
            <div className="flex items-start gap-2.5">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
              <p className="font-sans font-bold text-ink">
                <span className="font-mono text-xs uppercase text-ink/70">Campus: </span>
                {data.campusLine}
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <HeartPulse className="mt-0.5 h-4 w-4 shrink-0 text-tomato" />
              <p className="font-sans font-extrabold text-ink">
                <span className="font-mono text-xs uppercase text-ink/70">Cost &amp; Medical: </span>
                {data.costAndMedicalLine}
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
              <p className="font-sans font-bold text-ink">
                <span className="font-mono text-xs uppercase text-ink/70">Extra: </span>
                {data.additionalInfoLine}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Boarding Stub Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-ink pt-2 font-mono text-[11px] font-bold uppercase tracking-wider text-ink/75">
        <span>
          PASSENGER: EKA CS STUDENT • SEAT {data.boardingPass.seat} • 30 ECTS / SEMESTER
        </span>
        <BarcodeStrip code={data.boardingPass.barcode} />
      </div>
    </div>
  );
};
