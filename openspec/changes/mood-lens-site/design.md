## Context

This is a greenfield static website project for the Chase Bliss MOOD MKII guitar effects pedal. The reference project h90-lens (Vue 3 + Vite + Tailwind CSS v4) provides proven architecture patterns for a similar pedal reference site. The MOOD MKII differs from the H90 in that it is control-oriented (2 channels × 3 modes each) rather than algorithm-oriented (76 algorithms with presets).

The MOOD MKII manual PDF provides all source content: shared controls, wet channel modes (Reverb/Delay/Slip), micro-looper modes (Env/Tape/Stretch), hidden options, clock/routing, dip switches, and MIDI CC tables.

## Goals / Non-Goals

**Goals:**
- Provide fast, interactive web reference for MOOD MKII controls
- Match the manual's purple/pink visual identity
- Enable users to quickly find what any knob/switch does in any mode
- Provide searchable MIDI CC reference
- Deploy as static site (GitHub Pages) with zero backend dependencies
- Mobile-friendly responsive design
- Accessible (ARIA labels, keyboard navigation, focus management)

**Non-Goals:**
- No user accounts or persistence
- No audio playback or sound demos
- No preset sharing or community features
- No firmware update functionality
- No real-time MIDI communication
- No internationalization (English only)

## Decisions

### 1. Vue 3 + Vite + Tailwind CSS v4 (same as h90-lens)

**Rationale**: Proven stack from h90-lens. Vue 3 Composition API with `<script setup>` is concise and performant. Tailwind v4 with `@theme` variables enables manual-matching color system. Vite provides fast dev/build.

**Alternative considered**: Plain HTML + vanilla JS — simpler but harder to manage interactive state (mode toggles, search, info panel).

### 2. Static JSON data model (not fetched from API)

**Rationale**: All pedal data is static and known at build time. A single `mood.json` file loaded at startup enables instant search and filtering. Same pattern as h90-lens's `algorithms.json`.

**Structure**:
```
{
  "sharedControls": [...],
  "wetChannel": { "modes": [...], "controls": [...] },
  "microLooper": { "modes": [...], "controls": [...] },
  "hiddenOptions": [...],
  "clock": { ... },
  "routing": { ... },
  "dipSwitches": { "leftBank": [...], "rightBank": [...] },
  "midi": { "cc": [...], "synthMode": { ... } }
}
```

### 3. SVG-based interactive pedal panel

**Rationale**: SVG allows precise positioning of clickable hotspots matching the physical pedal layout. CSS transitions handle hover/active states. Vue reactivity updates the info panel based on selected control + active mode.

**Alternative considered**: CSS-only layout with positioned divs — harder to match physical pedal shape accurately.

### 4. Tab navigation with hash routing

**Rationale**: Simple hash-based routing (`#overview`, `#wet-channel`, `#midi`) avoids vue-router dependency while enabling deep linking and browser back/forward. Same pattern as h90-lens's `#algo=` routing.

### 5. Manual-matching color palette

**Rationale**: User specifically requested color consistency with the manual. Colors extracted from the PDF:
- Deep plum background: `#4A1942`
- Medium mauve: `#8B5E83`
- Hot pink accent: `#D64B8A`
- Soft pink: `#F2A7C3`
- White text: `#FFFFFF`
- Dark purple text: `#3D1A54`

### 6. Mode-aware control descriptions

**Rationale**: MOOD's core complexity is that the same knob (e.g., TIME, MODIFY) behaves differently depending on the active mode. The UI must show mode context alongside control descriptions. A mode selector in channel detail pages and on the interactive panel dynamically swaps description content.

### 7. Hybrid architecture: Clean composables + flat components

**Rationale**: Synthesized from two architect perspectives. Uses 4 separate composables for clear separation of concerns, but keeps components in a flat `components/` directory for easy navigation.

**Composables** (module-level singletons, same pattern as h90-lens `useAlgorithms.js`):
- `useMoodData.js` — fetch `mood.json`, expose raw data + loading state
- `usePedalState.js` — shared mutable UI state: `activeTab`, `wetMode`, `looperMode`, `selectedControlId`. Key insight: mode changes on Overview tab sync to Channel detail tabs because both consume the same singleton ref.
- `useSearch.js` — debounced global search with generic `matches()` helper
- `useMidi.js` — MIDI-specific search/sort/filter (imports from `useMoodData`)

**Component structure** (~18-20 files, flat):
```
src/components/
├── TabNav.vue           # 7-tab horizontal nav
├── SearchBar.vue        # Global search (copy from h90-lens, change placeholder)
├── PedalPanel.vue       # SVG interactive pedal + mode toggles + hotspots
├── InfoPanel.vue        # Selected control description panel
├── ControlList.vue      # Mobile fallback list view
├── ModeSelector.vue     # 3-button mode pill switcher (reused)
├── ControlCard.vue      # Knob name + mode description + range
├── TipBlock.vue         # "Try this" highlighted callout
├── WetChannelTab.vue    # Reverb/Delay/Slip page
├── MicroLooperTab.vue   # Env/Tape/Stretch page
├── HiddenOptionsTab.vue # Hidden controls list
├── ClockRoutingTab.vue  # Clock table + routing options
├── DipSwitchesTab.vue   # Left + right bank switches
├── MidiTab.vue          # CC table + Synth Mode
└── MidiCCTable.vue      # Searchable/sortable CC table
```

**Alternative considered**: Deep nested folder structure (30+ files) — better for very large projects but overkill for a ~18 component site.

### 8. CSP with `script-src 'self'` (improved over h90-lens)

**Rationale**: Security review identified that h90-lens uses `'unsafe-inline'` in `script-src` unnecessarily. Since Vite bundles all JS into external files, we can use the stricter `script-src 'self'`. `'unsafe-inline'` is only needed in `style-src` for Tailwind/Vue runtime styles.

## Risks / Trade-offs

- **[SVG complexity]** → The interactive pedal SVG requires careful creation to match the physical layout. Mitigation: Start with a simplified geometric representation, not a photo-realistic render.
- **[Manual data extraction]** → All content must be manually extracted from PDF. Mitigation: Create structured JSON once; future updates only need JSON edits.
- **[Color accessibility]** → Purple/pink palette may have contrast issues. Mitigation: Verify all text meets WCAG 4.5:1 contrast ratio; add lighter text variants where needed.
- **[Mobile SVG interaction]** → Small touch targets on the pedal SVG. Mitigation: On mobile, use a list view or enlarged tap targets instead of the SVG panel.

## Security Considerations

- Static site with no user input, no backend, no authentication — minimal attack surface
- CSP meta tag restricts script sources to 'self'
- No external API calls except Google Fonts
- All content is read-only static files
