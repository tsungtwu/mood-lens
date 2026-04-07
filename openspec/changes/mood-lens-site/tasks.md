## 1. Project Scaffold

- [x] 1.1 Create `package.json` (name: mood-lens, vue ^3.5, vite ^8, @tailwindcss/vite ^4.2, @vitejs/plugin-vue ^6)
- [x] 1.2 Create `vite.config.js` (vue + tailwindcss plugins, base: '/')
- [x] 1.3 Create `src/assets/main.css` with Tailwind @theme block: --color-bg: #2D0D26, --color-bg-card: #3D1535, --color-primary: #4A1942, --color-mauve: #8B5E83, --color-accent: #D64B8A, --color-accent-soft: #F2A7C3, --color-muted: #C9A0BC, fonts Righteous + Poppins. Include scrollbar-hide utility, .hotspot-glow, focus-visible rings, prefers-reduced-motion.
- [x] 1.4 Create `index.html` with CSP meta (script-src 'self', style-src 'self' 'unsafe-inline' fonts.googleapis.com), Google Fonts preconnect/preload, Open Graph tags, JSON-LD structured data
- [x] 1.5 Create `src/main.js` (createApp + mount) and minimal `src/App.vue`
- [x] 1.6 Run `npm install` and verify `npm run dev` renders a purple page with correct fonts

## 2. Data Model

- [x] 2.1 Create `public/data/mood.json` with complete pedal data structure
- [x] 2.2 Populate sharedControls: MIX (balance input/MOOD), CLOCK (sample rate), ROUTING (IN/Moon+IN/Moon toggle), PRESETS (left/center/right toggle)
- [x] 2.3 Populate wetChannel: modes array [reverb, delay, slip], controls with modeDescriptions for TIME and MODIFY, modeDetails with overview/freezeBehavior/tips per mode
- [x] 2.4 Populate microLooper: modes array [env, tape, stretch], controls with modeDescriptions for LENGTH and MODIFY, modeDetails with overview/tips per mode, overdubInfo section
- [x] 2.5 Populate hiddenOptions: 9 entries (Tone, Stereo Width, Ramping Waveform, Fade, Level Balance, Direct Micro-Loop, Sync, Spread Solo, Loop Length) with controlledBy, direction, description
- [x] 2.6 Populate clock: steps array (2k through 64k with hz/quality), channelEffects; routing: 3 positions with descriptions
- [x] 2.7 Populate dipSwitches: leftBank 8 switches (TIME, Wet MODIFY, CLOCK, Moon MODIFY, LENGTH, BOUNCE, SWEEP, POLARITY), rightBank 8 switches (CLASSIC, MISO, SPREAD, DRY KILL, TRAILS, LATCH, NO DUB, SMOOTH)
- [x] 2.8 Populate midi.cc: all CCs organized by category (footswitches CC102-107, knobs CC14-20, toggles CC21-23, hiddenOptions CC24-33, misc CC51-56/93/100/110/111), midi.steppedValues (CC18 Stepped Clock, CC19 Tape/Stretch Speed, CC14 Synced Time, CC16 Synced Length)
- [x] 2.9 Populate midi.synthMode: overview, outputTypes (Open/On-Off/ADSR), cc array (CC59/58/80-84/57/84/1), gettingStarted (connection, channel, presets)
- [x] 2.10 Add tips from manual "Try this" sections to relevant modeDetails entries

## 3. Core Composables

- [x] 3.1 Create `src/composables/useMoodData.js` — module-level singleton, fetch mood.json with double-call guard, expose data/isLoaded/loadError/loadData
- [x] 3.2 Create `src/composables/usePedalState.js` — module-level singleton with activeTab/wetMode/looperMode/selectedControlId refs and setter functions
- [x] ~~3.3 Create `src/composables/useSearch.js`~~ — REMOVED: search feature removed per user decision
- [x] 3.4 Create `src/composables/useMidi.js` — midiSearch/activeCcCategory/sortBy refs, filteredCCs computed (imports from useMoodData)

## 4. Navigation & App Shell

- [x] ~~4.1 Create `src/components/SearchBar.vue`~~ — REMOVED: search feature removed per user decision
- [x] 4.2 Create `src/components/TabNav.vue` — 7 tabs (Overview, Wet Channel, Micro-Looper, Hidden Options, Clock & Routing, Dip Switches, MIDI), horizontal scrollable on mobile, emits tab change
- [x] 4.3 Wire `App.vue`: onMounted loads data + reads hash via hashToTab(), v-if tab rendering, header with title + link to Chase Bliss, footer with disclaimer

## 5. Overview Tab — Interactive Pedal Panel

- [x] 5.1 Create `src/components/PedalPanel.vue` — SVG viewBox (300×500) with pedal body shape, circle elements for knobs, rect elements for toggles/footswitches
- [x] 5.2 Add interactive hotspots: @mouseenter/@mouseleave/@click handlers, :class for .hotspot-glow, cursor-pointer
- [x] 5.3 Create `src/components/ModeSelector.vue` — 3-button pill group, props: modes/activeMode, emits: update:activeMode. Reused on Overview + Channel tabs.
- [x] 5.4 Wire mode toggles (Wet: Reverb/Delay/Slip, Micro-Looper: Env/Tape/Stretch) to usePedalState
- [x] 5.5 Create `src/components/InfoPanel.vue` — displays selected control name, mode-aware description (resolves via wetMode/looperMode from usePedalState), range, channel badge. Empty state: "Click any control to explore"
- [x] 5.6 Create `src/components/ControlList.vue` — mobile fallback (block md:hidden), grouped by channel, tappable items
- [x] 5.7 Wire OverviewTab in App.vue: PedalPanel (hidden md:block) + ControlList (block md:hidden) + InfoPanel in responsive two-column layout

## 6. Channel Detail Pages

- [x] 6.1 Create `src/components/ControlCard.vue` — props: control + activeMode, displays name, modeDescriptions[activeMode], range
- [x] 6.2 Create `src/components/TipBlock.vue` — highlighted "Try this" callout with title and body
- [x] 6.3 Create `src/components/WetChannelTab.vue` — ModeSelector + ControlCards for TIME/MODIFY + Freeze behavior per mode + tips
- [x] 6.4 Create `src/components/MicroLooperTab.vue` — ModeSelector + ControlCards for LENGTH/MODIFY + Overdub section + tips
- [x] 6.5 Create `src/components/KnobIcon.vue` — SVG knob icon with rotatable position indicator (0-100 scale), label, configurable size
- [x] 6.6 Convert keySettings in `mood.json` from text format to structured `knobs` array with numeric positions for all 6 modes
- [x] 6.7 Update WetChannelTab.vue and MicroLooperTab.vue Key Settings sections to render KnobIcon components

## 7. Reference Pages

- [x] 7.1 Create `src/components/HiddenOptionsTab.vue` — list all 9 hidden options with controlledBy knob, direction, description. Access instructions at top.
- [x] 7.2 Create `src/components/ClockRoutingTab.vue` — Clock section: stepped values table (2k-64k), channel effects. Routing section: 3 positions with descriptions.
- [x] 7.3 Create `src/components/DipSwitchesTab.vue` — two-column layout (left bank / right bank), each switch shows position, name, ON/OFF descriptions with visual toggle indicator

## 8. MIDI Reference

- [x] 8.1 Create `src/components/MidiCCTable.vue` — sortable table with columns: CC#, Name, Category, Value/Range. Category filter pills. Supports external search query.
- [x] 8.2 Create `src/components/MidiTab.vue` — orchestrates: Getting Started section + SearchBar + MidiCCTable + Stepped Values reference + Synth Mode section
- [x] 8.3 Populate Synth Mode section: overview, 3 Output Types (Open/On-Off/ADSR) with descriptions, CC table, tips

## 9. Accessibility & Polish

- [x] 9.1 Add ARIA labels to all interactive elements (knob hotspots, mode buttons, tab nav, search)
- [x] 9.2 Verify WCAG 4.5:1 contrast: #D64B8A on #2D0D26, #F2A7C3 on #4A1942, white on #3D1535
- [x] 9.3 Keyboard navigation: Tab cycles through controls, Escape closes InfoPanel, "/" focuses search
- [x] 9.4 Test responsive layout: 375px (mobile list), 768px (tablet), 1024px, 1440px (desktop two-column)
- [x] 9.5 No v-html for user-facing content — use {{ }} interpolation only (security)

## 10. Deployment

- [x] 10.1 Create `.github/workflows/deploy.yml` (Node 20, npm ci, npm run build, upload-pages-artifact, deploy-pages)
- [x] 10.2 Verify `npm run build` succeeds and dist/ contains all assets
- [x] 10.3 Test production build locally with `npm run preview`
