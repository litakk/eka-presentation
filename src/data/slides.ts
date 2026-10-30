export type SlideTheme = 'dark' | 'light';

export type TechIconName = 'cpu' | 'code' | 'database' | 'shield' | 'brain' | 'network';

export type TransitionType =
  | 'hero-zoom'
  | 'boarding-flip'
  | 'split-screen'
  | 'editorial-wipe'
  | 'curtain-wipe'
  | 'circle-clip'
  | 'yellow-wipe'
  | 'cloud-zoom'
  | 'card-flip'
  | 'shared-morph';

export interface CourseItem {
  name: string;
  ects: string;
}

export interface SlideScript {
  slideNumber: number;
  title: string;
  goal: string;
  timeRange: string;
  durationSeconds: number;
  cumulativeEndSeconds: number;
  onScreenOrder: string[];
  exactWords: string;
  transitionSentence: string;
  uzbekTranslation: string;
}

export interface ProgramSlideData {
  slideNumber: number;
  id: string;
  hash: string;
  orderLabel: string;
  university: string;
  shortName: string;
  city: string;
  region: string;
  country: string;
  programName: string;
  language: string;
  ekaItPartnerConfirmed: boolean;
  agreementBadge: string;
  boardingPass: {
    fromCode: string;
    fromCity: string;
    toCode: string;
    toAirportName: string;
    gate: string;
    seat: string;
    stampText: string;
    barcode: string;
  };
  courses: CourseItem[]; // Strictly 3 real courses with ECTS
  campusLine: string; // 1 short line
  costAndMedicalLine: string; // 1 short line (approx. cost + EHIC + insurance)
  livingCostRange: string;
  livingCostMidpoint: number;
  additionalInfoLine: string; // 1 short line
  image: string;
  imageAlt: string;
  photoCredit: string;
  photoLicenseUrl: string;
  photoSourceUrl: string;
  coordinates: {
    x: number;
    y: number;
  };
  theme: SlideTheme;
  transition: TransitionType;
  speakerNotes: string;
}

export interface ComparisonRow {
  university: string;
  city: string;
  slideNumber: number;
  language: string;
  costRange: string;
  costMidpoint: number;
  itRelevance: string;
  vibe: string;
  ekaStatus: string;
  isWinner?: boolean;
}

export interface QACheatItem {
  id: string;
  question: string;
  answer: string;
  uzbek: string;
}

export const PRESENTATION_META = {
  title: 'Erasmus+ in Italy: 3 Study Programs',
  subtitle: 'Computer Science (IT) • EKA University of Applied Sciences',
  presenter: 'Computer Science (IT) Student • EKA University of Applied Sciences (Riga, Latvia)',
  targetDurationMinutes: '8–10 minutes',
  totalTargetSeconds: 540, // 9 minutes ideal pace
};

export const SLIDE_1_TITLE = {
  slideNumber: 1,
  id: 'title',
  hash: '#slide-1',
  badge: 'EKA RIGA (RIX) → ITALY • COMPUTER SCIENCE / IT',
  title: 'Erasmus+ in Italy: 3 Study Programs',
  subtitle: 'Computer Science & IT at partner universities of EKA',
  ctaText: 'Start Boarding',
  image: '/images/italy-hero.webp',
  imageAlt: 'Panoramic view of Piazza del Campo in Siena, Italy',
  photoCredit: 'Photo: Georges Jansoone (JoJan), CC BY-SA 3.0',
  photoSourceUrl: 'https://commons.wikimedia.org/wiki/File:Siena.Campo.pano01.jpg',
  theme: 'light' as SlideTheme,
  transition: 'hero-zoom' as TransitionType,
};

export const SLIDE_2_HOOK = {
  slideNumber: 2,
  id: 'hook',
  hash: '#slide-2',
  badge: 'CLASS DISCUSSION • OPEN QUESTION',
  question:
    'If you could study anywhere in Europe for one semester and pay no tuition, where would you go?',
  hints: ['a new country', 'new friends', 'real IT experience'],
  closingCue: 'Today I show you Italy.',
  theme: 'light' as SlideTheme,
  transition: 'editorial-wipe' as TransitionType,
};

export const SLIDE_3_LATVIA = {
  slideNumber: 3,
  id: 'latvia',
  hash: '#slide-3',
  badge: 'DEPARTURE POINT • RIGA, LATVIA (RIX)',
  title: 'About Latvia: Our Starting Point',
  routeTag: 'From Riga to Italy • RIX → IT',
  facts: [
    {
      bigValue: 'Riga',
      label: 'Capital city, on the Baltic Sea',
    },
    {
      bigValue: '2004 / €',
      label: 'EU member since 2004 • Euro since 2014',
    },
    {
      bigValue: '~1.9M',
      label: 'Population (approx.)',
    },
    {
      bigValue: 'UNESCO',
      label: 'Riga Historic Centre World Heritage Site',
    },
    {
      bigValue: 'EKA',
      label: 'EKA University of Applied Sciences is in Riga',
    },
  ],
  image: '/images/riga.webp',
  imageAlt: 'House of the Blackheads at dusk in Riga Old Town, Latvia',
  photoCredit: 'Photo: Diliff, CC BY-SA 3.0',
  photoSourceUrl:
    'https://commons.wikimedia.org/wiki/File:House_of_Blackheads_at_Dusk_3,_Riga,_Latvia_-_Diliff.jpg',
  theme: 'light' as SlideTheme,
  transition: 'split-screen' as TransitionType,
};

export const SLIDE_4_ERASMUS = {
  slideNumber: 4,
  id: 'erasmus',
  hash: '#slide-4',
  badge: 'EU PROGRAMME • EKA EXCHANGE RULES',
  title: 'What is Erasmus+?',
  definition:
    'EU programme for education, training, youth and sport — study one semester in Italy with 1 CFU = 1 ECTS.',
  stats: [
    {
      id: 'duration',
      numericValue: 12,
      prefix: '2–',
      suffix: ' mo',
      display: '2–12 months',
      label: 'Study period abroad',
    },
    {
      id: 'tuition',
      numericValue: 0,
      prefix: '',
      suffix: ' EUR',
      display: '0 EUR',
      label: 'Tuition at host university',
    },
    {
      id: 'ects',
      numericValue: 30,
      prefix: '',
      suffix: ' ECTS',
      display: '30 ECTS',
      label: 'Credits per semester',
    },
    {
      id: 'gpa',
      numericValue: 7.0,
      decimals: 1,
      prefix: '',
      suffix: ' min',
      display: '7.0 min',
      label: 'Average grade at EKA',
    },
  ],
  deadlineNote: 'Apply in October (spring) and March (autumn).',
  theme: 'light' as SlideTheme,
  transition: 'boarding-flip' as TransitionType,
};

export const PROGRAM_SLIDES: ProgramSlideData[] = [
  {
    slideNumber: 5,
    id: 'siena',
    hash: '#slide-5',
    orderLabel: '01 / 03',
    university: 'University of Siena',
    shortName: 'Siena',
    city: 'Siena',
    region: 'Tuscany',
    country: 'Italy',
    programName: 'MSc Artificial Intelligence & Automation Engineering',
    language: 'English',
    ekaItPartnerConfirmed: true,
    agreementBadge: 'Confirmed EKA IT Partner',
    boardingPass: {
      fromCode: 'RIX',
      fromCity: 'Riga',
      toCode: 'FLR',
      toAirportName: 'Florence / Siena',
      gate: 'G01',
      seat: '01A',
      stampText: 'APPROVED',
      barcode: 'EKA-IT-UNISI-01',
    },
    courses: [
      { name: 'Artificial Intelligence', ects: '9 ECTS' },
      { name: 'Machine Learning', ects: '6–12 ECTS' },
      { name: 'High Performance Computer Architecture', ects: '9 ECTS' },
    ],
    campusLine: 'San Niccolò engineering & robotics labs in historic Siena',
    costAndMedicalLine: 'approx. 600–950 EUR/month • EHIC card + insurance',
    livingCostRange: 'approx. 600–950 EUR',
    livingCostMidpoint: 775,
    additionalInfoLine: 'Siena International Excellence Scholarships (degree students)',
    image: '/images/siena.webp',
    imageAlt: 'Courtyard of Palazzo del Rettorato, main building of the University of Siena',
    photoCredit: 'Photo: Sailko, CC BY-SA 3.0',
    photoLicenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    photoSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Siena,_palazzo_dell%27universit%C3%A0,_cortile_01.JPG",
    coordinates: { x: 215, y: 242 },
    theme: 'light',
    transition: 'boarding-flip',
    speakerNotes: '',
  },
  {
    slideNumber: 6,
    id: 'milan-bicocca',
    hash: '#slide-6',
    orderLabel: '02 / 03',
    university: 'University of Milano-Bicocca',
    shortName: 'Milano-Bicocca',
    city: 'Milan',
    region: 'Lombardy',
    country: 'Italy',
    programName: 'MSc Computer Science (LM-18)',
    language: 'English & Italian (B2 English)',
    ekaItPartnerConfirmed: false,
    agreementBadge: 'Confirm IT agreement with EKA Erasmus coordinator',
    boardingPass: {
      fromCode: 'RIX',
      fromCity: 'Riga',
      toCode: 'MXP',
      toAirportName: 'Milan Malpensa',
      gate: 'G02',
      seat: '14A',
      stampText: 'CHECK IT',
      barcode: 'EKA-IT-UNIMIB-02',
    },
    courses: [
      { name: 'Advanced Machine Learning', ects: '6 ECTS' },
      { name: 'Large Scale Graph Algorithms', ects: '6 ECTS' },
      { name: 'Data and Text Mining', ects: '6 ECTS' },
    ],
    campusLine: 'Modern Bicocca district (Buildings U12 & U14 CS labs)',
    costAndMedicalLine: 'approx. 900–1,300 EUR/month • EHIC card + insurance',
    livingCostRange: 'approx. 900–1,300 EUR',
    livingCostMidpoint: 1100,
    additionalInfoLine: 'B2 English required • Confirm IT agreement with EKA coordinator',
    image: '/images/milan-bicocca.webp',
    imageAlt: 'Building U12 of the University of Milano-Bicocca campus in Milan',
    photoCredit: 'Photo: Facquis, CC BY-SA 4.0',
    photoLicenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/File:Bicocca_edificio_U12.jpg',
    coordinates: { x: 162, y: 102 },
    theme: 'light',
    transition: 'split-screen',
    speakerNotes: '',
  },
  {
    slideNumber: 7,
    id: 'roma-tre',
    hash: '#slide-7',
    orderLabel: '03 / 03',
    university: 'Roma Tre University',
    shortName: 'Roma Tre',
    city: 'Rome',
    region: 'Lazio',
    country: 'Italy',
    programName: 'MSc Computer Science Engineering & AI (LM-32)',
    language: 'Italian + English course units',
    ekaItPartnerConfirmed: false,
    agreementBadge: 'Confirm IT agreement with EKA Erasmus coordinator',
    boardingPass: {
      fromCode: 'RIX',
      fromCity: 'Riga',
      toCode: 'FCO',
      toAirportName: 'Rome Fiumicino',
      gate: 'G03',
      seat: '21C',
      stampText: 'CHECK IT',
      barcode: 'EKA-IT-ROMATRE-03',
    },
    courses: [
      { name: 'Algorithms for Big Data', ects: '6 ECTS' },
      { name: 'Cybersecurity', ects: '9 ECTS' },
      { name: 'Internet and Data Centers', ects: '9 ECTS' },
    ],
    campusLine: 'Ostiense urban campus with computer & network labs',
    costAndMedicalLine: 'approx. 850–1,200 EUR/month • EHIC card + insurance',
    livingCostRange: 'approx. 850–1,200 EUR',
    livingCostMidpoint: 1025,
    additionalInfoLine: 'English course units available • Confirm IT agreement with EKA',
    image: '/images/roma-tre.webp',
    imageAlt: 'New Rectorate building of Roma Tre University in Rome',
    photoCredit: 'Photo: Università degli Studi Roma TRE, CC BY-SA 4.0',
    photoLicenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/File:Nuovo_Rettorato_Roma_TRE.jpg',
    coordinates: { x: 245, y: 318 },
    theme: 'light',
    transition: 'editorial-wipe',
    speakerNotes: '',
  },
];

export const SLIDE_8_COMPARISON = {
  slideNumber: 8,
  id: 'comparison',
  hash: '#slide-8',
  badge: 'SIDE-BY-SIDE • 3 ITALIAN UNIVERSITIES',
  title: 'Comparison of the 3 Universities',
  rows: [
    {
      university: 'University of Siena',
      city: 'Siena',
      slideNumber: 5,
      language: 'English (Full MSc)',
      costRange: 'approx. 600–950 EUR',
      costMidpoint: 775,
      itRelevance: 'High (AI, ML, HPC) • EKA IT Partner',
      vibe: 'Compact medieval student town',
      ekaStatus: 'Confirmed IT Partner',
      isWinner: true,
    },
    {
      university: 'Milano-Bicocca',
      city: 'Milan',
      slideNumber: 6,
      language: 'EN & IT (B2 English)',
      costRange: 'approx. 900–1,300 EUR',
      costMidpoint: 1100,
      itRelevance: 'High (ML, Graphs, Mining) • Confirm IT',
      vibe: 'Big tech & business hub',
      ekaStatus: 'Confirm IT with EKA',
    },
    {
      university: 'Roma Tre University',
      city: 'Rome',
      slideNumber: 7,
      language: 'IT + EN course units',
      costRange: 'approx. 850–1,200 EUR',
      costMidpoint: 1025,
      itRelevance: 'High (Big Data, Security) • Confirm IT',
      vibe: 'Capital city & historic culture',
      ekaStatus: 'Confirm IT with EKA',
    },
  ] as ComparisonRow[],
  theme: 'light' as SlideTheme,
  transition: 'boarding-flip' as TransitionType,
};

export const SLIDE_9_WINNER = {
  slideNumber: 9,
  id: 'winner',
  hash: '#slide-9',
  badge: 'FINAL DECISION • COMPUTER SCIENCE TRACK',
  title: 'Which is the best choice?',
  statement: 'Out of 3 Erasmus+ universities, I choose Siena.',
  winnerUniversity: 'University of Siena',
  stampText: 'MY CHOICE',
  reasons: [
    {
      num: '01',
      title: 'English-Taught IT & Confirmed EKA IT Partner',
      detail:
        'Full English Master’s courses (AI 9 ECTS, ML 6–12 ECTS, HPC 9 ECTS) and listed for IT on the EKA partner list.',
    },
    {
      num: '02',
      title: 'Lowest Monthly Living Cost',
      detail:
        'Approx. 600–950 EUR/month (midpoint 775 EUR) — lower than Roma Tre (1,025 EUR) and Milano-Bicocca (1,100 EUR).',
    },
    {
      num: '03',
      title: 'Compact Student City & Scholarships',
      detail:
        'Walkable university town in Tuscany with San Niccolò robotics labs and Siena Excellence Scholarships.',
    },
  ],
  runnerUpNote:
    'Milano-Bicocca is strongest for big-city tech careers, and Roma Tre offers capital-city life — if EKA confirms an IT agreement.',
  theme: 'dark' as SlideTheme,
  transition: 'hero-zoom' as TransitionType,
};

export const SLIDE_10_FINALE = {
  slideNumber: 10,
  id: 'finale',
  hash: '#slide-10',
  badge: 'SLIDE 10 // ARRIVAL GATE • FINE',
  title: 'Thank you!',
  subtitle: 'Erasmus+ in Italy: 3 Study Programs • EKA University of Applied Sciences',
  videoMp4: '/media/hamster.mp4',
  videoWebm: '/media/hamster.webm',
  posterUrl: '/media/hamster-poster.jpg',
  endQuestionText: 'Any questions?',
  stampText: 'FINE',
  sources: [
    {
      label: 'EKA Erasmus+ & Partner List 2026',
      url: 'https://www.augstskola.lv/upload/EKA%20University%20of%20Applied%20Sciences_Partner%20institutions%202026_v3.pdf',
    },
    {
      label: 'University of Siena — MSc AI & Automation',
      url: 'https://artificial-intelligence-automation.unisi.it/',
    },
    {
      label: 'University of Milano-Bicocca — MSc CS',
      url: 'https://www.unimib.it/ugov/degree/9925',
    },
    {
      label: 'Roma Tre University — CS Engineering & AI',
      url: 'https://www.uniroma3.it/en/',
    },
    {
      label: 'Latvia Official Facts (EU & UNESCO)',
      url: 'https://european-union.europa.eu/principles-countries-history/eu-countries/latvia_en',
    },
  ],
  theme: 'light' as SlideTheme,
  transition: 'curtain-wipe' as TransitionType,
};

// ============================================================================
// FULL SPEAKING SCRIPT FOR EVERY SLIDE (1 TO 10) — B1 ENGLISH + UZBEK
// Target Total Time: 9 minutes (540 seconds) — fits comfortably in 8–10 mins
// ============================================================================
export const SPEAKING_SCRIPTS: SlideScript[] = [
  {
    slideNumber: 1,
    title: 'Slide 1 — Title: Erasmus+ in Italy: 3 Study Programs',
    goal: 'Greet the class and teacher, introduce yourself, and state the topic clearly.',
    timeRange: '0:00 – 0:45',
    durationSeconds: 45,
    cumulativeEndSeconds: 45,
    onScreenOrder: [
      '1. Slide opens with the boarding-pass title card and photo of Siena, Italy.',
      '2. Paper plane flies from Riga (RIX) across the map to Siena, Milan, and Rome.',
      '3. Start speaking as soon as the title finishes its stop-motion entrance.',
    ],
    exactWords:
      'Hello everyone, and hello teacher! [look at audience, smile] My name is [Your Name], and I am a Computer Science student at EKA in Group [Your Group]. Today, my presentation is about Erasmus+ in Italy: 3 Study Programs for IT students. [point at screen] We will look at three Italian universities and find out which one is the best choice for us.',
    transitionSentence: 'Before we start, I want to ask you one quick question.',
    uzbekTranslation:
      'Barchaga salom va hurmatli ustoz, assalomu alaykum! [auditoriyaga qarang, jilmaying] Mening ismim [Ismingiz], men EKA universitetining [Guruhingiz]-guruh Kompyuter fanlari (IT) talabasiman. Bugungi taqdimotim IT talabalari uchun Italiyadagi Erasmus+ dasturi va 3 ta o‘quv dasturi haqida bo‘ladi. [ekranga ishora qiling] Biz Italiyaning uchta universitetini ko‘rib chiqamiz va qaysi biri biz uchun eng yaxshi tanlov ekanligini aniqlaymiz. Keyingi slaydga o‘tish: Boshlashimizdan oldin sizlarga bitta qisqa savol bermoqchiman.',
  },
  {
    slideNumber: 2,
    title: 'Slide 2 — Discussion Hook',
    goal: 'Engage classmates with a simple question and wait for 2–3 quick answers.',
    timeRange: '0:45 – 1:35',
    durationSeconds: 50,
    cumulativeEndSeconds: 95,
    onScreenOrder: [
      '1. The paper plane flies across the top as the big question types onto the screen.',
      '2. Three hint badges ("a new country", "new friends", "real IT experience") pop in below.',
      '3. Read the question aloud, then pause for 15–20 seconds while 2–3 classmates answer.',
    ],
    exactWords:
      'Look at this question on the screen. [point at screen] If you could study anywhere in Europe for one semester and pay no tuition, where would you go? [look at audience] Think about a new country, new friends, and real IT experience. Who wants to share one country? [pause — listen to 2–3 students and nod] Thank you! Those are great places. Today I show you Italy.',
    transitionSentence: 'First, let us look at where our journey begins: right here in Latvia.',
    uzbekTranslation:
      'Ekrandagi ushbu savolga qarang. [ekranga ishora qiling] Agar Yevropaning istalgan joyida bir semestr davomida kontrakt to‘lamasdan o‘qish imkoningiz bo‘lsa, qayerga borgan bo‘lardingiz? [auditoriyaga qarang] Yangi davlat, yangi do‘stlar va haqiqiy IT tajriba haqida o‘ylab ko‘ring. Kim bitta davlat nomini aytishni xohlaydi? [pauza — 2–3 talabaning javobini tinglang va bosh irg‘ang] Rahmat! Juda ajoyib joylar. Bugun esa men sizlarga Italiyani ko‘rsataman. Keyingi slaydga o‘tish: Avvalo, sayohatimiz qayerdan boshlanishiga qaraylik — ya’ni shu yerda, Latviyada.',
  },
  {
    slideNumber: 3,
    title: 'Slide 3 — About Latvia: Our Starting Point',
    goal: 'Share 5 verified facts about Latvia and connect EKA in Riga to Italy.',
    timeRange: '1:35 – 2:30',
    durationSeconds: 55,
    cumulativeEndSeconds: 150,
    onScreenOrder: [
      '1. Five big-number fact cards and the Riga Old Town photo appear.',
      '2. The Baltic map highlights Riga with a pin and the route tag "From Riga to Italy (RIX → IT)".',
      '3. Read the facts left-to-right at a calm, friendly pace.',
    ],
    exactWords:
      'We study here in Riga, the capital of Latvia on the Baltic Sea. [point at screen] Latvia has been a member of the European Union since 2004, and our currency is the euro since 2014. The population of Latvia is approximately 1.9 million people, and Riga Historic Centre is a UNESCO World Heritage Site. [look at audience] Our university, EKA University of Applied Sciences, is located right here in Riga. Because Latvia is in the EU, Erasmus+ lets us fly from Riga directly to partner universities in Italy.',
    transitionSentence: 'Now, how does the Erasmus+ programme actually work at EKA?',
    uzbekTranslation:
      'Biz Boltiq dengizi bo‘yidagi Latviya poytaxti — Riga shahrida tahsil olamiz. [ekranga ishora qiling] Latviya 2004-yildan beri Yevropa Ittifoqi a’zosi, pul birligimiz esa 2014-yildan beri yevro hisoblanadi. Latviya aholisi taxminan 1,9 million kishini tashkil etadi va Riganing tarixiy markazi YUNESKOning Butunjahon merosi ro‘yxatiga kiritilgan. [auditoriyaga qarang] Bizning universitetimiz — EKA Amaliy fanlar universiteti aynan Riga shahrida joylashgan. Latviya Yevropa Ittifoqida bo‘lgani sababli, Erasmus+ bizga Rigadan to‘g‘ridan-to‘g‘ri Italiyadagi hamkor universitetlarga borib o‘qish imkonini beradi. Keyingi slaydga o‘tish: Xo‘sh, EKAda Erasmus+ dasturi aslida qanday ishlaydi?',
  },
  {
    slideNumber: 4,
    title: 'Slide 4 — What is Erasmus+?',
    goal: 'Explain the 4 key EKA Erasmus+ numbers and application months.',
    timeRange: '2:30 – 3:25',
    durationSeconds: 55,
    cumulativeEndSeconds: 205,
    onScreenOrder: [
      '1. Four split-flap stat cards count up: 2–12 months, 0 EUR, 30 ECTS, and 7.0 min grade.',
      '2. The application deadline banner appears at the bottom.',
      '3. Point to each stat card as you say the number.',
    ],
    exactWords:
      'Erasmus+ is the European Union programme for education, training, youth, and sport. [look at audience] At EKA, four numbers are important to remember. [point at screen] First, you can study abroad for 2 to 12 months. Second, you pay 0 euros tuition at the host university in Italy. Third, one full semester is 30 ECTS credits, and in Italy one CFU credit equals one ECTS credit. Fourth, you need a minimum average grade of 7.0 at EKA, and you apply in October for spring or in March for autumn.',
    transitionSentence: 'Let us look at our first Italian university: the University of Siena.',
    uzbekTranslation:
      'Erasmus+ — bu Yevropa Ittifoqining ta’lim, tayyorlov, yoshlar va sport dasturidir. [auditoriyaga qarang] EKAda to‘rtta muhim raqamni eslab qolish kerak. [ekranga ishora qiling] Birinchidan, chet elda 2 oydan 12 oygacha o‘qishingiz mumkin. Ikkinchidan, Italiyadagi qabul qiluvchi universitetda o‘qish uchun 0 yevro to‘laysiz. Uchinchidan, to‘liq bir semestr 30 ECTS kreditga teng va Italiyada 1 CFU krediti 1 ECTS kreditiga teng. To‘rtinchidan, EKAda o‘rtacha bahoyingiz kamida 7.0 bo‘lishi kerak; arizalar bahorgi semestr uchun oktabrda, kuzgi semestr uchun esa mart oyida topshiriladi. Keyingi slaydga o‘tish: Keling, birinchi Italiya universitetimiz — Siena universitetini ko‘rib chiqaylik.',
  },
  {
    slideNumber: 5,
    title: 'Slide 5 — University 1: University of Siena',
    goal: 'Present Siena using the standard 6-part structure (where, what, language, campus, cost, extra).',
    timeRange: '3:25 – 4:25',
    durationSeconds: 60,
    cumulativeEndSeconds: 265,
    onScreenOrder: [
      '1. Boarding pass for RIX → FLR (Siena) flips in with the photo of Palazzo del Rettorato.',
      '2. The 3 real IT courses and ECTS credits appear on the right.',
      '3. Follow the 6-part sentence order: city/university → program/courses → language → campus → cost/medical → extra.',
    ],
    exactWords:
      'Our first university is the University of Siena, in the historic city of Siena in Tuscany. [point at photo] Here, you can study the Master’s program in Artificial Intelligence and Automation Engineering, including courses like Artificial Intelligence for 9 ECTS, Machine Learning for 6 to 12 ECTS, and High Performance Computer Architecture for 9 ECTS. The program is taught in English. [look at audience] The engineering and robotics labs are in the San Niccolò campus inside the historic town. Living cost is approximately 600 to 950 euros per month, and for medical support you need your European Health Insurance Card and insurance. Also, Siena is a confirmed IT partner on the EKA list and offers Siena International Excellence Scholarships for degree students.',
    transitionSentence: 'Next, let us fly north to big-city Milan and look at our second option.',
    uzbekTranslation:
      'Birinchi universitetimiz — Toskana hududidagi tarixiy Siena shahrida joylashgan Siena universitetidir. [rasmga ishora qiling] Bu yerda siz Sun’iy intellekt va avtomatlashtirish muhandisligi magistratura dasturida o‘qishingiz mumkin; asosiy fanlarga Sun’iy intellekt (9 ECTS), Mashinaviy o‘qitish (6–12 ECTS) va Yuqori unumdor kompyuter arxitekturasi (9 ECTS) kiradi. Dastur ingliz tilida olib boriladi. [auditoriyaga qarang] Muhandislik va robototexnika laboratoriyalari tarixiy shahar ichidagi San-Nikkolo kampusida joylashgan. Yashash xarajatlari oyiga taxminan 600 dan 950 yevrogacha bo‘lib, tibbiy yordam uchun Yevropa tibbiy sug‘urta kartasi (EHIC) va sug‘urta kerak bo‘ladi. Shuningdek, Siena EKA ro‘yxatida tasdiqlangan IT hamkor hisoblanadi va daraja oluvchi talabalar uchun Siena International Excellence stipendiyalarini taklif etadi. Keyingi slaydga o‘tish: Endi shimolga — katta shahar Milanga uchamiz va ikkinchi variantimizni ko‘ramiz.',
  },
  {
    slideNumber: 6,
    title: 'Slide 6 — University 2: University of Milano-Bicocca',
    goal: 'Present Milano-Bicocca in the exact same 6-part sentence order as Slide 5.',
    timeRange: '4:25 – 5:25',
    durationSeconds: 60,
    cumulativeEndSeconds: 325,
    onScreenOrder: [
      '1. Split-screen transition reveals Building U12 at Milano-Bicocca and the orange coordinator badge.',
      '2. Three Computer Science courses (6 ECTS each) appear.',
      '3. Speak in the exact same 6-part order as Slide 5.',
    ],
    exactWords:
      'Our second university is the University of Milano-Bicocca, located in Milan, Italy’s main business and tech city. [point at photo] Here, you study the Master’s program in Computer Science, with courses such as Advanced Machine Learning for 6 ECTS, Large Scale Graph Algorithms for 6 ECTS, and Data and Text Mining for 6 ECTS. Courses are taught in English and Italian, and B2 English is required. [look at audience] The campus is in the modern Bicocca district, with computer science labs in Buildings U12 and U14. Living cost in Milan is higher, at approximately 900 to 1,300 euros per month, plus your EHIC card and insurance for medical care. [point at badge] For additional info, EKA lists Milano-Bicocca under business, so you must confirm the IT agreement with the EKA Erasmus coordinator.',
    transitionSentence: 'Now let us travel south to the capital of Italy for our third university.',
    uzbekTranslation:
      'Ikkinchi universitetimiz — Italiyaning asosiy biznes va texnologiya markazi bo‘lgan Milan shahridagi Milano-Bikokka universitetidir. [rasmga ishora qiling] Bu yerda siz Kompyuter fanlari magistratura dasturida Kengaytirilgan mashinaviy o‘qitish (6 ECTS), Katta hajmli graflar algoritmlari (6 ECTS) va Ma’lumotlar hamda matn tahlili (6 ECTS) kabi fanlarni o‘rganasiz. Darslar ingliz va italyan tillarida o‘tiladi hamda B2 darajadagi ingliz tili talab qilinadi. [auditoriyaga qarang] Kampus zamonaviy Bikokka tumanida joylashgan bo‘lib, U12 va U14 binolarida IT laboratoriyalari mavjud. Milanda yashash xarajatlari yuqoriroq — oyiga taxminan 900 dan 1300 yevrogacha, tibbiy xizmat uchun esa EHIC kartasi va sug‘urta zarur. [belgiga ishora qiling] Qo‘shimcha ma’lumot sifatida: EKA ro‘yxatida Milano-Bikokka biznes yo‘nalishida ko‘rsatilgan, shuning uchun IT bo‘yicha kelishuvni EKA Erasmus koordinatori bilan tasdiqlash kerak. Keyingi slaydga o‘tish: Endi uchinchi universitetimizni ko‘rish uchun Italiya poytaxti — Rimga yo‘l olamiz.',
  },
  {
    slideNumber: 7,
    title: 'Slide 7 — University 3: Roma Tre University',
    goal: 'Present Roma Tre in the exact same 6-part sentence order as Slides 5 and 6.',
    timeRange: '5:25 – 6:25',
    durationSeconds: 60,
    cumulativeEndSeconds: 385,
    onScreenOrder: [
      '1. Editorial wipe shows the New Rectorate building of Roma Tre University in Rome.',
      '2. Three Computer Science Engineering courses (6–9 ECTS) appear.',
      '3. Speak in the exact same 6-part order as Slides 5 and 6.',
    ],
    exactWords:
      'Our third university is Roma Tre University, in Rome, the capital city of Italy. [point at photo] Here, you study Computer Science Engineering and Artificial Intelligence, including Algorithms for Big Data for 6 ECTS, Cybersecurity for 9 ECTS, and Internet and Data Centers for 9 ECTS. The program is mainly in Italian, with many course units taught in English. [look at audience] The campus is in the Ostiense district of Rome, with modern computer and network labs. Living cost is approximately 850 to 1,200 euros per month, and you need an EHIC card and insurance for medical support. [point at badge] Just like Milan, you should confirm the IT agreement with the EKA Erasmus coordinator before applying.',
    transitionSentence: 'We have seen all three universities — now let us compare them side by side.',
    uzbekTranslation:
      'Uchinchi universitetimiz — Italiya poytaxti Rim shahridagi Roma Tre universitetidir. [rasmga ishora qiling] Bu yerda siz Kompyuter muhandisligi va sun’iy intellekt yo‘nalishida Katta ma’lumotlar algoritmlari (6 ECTS), Kiberxavfsizlik (9 ECTS) hamda Internet va ma’lumotlar markazlari (9 ECTS) kabi fanlarni o‘qiysiz. Dastur asosan italyan tilida bo‘lsa-da, ko‘plab fan bloklari ingliz tilida o‘tiladi. [auditoriyaga qarang] Kampus Rimning Ostiense tumanida joylashgan va zamonaviy kompyuter hamda tarmoq laboratoriyalariga ega. Yashash xarajatlari oyiga taxminan 850 dan 1200 yevrogacha, tibbiy yordam uchun esa EHIC kartasi va sug‘urta talab etiladi. [belgiga ishora qiling] Xuddi Milan kabi, ariza topshirishdan oldin IT bo‘yicha kelishuvni EKA Erasmus koordinatori bilan tasdiqlab olish kerak. Keyingi slaydga o‘tish: Biz uchala universitetni ham ko‘rib chiqdik — endi ularni yonma-yon taqqoslaymiz.',
  },
  {
    slideNumber: 8,
    title: 'Slide 8 — Comparison of the 3 Universities',
    goal: 'Compare the three options by language, IT relevance, and monthly cost in 3–4 sentences.',
    timeRange: '6:25 – 7:20',
    durationSeconds: 55,
    cumulativeEndSeconds: 440,
    onScreenOrder: [
      '1. The 3-row comparison table appears on the left.',
      '2. The animated cost bar chart grows on the right (Siena 775 EUR, Roma Tre 1,025 EUR, Milano-Bicocca 1,100 EUR).',
      '3. Point to the table first, then the bar chart.',
    ],
    exactWords:
      'Here is a clear comparison of all three universities. [point at screen] First, for language, Siena offers a full Master’s program in English, while Milano-Bicocca and Roma Tre mix English and Italian. Second, for IT relevance, all three have strong AI, data, and security courses, but only Siena is already confirmed for IT on the EKA partner list. [point at bar chart] Third, look at the cost chart: Siena has the lowest midpoint at approximately 775 euros per month, compared to 1,025 euros in Rome and 1,100 euros in Milan.',
    transitionSentence: 'So, which university is the best choice for an EKA Computer Science student?',
    uzbekTranslation:
      'Mana uchala universitetning aniq taqqoslovi. [ekranga ishora qiling] Birinchidan, til bo‘yicha: Siena to‘liq ingliz tilidagi magistratura dasturini taklif qiladi, Milano-Bikokka va Roma Tre esa ingliz va italyan tillarini birlashtiradi. Ikkinchidan, IT yo‘nalishiga mosligi bo‘yicha: uchalasida ham kuchli sun’iy intellekt, ma’lumotlar va xavfsizlik fanlari bor, ammo faqat Siena EKA hamkorlar ro‘yxatida IT bo‘yicha tasdiqlangan. [ustunli diagrammaga ishora qiling] Uchinchidan, xarajatlar diagrammasiga qarang: Sienada o‘rtacha oylik xarajat eng past — taxminan 775 yevro, Rimda esa 1025 yevro va Milanda 1100 yevroni tashkil qiladi. Keyingi slaydga o‘tish: Xo‘sh, EKA Kompyuter fanlari talabasi uchun qaysi universitet eng yaxshi tanlov?',
  },
  {
    slideNumber: 9,
    title: 'Slide 9 — Which is the best choice?',
    goal: 'Announce Siena as your choice with 3 verified reasons and one fair sentence about Milan and Rome.',
    timeRange: '7:20 – 8:20',
    durationSeconds: 60,
    cumulativeEndSeconds: 500,
    onScreenOrder: [
      '1. Dark editorial spotlight slide opens and fires a celebration confetti burst.',
      '2. The red "MY CHOICE" stamp lands on the University of Siena card.',
      '3. The 3 numbered reason cards appear below.',
    ],
    exactWords:
      'Out of these three universities, I choose Siena. [look at audience, pause] I have three clear reasons based on the facts. [point at screen] First, Siena offers English-taught IT Master’s programs and is a confirmed IT partner of EKA. Second, it has the lowest living cost at approximately 600 to 950 euros per month. Third, Siena is a compact, friendly student city with robotics labs and scholarships. Of course, to be honest, Milano-Bicocca is stronger if you want big-city tech career connections, and Roma Tre is amazing for capital-city culture.',
    transitionSentence: 'That brings us to the final slide of my presentation.',
    uzbekTranslation:
      'Ushbu uchta universitet orasidan men Sienani tanlayman. [auditoriyaga qarang, pauza] Faktlarga asoslangan uchta aniq sababim bor. [ekranga ishora qiling] Birinchidan, Siena ingliz tilida o‘qitiladigan IT magistratura dasturlarini taklif etadi va EKAning tasdiqlangan IT hamkori hisoblanadi. Ikkinchidan, u yerda yashash narxi eng past — oyiga taxminan 600 dan 950 yevrogacha. Uchinchidan, Siena — robototexnika laboratoriyalari va stipendiyalarga ega ixcham, talabalar uchun qulay shahar. Albatta, ochig‘ini aytganda, katta shahardagi IT karyera aloqalari uchun Milano-Bikokka kuchliroq, Roma Tre esa poytaxt hayoti va madaniyati uchun ajoyib tanlovdir. Keyingi slaydga o‘tish: Shu bilan taqdimotimning yakuniy slaydiga yetib keldik.',
  },
  {
    slideNumber: 10,
    title: 'Slide 10 — Finale: Thank you / Any questions? (Hamster Video)',
    goal: 'Thank the audience, let the 12-second hamster video play in silence, then invite questions.',
    timeRange: '8:20 – 9:00',
    durationSeconds: 40,
    cumulativeEndSeconds: 540,
    onScreenOrder: [
      '1. Theatre curtain wipe reveals the dancing hamster cutout video on warm paper.',
      '2. Say your thank-you line first, then stay silent and smile for 12 seconds while the hamster dances and says "That’s the end of our presentation".',
      '3. When the video ends, confetti fires and "Any questions?_" types out on screen.',
    ],
    exactWords:
      'That is the end of my presentation. Thank you! [hamster video plays — stay silent, look at audience, and smile for 12 seconds until confetti pops] [point at screen] All official sources are listed at the bottom of the slide. Any questions?',
    transitionSentence: 'Thank you! I am happy to answer your questions now.',
    uzbekTranslation:
      'Shu bilan taqdimotim yakunlandi. E’tiboringiz uchun rahmat! [og‘maxon videosi qo‘yiladi — 12 soniya davomida jim turing, auditoriyaga qarab jilmaying va konfetti otilishini kuting] [ekranga ishora qiling] Barcha rasmiy manbalar slaydning pastki qismida keltirilgan. Savollaringiz bormi? Yakun: Rahmat! Savollaringizga mamnuniyat bilan javob beraman.',
  },
];

// Attach speakerNotes from SPEAKING_SCRIPTS to PROGRAM_SLIDES for backward compatibility
PROGRAM_SLIDES.forEach((p) => {
  const found = SPEAKING_SCRIPTS.find((s) => s.slideNumber === p.slideNumber);
  if (found) {
    p.speakerNotes = found.exactWords;
  }
});

// ============================================================================
// Q&A CHEAT SHEET (7 Likely Teacher Questions — 2 Sentences Each + Uzbek)
// ============================================================================
export const QA_CHEAT_SHEET: QACheatItem[] = [
  {
    id: 'why-siena',
    question: '1. Why Italy? Why Siena and not Milan or Rome?',
    answer:
      'Italy combines strong Computer Science and AI programs with rich culture and 0 EUR host tuition under Erasmus+. I chose the University of Siena over Milan and Rome because it is already a confirmed IT partner on the EKA partner list, teaches its AI Master’s fully in English, and costs approximately 600–950 EUR per month instead of 850–1,300 EUR.',
    uzbek:
      'Italiya kuchli Kompyuter fanlari va sun’iy intellekt dasturlarini boy madaniyat hamda Erasmus+ doirasida 0 yevro kontrakt bilan birlashtiradi. Men Milan va Rim o‘rniga Siena universitetini tanladim, chunki u EKA hamkorlar ro‘yxatida IT bo‘yicha tasdiqlangan, AI magistraturasini to‘liq ingliz tilida o‘qitadi va oylik xarajati 850–1300 yevro o‘rniga taxminan 600–950 yevroni tashkil qiladi.',
  },
  {
    id: 'cost-grant',
    question: '2. How much does it cost and does the Erasmus+ grant cover it?',
    answer:
      'Monthly living costs are approximately 600–950 EUR in Siena, 850–1,200 EUR in Rome, and 900–1,300 EUR in Milan, while tuition at the host university is 0 EUR. The Erasmus+ mobility grant helps cover a large part of rent and food, and for the exact monthly grant rate for Italy this year I would check with the EKA Erasmus+ coordinator.',
    uzbek:
      'Oylik yashash xarajatlari Sienada taxminan 600–950 yevro, Rimda 850–1200 yevro va Milanda 900–1300 yevroni tashkil etadi, qabul qiluvchi universitetda o‘qish esa 0 yevro. Erasmus+ stipendiyasi ijara va oziq-ovqatning katta qismini qoplashga yordam beradi, Italiya uchun bu yilgi aniq oylik stipendiya miqdorini esa EKA Erasmus+ koordinatoridan aniqlashtirgan bo‘lardim.',
  },
  {
    id: 'language-level',
    question: '3. What language do I need? What level?',
    answer:
      'For the University of Siena’s MSc in Artificial Intelligence and Automation Engineering, courses are taught in English, and Milano-Bicocca requires at least B2 English. For daily life in Italy or Italian-taught courses at Roma Tre, B1 Italian is recommended.',
    uzbek:
      'Siena universitetining Sun’iy intellekt va avtomatlashtirish magistratura dasturida darslar ingliz tilida o‘tiladi, Milano-Bikokka esa kamida B2 darajadagi ingliz tilini talab qiladi. Italiyadagi kundalik hayot yoki Roma Tredagi italyan tilidagi fanlar uchun B1 darajadagi italyan tili tavsiya etiladi.',
  },
  {
    id: 'ects-credits',
    question: '4. What is ECTS and how are credits recognized at EKA?',
    answer:
      'ECTS is the European Credit Transfer and Accumulation System, and in Italy 1 CFU credit equals 1 ECTS credit, with a full semester equal to 30 ECTS. Before departure, you sign an Erasmus+ Learning Agreement so the credits you pass in Italy are recognized toward your EKA degree.',
    uzbek:
      'ECTS — Yevropa kreditlarni ko‘chirish va jamg‘arish tizimi bo‘lib, Italiyada 1 CFU krediti 1 ECTS kreditiga, to‘liq bir semestr esa 30 ECTS ga teng. Jo‘nab ketishdan oldin Erasmus+ O‘quv shartnomasi (Learning Agreement) imzolanadi va Italiyada topshirgan kreditlaringiz EKA diplomiga hisobga olinadi.',
  },
  {
    id: 'how-to-apply',
    question: '5. How do I apply and when are the deadlines?',
    answer:
      'At EKA, you need a minimum average grade of 7.0 and no study debts to apply for Erasmus+ study mobility. Applications open in October for the spring semester and in March for the autumn semester through the EKA Erasmus+ office.',
    uzbek:
      'EKAda Erasmus+ o‘quv almashinuviga ariza topshirish uchun o‘rtacha baho kamida 7.0 bo‘lishi va akademik qarzdorlik bo‘lmasligi kerak. Arizalar bahorgi semestr uchun oktabr oyida, kuzgi semestr uchun esa mart oyida EKA Erasmus+ bo‘limi orqali qabul qilinadi.',
  },
  {
    id: 'health-insurance',
    question: '6. What about health insurance abroad? (EHIC + insurance)',
    answer:
      'As students from an EU country, we must bring a free European Health Insurance Card (EHIC) for public medical care in Italy. In addition, EKA and the Italian host universities recommend private travel and accident insurance for full coverage.',
    uzbek:
      'Yevropa Ittifoqi davlati talabalari sifatida biz Italiyada davlat tibbiy yordamidan foydalanish uchun bepul Yevropa tibbiy sug‘urta kartasini (EHIC) olib borishimiz shart. Bundan tashqari, to‘liq himoya uchun EKA va Italiya universitetlari xususiy sayohat hamda baxtsiz hodisalardan sug‘urtani ham tavsiya qiladi.',
  },
  {
    id: 'no-italian',
    question: '7. What if I do not speak Italian?',
    answer:
      'You can still study in Italy by choosing the University of Siena or English-taught modules at Milano-Bicocca, where classes and exams are in English. Host universities also offer introductory Italian language courses for Erasmus+ students to help with everyday life.',
    uzbek:
      'Agar italyan tilini bilmasangiz ham, dars va imtihonlari ingliz tilida bo‘lgan Siena universitetini yoki Milano-Bikokkadagi inglizcha modullarni tanlab o‘qishingiz mumkin. Shuningdek, qabul qiluvchi universitetlar kundalik hayotda yordam berish uchun Erasmus+ talabalariga boshlang‘ich italyan tili kurslarini taklif etadi.',
  },
];

export const ALL_SLIDES_METADATA = SPEAKING_SCRIPTS.map((script) => {
  const isDark = script.slideNumber === 9;
  const transitionMap: Record<number, TransitionType> = {
    1: 'hero-zoom',
    2: 'editorial-wipe',
    3: 'split-screen',
    4: 'boarding-flip',
    5: 'boarding-flip',
    6: 'split-screen',
    7: 'editorial-wipe',
    8: 'boarding-flip',
    9: 'hero-zoom',
    10: 'curtain-wipe',
  };
  const shortTitles: Record<number, string> = {
    1: 'Title: 3 Programs in Italy',
    2: 'Class Discussion Hook',
    3: 'About Latvia (Riga)',
    4: 'What is Erasmus+?',
    5: '01. University of Siena',
    6: '02. Milano-Bicocca',
    7: '03. Roma Tre University',
    8: 'Comparison of the 3',
    9: 'My Choice: Siena',
    10: 'Finale & Q&A (Hamster)',
  };
  const subtitles: Record<number, string> = {
    1: 'EKA Computer Science • RIX → IT',
    2: 'Where would you go in Europe?',
    3: 'EU since 2004 • UNESCO Riga',
    4: '2–12 mo • 0 EUR • 30 ECTS • 7.0 GPA',
    5: 'AI & Automation • English • 600–950 EUR',
    6: 'MSc CS • B2 EN • 900–1,300 EUR',
    7: 'CS Eng & AI • Rome • 850–1,200 EUR',
    8: 'Table + Monthly Cost Chart',
    9: 'Out of 3 universities, I choose Siena',
    10: 'Thank you! • Any questions?',
  };

  return {
    slideNumber: script.slideNumber,
    id: `slide-${script.slideNumber}`,
    hash: `#slide-${script.slideNumber}`,
    terminalCmd: `SLIDE_${String(script.slideNumber).padStart(2, '0')} // ${script.timeRange}`,
    title: shortTitles[script.slideNumber] || script.title,
    subtitle: subtitles[script.slideNumber] || script.goal,
    theme: (isDark ? 'dark' : 'light') as SlideTheme,
    transition: transitionMap[script.slideNumber] || 'boarding-flip',
    speakerNotes: script.exactWords,
    script,
  };
});
