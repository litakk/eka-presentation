# Erasmus+ in Italy: 3 Study Programs (Computer Science / IT Track)

An interactive, editorial / travel-poster / boarding-pass 16:9 presentation website built with **React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP (`MotionPathPlugin`), Lottie, and `canvas-confetti`**.

Created for a live 8–10 minute classroom presentation by a **Computer Science (IT)** student at **EKA University of Applied Sciences (Riga, Latvia)**.

---

## 1. Slide Order (10 Slides Total)

1. **Slide 1 — Title**: *"Erasmus+ in Italy: 3 Study Programs"* (Computer Science focus, Italy photo + interactive route map)
2. **Slide 2 — Discussion Hook**: *"If you could study anywhere in Europe for one semester and pay no tuition, where would you go?"* (`a new country`, `new friends`, `real IT experience`)
3. **Slide 3 — About Latvia**: 5 verified facts about Latvia & Riga (`Riga on the Baltic Sea`, `EU since 2004 / Euro since 2014`, `~1.9M population (approx.)`, `UNESCO Riga Historic Centre`, `EKA in Riga`), Baltic states map + Riga Old Town photo (`From Riga to Italy • RIX → IT`)
4. **Slide 4 — What is Erasmus+?**: 4 split-flap stat cards (`2–12 months`, `0 EUR tuition at host`, `30 ECTS per semester`, `7.0 minimum average at EKA`, `apply in October / March`)
5. **Slide 5 — University 1: University of Siena**: *MSc Artificial Intelligence & Automation Engineering* (`English`, confirmed EKA IT partner, `600–950 EUR/month`)
6. **Slide 6 — University 2: University of Milano-Bicocca**: *MSc Computer Science (`LM-18`)* (`English & Italian, B2 English`, `900–1,300 EUR/month`, badge: `Confirm IT agreement with EKA Erasmus coordinator`)
7. **Slide 7 — University 3: Roma Tre University**: *MSc Computer Science Engineering & AI (`LM-32`)* (`Italian + English course units`, `850–1,200 EUR/month`, badge: `Confirm IT agreement with EKA Erasmus coordinator`)
8. **Slide 8 — Comparison of the 3**: Compact 3-row table (`Language`, `Cost / Month`, `IT Relevance`, `Vibe`) + animated cost bar chart (`775 EUR`, `1,025 EUR`, `1,100 EUR`)
9. **Slide 9 — Which is the best choice?**: *"Out of 3 Erasmus+ universities, I choose Siena."* — 3 verified reasons, `"MY CHOICE"` stamp, spotlight & confetti
10. **Slide 10 — Finale: Thank you / Any questions?**: 12-second dancing hamster cutout video (`public/media/hamster.mp4`, `mix-blend-mode: multiply`), rotating `"FINE"` stamp, confetti burst, `"Any questions?_"` typing reveal, and official sources footer

---

## 2. Complete Speaking Script, Q&A Cheat Sheet & Rehearsal Mode

- **Printable Script & Q&A File**: **[`SCRIPT.md`](./SCRIPT.md)** (includes slide goals, time budgets, on-screen animation order, exact B1 English words to say with `[pause]` / `[look at audience]` / `[point at screen]` cues, transition sentences, Uzbek translations for personal study, and 7 likely teacher Q&A answers).
- **In-App Overlays**:
  - Press **`N`** — **Speaker Notes** bar for the active slide (with optional Uzbek hint toggle)
  - Press **`P`** — **Full Speaking Script** overview modal across all 10 slides with timing
  - Press **`Q`** — **Teacher Q&A Cheat Sheet** modal (7 questions with 2-sentence answers)
  - Press **`T`** — **Rehearsal Timer Mode** (shows elapsed time vs. slide target time and turns **Green / Yellow / Red**)

---

## 3. Keyboard Shortcuts & Controls

| Key / Action | Function |
| :--- | :--- |
| `→` / `↓` / `Space` / `PageDown` | Next slide |
| `←` / `↑` / `PageUp` | Previous slide |
| `N` | Toggle **Speaker Notes** panel for current slide |
| `P` | Toggle **Full Speaking Script** overview modal |
| `Q` | Toggle **Teacher Q&A Cheat Sheet** modal |
| `T` | Toggle **Rehearsal Mode** timer bar (Green / Yellow / Red pace indicator) |
| `O` or `Esc` | Toggle **Slide Overview** 10-slide grid |
| `F` | Toggle Fullscreen mode |
| `S` or `M` | Toggle sound (hamster video audio on Slide 10 & UI sounds) |
| `R` | Replay hamster video on Slide 10 (or restart deck on other slides) |
| `Home` | Restart presentation from Slide 01 (`#slide-1`) |
| `End` | Jump to Slide 10 (`#slide-10`) |

---

## 4. Quick Start & Offline Build

```bash
npm install
npm run dev
```

Build and preview offline (zero external runtime requests):

```bash
npm run build
npm run preview
```

---

## 5. CREDITS & Licenses (Wikimedia Commons Photos & Code)

### Verified Photographs (Wikimedia Commons — Bundled Locally in `public/images/`)

| Slide & Subject | Local File | Author | License | Wikimedia Commons Source |
| :--- | :--- | :--- | :--- | :--- |
| **Slide 1 — Italy (Piazza del Campo, Siena)** | `public/images/italy-hero.webp` | Georges Jansoone (`JoJan`) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | [File:Siena.Campo.pano01.jpg](https://commons.wikimedia.org/wiki/File:Siena.Campo.pano01.jpg) |
| **Slide 3 — Riga Old Town (House of the Blackheads)** | `public/images/riga.webp` | David Iliff (`Diliff`) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | [File:House of Blackheads at Dusk 3, Riga, Latvia - Diliff.jpg](https://commons.wikimedia.org/wiki/File:House_of_Blackheads_at_Dusk_3,_Riga,_Latvia_-_Diliff.jpg) |
| **Slide 5 — University of Siena (Palazzo del Rettorato Courtyard)** | `public/images/siena.webp` | `Sailko` | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | [File:Siena, palazzo dell'università, cortile 01.JPG](https://commons.wikimedia.org/wiki/File:Siena,_palazzo_dell%27universit%C3%A0,_cortile_01.JPG) |
| **Slide 6 — University of Milano-Bicocca (Building U12)** | `public/images/milan-bicocca.webp` | `Facquis` | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [File:Bicocca edificio U12.jpg](https://commons.wikimedia.org/wiki/File:Bicocca_edificio_U12.jpg) |
| **Slide 7 — Roma Tre University (Nuovo Rettorato)** | `public/images/roma-tre.webp` | `Università degli Studi Roma TRE` | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [File:Nuovo Rettorato Roma TRE.jpg](https://commons.wikimedia.org/wiki/File:Nuovo_Rettorato_Roma_TRE.jpg) |

### Libraries, Fonts & Media

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
| **Fraunces** (`@fontsource/fraunces`) | Undercase Type | [github.com/undercasetype/Fraunces](https://github.com/undercasetype/Fraunces) | SIL Open Font License 1.1 |
| **Archivo** (`@fontsource/archivo`) | Omnibus-Type | [github.com/Omnibus-Type/Archivo](https://github.com/Omnibus-Type/Archivo) | SIL Open Font License 1.1 |
| **JetBrains Mono** (`@fontsource/jetbrains-mono`) | JetBrains s.r.o. | [github.com/JetBrains/JetBrainsMono](https://github.com/JetBrains/JetBrainsMono) | SIL Open Font License 1.1 |
| **Hamster Finale Video** (`public/media/hamster.mp4`) | Provided by Presenter | Local asset | Presenter-provided media |
