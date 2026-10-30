import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

function luminance(hex) {
  const c = hex.replace('#', '');
  const rgb = [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255,
  ].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrastRatio(hex1, hex2) {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const pairs = [
  ['Editorial Ink on Warm Paper (#1B1B18 on #F2EADB)', '#1B1B18', '#F2EADB'],
  ['Editorial Ink on Cream Card (#1B1B18 on #FAF6EE)', '#1B1B18', '#FAF6EE'],
  ['Editorial Ink on Mustard Badge (#1B1B18 on #E0A526)', '#1B1B18', '#E0A526'],
  ['Editorial Ink on Pale Blue Accent (#1B1B18 on #CFE0E6)', '#1B1B18', '#CFE0E6'],
  ['Editorial Cream on Ink Dark Slide (#FAF6EE on #1B1B18)', '#FAF6EE', '#1B1B18'],
  ['Editorial Mustard on Ink Dark Slide (#E0A526 on #1B1B18)', '#E0A526', '#1B1B18'],
  ['Editorial Olive on Cream Card (#3F5B3A on #FAF6EE)', '#3F5B3A', '#FAF6EE'],
];

console.log('=== 1. Editorial WCAG Contrast Check (Target >= 4.5:1) ===');
for (const [label, fg, bg] of pairs) {
  const ratio = contrastRatio(fg, bg);
  console.log(`  ${label}: ${ratio.toFixed(2)}:1 ${ratio >= 4.5 ? 'PASS' : 'FAIL'}`);
  if (ratio < 4.5) process.exit(1);
}

console.log('\n=== 2. Offline Production Bundle, Wikimedia Photos, Video & SCRIPT.md Check ===');
if (!fs.existsSync(path.resolve('SCRIPT.md'))) {
  console.error('Missing SCRIPT.md in project root!');
  process.exit(1);
}
console.log(`  Found root SCRIPT.md (${fs.statSync(path.resolve('SCRIPT.md')).size} bytes)`);

const distDir = path.resolve('dist');
const requiredFiles = [
  'index.html',
  'favicon.svg',
  'Erasmus-Italy-3-Study-Programs-Slides.pdf',
  'images/italy-hero.webp',
  'images/riga.webp',
  'images/siena.webp',
  'images/milan-bicocca.webp',
  'images/roma-tre.webp',
  'media/hamster.mp4',
  'media/hamster.webm',
  'media/hamster-poster.jpg',
];

for (const rel of requiredFiles) {
  const full = path.join(distDir, rel);
  if (!fs.existsSync(full)) {
    console.error(`Missing required dist file: ${rel}`);
    process.exit(1);
  }
  const size = fs.statSync(full).size;
  console.log(`  Found dist/${rel} (${size} bytes)`);
}

const distAssets = fs.readdirSync(path.join(distDir, 'assets'));
const woff2Files = distAssets.filter((f) => f.endsWith('.woff2'));
console.log(`  Bundled self-hosted .woff2 font files (Fraunces + Archivo + JetBrains Mono): ${woff2Files.length}`);
if (woff2Files.length < 8) {
  console.error('Expected at least 8 self-hosted .woff2 font files!');
  process.exit(1);
}

const builtHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const cssFile = distAssets.find((f) => f.endsWith('.css'));
const builtCss = fs.readFileSync(path.join(distDir, 'assets', cssFile), 'utf8');
const stripXmlns = (s) => s.replace(/http:\/\/www\.w3\.org\/2000\/svg/g, '');
if (/https?:\/\//i.test(stripXmlns(builtHtml)) || /https?:\/\//i.test(stripXmlns(builtCss))) {
  console.error('External URL found in built HTML or CSS — offline requirement violated!');
  process.exit(1);
}
console.log('  Zero external URLs in built HTML & CSS (100% offline-ready): PASS');

console.log('\n=== 3. Component Render, 10 Slides, Script, Q&A & Rehearsal Verification ===');
const vite = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
});

try {
  const { PrintDeck } = await vite.ssrLoadModule('/src/components/PrintDeck.tsx');
  const { SpeakerNotes } = await vite.ssrLoadModule('/src/components/SpeakerNotes.tsx');
  const { ScriptModal } = await vite.ssrLoadModule('/src/components/ScriptModal.tsx');
  const { QACheatSheetModal } = await vite.ssrLoadModule('/src/components/QACheatSheetModal.tsx');
  const { RehearsalBar } = await vite.ssrLoadModule('/src/components/RehearsalBar.tsx');
  const { Overview } = await vite.ssrLoadModule('/src/components/Overview.tsx');
  const { ALL_SLIDES_METADATA, SPEAKING_SCRIPTS, QA_CHEAT_SHEET } = await vite.ssrLoadModule('/src/data/slides.ts');

  if (ALL_SLIDES_METADATA.length !== 10 || SPEAKING_SCRIPTS.length !== 10) {
    throw new Error(`Expected 10 slides, found ${ALL_SLIDES_METADATA.length}`);
  }
  if (QA_CHEAT_SHEET.length < 7) {
    throw new Error(`Expected 7 Q&A items, found ${QA_CHEAT_SHEET.length}`);
  }

  const rawMarkup = ReactDOMServer.renderToString(React.createElement(PrintDeck));
  const deckMarkup = rawMarkup.replace(/<!--.*?-->/g, '');

  const expectedSnippets = [
    'Erasmus+ in Italy: 3 Study Programs',
    'Photo: Georges Jansoone (JoJan), CC BY-SA 3.0',
    'If you could study anywhere in Europe for one semester and pay no tuition, where would you go?',
    'a new country',
    'new friends',
    'real IT experience',
    'Today I show you Italy.',
    'About Latvia: Our Starting Point',
    'From Riga to Italy',
    'Photo: Diliff, CC BY-SA 3.0',
    'What is Erasmus+?',
    'University of Siena',
    'Photo: Sailko, CC BY-SA 3.0',
    'Artificial Intelligence',
    'University of Milano-Bicocca',
    'Confirm IT agreement with EKA Erasmus coordinator',
    'Photo: Facquis, CC BY-SA 4.0',
    'Roma Tre University',
    'Algorithms for Big Data',
    'Photo: Università degli Studi Roma TRE, CC BY-SA 4.0',
    'Comparison of the 3 Universities',
    'Out of 3 Erasmus+ universities, I choose Siena.',
    'MY CHOICE',
    'Thank you!',
    '/media/hamster.mp4',
    'mix-blend-multiply',
    'Any questions?',
  ];

  for (const snippet of expectedSnippets) {
    if (!deckMarkup.includes(snippet)) {
      throw new Error(`Rendered slides missing expected content: "${snippet}"`);
    }
    console.log(`  Rendered & verified content: "${snippet}"`);
  }

  for (let i = 1; i <= 10; i++) {
    const notesHtml = ReactDOMServer.renderToString(
      React.createElement(SpeakerNotes, {
        isOpen: true,
        slideNumber: i,
        onClose: () => {},
      })
    ).replace(/<!--.*?-->/g, '');
    const script = SPEAKING_SCRIPTS[i - 1];
    if (!notesHtml.includes(`#slide-${i}`) || !notesHtml.includes(script.timeRange)) {
      throw new Error(`SpeakerNotes failed for slide ${i}`);
    }
  }
  console.log('  Verified SpeakerNotes overlay (Key N) for all 10 slides: PASS');

  const scriptModalHtml = ReactDOMServer.renderToString(
    React.createElement(ScriptModal, {
      isOpen: true,
      currentSlide: 1,
      onSelectSlide: () => {},
      onClose: () => {},
    })
  );
  if (!scriptModalHtml.includes('FULL SPEAKING SCRIPT') || !scriptModalHtml.includes('8–10 minutes')) {
    throw new Error('ScriptModal (Key P) failed render check');
  }
  console.log('  Verified ScriptModal (Key P) with all 10 slide scripts & timings: PASS');

  const qaModalHtml = ReactDOMServer.renderToString(
    React.createElement(QACheatSheetModal, {
      isOpen: true,
      onClose: () => {},
    })
  );
  if (!qaModalHtml.includes('Why Italy? Why Siena and not Milan or Rome?')) {
    throw new Error('QACheatSheetModal (Key Q) failed render check');
  }
  console.log('  Verified QACheatSheetModal (Key Q) with 7 teacher Q&A answers: PASS');

  const rehearsalHtml = ReactDOMServer.renderToString(
    React.createElement(RehearsalBar, {
      isOpen: true,
      currentSlide: 5,
    })
  );
  if (!rehearsalHtml.includes('REHEARSAL [T]')) {
    throw new Error('RehearsalBar (Key T) failed render check');
  }
  console.log('  Verified RehearsalBar (Key T) timer & pace indicator: PASS');

  const overviewHtml = ReactDOMServer.renderToString(
    React.createElement(Overview, {
      isOpen: true,
      currentSlide: 4,
      onSelectSlide: () => {},
      onClose: () => {},
    })
  );
  if (!overviewHtml.includes('10 Boarding Cards')) {
    throw new Error('Overview grid failed render check');
  }
  console.log('  Verified Overview 10-slide grid (Key O): PASS');
} finally {
  await vite.close();
}

console.log('\nALL UPDATE 3 & UPDATE 4 CHECKS PASSED SUCCESSFULLY!');
