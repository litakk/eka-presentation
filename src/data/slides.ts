export type SlideTheme = 'dark' | 'light';

export type TransitionType =
  | 'circle-clip'
  | 'yellow-wipe'
  | 'cloud-zoom'
  | 'card-flip'
  | 'shared-morph';

export type TechIconName = 'cpu' | 'code' | 'database' | 'shield' | 'brain' | 'network';

export interface CourseItem {
  name: string;
  ects: string;
  language: string;
  icon: TechIconName;
  verifiedStatus?: 'verified' | 'to-verify';
}

export interface LivingCostBreakdown {
  rent: string;
  food: string;
  transport: string;
  total: string;
}

export interface ProgramSlideData {
  id: 'milan' | 'siena' | 'urbino' | 'perugia' | 'teramo';
  slideNumber: number;
  programNumber: number;
  university: string;
  shortName: string;
  city: string;
  country: string;
  region: string;
  ekaStatusBadge: string;
  agreementWarningBadge?: string; // Visible badge for 5th university: "Check EKA agreement for IT with erasmus@eka.edu.lv"
  program: string;
  language: string;
  totalEcts: string;
  coursesNote: string;
  courses: CourseItem[];
  coursesPlaceholder?: string;
  campus: string;
  livingCost: string;
  livingCostBreakdown: LivingCostBreakdown;
  livingCostMin: number;
  livingCostMax: number;
  livingCostMid: number;
  medical: string;
  goodToKnow: string[];
  vibe: string;
  itRelevance: string;
  techEnvSummary: string;
  overallRating: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  officialUrl: string;
  mapCoords: { x: number; y: number }; // Coordinates on 0..500 x 0..600 Italy SVG viewBox
  theme: SlideTheme;
  transition: TransitionType;
  speakerNotes: string;
}

export interface StatCardItem {
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
  sublabel: string;
  codeTag: string;
  iconName: TechIconName;
}

export interface ComparisonRow {
  university: string;
  city: string;
  language: string;
  itRelevance: string;
  costPerMonth: string;
  costMid: number;
  techEnvironment: string;
  overallRating: string;
  vibe: string;
  isWinner?: boolean;
  needsAgreementCheck?: boolean;
}

export interface SourceLink {
  label: string;
  url: string;
  note: string;
}

export interface SlideMetadata {
  slideNumber: number;
  id: string;
  hash: string;
  title: string;
  subtitle: string;
  theme: SlideTheme;
  transition: TransitionType;
  speakerNotes: string;
  cityKey?: 'milan' | 'siena' | 'urbino' | 'perugia' | 'teramo';
}

export const PRESENTATION_META = {
  title: 'Erasmus+ in Italy: 5 Study Programs',
  subtitle: 'Computer Science & IT Track • Partner universities of EKA University of Applied Sciences',
  presenter: 'Computer Science (IT) Student • EKA University of Applied Sciences (Riga, Latvia)',
  institution: 'EKA University of Applied Sciences',
  departureCity: 'Riga, Latvia',
  country: 'Italy',
};

export const SLIDE_1_TITLE = {
  slideNumber: 1,
  id: 'slide-1',
  hash: '#slide-1',
  terminalCmd: 'student@eka-riga:~/erasmus-cs-italy$ ./deploy-flight-plan --target=italy --track=IT',
  badge: 'EKA UNIVERSITY OF APPLIED SCIENCES • COMPUTER SCIENCE / IT TRACK',
  title: 'Erasmus+ in Italy: 5 Study Programs',
  subtitle: 'Partner universities of EKA University of Applied Sciences (Computer Science & ICT)',
  ctaText: 'Initialize Flight to Italy',
  routeTag: 'DATA PACKET ROUTE: RIGA (RIX) ➔ MILAN ➔ SIENA ➔ URBINO ➔ PERUGIA ➔ TERAMO',
  theme: 'dark' as SlideTheme,
  transition: 'cloud-zoom' as TransitionType,
  speakerNotes:
    'Hello everyone! As a Computer Science student at EKA, today I will present 5 Erasmus+ IT and Computer Science study programs in Italy, and finish by revealing which one is the best choice for an IT student.',
};

export const SLIDE_2_DEFINITION = {
  slideNumber: 2,
  id: 'slide-2',
  hash: '#slide-2',
  terminalCmd: 'cat /etc/eka/erasmus-it-eligibility.conf',
  badge: 'PROTOCOL • EUROPEAN UNION ICT & CS MOBILITY',
  title: 'What is Erasmus+?',
  definition: 'EU programme for education, training, youth and sport — Computer Science & IT exchange.',
  stats: [
    {
      value: 12,
      prefix: '2–',
      suffix: ' months',
      decimals: 0,
      label: 'of study abroad',
      sublabel: '1 or 2 semesters in Italian tech & CS faculties',
      codeTag: 'DURATION_RANGE',
      iconName: 'network',
    },
    {
      value: 0,
      prefix: '',
      suffix: ' EUR',
      decimals: 0,
      label: 'tuition at the host university',
      sublabel: '100% tuition waiver + EU Erasmus+ monthly grant',
      codeTag: 'HOST_TUITION == 0',
      iconName: 'shield',
    },
    {
      value: 30,
      prefix: '',
      suffix: ' ECTS',
      decimals: 0,
      label: 'credits per semester (1 CFU = 1 ECTS)',
      sublabel: 'Italian CFU credits map 1:1 to EKA ECTS',
      codeTag: '1_CFU === 1_ECTS',
      iconName: 'database',
    },
    {
      value: 7.0,
      prefix: '',
      suffix: ' min',
      decimals: 1,
      label: 'minimum average grade at EKA',
      sublabel: 'GPA eligibility + EHIC & health insurance required',
      codeTag: 'MIN_GPA >= 7.0',
      iconName: 'cpu',
    },
  ] as StatCardItem[],
  footer: 'Apply in October (spring semester) and March (autumn semester). Italian CFU = ECTS (1:1).',
  source: 'Source: EKA ERASMUS+ page & EKA Partner Institutions 2026_v3.pdf',
  theme: 'light' as SlideTheme,
  transition: 'yellow-wipe' as TransitionType,
  speakerNotes:
    'Erasmus+ lets EKA Computer Science students study abroad for 2 to 12 months with 0 EUR host tuition. In Italy, 1 university credit (CFU) equals 1 ECTS credit, so a full semester is 30 ECTS, and you need a minimum 7.0 GPA at EKA.',
};

export const PROGRAM_SLIDES: ProgramSlideData[] = [
  {
    id: 'milan',
    slideNumber: 3,
    programNumber: 1,
    university: 'Milano-Bicocca',
    shortName: 'Milano-Bicocca',
    city: 'Milan',
    country: 'Italy',
    region: 'Lombardy, Northern Italy',
    ekaStatusBadge: '5th Selected Strong CS Partner',
    agreementWarningBadge: 'Check EKA agreement for IT with erasmus@eka.edu.lv',
    program: 'MSc Computer Science (Laurea Magistrale in Informatica, LM-18) — Dept. DISCo',
    language: 'Mixed (English & Italian; key AI/Algorithms MSc courses in English)',
    totalEcts: '120 ECTS / CFU (2 yrs) • 30 ECTS/sem',
    coursesNote: 'Official DISCo LM-18 Catalogue (1 CFU = 1 ECTS)',
    courses: [
      {
        name: 'Advanced Machine Learning (F1801Q151)',
        ects: '6 ECTS',
        language: 'English',
        icon: 'brain',
        verifiedStatus: 'verified',
      },
      {
        name: 'Large Scale Graph Algorithms (F1801Q162)',
        ects: '6 ECTS',
        language: 'English',
        icon: 'network',
        verifiedStatus: 'verified',
      },
      {
        name: 'Data and Text Mining (F1801Q105)',
        ects: '6 ECTS',
        language: 'English',
        icon: 'database',
        verifiedStatus: 'verified',
      },
      {
        name: 'Sicurezza Informatica / Computer Security',
        ects: '6 ECTS',
        language: 'EN on demand',
        icon: 'shield',
        verifiedStatus: 'verified',
      },
      {
        name: 'Cloud Computing',
        ects: '6 ECTS',
        language: 'Italian/EN',
        icon: 'cpu',
        verifiedStatus: 'verified',
      },
      {
        name: 'Architettura del Software (Software Architecture)',
        ects: '6 ECTS',
        language: 'Italian',
        icon: 'code',
        verifiedStatus: 'verified',
      },
    ],
    campus: 'Modern Bicocca DISCo Building U14: AI & robotics research labs, libraries, Linux workstations & student coworking hubs',
    livingCost: 'approx. 900–1,300 EUR/month',
    livingCostBreakdown: {
      rent: 'approx. 550–800 EUR',
      food: 'approx. 250–350 EUR',
      transport: 'approx. 22–39 EUR (ATM student pass)',
      total: 'approx. 900–1,300 EUR/mo',
    },
    livingCostMin: 900,
    livingCostMax: 1300,
    livingCostMid: 1100,
    medical: 'EHIC card + health insurance + campus medical/counseling service',
    goodToKnow: [
      'Check EKA agreement for IT with erasmus@eka.edu.lv before applying',
      'Italy’s #1 tech & startup ecosystem; internships via Bicocca Job Placement',
      'B2 English required; ESN Milano-Bicocca & University Angels mentors; apply Oct / Mar',
    ],
    vibe: 'Big tech & business hub',
    itRelevance: 'Very High (Pure CS, AI, Cloud, Security)',
    techEnvSummary: 'DISCo U14 Labs + Milan Tech Hub',
    overallRating: '8.8 / 10 (High cost + check IT slot)',
    image: '/images/milan.webp',
    imageAlt: 'Modern skyline and tech district architecture of Milan, Italy',
    imageCredit: 'Photo via Unsplash (Free License)',
    officialUrl: 'https://www.unimib.it/ugov/degree/9925',
    mapCoords: { x: 168, y: 122 },
    theme: 'dark',
    transition: 'circle-clip',
    speakerNotes:
      'First is Milano-Bicocca in Milan with its Master in Computer Science at the DISCo department, featuring 6 ECTS courses like Advanced Machine Learning and Large Scale Graph Algorithms in English. Note the badge: you must check the EKA agreement for IT with erasmus@eka.edu.lv, and living costs are approx. 900 to 1,300 euros per month.',
  },
  {
    id: 'siena',
    slideNumber: 4,
    programNumber: 2,
    university: 'University of Siena',
    shortName: 'Siena',
    city: 'Siena',
    country: 'Italy',
    region: 'Tuscany, Central Italy',
    ekaStatusBadge: 'Confirmed EKA IT Partner (2026 List v3)',
    program: 'MSc Artificial Intelligence & Automation Engineering / Computer & Automation Eng. (LM-32)',
    language: 'Fully in English (100% English-taught Master tracks)',
    totalEcts: '120 ECTS / CFU (2 yrs) • 30 ECTS/sem',
    coursesNote: 'Official Unisi DIISM Catalogue (1 CFU = 1 ECTS)',
    courses: [
      {
        name: 'Artificial Intelligence',
        ects: '9 ECTS',
        language: 'English',
        icon: 'brain',
        verifiedStatus: 'verified',
      },
      {
        name: 'Machine Learning',
        ects: '6–12 ECTS',
        language: 'English',
        icon: 'cpu',
        verifiedStatus: 'verified',
      },
      {
        name: 'High Performance Computer Architecture',
        ects: '9 ECTS',
        language: 'English',
        icon: 'code',
        verifiedStatus: 'verified',
      },
      {
        name: 'Big Data',
        ects: '6 ECTS',
        language: 'English',
        icon: 'database',
        verifiedStatus: 'verified',
      },
      {
        name: 'Network Optimization',
        ects: '6 ECTS',
        language: 'English',
        icon: 'network',
        verifiedStatus: 'verified',
      },
      {
        name: 'Design of Applications, Services and Systems',
        ects: '9 ECTS',
        language: 'English',
        icon: 'shield',
        verifiedStatus: 'verified',
      },
    ],
    campus: 'San Niccolò Engineering & IT complex (DIISM): AI, vision & robotics labs, libraries, coworking study halls in historic centre',
    livingCost: '600–950 EUR/month',
    livingCostBreakdown: {
      rent: 'approx. 350–550 EUR',
      food: 'approx. 180–280 EUR',
      transport: 'approx. 25–40 EUR (walkable + bus)',
      total: '600–950 EUR/mo',
    },
    livingCostMin: 600,
    livingCostMax: 950,
    livingCostMid: 775,
    medical: 'EHIC card + health insurance + DSU Tuscany student healthcare service',
    goodToKnow: [
      'Confirmed EKA IT partner; Siena International Excellence Scholarships for degree students',
      '6 ECTS curricular internship in AI/robotics labs & SAIHub (Siena AI Hub) ecosystem',
      'B2 English required (no Italian needed for classes); EKA deadlines Oct & Mar',
    ],
    vibe: 'Safe, walkable AI & student town',
    itRelevance: 'Top Tier (100% EN AI, ML, Big Data, HPC)',
    techEnvSummary: 'DIISM AI/Robotics Labs + SAIHub',
    overallRating: '9.7 / 10 (Best Choice for CS)',
    image: '/images/siena.webp',
    imageAlt: 'Historic campus and rooftops of Siena, Tuscany',
    imageCredit: 'Photo via Unsplash (Free License)',
    officialUrl: 'https://artificial-intelligence-automation.unisi.it/',
    mapCoords: { x: 214, y: 245 },
    theme: 'light',
    transition: 'shared-morph',
    speakerNotes:
      'Second is the University of Siena, a confirmed EKA IT partner offering Master programs in Artificial Intelligence and Automation Engineering and Computer and Automation Engineering fully in English. You study AI, Machine Learning, Big Data, and High Performance Computer Architecture while living for just 600 to 950 euros per month.',
  },
  {
    id: 'urbino',
    slideNumber: 5,
    programNumber: 3,
    university: 'Urbino Carlo Bo',
    shortName: 'Urbino',
    city: 'Urbino',
    country: 'Italy',
    region: 'Marche, Central Italy',
    ekaStatusBadge: 'Confirmed EKA IT Partner (2026 List v3)',
    program: 'MSc Informatica e Innovazione Digitale (Computer Science, LM-18, 2 years)',
    language: 'Mixed (Italian + English-taught courses marked in Erasmus factsheet)',
    totalEcts: '120 ECTS / CFU (2 yrs) • 30 ECTS/sem',
    coursesNote: 'Official UniUrb LM-18 Study Plan (1 CFU = 1 ECTS)',
    courses: [
      {
        name: 'Machine Learning',
        ects: '9 ECTS',
        language: 'IT / EN support',
        icon: 'brain',
        verifiedStatus: 'verified',
      },
      {
        name: 'Sicurezza Informatica (Cybersecurity)',
        ects: '9 ECTS',
        language: 'Italian',
        icon: 'shield',
        verifiedStatus: 'verified',
      },
      {
        name: 'Applicazioni Distribuite e Cloud Computing',
        ects: '9 ECTS',
        language: 'Italian',
        icon: 'database',
        verifiedStatus: 'verified',
      },
      {
        name: 'Sistemi Distribuiti e Decentralizzati',
        ects: '9 ECTS',
        language: 'Italian',
        icon: 'network',
        verifiedStatus: 'verified',
      },
      {
        name: 'Programmazione per l’Internet of Things (IoT)',
        ects: '6 ECTS',
        language: 'Italian',
        icon: 'cpu',
        verifiedStatus: 'verified',
      },
      {
        name: 'Programmazione di Dispositivi Mobili e UI',
        ects: '6 ECTS',
        language: 'Italian',
        icon: 'code',
        verifiedStatus: 'verified',
      },
    ],
    campus: 'Spread across a historic walled town: DiSPeA Computer Science labs, libraries & full teledidattica/live-streaming platform',
    livingCost: 'approx. 650–900 EUR/month',
    livingCostBreakdown: {
      rent: 'approx. 300–480 EUR',
      food: 'approx. 200–280 EUR',
      transport: 'approx. 20–35 EUR (walkable town)',
      total: 'approx. 650–900 EUR/mo',
    },
    livingCostMin: 650,
    livingCostMax: 900,
    livingCostMid: 775,
    medical: 'EHIC card + health insurance + ERSU Urbino student medical post',
    goodToKnow: [
      'Erasmus factsheet explicitly marks courses taught in English',
      'Includes 8 ECTS (CFU) tech company internship (tirocinio) & AI specialization track',
      'B1 Italian recommended; EKA application in October (spring) & March (autumn)',
    ],
    vibe: 'Historic Renaissance CS campus',
    itRelevance: 'High (Cloud, Cybersecurity, IoT, ML)',
    techEnvSummary: 'DiSPeA CS Labs + Blended Streaming',
    overallRating: '8.5 / 10 (Strong CS, needs B1 IT)',
    image: '/images/urbino.webp',
    imageAlt: 'Walled Renaissance university town of Urbino, Italy',
    imageCredit: 'Photo via Unsplash (Free License)',
    officialUrl: 'https://www.uniurb.it/corsi/1757141',
    mapCoords: { x: 256, y: 232 },
    theme: 'dark',
    transition: 'card-flip',
    speakerNotes:
      'Third is Urbino Carlo Bo, a confirmed EKA IT partner offering the 2-year Master Informatica e Innovazione Digitale. It has strong 9 ECTS courses in Cybersecurity, Cloud Computing, Distributed Systems, and Machine Learning, with English courses marked in the factsheet and B1 Italian recommended.',
  },
  {
    id: 'perugia',
    slideNumber: 6,
    programNumber: 4,
    university: 'University for Foreigners of Perugia',
    shortName: 'UniStraPg Perugia',
    city: 'Perugia',
    country: 'Italy',
    region: 'Umbria, Central Italy',
    ekaStatusBadge: 'Confirmed EKA IT Partner (2026 List v3)',
    program: 'Digital Humanities per l’italiano & Comunicazione Digitale (Applied ICT / UX / AI)',
    language: 'Mostly Italian (international environment + free Italian courses)',
    totalEcts: '30 ECTS / CFU per semester',
    coursesNote: 'UniStraPg Digital Curriculum (1 CFU = 1 ECTS)',
    courses: [
      {
        name: 'Fondamenti di informatica umanistica (Humanities Computing)',
        ects: '9 ECTS',
        language: 'Italian',
        icon: 'code',
        verifiedStatus: 'verified',
      },
      {
        name: 'Architettura dell’informazione e UX Design',
        ects: '6 ECTS',
        language: 'Italian',
        icon: 'cpu',
        verifiedStatus: 'verified',
      },
      {
        name: 'Didattica digitale e data-driven learning',
        ects: '6 ECTS',
        language: 'Italian',
        icon: 'database',
        verifiedStatus: 'verified',
      },
      {
        name: 'Laboratorio di intelligenza artificiale per le scienze umane',
        ects: '3–6 ECTS [to be verified]',
        language: 'Italian',
        icon: 'brain',
        verifiedStatus: 'to-verify',
      },
      {
        name: 'Laboratorio di tecnologie digitali',
        ects: '3–6 ECTS [to be verified]',
        language: 'Italian',
        icon: 'network',
        verifiedStatus: 'to-verify',
      },
    ],
    campus: 'Palazzo Gallenga & Perugia hill-town campus: multimedia & UX labs, digital libraries, international student coworking',
    livingCost: 'approx. 650–900 EUR/month',
    livingCostBreakdown: {
      rent: 'approx. 320–500 EUR',
      food: 'approx. 200–280 EUR',
      transport: 'approx. 25–40 EUR (Minimetrò + bus)',
      total: 'approx. 650–900 EUR/mo',
    },
    livingCostMin: 650,
    livingCostMax: 900,
    livingCostMid: 775,
    medical: 'EHIC card + health insurance + ADiSU Umbria student health service',
    goodToKnow: [
      'Confirmed EKA partner; focuses on UX Design, Information Architecture & Applied AI in Media',
      'Not a pure software engineering faculty—best for frontend/UX & digital media IT students',
      'B1 Italian recommended (free Italian language courses provided); apply Oct / Mar',
    ],
    vibe: 'International UX & Digital Humanities city',
    itRelevance: 'Moderate (UX, Info Architecture, Digital AI Labs)',
    techEnvSummary: 'Digital Media & UX Labs',
    overallRating: '7.4 / 10 (Applied Digital / UX focus)',
    image: '/images/perugia.webp',
    imageAlt: 'Historic university hill city of Perugia in Umbria, Italy',
    imageCredit: 'Photo via Unsplash (Free License)',
    officialUrl: 'https://www.unistrapg.it/',
    mapCoords: { x: 246, y: 268 },
    theme: 'light',
    transition: 'yellow-wipe',
    speakerNotes:
      'Fourth is the University for Foreigners of Perugia, also on the EKA IT partner list. Rather than hardcore systems engineering, its IT modules focus on Information Architecture and UX Design (6 ECTS), Humanities Computing (9 ECTS), and AI labs, making it ideal if you like UX and digital media.',
  },
  {
    id: 'teramo',
    slideNumber: 7,
    programNumber: 5,
    university: 'University of Teramo',
    shortName: 'Teramo',
    city: 'Teramo',
    country: 'Italy',
    region: 'Abruzzo, Central-South Italy',
    ekaStatusBadge: 'Confirmed EKA IT Partner (2026 List v3)',
    program: 'Erasmus Exchange — Digital Innovation, Big Data & ICT Modules',
    language: 'Mostly Italian ([English exam option to be verified])',
    totalEcts: '30 ECTS / CFU per semester',
    coursesNote: 'Official UniTE Cineca Catalogue (1 CFU = 1 ECTS)',
    courses: [
      {
        name: 'Informatica, trend digitali, comunicazione',
        ects: '12 ECTS',
        language: 'Italian',
        icon: 'code',
        verifiedStatus: 'verified',
      },
      {
        name: 'Big Data Analytics',
        ects: '6 ECTS',
        language: 'Italian',
        icon: 'database',
        verifiedStatus: 'verified',
      },
      {
        name: 'Sicurezza informatica (Cybersecurity)',
        ects: '6 ECTS',
        language: 'Italian',
        icon: 'shield',
        verifiedStatus: 'verified',
      },
      {
        name: 'Intelligenza artificiale per la comunicazione',
        ects: '6 ECTS',
        language: 'Italian',
        icon: 'brain',
        verifiedStatus: 'verified',
      },
      {
        name: 'Analisi dei dati (Data Analysis)',
        ects: '6 ECTS',
        language: 'Italian',
        icon: 'cpu',
        verifiedStatus: 'verified',
      },
      {
        name: 'Informatica giuridica (Legal Informatics & Tech)',
        ects: '7 ECTS',
        language: 'Italian',
        icon: 'network',
        verifiedStatus: 'verified',
      },
    ],
    campus: 'Colleparco campus between Gran Sasso mountains & Adriatic coast: digital media labs, libraries & quiet study spaces',
    livingCost: 'approx. 600–850 EUR/month',
    livingCostBreakdown: {
      rent: 'approx. 260–420 EUR',
      food: 'approx. 180–260 EUR',
      transport: 'approx. 20–35 EUR (student bus)',
      total: 'approx. 600–850 EUR/mo',
    },
    livingCostMin: 600,
    livingCostMax: 850,
    livingCostMid: 725,
    medical: 'EHIC card + health insurance + ADSU Teramo student healthcare service',
    goodToKnow: [
      'Confirmed EKA partner; real modules in Big Data Analytics, Cybersecurity & AI (6 ECTS each)',
      'English-taught CS course availability: [to be verified] in current Cineca syllabus',
      'Lowest living cost of all 5 cities; B1 Italian recommended; EKA deadlines Oct & Mar',
    ],
    vibe: 'Quiet, low-cost mountain & coast town',
    itRelevance: 'Moderate-High (Big Data, Cybersecurity, Applied AI)',
    techEnvSummary: 'Colleparco Digital & Media Labs',
    overallRating: '7.6 / 10 (Cheapest, mostly Italian)',
    image: '/images/teramo.webp',
    imageAlt: 'Gran Sasso mountains and Abruzzo landscape near Teramo, Italy',
    imageCredit: 'Photo via Unsplash (Free License)',
    officialUrl: 'https://unite.coursecatalogue.cineca.it/',
    mapCoords: { x: 292, y: 298 },
    theme: 'dark',
    transition: 'cloud-zoom',
    speakerNotes:
      'Fifth is the University of Teramo between the Gran Sasso mountains and the Adriatic coast. Its Cineca catalogue offers 6 ECTS courses in Big Data Analytics, Cybersecurity, and AI, plus 12 ECTS in Computer Science and Digital Trends, at the lowest monthly living cost of approx. 600 to 850 euros.',
  },
];

export const SLIDE_8_COMPARISON = {
  slideNumber: 8,
  id: 'slide-8',
  hash: '#slide-8',
  terminalCmd: 'SELECT university, lang, it_relevance, cost_eur, rating FROM eka_it_partners ORDER BY rating DESC;',
  badge: 'BENCHMARK MATRIX • 5 ITALIAN IT & CS PROGRAMS',
  title: 'Comparison of All 5 IT Programs',
  subtitle: 'Language, IT curriculum depth, monthly living cost, tech environment & overall rating',
  rows: PROGRAM_SLIDES.map((p) => ({
    university: p.university,
    city: p.city,
    language: p.id === 'siena' ? 'Fully English' : p.id === 'milan' ? 'Mixed (EN/IT)' : 'Mostly Italian',
    itRelevance: p.itRelevance,
    costPerMonth: p.livingCost.replace('approx. ', '~').replace('/month', ''),
    costMid: p.livingCostMid,
    techEnvironment: p.techEnvSummary,
    overallRating: p.overallRating,
    vibe: p.vibe,
    isWinner: p.id === 'siena',
    needsAgreementCheck: Boolean(p.agreementWarningBadge),
  })) as ComparisonRow[],
  chartTitle: 'Monthly Living Cost Midpoint (EUR/month)',
  theme: 'light' as SlideTheme,
  transition: 'circle-clip' as TransitionType,
  speakerNotes:
    'Comparing all five for an IT student: Siena is the only confirmed EKA partner with a 100% English AI and Computer Engineering Master at 775 euros midpoint. Urbino has a great pure CS Master in Italian, Milan has top English AI courses but costs 1,100 euros and requires checking the EKA IT agreement, while Perugia and Teramo focus on applied digital modules in Italian.',
};

export const SLIDE_9_WINNER = {
  slideNumber: 9,
  id: 'slide-9',
  hash: '#slide-9',
  terminalCmd: './evaluate-best-choice --student-profile="Computer Science / IT" --output=winner',
  badge: 'FINAL VERDICT • BEST CHOICE FOR AN EKA COMPUTER SCIENCE STUDENT',
  title: 'Which is the best choice?',
  winnerUniversity: 'University of Siena',
  winnerShort: 'Siena (Confirmed EKA IT Partner)',
  winnerProgram: 'MSc Artificial Intelligence & Automation Eng. / Computer & Automation Eng. (120 ECTS)',
  winnerCost: '600–950 EUR/month (Midpoint: 775 EUR)',
  reasons: [
    {
      title: '1. 100% English Availability & Confirmed EKA IT Agreement',
      detail:
        'Full English-taught Master tracks (LM-32) with zero Italian language barrier, already on EKA’s 2026 IT partner list + Siena International Excellence Scholarships.',
    },
    {
      title: '2. Cutting-Edge AI, Big Data & Systems Curriculum',
      detail:
        'Verified courses in Artificial Intelligence (9 ECTS), Machine Learning (6–12 ECTS), High Performance Computer Architecture (9 ECTS), Big Data (6 ECTS) & Network Optimization (6 ECTS).',
    },
    {
      title: '3. Low Student-Town Living Cost (Saves ~325 EUR/mo vs. Milan)',
      detail:
        'At 600–950 EUR/month in a compact, safe Tuscany student city with DIISM robotics/vision labs and the SAIHub AI ecosystem.',
    },
  ],
  runnerUpNote:
    'Runner-Up Alternatives: Urbino Carlo Bo is #2 if you speak B1 Italian (pure CS Master with Cybersecurity & Cloud); Milano-Bicocca is #1 for big-city tech careers if erasmus@eka.edu.lv confirms an IT bilateral slot.',
  theme: 'dark' as SlideTheme,
  transition: 'shared-morph' as TransitionType,
  speakerNotes:
    'So which is the best choice for a Computer Science student? The University of Siena wins clearly: first, it is a confirmed EKA IT partner taught 100% in English; second, its curriculum covers AI, Machine Learning, Big Data, and High Performance Computer Architecture; and third, at 600 to 950 euros per month, it is much more affordable than Milan.',
};

export const SLIDE_10_THANKS = {
  slideNumber: 10,
  id: 'slide-10',
  hash: '#slide-10',
  terminalCmd: 'git push origin main && echo "Grazie mille! Ready for Q&A"',
  badge: 'CONNECTION CLOSED • PACKET RETURNING TO RIGA (RIX)',
  title: 'Thank you / Any questions?',
  subtitle: 'Erasmus+ in Italy: 5 Computer Science & IT Study Programs • EKA University of Applied Sciences',
  sourcesTitle: 'Verified Official Sources & University Catalogues',
  sourceLinks: [
    {
      label: 'EKA Partner Institutions List 2026 (v3 PDF)',
      url: 'https://www.augstskola.lv/upload/EKA%20University%20of%20Applied%20Sciences_Partner%20institutions%202026_v3.pdf',
      note: 'Confirmed IT partners: Siena, Urbino, Perugia, Teramo',
    },
    {
      label: 'University of Siena — MSc AI & Automation Engineering',
      url: 'https://artificial-intelligence-automation.unisi.it/',
      note: 'LM-32 study plan, 120 ECTS, English courses & scholarships',
    },
    {
      label: 'Urbino Carlo Bo — MSc Informatica e Innovazione Digitale',
      url: 'https://www.uniurb.it/corsi/1757141',
      note: 'LM-18 Computer Science curriculum, Cloud, Security & ML',
    },
    {
      label: 'University for Foreigners of Perugia — Digital Courses',
      url: 'https://www.unistrapg.it/',
      note: 'Humanities Computing, UX Design & AI lab modules',
    },
    {
      label: 'University of Teramo — Official Cineca Course Catalogue',
      url: 'https://unite.coursecatalogue.cineca.it/',
      note: 'Big Data Analytics, Cybersecurity & AI modules',
    },
    {
      label: 'Milano-Bicocca — MSc Computer Science (DISCo LM-18)',
      url: 'https://www.unimib.it/ugov/degree/9925',
      note: 'Verify EKA IT bilateral slot via erasmus@eka.edu.lv',
    },
  ] as SourceLink[],
  sources: [
    'EKA Partner Institutions 2026_v3.pdf (augstskola.lv)',
    'artificial-intelligence-automation.unisi.it (University of Siena)',
    'uniurb.it/corsi/1757141 (Urbino Carlo Bo — LM-18 CS)',
    'unistrapg.it (University for Foreigners of Perugia)',
    'unite.coursecatalogue.cineca.it (University of Teramo)',
    'unimib.it/ugov/degree/9925 (Milano-Bicocca DISCo)',
  ],
  disclaimer:
    'Note: 1 Italian CFU = 1 ECTS. Living costs are approximate; verify current semester syllabi on official university websites.',
  theme: 'light' as SlideTheme,
  transition: 'cloud-zoom' as TransitionType,
  speakerNotes:
    'Thank you for listening! All courses and ECTS values come from the 2026 EKA partner list and the official university catalogues of Siena, Urbino, Perugia, Teramo, and Milano-Bicocca. Do you have any questions?',
};

export const ALL_SLIDES_METADATA: SlideMetadata[] = [
  {
    slideNumber: 1,
    id: 'slide-1',
    hash: '#slide-1',
    title: SLIDE_1_TITLE.title,
    subtitle: 'CS / IT Track Takeoff',
    theme: SLIDE_1_TITLE.theme,
    transition: SLIDE_1_TITLE.transition,
    speakerNotes: SLIDE_1_TITLE.speakerNotes,
  },
  {
    slideNumber: 2,
    id: 'slide-2',
    hash: '#slide-2',
    title: SLIDE_2_DEFINITION.title,
    subtitle: '1 CFU = 1 ECTS & EKA Rules',
    theme: SLIDE_2_DEFINITION.theme,
    transition: SLIDE_2_DEFINITION.transition,
    speakerNotes: SLIDE_2_DEFINITION.speakerNotes,
  },
  ...PROGRAM_SLIDES.map((p) => ({
    slideNumber: p.slideNumber,
    id: `slide-${p.slideNumber}`,
    hash: `#slide-${p.slideNumber}`,
    title: `${p.university}, ${p.city}`,
    subtitle: p.program,
    theme: p.theme,
    transition: p.transition,
    speakerNotes: p.speakerNotes,
    cityKey: p.id,
  })),
  {
    slideNumber: 8,
    id: 'slide-8',
    hash: '#slide-8',
    title: SLIDE_8_COMPARISON.title,
    subtitle: 'IT Matrix & Cost Chart',
    theme: SLIDE_8_COMPARISON.theme,
    transition: SLIDE_8_COMPARISON.transition,
    speakerNotes: SLIDE_8_COMPARISON.speakerNotes,
  },
  {
    slideNumber: 9,
    id: 'slide-9',
    hash: '#slide-9',
    title: SLIDE_9_WINNER.title,
    subtitle: 'Winner: University of Siena (AI & CS)',
    theme: SLIDE_9_WINNER.theme,
    transition: SLIDE_9_WINNER.transition,
    speakerNotes: SLIDE_9_WINNER.speakerNotes,
  },
  {
    slideNumber: 10,
    id: 'slide-10',
    hash: '#slide-10',
    title: SLIDE_10_THANKS.title,
    subtitle: 'Official Sources & Q&A',
    theme: SLIDE_10_THANKS.theme,
    transition: SLIDE_10_THANKS.transition,
    speakerNotes: SLIDE_10_THANKS.speakerNotes,
  },
];
