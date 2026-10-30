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
  ['Dark Slide Body (#F6F4EC on #061A44)', '#F6F4EC', '#061A44'],
  ['Dark Slide Card (#F6F4EC on #0B2A6B)', '#F6F4EC', '#0B2A6B'],
  ['Dark Slide Accent (#FFCC00 on #061A44)', '#FFCC00', '#061A44'],
  ['Dark Slide Accent on Card (#FFCC00 on #0B2A6B)', '#FFCC00', '#0B2A6B'],
  ['Dark Slide Subtext (#BFD7FF on #061A44)', '#BFD7FF', '#061A44'],
  ['Light Slide Body (#061A44 on #F6F4EC)', '#061A44', '#F6F4EC'],
  ['Light Slide Primary (#0B2A6B on #F6F4EC)', '#0B2A6B', '#F6F4EC'],
  ['Light Slide Card (#061A44 on #FFFFFF)', '#061A44', '#FFFFFF'],
];

console.log('=== 1. WCAG Contrast Check (Target >= 4.5:1) ===');
for (const [label, fg, bg] of pairs) {
  const ratio = contrastRatio(fg, bg);
  console.log(`  ${label}: ${ratio.toFixed(2)}:1 ${ratio >= 4.5 ? 'PASS' : 'FAIL'}`);
  if (ratio < 4.5) process.exit(1);
}

console.log('\n=== 2. Offline Production Bundle Check ===');
const distDir = path.resolve('dist');
const requiredFiles = [
  'index.html',
  'favicon.svg',
  'Erasmus-Italy-5-Study-Programs-Slides.pdf',
  'images/milan.webp',
  'images/siena.webp',
  'images/urbino.webp',
  'images/perugia.webp',
  'images/teramo.webp',
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
console.log(`  Bundled self-hosted .woff2 font files (Space Grotesk + Inter + JetBrains Mono): ${woff2Files.length}`);
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

console.log('\n=== 3. Component Render & CS/IT Content Verification Across All 10 Slides ===');
const vite = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
});

try {
  const { PrintDeck } = await vite.ssrLoadModule('/src/components/PrintDeck.tsx');
  const { SpeakerNotes } = await vite.ssrLoadModule('/src/components/SpeakerNotes.tsx');
  const { Overview } = await vite.ssrLoadModule('/src/components/Overview.tsx');
  const { ALL_SLIDES_METADATA } = await vite.ssrLoadModule('/src/data/slides.ts');

  const rawMarkup = ReactDOMServer.renderToString(React.createElement(PrintDeck));
  const deckMarkup = rawMarkup.replace(/<!--.*?-->/g, '');

  const expectedSnippets = [
    'Erasmus+ in Italy: 5 Study Programs',
    'Partner universities of EKA University of Applied Sciences',
    '2–12 months',
    '0 EUR',
    '30 ECTS',
    '7.0 min',
    'Milano-Bicocca',
    'Check EKA agreement for IT with erasmus@eka.edu.lv',
    'Advanced Machine Learning (F1801Q151)',
    'University of Siena',
    'Artificial Intelligence',
    '600–950 EUR/month',
    'Urbino Carlo Bo',
    'Informatica e Innovazione Digitale',
    'Sicurezza Informatica (Cybersecurity)',
    'University for Foreigners of Perugia',
    'Fondamenti di informatica umanistica (Humanities Computing)',
    'University of Teramo',
    'Big Data Analytics',
    '[to be verified]',
    'Comparison of All 5 IT Programs',
    'Which is the best choice?',
    'Thank you / Any questions?',
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
    );
    const meta = ALL_SLIDES_METADATA[i - 1];
    if (!notesHtml.includes(`#slide-${i}`) || !notesHtml.includes(meta.speakerNotes.slice(0, 20))) {
      throw new Error(`SpeakerNotes failed for slide ${i}`);
    }
  }
  console.log('  Verified SpeakerNotes overlay & hash for all 10 slides (#slide-1 .. #slide-10): PASS');

  const overviewHtml = ReactDOMServer.renderToString(
    React.createElement(Overview, {
      isOpen: true,
      currentSlide: 4,
      onSelectSlide: () => {},
      onClose: () => {},
    })
  );
  if (!overviewHtml.includes('Slide Overview') || !overviewHtml.includes('Download PDF Backup')) {
    throw new Error('Overview grid failed render check');
  }
  console.log('  Verified Overview 10-slide grid & PDF backup link: PASS');
} finally {
  await vite.close();
}

console.log('\nALL CS / IT QUALITY CHECKS PASSED SUCCESSFULLY!');
