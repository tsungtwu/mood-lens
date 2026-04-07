# MOOD Lens

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Vue](https://img.shields.io/badge/vue-3.5-42b883.svg)
![Vite](https://img.shields.io/badge/vite-8-646CFF.svg)
![Tailwind](https://img.shields.io/badge/tailwind-4-38BDF8.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**An interactive web manual for the Chase Bliss MOOD MKII guitar effects pedal**

Explore every knob, toggle, and footswitch with an interactive SVG pedal panel, mode-aware control descriptions, and a complete MIDI CC reference.

[Live Site](https://mood-lens.tsungtwu.dev) | [MOOD MKII Official](https://www.chasebliss.com/mood-mkii)

</div>

---

## Features

- **Interactive Pedal Panel** — SVG replica of the MOOD MKII with clickable knobs, toggles, and footswitches
- **Mode-Aware Descriptions** — Control descriptions update based on the active mode (Reverb/Delay/Slip, Env/Tape/Stretch)
- **7 Reference Tabs** — Overview, Wet Channel, Micro-Looper, Hidden Options, Clock & Routing, Dip Switches, MIDI
- **Visual Key Settings** — SVG knob icons showing recommended positions for each preset configuration
- **Wet Channel Deep Dive** — Reverb, Delay, and Slip modes with How It Works, Freeze behavior, Key Settings, and tips
- **Micro-Looper Deep Dive** — Env, Tape, and Stretch modes with overdub details, speed reference, and tips
- **Hidden Options** — All 9 hidden parameters with access instructions
- **Dip Switches** — Complete reference for all 16 dip switches (left and right banks)
- **MIDI CC Table** — All 36 CCs with category filtering and sorting
- **Synth Mode** — Full synth mode documentation with output types and CC reference
- **Deep Linking** — Hash-based routing for direct links to any tab
- **Responsive** — Works at 375px, 768px, 1024px, 1440px

---

## Quick Start

```bash
git clone https://github.com/tsungtwu/mood-lens.git
cd mood-lens
npm install
npm run dev
```

Open http://localhost:5173/

---

## Build & Deploy

```bash
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

Deployment is automated via GitHub Actions — push to `main` triggers build and deploy to GitHub Pages.

---

## Architecture

```
mood-lens/
├── src/
│   ├── App.vue                      # Root component, tab routing
│   ├── main.js                      # Vue app entry
│   ├── assets/main.css              # Tailwind v4 @theme config (purple/pink theme)
│   ├── components/
│   │   ├── PedalPanel.vue           # Interactive SVG pedal face
│   │   ├── InfoPanel.vue            # Selected control detail panel
│   │   ├── ControlList.vue          # Mobile fallback control list
│   │   ├── ControlCard.vue          # Mode-aware control card
│   │   ├── KnobIcon.vue             # SVG knob position indicator
│   │   ├── ModeSelector.vue         # Mode pill button group
│   │   ├── WetChannelTab.vue        # Wet channel deep dive
│   │   ├── MicroLooperTab.vue       # Micro-looper deep dive
│   │   ├── HiddenOptionsTab.vue     # Hidden options reference
│   │   ├── ClockRoutingTab.vue      # Clock & routing reference
│   │   ├── DipSwitchesTab.vue       # Dip switch configuration
│   │   ├── MidiCCTable.vue          # Sortable/filterable MIDI CC table
│   │   ├── MidiTab.vue              # MIDI reference orchestrator
│   │   ├── TabNav.vue               # Tab navigation bar
│   │   └── TipBlock.vue             # Tip callout block
│   └── composables/
│       ├── useMoodData.js           # Fetch and cache pedal data
│       ├── usePedalState.js         # Shared UI state (tabs, modes, selection)
│       └── useMidi.js               # MIDI CC filtering and sorting
├── public/
│   └── data/mood.json               # Complete MOOD MKII pedal data
├── openspec/                        # OpenSpec specs and change artifacts
├── vite.config.js                   # Vite + Vue + Tailwind, base: '/'
└── index.html                       # Entry point with CSP meta tag
```

### Tech Stack
- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Build:** Vite 8
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **Fonts:** Google Fonts — Righteous (headings) + Poppins (body)
- **Deploy:** GitHub Pages via GitHub Actions

---

## Data Source

Pedal data sourced from the [MOOD MKII Manual](https://www.chasebliss.com/mood-mkii). Not affiliated with Chase Bliss Audio.

---

## License

MIT

---

## Author

**tsungtwu** - [@tsungtwu](https://github.com/tsungtwu)

---

<div align="center">

Built with [Claude Code](https://claude.ai/code)

</div>
