import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Terminal } from 'lucide-react';
import { CourseItem, SlideTheme } from '../data/slides';
import { TechIcon } from './ui/AnimatedPrimitives';

interface CourseTableProps {
  courses: CourseItem[];
  coursesNote?: string;
  placeholder?: string;
  theme: SlideTheme;
  reducedMotion?: boolean;
}

export const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  coursesNote,
  placeholder,
  reducedMotion = false,
}) => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center border border-ink bg-tomato text-paper">
              <Terminal className="h-4 w-4" />
            </span>
            <h3 className="font-serif text-lg xl:text-xl font-black text-ink">
              Major Study Courses
            </h3>
          </div>
          <span className="border border-ink bg-mustard px-2 py-0.5 font-mono text-[10px] font-extrabold text-ink">
            1 CFU = 1 ECTS
          </span>
        </div>

        {placeholder ? (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-2 border-2 border-dashed border-tomato bg-tomato/10 p-4 text-ink"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-tomato" />
              <p className="font-mono text-xs font-bold">{placeholder}</p>
            </div>
          </motion.div>
        ) : (
          <div className="border-2 border-ink bg-paper">
            <table
              className="w-full text-left border-collapse"
              aria-label="Major IT study courses and ECTS credits"
            >
              <thead>
                <tr className="border-b-2 border-ink bg-ink font-mono text-[10px] uppercase tracking-wider text-paper">
                  <th className="py-1.5 px-2.5 font-bold">Module / Subject</th>
                  <th className="py-1.5 px-2 font-bold text-right">ECTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/20">
                {courses.map((course, idx) => {
                  const isEnglish = course.language.toLowerCase().includes('en');
                  return (
                    <motion.tr
                      key={course.name}
                      initial={reducedMotion ? false : { opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.32,
                        delay: 0.12 + idx * 0.06,
                      }}
                      className="hover:bg-mustard/25 transition-colors"
                    >
                      <td className="py-1.5 px-2.5 text-xs xl:text-[13px] leading-snug text-ink">
                        <div className="flex items-start gap-1.5">
                          <span className="mt-0.5 shrink-0 text-tomato">
                            <TechIcon name={course.icon} className="h-3.5 w-3.5" />
                          </span>
                          <div>
                            <span className="font-bold">{course.name}</span>
                            <span
                              className={`ml-1.5 inline-block border border-ink px-1 py-0.2 font-mono text-[9px] font-extrabold uppercase ${
                                isEnglish
                                  ? 'bg-olive text-paper'
                                  : 'bg-paleblue text-ink'
                              }`}
                            >
                              {course.language}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`py-1.5 px-2 text-right font-mono font-extrabold text-xs whitespace-nowrap ${
                          course.ects.includes('[to be verified]')
                            ? 'text-tomato underline decoration-dotted'
                            : 'text-ink'
                        }`}
                      >
                        {course.ects}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {coursesNote && (
        <div className="mt-1.5 font-mono text-[10px] font-bold text-ink/75">
          $ {coursesNote}
        </div>
      )}
    </div>
  );
};
