import React from 'react';
import { motion } from 'framer-motion';
import { Code, AlertCircle } from 'lucide-react';
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
  theme,
  reducedMotion = false,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
                isDark
                  ? 'bg-eu-yellow text-eu-navy'
                  : 'bg-eu-blue text-eu-yellow'
              }`}
            >
              <Code className="h-4 w-4" />
            </span>
            <h3 className="font-display text-slide-h2 font-bold">
              IT Courses &amp; ECTS
            </h3>
          </div>
          {coursesNote && (
            <span
              className={`font-mono rounded-md px-2 py-0.5 text-[11px] font-bold tracking-tight ${
                isDark
                  ? 'bg-eu-navy/85 text-eu-yellow border border-eu-yellow/35'
                  : 'bg-eu-sky/55 text-eu-blue border border-eu-blue/20'
              }`}
            >
              1 CFU = 1 ECTS
            </span>
          )}
        </div>

        {placeholder ? (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className={`mt-2 rounded-xl border-2 border-dashed p-4 ${
              isDark
                ? 'border-eu-yellow/75 bg-eu-navy/70 text-eu-yellow'
                : 'border-eu-blue/60 bg-eu-sky/30 text-eu-navy'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-eu-yellow" />
              <p className="font-mono text-slide-meta font-bold">
                {placeholder}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-current/15">
            <table
              className="w-full text-left border-collapse"
              aria-label="Major IT study courses and ECTS credits"
            >
              <thead>
                <tr
                  className={`border-b font-mono text-[11px] uppercase tracking-wider ${
                    isDark
                      ? 'border-eu-sky/20 bg-eu-navy/60 text-eu-sky'
                      : 'border-eu-blue/15 bg-eu-blue/5 text-eu-blue'
                  }`}
                >
                  <th className="py-1.5 px-2.5 font-bold">Course Module</th>
                  <th className="py-1.5 px-2 font-bold text-right">ECTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-current/10">
                {courses.map((course, idx) => {
                  const isEnglish = course.language.toLowerCase().includes('en');
                  return (
                    <motion.tr
                      key={course.name}
                      initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.38,
                        delay: 0.14 + idx * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`${
                        isDark
                          ? 'hover:bg-eu-navy/40'
                          : 'hover:bg-eu-sky/25'
                      } transition-colors`}
                    >
                      <td className="py-2 px-2.5 text-xs xl:text-[14px] leading-snug">
                        <div className="flex items-start gap-2">
                          <span
                            className={`mt-0.5 shrink-0 ${
                              isDark ? 'text-eu-yellow' : 'text-eu-blue'
                            }`}
                          >
                            <TechIcon name={course.icon} className="h-3.5 w-3.5" />
                          </span>
                          <div>
                            <span className="font-semibold">{course.name}</span>
                            <span
                              className={`ml-1.5 inline-block rounded px-1.5 py-0.2 font-mono text-[10px] font-bold uppercase ${
                                isEnglish
                                  ? isDark
                                    ? 'bg-eu-yellow/20 text-eu-yellow'
                                    : 'bg-eu-blue text-eu-yellow'
                                  : isDark
                                  ? 'bg-eu-sky/15 text-eu-sky'
                                  : 'bg-eu-sky/60 text-eu-navy'
                              }`}
                            >
                              {course.language}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`py-2 px-2 text-right font-mono font-bold text-xs xl:text-[13px] whitespace-nowrap ${
                          course.ects.includes('[to be verified]')
                            ? 'text-eu-yellow underline decoration-dotted'
                            : isDark
                            ? 'text-eu-yellow'
                            : 'text-eu-blue'
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
        <div className="mt-2 font-mono text-[11px] opacity-75">
          // {coursesNote}
        </div>
      )}
    </div>
  );
};
