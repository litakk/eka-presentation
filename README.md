# Erasmus+ in Italy: 5 Study Programs (Computer Science / IT Track)

An interactive, Awwwards-inspired 16:9 presentation website built with **React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP (`MotionPathPlugin`), Lottie, and `canvas-confetti`**.

Created for a live classroom presentation by a **Computer Science (IT)** student at **EKA University of Applied Sciences (Riga, Latvia)** comparing 5 Erasmus+ Computer Science & IT study programs in Italy:
1. **Milano-Bicocca (Milan)** — *MSc Computer Science (`LM-18`, DISCo)* *(with visible badge: `Check EKA agreement for IT with erasmus@eka.edu.lv`)*
2. **University of Siena (Siena)** — *MSc Artificial Intelligence & Automation Engineering / Computer & Automation Engineering (`LM-32`, 100% English)* — **Confirmed EKA IT Partner & Winner**
3. **Urbino Carlo Bo (Urbino)** — *MSc Informatica e Innovazione Digitale (`LM-18` Computer Science)* — **Confirmed EKA IT Partner**
4. **University for Foreigners of Perugia (Perugia)** — *Digital Humanities & Comunicazione Digitale (UX Design, Humanities Computing & AI Labs)* — **Confirmed EKA IT Partner**
5. **University of Teramo (Teramo)** — *Big Data Analytics, Cybersecurity & Digital Innovation Modules* — **Confirmed EKA IT Partner**

---

## 1. Quick Start (Development)

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## 2. Production Build & Presenting Offline

All fonts (**Space Grotesk**, **Inter**, and **JetBrains Mono**), city photographs (`public/images/*.webp`), Lottie animations, and synthesized UI audio are **100% bundled locally**—the presentation makes **zero external network requests at runtime** and works completely offline.

```bash
# 1. Build production bundle into ./dist
npm run build

# 2. Serve the production build locally (works without Wi-Fi/internet)
npm run preview
```

Open `http://localhost:4173` and press **`F`** for fullscreen.

---

## 3. Keyboard Shortcuts & Controls

| Key / Action | Function |
| :--- | :--- |
| `→` / `↓` / `Space` / `PageDown` | Next slide |
| `←` / `↑` / `PageUp` | Previous slide |
| `F` | Toggle Fullscreen mode |
| `N` | Toggle **Speaker Notes** overlay (presenter script for each slide) |
| `O` or `Esc` | Toggle **Slide Overview** 10-slide grid |
| `M` | Toggle subtle synthesized UI sounds (OFF by default) |
| `R` or `Home` | Restart presentation from Slide 1 (`#slide-1`) |
| `End` | Jump to Slide 10 (`#slide-10`) |
| Mouse Left / Right Edges | Click far-left or far-right screen edge to go back/forward |
| Touch Swipe Left / Right | Navigate slides on touchscreens / tablets |
| URL Hash (`#slide-1` … `#slide-10`) | Jump directly to any slide during Q&A |

---

## 4. How to Edit Slide Content & Placeholders

All presentation text, course tables, ECTS/CFU credits, living cost breakdowns, speaker notes, and city coordinates live in **one single file**:

- **[`src/data/slides.ts`](./src/data/slides.ts)**

Items marked `[to be verified]` (such as exact workshop CFU for Perugia's AI/Digital Labs or English exam options in Teramo's Cineca catalogue) can be updated directly in `PROGRAM_SLIDES` inside `src/data/slides.ts`.

---

## 5. Static PDF Backup Export

A ready-to-use 10-page 16:9 PDF backup is generated at:
- `./Erasmus-Italy-5-Study-Programs-Slides.pdf` (and downloadable inside the app via **Overview (`O`) → Download PDF Backup**).

To regenerate the PDF after editing `src/data/slides.ts`:
```bash
npm run export-pdf
```

You can also print all 10 slides at full 1920×1080 resolution directly from your browser at `http://localhost:4173/?print=true`.

---

## 6. Free Deployment (Vercel & Netlify)

### Deploy to Vercel (`eka-presentation.vercel.app`)
1. Push this repository to GitHub (`https://github.com/litakk/eka-presentation.git`).
2. Go to [vercel.com/new](https://vercel.com/new), import **`litakk/eka-presentation`**, keep the project name **`eka-presentation`**, and click **Deploy**.
3. Vercel automatically reads `vercel.json` (`npm run build` → `dist`) and publishes your presentation at **`https://eka-presentation.vercel.app`**.

---

## 7. CREDITS & Licenses

| Asset / Component | Author / Source | Link | License |
| :--- | :--- | :--- | :--- |
| **SplitText / BlurText** & **Magnet** patterns (`AnimatedPrimitives.tsx`) | David Haz — **React Bits** | [github.com/DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | MIT License |
| **MagicCard Spotlight**, **3D Tilt** & **NumberTicker** (`AnimatedPrimitives.tsx`) | **Magic UI** (`magicuidesign/magicui`) | [github.com/magicuidesign/magicui](https://github.com/magicuidesign/magicui) | MIT License |
| **React 18** (`react`, `react-dom`) | Meta Open Source | [react.dev](https://react.dev) | MIT License |
| **Framer Motion** (`framer-motion`) | Motion Division / Framer | [github.com/motiondivision/motion](https://github.com/motiondivision/motion) | MIT License |
| **GSAP + MotionPathPlugin** (`gsap`) | GreenSock Inc. | [gsap.com](https://gsap.com/community/standard-license/) | Standard "No Charge" GreenSock License |
| **lottie-react** & **lottie-web** | Gamote / Airbnb | [github.com/Gamote/lottie-react](https://github.com/Gamote/lottie-react) | MIT License |
| **canvas-confetti** | Kiril Vatev (`catdad`) | [github.com/catdad/canvas-confetti](https://github.com/catdad/canvas-confetti) | ISC License |
| **Lucide Icons** (`lucide-react`) | Lucide Contributors | [lucide.dev](https://lucide.dev/license) | ISC / MIT License |
| **Tailwind CSS** | Tailwind Labs Inc. | [tailwindcss.com](https://tailwindcss.com) | MIT License |
| **Space Grotesk** (`@fontsource/space-grotesk`) | Florian Karsten | [github.com/floriankarsten/space-grotesk](https://github.com/floriankarsten/space-grotesk) | SIL Open Font License 1.1 (OFL-1.1) |
| **Inter** (`@fontsource/inter`) | Rasmus Andersson | [github.com/rsms/inter](https://github.com/rsms/inter) | SIL Open Font License 1.1 (OFL-1.1) |
| **JetBrains Mono** (`@fontsource/jetbrains-mono`) | JetBrains s.r.o. | [github.com/JetBrains/JetBrainsMono](https://github.com/JetBrains/JetBrainsMono) | SIL Open Font License 1.1 (OFL-1.1) |
| **Bundled Lottie JSON Animations** (`planeLottieData`, `trophyStarLottieData`) | Custom-authored in EU palette (`src/assets/lottie/animations.ts`) | Local bundle | CC0 1.0 Public Domain |
| **Italy Vector Map Outline** (`ItalyMap.tsx`) | Adapted from Wikimedia / Simplemaps simplified vector coordinates | [simplemaps.com/resources/svg-it](https://simplemaps.com/resources/svg-it) | Free Commercial & Personal Use / MIT |
| **City Photographs** (`milan.webp`, `siena.webp`, `urbino.webp`, `perugia.webp`, `teramo.webp`) | Unsplash Contributors | [unsplash.com/license](https://unsplash.com/license) | Unsplash Free License |
