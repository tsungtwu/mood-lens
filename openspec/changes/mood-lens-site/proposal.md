## Why

The Chase Bliss MOOD MKII is a complex two-channel multi-effect pedal with deep control options across multiple modes, hidden settings, dip switches, and MIDI. Its official PDF manual is comprehensive but difficult to navigate quickly during use. Musicians need a fast, interactive web reference to understand what each knob and switch does — especially since the same knob behaves differently depending on the active mode.

## What Changes

- Create a new static website (mood-lens) providing an interactive web reference for the MOOD MKII pedal
- Build an SVG-based interactive pedal panel where users click controls to see descriptions
- Implement tab-based navigation: Overview, Wet Channel, Micro-Looper, Hidden Options, Clock & Routing, Dip Switches, MIDI
- Create mode-aware control descriptions (knobs change behavior per mode)
- Build a searchable/sortable MIDI CC reference table
- Document Synth Mode (MIDI-only feature) with output types, ADSR, and transpose
- Include "Try this" tips and techniques from the manual
- Use the manual's purple/pink color palette for visual consistency
- Deploy as a static site via GitHub Pages

## Capabilities

### New Capabilities
- `interactive-pedal-panel`: SVG-based interactive pedal face diagram with clickable controls and info panel. Mode toggles dynamically update knob descriptions.
- `channel-detail-pages`: Detailed pages for Wet Channel (Reverb/Delay/Slip) and Micro-Looper (Env/Tape/Stretch) showing per-mode knob behavior, freeze/overdub info, and tips.
- `hidden-options-reference`: Reference for all hidden controls (Tone, Fade, Stereo Width, Level Balance, Direct Micro-Loop, Sync, Spread Solo, Loop Length, Ramping Waveform).
- `clock-routing-reference`: Clock sample rate details (stepped values 2k-64k), routing options (IN/Moon+IN/Moon), and signal flow explanation.
- `dip-switch-config`: Left bank (Ramping/Expression) and Right bank (Customize) dip switch configuration reference.
- `midi-reference`: Searchable MIDI CC table with all control parameters, toggles, hidden options, and misc/random values. Includes Synth Mode documentation.
- `search-navigation`: Global search across all controls, modes, and MIDI parameters with keyboard shortcuts.
- `pedal-data-model`: Structured JSON data model for all MOOD MKII controls, modes, parameters, and MIDI mappings.

### Modified Capabilities
<!-- No existing specs to modify — this is a greenfield project -->

## Impact

- **New repository**: mood-lens (standalone project at /Users/ken_wu/Documents/workspace/github/mood-lens)
- **Tech stack**: Vue 3 + Vite + Tailwind CSS v4 (matching h90-lens patterns)
- **Data**: Static JSON file containing all pedal data extracted from MOOD MKII manual PDFs
- **Deployment**: GitHub Pages via GitHub Actions
- **Dependencies**: Vue 3, Vite 8, Tailwind CSS v4, @tailwindcss/vite, @vitejs/plugin-vue
- **Reference project**: h90-lens architecture patterns reused where applicable (composables, component structure, deployment workflow)

### Patterns from h90-lens to reuse
- **Composable pattern**: Module-level reactive state (ref/computed) exported via a function — see `useAlgorithms.js`. Mood-lens will use `useMoodData.js` with similar fetch guard and search state.
- **Tailwind @theme**: CSS custom properties in `main.css` @theme block — will use same approach with MOOD purple/pink palette.
- **Hash routing**: `window.location.hash` + `hashchange` event listener for deep linking — will adapt for tab navigation (#overview, #wet-channel, etc.).
- **Keyboard shortcuts**: Document-level keydown listener for "/" (search focus) and Escape (close) — identical pattern.
- **Component structure**: Single-file components with `<script setup>` — same pattern.
- **Data loading**: Static JSON fetched at startup with loading/error states — same pattern with `mood.json`.
- **Deployment**: GitHub Actions workflow with Node 20 + npm ci + vite build → GitHub Pages.

### Spec Compatibility
No existing specs — this is a greenfield project. No conflicts found.
