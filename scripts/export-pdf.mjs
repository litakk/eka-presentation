import fs from 'node:fs';
import path from 'node:path';

/**
 * Generates a 10-page 16:9 (1920x1080) static PDF backup of all 10 slides
 * ("Erasmus+ in Italy: 3 Study Programs — Computer Science / IT Track")
 * styled in the warm editorial boarding-pass palette with zero external dependencies.
 */

const PAGE_W = 1920;
const PAGE_H = 1080;

const rgb = (hex) => {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)}`;
};

const PALETTE = {
  paper: rgb('#F2EADB'),
  cream: rgb('#FAF6EE'),
  ink: rgb('#1B1B18'),
  red: rgb('#C9472B'),
  olive: rgb('#3F5B3A'),
  mustard: rgb('#E0A526'),
};

function escPdf(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[–—]/g, '-')
    .replace(/[•]/g, '*')
    .replace(/[“”]/g, '"')
    .replace(/[’]/g, "'")
    .replace(/[^\x20-\x7E]/g, ' ');
}

function rectFill(x, yTop, w, h, color) {
  const y = PAGE_H - yTop - h;
  return `${color} rg\n${x} ${y} ${w} ${h} re f\n`;
}

function rectStroke(x, yTop, w, h, color, lineW = 2) {
  const y = PAGE_H - yTop - h;
  return `${lineW} w\n${color} RG\n${x} ${y} ${w} ${h} re S\n`;
}

function textLine(x, yTop, size, text, color, bold = false) {
  const y = PAGE_H - yTop;
  const font = bold ? '/F2' : '/F1';
  return `BT\n${color} rg\n${font} ${size} Tf\n${x} ${y} Td\n(${escPdf(text)}) Tj\nET\n`;
}

const SLIDES = [
  {
    num: 1,
    theme: 'light',
    badge: 'EKA RIGA (RIX) -> ITALY * COMPUTER SCIENCE / IT',
    title: 'Erasmus+ in Italy: 3 Study Programs',
    subtitle: 'Computer Science & IT at partner universities of EKA (Siena, Milano-Bicocca, Roma Tre)',
    cards: [
      {
        heading: '3 Italian Universities Covered',
        lines: [
          '1. University of Siena (Siena) - MSc AI & Automation Engineering (English, Confirmed EKA IT Partner)',
          '2. University of Milano-Bicocca (Milan) - MSc Computer Science (LM-18) [Confirm IT agreement with EKA]',
          '3. Roma Tre University (Rome) - MSc CS Engineering & AI (LM-32) [Confirm IT agreement with EKA]',
        ],
      },
    ],
    footer: 'Photo: Georges Jansoone (JoJan), CC BY-SA 3.0 * EKA University of Applied Sciences (Riga, Latvia)',
  },
  {
    num: 2,
    theme: 'light',
    badge: 'CLASS DISCUSSION * OPEN QUESTION',
    title: 'Discussion Hook',
    subtitle: 'If you could study anywhere in Europe for one semester and pay no tuition, where would you go?',
    cards: [
      {
        heading: 'Three Hints for the Class',
        lines: [
          '* Hint 01: a new country',
          '* Hint 02: new friends',
          '* Hint 03: real IT experience',
          '-> Closing cue: "Today I show you Italy."',
        ],
      },
    ],
    footer: 'Ask 2-3 students for answers, then transition to Latvia & Italy.',
  },
  {
    num: 3,
    theme: 'light',
    badge: 'DEPARTURE POINT * RIGA, LATVIA (RIX)',
    title: 'About Latvia: Our Starting Point',
    subtitle: 'From Riga to Italy (RIX -> IT)',
    cards: [
      {
        heading: '5 Verified Facts About Latvia',
        lines: [
          '* Capital: Riga, on the Baltic Sea',
          '* Member of the EU since 2004; currency: euro (since 2014)',
          '* Population: about 1.9 million (approx.)',
          '* Riga Historic Centre is a UNESCO World Heritage Site',
          '* EKA University of Applied Sciences is in Riga',
        ],
      },
    ],
    footer: 'Photo: Diliff, CC BY-SA 3.0 (House of the Blackheads, Riga Old Town)',
  },
  {
    num: 4,
    theme: 'light',
    badge: 'EU PROGRAMME * EKA EXCHANGE RULES',
    title: 'What is Erasmus+?',
    subtitle: 'EU programme for education, training, youth and sport (1 CFU = 1 ECTS)',
    cards: [
      {
        heading: '4 Key Stat Cards & Deadlines',
        lines: [
          '* 2-12 months study period abroad',
          '* 0 EUR tuition at the host university',
          '* 30 ECTS credits per semester',
          '* 7.0 minimum average grade at EKA (Apply in October and March)',
        ],
      },
    ],
    footer: 'Source: EKA Erasmus+ Official Rules & Partner List 2026',
  },
  {
    num: 5,
    theme: 'light',
    badge: '01 / 03 * RIX -> FLR * CONFIRMED EKA IT PARTNER',
    title: 'University of Siena — Siena, Italy',
    subtitle: 'MSc Artificial Intelligence & Automation Engineering | Language: English',
    cards: [
      {
        heading: '3 Main Courses, Campus, Cost & Extra',
        lines: [
          '* Courses: Artificial Intelligence (9 ECTS) | Machine Learning (6-12 ECTS) | High Performance Computer Architecture (9 ECTS)',
          '* Campus: San Niccolo engineering & robotics labs in historic Siena',
          '* Cost & Medical: approx. 600-950 EUR/month * EHIC card + insurance',
          '* Extra: Siena International Excellence Scholarships (degree students)',
        ],
      },
    ],
    footer: 'Photo: Sailko, CC BY-SA 3.0 (Palazzo del Rettorato Courtyard, Siena)',
  },
  {
    num: 6,
    theme: 'light',
    badge: '02 / 03 * RIX -> MXP * CONFIRM IT AGREEMENT WITH EKA COORDINATOR',
    title: 'University of Milano-Bicocca — Milan, Italy',
    subtitle: 'MSc Computer Science (LM-18) | Language: English & Italian (B2 English)',
    cards: [
      {
        heading: '3 Main Courses, Campus, Cost & Extra',
        lines: [
          '* Courses: Advanced Machine Learning (6 ECTS) | Large Scale Graph Algorithms (6 ECTS) | Data and Text Mining (6 ECTS)',
          '* Campus: Modern Bicocca district (Buildings U12 & U14 CS labs)',
          '* Cost & Medical: approx. 900-1,300 EUR/month * EHIC card + insurance',
          '* Extra: B2 English required * Confirm IT agreement with EKA Erasmus coordinator',
        ],
      },
    ],
    footer: 'Photo: Facquis, CC BY-SA 4.0 (Building U12, University of Milano-Bicocca)',
  },
  {
    num: 7,
    theme: 'light',
    badge: '03 / 03 * RIX -> FCO * CONFIRM IT AGREEMENT WITH EKA COORDINATOR',
    title: 'Roma Tre University — Rome, Italy',
    subtitle: 'MSc Computer Science Engineering & AI (LM-32) | Language: Italian + English course units',
    cards: [
      {
        heading: '3 Main Courses, Campus, Cost & Extra',
        lines: [
          '* Courses: Algorithms for Big Data (6 ECTS) | Cybersecurity (9 ECTS) | Internet and Data Centers (9 ECTS)',
          '* Campus: Ostiense urban campus with computer & network labs',
          '* Cost & Medical: approx. 850-1,200 EUR/month * EHIC card + insurance',
          '* Extra: English course units available * Confirm IT agreement with EKA Erasmus coordinator',
        ],
      },
    ],
    footer: 'Photo: Universita degli Studi Roma TRE, CC BY-SA 4.0 (Nuovo Rettorato, Rome)',
  },
  {
    num: 8,
    theme: 'light',
    badge: 'SIDE-BY-SIDE * 3 ITALIAN UNIVERSITIES',
    title: 'Comparison of the 3 Universities',
    subtitle: 'Compact Table + Monthly Living Cost Midpoints',
    cards: [
      {
        heading: 'Comparison Table & Cost Chart',
        lines: [
          '1. University of Siena | English (Full MSc) | approx. 600-950 EUR (775)   | High (AI/ML/HPC, EKA IT) | Medieval student town',
          '2. Milano-Bicocca      | EN & IT (B2 EN)    | approx. 900-1,300 EUR (1100)| High (ML/Graphs, Check)  | Big tech & business hub',
          '3. Roma Tre University | IT + EN units      | approx. 850-1,200 EUR (1025)| High (Big Data/Sec, Check)| Capital city & culture',
        ],
      },
    ],
    footer: 'Midpoints: Siena 775 EUR/mo vs. Roma Tre 1,025 EUR/mo vs. Milano-Bicocca 1,100 EUR/mo.',
  },
  {
    num: 9,
    theme: 'dark',
    badge: 'FINAL DECISION * STAMP: MY CHOICE',
    title: 'Which is the best choice?',
    subtitle: 'Out of 3 Erasmus+ universities, I choose Siena.',
    cards: [
      {
        heading: '3 Verified Reasons Why I Choose the University of Siena',
        lines: [
          '1. English-Taught IT & Confirmed EKA IT Partner (AI 9 ECTS, ML 6-12 ECTS, HPC 9 ECTS)',
          '2. Lowest Monthly Living Cost: approx. 600-950 EUR/month (midpoint 775 EUR)',
          '3. Compact Student City & Scholarships: San Niccolo robotics labs + Siena Excellence Scholarships',
          'Fair note: Milan is strongest for big-city careers; Rome offers capital-city culture.',
        ],
      },
    ],
    footer: 'STAMP: MY CHOICE — University of Siena',
  },
  {
    num: 10,
    theme: 'light',
    badge: 'SLIDE 10 // ARRIVAL GATE * FINE',
    title: 'Thank you! — Any questions?',
    subtitle: 'Hamster Video Finale (public/media/hamster.mp4) + Official Sources',
    cards: [
      {
        heading: 'Official Sources & Finale Controls',
        lines: [
          '* Video: public/media/hamster.mp4 (mix-blend-mode: multiply over warm paper #F2EADB)',
          '* EKA Partner List 2026: augstskola.lv | Siena AI: artificial-intelligence-automation.unisi.it',
          '* Milano-Bicocca CS: unimib.it | Roma Tre: uniroma3.it | Latvia EU Facts: european-union.europa.eu',
        ],
      },
    ],
    footer: 'Shortcuts: [N] Notes * [P] Full Script * [Q] Q&A Cheat Sheet * [T] Rehearsal Timer * [S] Sound',
  },
];

function renderSlideContent(slide) {
  const isDark = slide.theme === 'dark';
  const bg = isDark ? PALETTE.ink : PALETTE.paper;
  const cardBg = isDark ? PALETTE.ink : PALETTE.cream;
  const titleColor = isDark ? PALETTE.cream : PALETTE.ink;
  const subColor = isDark ? PALETTE.mustard : PALETTE.red;
  const accent = isDark ? PALETTE.mustard : PALETTE.red;

  let cmds = '';
  cmds += rectFill(0, 0, PAGE_W, PAGE_H, bg);
  cmds += rectFill(0, 0, Math.round((slide.num / SLIDES.length) * PAGE_W), 10, accent);

  cmds += rectFill(100, 65, 920, 38, isDark ? PALETTE.red : PALETTE.ink);
  cmds += textLine(120, 90, 14, slide.badge, PALETTE.cream, true);

  cmds += textLine(100, 165, 50, slide.title, titleColor, true);
  cmds += textLine(100, 212, 22, slide.subtitle, subColor, false);

  let yCursor = 255;
  for (const card of slide.cards) {
    const cardH = 75 + card.lines.length * 42;
    cmds += rectFill(100, yCursor, PAGE_W - 200, cardH, cardBg);
    cmds += rectStroke(100, yCursor, PAGE_W - 200, cardH, isDark ? PALETTE.mustard : PALETTE.ink, 2);
    cmds += textLine(135, yCursor + 44, 25, card.heading, accent, true);

    card.lines.forEach((line, idx) => {
      cmds += textLine(
        135,
        yCursor + 88 + idx * 40,
        21,
        line,
        isDark ? PALETTE.cream : PALETTE.ink,
        false
      );
    });

    yCursor += cardH + 24;
  }

  cmds += rectFill(0, PAGE_H - 68, PAGE_W, 68, PALETTE.ink);
  cmds += textLine(100, PAGE_H - 26, 17, slide.footer, PALETTE.cream, false);
  cmds += textLine(
    PAGE_W - 280,
    PAGE_H - 26,
    17,
    `Slide ${String(slide.num).padStart(2, '0')} / ${SLIDES.length}`,
    PALETTE.mustard,
    true
  );

  return cmds;
}

function buildPdfBuffer() {
  const objects = [];
  const addObj = (body) => {
    objects.push(body);
    return objects.length;
  };

  addObj('<< /Type /Catalog /Pages 2 0 R >>');
  addObj('');
  const fontRegularId = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const fontBoldId = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  const pageIds = [];
  for (const slide of SLIDES) {
    const stream = renderSlideContent(slide);
    const contentId = addObj(
      `<< /Length ${Buffer.byteLength(stream, 'ascii')} >>\nstream\n${stream}endstream`
    );
    const pageId = addObj(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`
    );
    pageIds.push(`${pageId} 0 R`);
  }

  objects[1] = `<< /Type /Pages /Count ${pageIds.length} /Kids [ ${pageIds.join(' ')} ] >>`;

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, 'ascii'));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'ascii');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, 'ascii');
}

const pdfBuf = buildPdfBuffer();
const rootPdf = path.resolve('Erasmus-Italy-3-Study-Programs-Slides.pdf');
const publicPdf = path.resolve('public/Erasmus-Italy-3-Study-Programs-Slides.pdf');

fs.writeFileSync(rootPdf, pdfBuf);
fs.writeFileSync(publicPdf, pdfBuf);
console.log(`Generated 10-slide 16:9 Editorial PDF backup: ${rootPdf} (${pdfBuf.length} bytes)`);
