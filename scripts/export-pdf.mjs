import fs from 'node:fs';
import path from 'node:path';

/**
 * Generates an 11-page 16:9 (1920x1080) static PDF backup of all 11 slides
 * ("Erasmus+ in Italy: 5 Study Programs — Computer Science / IT Track")
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
  sky: rgb('#CFE0E6'),
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
    badge: 'EKA UNIVERSITY OF APPLIED SCIENCES * COMPUTER SCIENCE / IT TRACK',
    title: 'Erasmus+ in Italy: 5 Study Programs',
    subtitle: 'Partner universities of EKA University of Applied Sciences (Riga RIX -> Italy)',
    cards: [
      {
        heading: 'Boarding Route Across Italy (5 Computer Science & IT Programs)',
        lines: [
          '1. Milano-Bicocca (Milan, MXP/LIN) - MSc Computer Science (LM-18) [Check EKA agreement for IT with erasmus@eka.edu.lv]',
          '2. University of Siena (Siena, FLR) - MSc AI & Automation Eng. / Computer & Automation Eng. (100% English)',
          '3. Urbino Carlo Bo (Urbino, RMI/AOI) - MSc Informatica e Innovazione Digitale (LM-18 CS)',
          '4. University for Foreigners of Perugia (Perugia, PEG) - Digital Humanities, UX Design & Applied AI',
          '5. University of Teramo (Teramo, PSR) - Big Data Analytics, Cybersecurity & ICT Modules',
        ],
      },
    ],
    footer: 'Presenter: Computer Science (IT) Student * EKA University of Applied Sciences (Riga, Latvia)',
  },
  {
    num: 2,
    theme: 'light',
    badge: 'PASSENGER MANIFEST * EUROPEAN UNION ICT & CS MOBILITY',
    title: 'What is Erasmus+?',
    subtitle: 'EU programme for education, training, youth and sport — Computer Science & IT exchange.',
    cards: [
      {
        heading: 'Key EKA Erasmus+ Numbers (1 CFU = 1 ECTS)',
        lines: [
          '* 2-12 months of study abroad',
          '* 0 EUR tuition at the host university',
          '* 30 ECTS credits per semester (Italian CFU = ECTS 1:1)',
          '* 7.0 minimum average grade at EKA',
        ],
      },
      {
        heading: 'Application Deadlines & Official Sources',
        lines: [
          'Apply in October (spring semester) and March (autumn semester).',
          'Source: EKA ERASMUS+ page & EKA Partner Institutions 2026_v3.pdf',
        ],
      },
    ],
    footer: 'Apply in October (spring semester) and March (autumn semester). 1 CFU = 1 ECTS.',
  },
  {
    num: 3,
    theme: 'light',
    badge: 'BOARDING PASS 01 / 05 * RIX -> MXP/LIN * CHECK EKA AGREEMENT FOR IT',
    title: '01. Milano-Bicocca — Milan, Italy',
    subtitle: 'MSc Computer Science (Laurea Magistrale in Informatica, LM-18) | Mixed (EN/IT) | 120 ECTS',
    cards: [
      {
        heading: 'Major IT Courses & ECTS (Official DISCo Catalogue)',
        lines: [
          '* Advanced Machine Learning (F1801Q151) - 6 ECTS (English)',
          '* Large Scale Graph Algorithms (F1801Q162) - 6 ECTS (English)',
          '* Data and Text Mining (F1801Q105) - 6 ECTS (English)',
          '* Sicurezza Informatica / Computer Security - 6 ECTS (EN on demand) | Cloud Computing - 6 ECTS',
          '* Architettura del Software (Software Architecture) - 6 ECTS (Italian)',
        ],
      },
      {
        heading: 'Campus, Living Cost & Additional Info',
        lines: [
          'STAMP: Check EKA agreement for IT with erasmus@eka.edu.lv',
          'Campus: DISCo Building U14 AI/robotics labs, libraries & coworking',
          'Living cost: approx. 900-1,300 EUR/mo (Rent ~550-800, Food ~250-350, Transport ~22-39 EUR) | EHIC + insurance',
        ],
      },
    ],
    footer: 'Gate G01 * Seat 14A * Milan (Check EKA agreement for IT with erasmus@eka.edu.lv)',
  },
  {
    num: 4,
    theme: 'light',
    badge: 'BOARDING PASS 02 / 05 * RIX -> FLR * CONFIRMED EKA IT PARTNER (SIENA)',
    title: '02. University of Siena — Siena, Italy',
    subtitle: 'MSc Artificial Intelligence & Automation Eng. / Computer & Automation Eng. (LM-32) | Fully in English',
    cards: [
      {
        heading: 'Major IT Courses & ECTS (Official Unisi DIISM Catalogue)',
        lines: [
          '* Artificial Intelligence - 9 ECTS (English)',
          '* Machine Learning - 6-12 ECTS (English)',
          '* High Performance Computer Architecture - 9 ECTS (English)',
          '* Big Data - 6 ECTS (English) | Network Optimization - 6 ECTS (English)',
          '* Design of Applications, Services and Systems - 9 ECTS (English)',
        ],
      },
      {
        heading: 'Campus, Living Cost & Additional Info',
        lines: [
          'Campus: San Niccolo Engineering & IT complex (DIISM), robotics/vision labs, 24/7 libraries',
          'Living cost: 600-950 EUR/mo (Rent ~350-550, Food ~180-280, Transport ~25-40 EUR) | EHIC + insurance',
          'Additional: Siena International Excellence Scholarships; 6 ECTS internship; SAIHub AI ecosystem',
        ],
      },
    ],
    footer: 'Gate G02 * Seat 01A * Siena (Confirmed EKA IT Partner — 100% English AI & CS Engineering)',
  },
  {
    num: 5,
    theme: 'light',
    badge: 'BOARDING PASS 03 / 05 * RIX -> RMI/AOI * CONFIRMED EKA IT PARTNER (URBINO)',
    title: '03. Urbino Carlo Bo — Urbino, Italy',
    subtitle: 'MSc Informatica e Innovazione Digitale (Computer Science, LM-18, 2 yrs) | Mixed (IT + EN marked)',
    cards: [
      {
        heading: 'Major IT Courses & ECTS (Official UniUrb LM-18 Study Plan)',
        lines: [
          '* Machine Learning - 9 ECTS | Sicurezza Informatica (Cybersecurity) - 9 ECTS',
          '* Applicazioni Distribuite e Cloud Computing - 9 ECTS',
          '* Sistemi Distribuiti e Decentralizzati - 9 ECTS',
          '* Programmazione per l Internet of Things (IoT) - 6 ECTS | Mobile & UI Programming - 6 ECTS',
        ],
      },
      {
        heading: 'Campus, Living Cost & Additional Info',
        lines: [
          'Campus: Walled Renaissance town; DiSPeA CS labs, libraries & live-streaming teledidattica',
          'Living cost: approx. 650-900 EUR/mo (Rent ~300-480, Food ~200-280, Transport ~20-35 EUR) | EHIC + insurance',
          'Additional: English courses marked in factsheet; 8 ECTS company internship; B1 Italian recommended',
        ],
      },
    ],
    footer: 'Gate G03 * Seat 08C * Urbino (Confirmed EKA IT Partner — Pure CS Master LM-18)',
  },
  {
    num: 6,
    theme: 'light',
    badge: 'BOARDING PASS 04 / 05 * RIX -> PEG * CONFIRMED EKA IT PARTNER (PERUGIA)',
    title: '04. University for Foreigners of Perugia — Perugia, Italy',
    subtitle: 'Digital Humanities per l italiano & Comunicazione Digitale (Applied ICT / UX / AI)',
    cards: [
      {
        heading: 'Major IT & Digital Courses (Official UniStraPg Catalogue)',
        lines: [
          '* Fondamenti di informatica umanistica (Humanities Computing) - 9 ECTS (Italian)',
          '* Architettura dell informazione e UX Design - 6 ECTS (Italian)',
          '* Didattica digitale e data-driven learning - 6 ECTS (Italian)',
          '* Laboratorio di intelligenza artificiale per le scienze umane - 3-6 ECTS [to be verified]',
          '* Laboratorio di tecnologie digitali - 3-6 ECTS [to be verified]',
        ],
      },
      {
        heading: 'Campus, Living Cost & Additional Info',
        lines: [
          'Campus: Palazzo Gallenga & Perugia campus multimedia/UX labs, libraries, coworking',
          'Living cost: approx. 650-900 EUR/mo (Rent ~320-500, Food ~200-280, Transport ~25-40 EUR) | EHIC + insurance',
          'Additional: Best for UX/Information Architecture & applied digital media; B1 Italian recommended',
        ],
      },
    ],
    footer: 'Gate G04 * Seat 19B * Perugia (Confirmed EKA IT Partner — UX Design & Digital Humanities)',
  },
  {
    num: 7,
    theme: 'light',
    badge: 'BOARDING PASS 05 / 05 * RIX -> PSR * CONFIRMED EKA IT PARTNER (TERAMO)',
    title: '05. University of Teramo — Teramo, Italy',
    subtitle: 'Erasmus Exchange — Digital Innovation, Big Data & ICT Modules | Mostly Italian',
    cards: [
      {
        heading: 'Major IT & Data Courses (Official UniTE Cineca Catalogue)',
        lines: [
          '* Informatica, trend digitali, comunicazione - 12 ECTS (Italian)',
          '* Big Data Analytics - 6 ECTS (Italian) | Sicurezza informatica (Cybersecurity) - 6 ECTS (Italian)',
          '* Intelligenza artificiale per la comunicazione - 6 ECTS (Italian)',
          '* Analisi dei dati (Data Analysis) - 6 ECTS | Informatica giuridica - 7 ECTS',
          '* English-taught CS course availability: [to be verified]',
        ],
      },
      {
        heading: 'Campus, Living Cost & Additional Info',
        lines: [
          'Campus: Colleparco campus between Gran Sasso mountains & Adriatic coast; multimedia labs',
          'Living cost: approx. 600-850 EUR/mo (Rent ~260-420, Food ~180-260, Transport ~20-35 EUR) | EHIC + insurance',
          'Additional: Quiet & cheapest living cost; B1 Italian recommended',
        ],
      },
    ],
    footer: 'Gate G05 * Seat 22F * Teramo (Confirmed EKA IT Partner — Cheapest Living Cost)',
  },
  {
    num: 8,
    theme: 'light',
    badge: 'FLIGHT COMPARISON LEDGER * 5 ITALIAN IT & CS PROGRAMS',
    title: 'Comparison of All 5 IT Programs',
    subtitle: 'Language | IT Relevance | Living Cost / Month | Tech Environment | Overall Rating',
    cards: [
      {
        heading: 'Comparison Matrix & Monthly Living Cost Midpoints',
        lines: [
          '1. Milano-Bicocca | Mixed (EN/IT)  | Very High (Pure CS/AI) | ~900-1,300 EUR (1,100) | DISCo Labs   | 8.8/10 [Check EKA IT]',
          '2. Siena          | Fully English  | Top Tier (AI/ML/HPC)   | 600-950 EUR    (775)   | DIISM+SAIHub | 9.7/10 [BEST CHOICE]',
          '3. Urbino         | Mostly Italian | High (CS/Cloud/Sec)    | ~650-900 EUR   (775)   | DiSPeA Labs  | 8.5/10',
          '4. Perugia        | Mostly Italian | Moderate (UX/InfoArch) | ~650-900 EUR   (775)   | UX/Media Lab | 7.4/10',
          '5. Teramo         | Mostly Italian | Mod-High (Data/Sec)    | ~600-850 EUR   (725)   | Media Labs   | 7.6/10',
        ],
      },
    ],
    footer: '1 Italian CFU = 1 ECTS * Full semester = 30 ECTS * All 5 = 0 EUR host tuition.',
  },
  {
    num: 9,
    theme: 'dark',
    badge: 'FINAL VERDICT * BEST CHOICE STAMP FOR A COMPUTER SCIENCE STUDENT',
    title: 'Which is the best choice? Winner: University of Siena',
    subtitle: 'MSc Artificial Intelligence & Automation Eng. / Computer & Automation Eng. (120 ECTS, 100% English)',
    cards: [
      {
        heading: '3 Reasons Why University of Siena Wins for Computer Science / IT',
        lines: [
          '1. 100% English Availability & Confirmed EKA IT Partner (+ Siena Excellence Scholarships)',
          '2. Modern AI, Data & Systems Curriculum (AI 9 ECTS, ML 6-12 ECTS, HPC 9 ECTS, Big Data 6 ECTS)',
          '3. Affordable Living Cost (600-950 EUR/mo, midpoint 775 EUR — saves ~325 EUR/mo vs. Milan)',
        ],
      },
      {
        heading: 'Runner-Up Alternatives',
        lines: [
          'Urbino (#2 if you speak B1 Italian for pure CS); Milano-Bicocca (#1 for corporate tech if EKA confirms IT agreement).',
        ],
      },
    ],
    footer: 'STAMP: BEST CHOICE — University of Siena (Tuscany, Italy)',
  },
  {
    num: 10,
    theme: 'light',
    badge: 'OFFICIAL SOURCES & BIBLIOGRAPHY * PRE-FINALE',
    title: 'Thank you / Official Sources',
    subtitle: 'Erasmus+ in Italy: 5 Computer Science & IT Study Programs — EKA University of Applied Sciences',
    cards: [
      {
        heading: 'Verified Official Sources & Links',
        lines: [
          '* EKA Partner List 2026: augstskola.lv/upload/EKA%20University%20of%20Applied%20Sciences_Partner%20institutions%202026_v3.pdf',
          '* Siena AI & Automation Eng.: https://artificial-intelligence-automation.unisi.it/',
          '* Urbino MSc Computer Science (LM-18): https://www.uniurb.it/corsi/1757141',
          '* Perugia Digital Humanities: https://www.unistrapg.it/ | Teramo Catalogue: https://unite.coursecatalogue.cineca.it/',
          '* Milano-Bicocca MSc Computer Science: https://www.unimib.it/ugov/degree/9925',
        ],
      },
    ],
    footer: 'Note: 1 CFU = 1 ECTS. Next slide (Slide 11): "THE END" Hamster Video Finale.',
  },
  {
    num: 11,
    theme: 'light',
    badge: 'SLIDE 11 // ARRIVAL GATE * CINEMA ITALIA: FINE',
    title: 'The End — Any questions?',
    subtitle: 'Fluffy Hamster Finale (public/media/hamster.mp4) — "That\'s the end of our presentation"',
    cards: [
      {
        heading: 'Finale Video & Interactive Controls',
        lines: [
          '* Video: public/media/hamster.mp4 & public/media/hamster.webm (poster: public/media/hamster-poster.jpg)',
          '* Paper Cutout Blend: mix-blend-mode: multiply over warm archival paper (#F2EADB / #FAF6EE)',
          '* Keyboard Shortcuts: Press [S] to toggle sound, [R] to replay hamster video, [Home] to restart deck',
          '* Floor open for class & teacher Q&A: Any questions?_',
        ],
      },
    ],
    footer: 'FINE (The End) * EKA University of Applied Sciences * Riga (RIX) -> Italy (IT)',
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
    const cardH = 75 + card.lines.length * 40;
    cmds += rectFill(100, yCursor, PAGE_W - 200, cardH, cardBg);
    cmds += rectStroke(100, yCursor, PAGE_W - 200, cardH, isDark ? PALETTE.mustard : PALETTE.ink, 2);
    cmds += textLine(135, yCursor + 44, 25, card.heading, accent, true);

    card.lines.forEach((line, idx) => {
      cmds += textLine(
        135,
        yCursor + 88 + idx * 38,
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
const rootPdf = path.resolve('Erasmus-Italy-5-Study-Programs-Slides.pdf');
const publicPdf = path.resolve('public/Erasmus-Italy-5-Study-Programs-Slides.pdf');

fs.writeFileSync(rootPdf, pdfBuf);
fs.writeFileSync(publicPdf, pdfBuf);
console.log(`Generated 11-slide 16:9 Editorial CS/IT PDF backup: ${rootPdf} (${pdfBuf.length} bytes)`);
