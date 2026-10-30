# Erasmus+ in Italy: 5 Study Programs (Computer Science / IT Track)

An interactive, editorial / travel-poster / boarding-pass 16:9 presentation website built with **React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP (`MotionPathPlugin`), Lottie, and `canvas-confetti`**.

Created for a live classroom presentation by a **Computer Science (IT)** student at **EKA University of Applied Sciences (Riga, Latvia)** comparing 5 Erasmus+ Computer Science & IT study programs in Italy, plus a 12-second **Dancing Hamster Finale (`Slide 11 — THE END`)**:
1. **Milano-Bicocca (Milan — `RIX → MXP/LIN`)** — *MSc Computer Science (`LM-18`, DISCo)* *(with visible stamp/badge: `Check EKA agreement for IT with erasmus@eka.edu.lv`)*
2. **University of Siena (Siena — `RIX → FLR`)** — *MSc Artificial Intelligence & Automation Engineering / Computer & Automation Engineering (`LM-32`, 100% English)* — **Confirmed EKA IT Partner & Winner (`BEST CHOICE` stamp)**
3. **Urbino Carlo Bo (Urbino — `RIX → RMI/AOI`)** — *MSc Informatica e Innovazione Digitale (`LM-18` Computer Science)* — **Confirmed EKA IT Partner**
4. **University for Foreigners of Perugia (Perugia — `RIX → PEG`)** — *Digital Humanities & Comunicazione Digitale (UX Design, Humanities Computing & AI Labs)* — **Confirmed EKA IT Partner**
5. **University of Teramo (Teramo — `RIX → PSR`)** — *Big Data Analytics, Cybersecurity & Digital Innovation Modules* — **Confirmed EKA IT Partner**

---

## 1. Visual Design System (Editorial / Boarding-Pass / Print Zine)

- **Flat Archival Palette** (no gradients, no glowing blobs, no glassmorphism):
  - Warm Paper `#F2EADB`, Cream Card `#FAF6EE`, Deep Ink `#1B1B18`, Tomato Red `#C9472B`, Olive/Basil `#3F5B3A`, Mustard `#E0A526`, and Pale Sky `#CFE0E6` as a rare accent.
- **Self-Hosted Typography**:
  - **Fraunces** (`@fontsource/fraunces`) — expressive display serif for headings and oversized slide numbers (`01`–`11`)
  - **Archivo** (`@fontsource/archivo`) — clean editorial grotesk for body copy
  - **JetBrains Mono** (`@fontsource/jetbrains-mono`) — monospace for boarding pass codes, IATA airport codes, course codes, and split-flap counters
- **Slide 11 ("THE END") Hamster Video Finale**:
  - Uses `public/media/hamster.mp4` and `public/media/hamster.webm` with poster `public/media/hamster-poster.jpg`.
  - Blends the white video background seamlessly into the warm paper stage via `mix-blend-mode: multiply`.
  - Features a theatre-curtain reveal, bouncy entrance, rotating Italian `"FINE"` stamp, circling paper plane, `canvas-confetti` burst on completion, and `"Any questions?_"` typing reveal.

---

## 2. Quick Start & Offline Production Build

```bash
npm install
npm run dev
```

All fonts (**Fraunces**, **Archivo**, **JetBrains Mono**), city photographs (`public/images/*.webp`), and the hamster finale video (`public/media/hamster.mp4`, `public/media/hamster.webm`, `public/media/hamster-poster.jpg`) are **100% bundled locally**—the presentation works completely offline:

```bash
npm run build
npm run preview
```

---

## 3. Keyboard Shortcuts & Controls

| Key / Action | Function |
| :--- | :--- |
| `→` / `↓` / `Space` / `PageDown` | Next slide |
| `←` / `↑` / `PageUp` | Previous slide |
| `F` | Toggle Fullscreen mode |
| `N` | Toggle **Speaker Notes** overlay (presenter script for each slide) |
| `O` or `Esc` | Toggle **Slide Overview** 11-slide grid |
| `S` or `M` | Toggle sound (toggles hamster video audio on Slide 11 & UI sound effects) |
| `R` | Replay hamster video on Slide 11 (or restart deck on other slides) |
| `Home` | Restart presentation from Slide 01 (`#slide-1`) |
| `End` | Jump to Slide 11 (`#slide-11`) |
| URL Hash (`#slide-1` … `#slide-11`) | Jump directly to any slide during Q&A |

---

## 4. How to Edit Slide Content & Regenerate PDF Backup

All presentation text, boarding-pass metadata, course tables, ECTS/CFU credits, living cost breakdowns, and speaker notes live in:
- **[`src/data/slides.ts`](./src/data/slides.ts)**

To regenerate the 11-slide 16:9 static PDF backup (`./Erasmus-Italy-5-Study-Programs-Slides.pdf`):
```bash
npm run export-pdf
```

---

## 5. CREDITS & Licenses

| Asset / Component | Author / Source | Link | License |
| :--- | :--- | :--- | :--- |
| **SplitText** & **Magnet** patterns (`AnimatedPrimitives.tsx`) | David Haz — **React Bits** | [github.com/DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | MIT License |
| **NumberTicker / Split-Flap Counter** (`AnimatedPrimitives.tsx`) | **Magic UI** (`magicuidesign/magicui`) | [github.com/magicuidesign/magicui](https://github.com/magicuidesign/magicui) | MIT License |
| **React 18** (`react`, `react-dom`) | Meta Open Source | [react.dev](https://react.dev) | MIT License |
| **Framer Motion** (`framer-motion`) | Motion Division / Framer | [github.com/motiondivision/motion](https://github.com/motiondivision/motion) | MIT License |
| **GSAP + MotionPathPlugin** (`gsap`) | GreenSock Inc. | [gsap.com](https://gsap.com/community/standard-license/) | Standard "No Charge" GreenSock License |
| **lottie-react** & **lottie-web** | Gamote / Airbnb | [github.com/Gamote/lottie-react](https://github.com/Gamote/lottie-react) | MIT License |
| **canvas-confetti** | Kiril Vatev (`catdad`) | [github.com/catdad/canvas-confetti](https://github.com/catdad/canvas-confetti) | ISC License |
| **Lucide Icons** (`lucide-react`) | Lucide Contributors | [lucide.dev](https://lucide.dev/license) | ISC / MIT License |
| **Tailwind CSS** | Tailwind Labs Inc. | [tailwindcss.com](https://tailwindcss.com) | MIT License |
| **Fraunces** (`@fontsource/fraunces`) | Undercase Type (Phaedra Charles & Flavia Zimbardi) | [github.com/undercasetype/Fraunces](https://github.com/undercasetype/Fraunces) | SIL Open Font License 1.1 (OFL-1.1) |
| **Archivo** (`@fontsource/archivo`) | Omnibus-Type | [github.com/Omnibus-Type/Archivo](https://github.com/Omnibus-Type/Archivo) | SIL Open Font License 1.1 (OFL-1.1) |
| **JetBrains Mono** (`@fontsource/jetbrains-mono`) | JetBrains s.r.o. | [github.com/JetBrains/JetBrainsMono](https://github.com/JetBrains/JetBrainsMono) | SIL Open Font License 1.1 (OFL-1.1) |
| **Italy Vector Map Outline** (`ItalyMap.tsx`) | Adapted from Wikimedia / Simplemaps simplified vector coordinates | [simplemaps.com/resources/svg-it](https://simplemaps.com/resources/svg-it) | Free Commercial & Personal Use / MIT |
| **City Photographs** (`milan.webp`, `siena.webp`, `urbino.webp`, `perugia.webp`, `teramo.webp`) | Unsplash Contributors | [unsplash.com/license](https://unsplash.com/license) | Unsplash Free License |
| **Hamster Finale Video** (`public/media/hamster.mp4`) | Provided by Presenter | Local asset | Presenter-provided media |
