<script setup>
import { computed } from 'vue'
import { useMoodData } from '../composables/useMoodData'
import { usePedalState } from '../composables/usePedalState'
import ModeSelector from './ModeSelector.vue'

const { data } = useMoodData()
const { wetMode, looperMode, selectedControlId, setWetMode, setLooperMode, selectControl } = usePedalState()

const wetControlIds = new Set(['wet-time', 'wet-modify', 'wet-mode', 'wet-bypass'])
const loopControlIds = new Set(['loop-length', 'loop-modify', 'moon-mode', 'moon-bypass'])

function isSelected(id) {
  return selectedControlId.value === id
}

function onWetModeChange(mode) {
  setWetMode(mode)
  // Auto-select a wet control so the user sees the mode change immediately
  if (!selectedControlId.value || !wetControlIds.has(selectedControlId.value)) {
    selectControl('wet-time')
  }
}

function onLooperModeChange(mode) {
  setLooperMode(mode)
  if (!selectedControlId.value || !loopControlIds.has(selectedControlId.value)) {
    selectControl('loop-length')
  }
}

// 3-column layout
const col = { left: 85, center: 165, right: 245 }
</script>

<template>
  <div class="space-y-4">
    <!-- Mode selectors -->
    <div class="flex flex-wrap justify-between gap-4">
      <div>
        <span class="text-xs text-muted uppercase tracking-wider block mb-1">Wet Channel</span>
        <ModeSelector
          :modes="['reverb', 'delay', 'slip']"
          :active-mode="wetMode"
          label="Wet channel mode"
          @update:active-mode="onWetModeChange"
        />
      </div>
      <div class="text-right">
        <span class="text-xs text-muted uppercase tracking-wider block mb-1">Micro-Looper</span>
        <ModeSelector
          :modes="['env', 'tape', 'stretch']"
          :active-mode="looperMode"
          label="Micro-looper mode"
          @update:active-mode="onLooperModeChange"
        />
      </div>
    </div>

    <!-- SVG Pedal Face -->
    <svg viewBox="0 0 330 540" class="w-full max-w-sm mx-auto" role="img" aria-label="MOOD MKII pedal — click any control for details">

      <!-- Pedal body -->
      <rect x="32" y="8" width="266" height="524" rx="22" fill="#8B6A83" stroke="#A08098" stroke-width="2" />
      <rect x="38" y="14" width="254" height="512" rx="18" fill="#7D5C75" />

      <!-- Dashed center box around shared controls (MIX + CLOCK) -->
      <rect x="132" y="48" width="66" height="210" rx="8"
        fill="none" stroke="#C9A0BC" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.45" />


      <!-- ========== ROW A: TIME — MIX — LENGTH ========== -->

      <!-- TIME knob (left) -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('wet-time') }" @click="selectControl('wet-time')">
        <circle :cx="col.left" cy="88" r="26"
          :fill="isSelected('wet-time') ? '#D64B8A' : '#4A1942'"
          :stroke="isSelected('wet-time') ? '#F2A7C3' : '#6B4063'"
          stroke-width="2" class="transition-colors duration-200" />
        <!-- Knob indicator line -->
        <line :x1="col.left" :y1="88 - 24" :x2="col.left" :y2="88 - 12"
          stroke="white" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <text :x="col.left" y="124" text-anchor="middle" fill="#E8DDE5" font-size="10" font-weight="600" font-family="Poppins, sans-serif">TIME</text>

      <!-- MIX knob (center, large) -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('mix') }" @click="selectControl('mix')">
        <circle :cx="col.center" cy="88" r="30"
          :fill="isSelected('mix') ? '#D64B8A' : '#4A1942'"
          :stroke="isSelected('mix') ? '#F2A7C3' : '#6B4063'"
          stroke-width="2" class="transition-colors duration-200" />
        <line :x1="col.center" :y1="88 - 28" :x2="col.center" :y2="88 - 14"
          stroke="white" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <text :x="col.center" y="130" text-anchor="middle" fill="#E8DDE5" font-size="10" font-weight="600" font-family="Poppins, sans-serif">MIX</text>

      <!-- LENGTH knob (right) -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('loop-length') }" @click="selectControl('loop-length')">
        <circle :cx="col.right" cy="88" r="26"
          :fill="isSelected('loop-length') ? '#D64B8A' : '#4A1942'"
          :stroke="isSelected('loop-length') ? '#F2A7C3' : '#6B4063'"
          stroke-width="2" class="transition-colors duration-200" />
        <line :x1="col.right" :y1="88 - 24" :x2="col.right" :y2="88 - 12"
          stroke="white" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <text :x="col.right" y="124" text-anchor="middle" fill="#E8DDE5" font-size="10" font-weight="600" font-family="Poppins, sans-serif">LENGTH</text>

      <!-- ========== ROW B: MODIFY(wet) — CLOCK — MODIFY(loop) ========== -->

      <!-- MODIFY wet (left) -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('wet-modify') }" @click="selectControl('wet-modify')">
        <circle :cx="col.left" cy="195" r="26"
          :fill="isSelected('wet-modify') ? '#D64B8A' : '#4A1942'"
          :stroke="isSelected('wet-modify') ? '#F2A7C3' : '#6B4063'"
          stroke-width="2" class="transition-colors duration-200" />
        <line :x1="col.left" :y1="195 - 24" :x2="col.left" :y2="195 - 12"
          stroke="white" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <text :x="col.left" y="231" text-anchor="middle" fill="#E8DDE5" font-size="10" font-weight="600" font-family="Poppins, sans-serif">MODIFY</text>

      <!-- CLOCK (center, large) -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('clock') }" @click="selectControl('clock')">
        <circle :cx="col.center" cy="195" r="30"
          :fill="isSelected('clock') ? '#D64B8A' : '#4A1942'"
          :stroke="isSelected('clock') ? '#F2A7C3' : '#6B4063'"
          stroke-width="2" class="transition-colors duration-200" />
        <line :x1="col.center" :y1="195 - 28" :x2="col.center" :y2="195 - 14"
          stroke="white" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <text :x="col.center" y="237" text-anchor="middle" fill="#E8DDE5" font-size="10" font-weight="600" font-family="Poppins, sans-serif">CLOCK</text>

      <!-- MODIFY loop (right) -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('loop-modify') }" @click="selectControl('loop-modify')">
        <circle :cx="col.right" cy="195" r="26"
          :fill="isSelected('loop-modify') ? '#D64B8A' : '#4A1942'"
          :stroke="isSelected('loop-modify') ? '#F2A7C3' : '#6B4063'"
          stroke-width="2" class="transition-colors duration-200" />
        <line :x1="col.right" :y1="195 - 24" :x2="col.right" :y2="195 - 12"
          stroke="white" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <text :x="col.right" y="231" text-anchor="middle" fill="#E8DDE5" font-size="10" font-weight="600" font-family="Poppins, sans-serif">MODIFY</text>

      <!-- ========== ROW C: Mode Toggles ========== -->

      <!-- Wet Mode toggle (left) — lever top, ball bottom -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('wet-mode') }" @click="selectControl('wet-mode')">
        <rect :x="col.left - 3" y="280" width="6" height="22" rx="3"
          :fill="isSelected('wet-mode') ? '#D64B8A' : '#C9A0BC'" :opacity="isSelected('wet-mode') ? 0.7 : 0.4" />
        <circle :cx="col.left" cy="302" r="7"
          :fill="isSelected('wet-mode') ? '#D64B8A' : '#E8DDE5'"
          :stroke="isSelected('wet-mode') ? '#F2A7C3' : '#C9A0BC'"
          stroke-width="1.5" class="transition-colors duration-200" />
      </g>
      <!-- Wet mode labels (angled, side by side like manual) -->
      <text :x="col.left - 12" y="316" text-anchor="end" font-size="10" font-family="Poppins, sans-serif"
        :fill="wetMode === 'reverb' ? '#F2A7C3' : '#E8DDE5'" :font-weight="wetMode === 'reverb' ? '700' : '400'" :opacity="wetMode === 'reverb' ? 1 : 0.5"
        :transform="`rotate(-70, ${col.left - 12}, 316)`">REVERB</text>
      <text :x="col.left" y="316" text-anchor="end" font-size="10" font-family="Poppins, sans-serif"
        :fill="wetMode === 'delay' ? '#F2A7C3' : '#E8DDE5'" :font-weight="wetMode === 'delay' ? '700' : '400'" :opacity="wetMode === 'delay' ? 1 : 0.5"
        :transform="`rotate(-70, ${col.left}, 316)`">DELAY</text>
      <text :x="col.left + 12" y="316" text-anchor="end" font-size="10" font-family="Poppins, sans-serif"
        :fill="wetMode === 'slip' ? '#F2A7C3' : '#E8DDE5'" :font-weight="wetMode === 'slip' ? '700' : '400'" :opacity="wetMode === 'slip' ? 1 : 0.5"
        :transform="`rotate(-70, ${col.left + 12}, 316)`">SLIP</text>

      <!-- ROUTING toggle (center) -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('routing') }" @click="selectControl('routing')">
        <rect :x="col.center - 3" y="280" width="6" height="22" rx="3"
          :fill="isSelected('routing') ? '#D64B8A' : '#C9A0BC'" :opacity="isSelected('routing') ? 0.7 : 0.4" />
        <circle :cx="col.center" cy="302" r="8"
          :fill="isSelected('routing') ? '#D64B8A' : '#E8DDE5'"
          :stroke="isSelected('routing') ? '#F2A7C3' : '#C9A0BC'"
          stroke-width="1.5" class="transition-colors duration-200" />
      </g>
      <text :x="col.center" y="326" text-anchor="middle" fill="#E8DDE5" font-size="9" font-weight="600" font-family="Poppins, sans-serif">ROUTING</text>

      <!-- Moon Mode toggle (right) -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('moon-mode') }" @click="selectControl('moon-mode')">
        <rect :x="col.right - 3" y="280" width="6" height="22" rx="3"
          :fill="isSelected('moon-mode') ? '#D64B8A' : '#C9A0BC'" :opacity="isSelected('moon-mode') ? 0.7 : 0.4" />
        <circle :cx="col.right" cy="302" r="7"
          :fill="isSelected('moon-mode') ? '#D64B8A' : '#E8DDE5'"
          :stroke="isSelected('moon-mode') ? '#F2A7C3' : '#C9A0BC'"
          stroke-width="1.5" class="transition-colors duration-200" />
      </g>
      <!-- Moon mode labels (angled, side by side like manual) -->
      <text :x="col.right - 12" y="316" text-anchor="end" font-size="10" font-family="Poppins, sans-serif"
        :fill="looperMode === 'env' ? '#F2A7C3' : '#E8DDE5'" :font-weight="looperMode === 'env' ? '700' : '400'" :opacity="looperMode === 'env' ? 1 : 0.5"
        :transform="`rotate(-70, ${col.right - 12}, 316)`">ENV</text>
      <text :x="col.right" y="316" text-anchor="end" font-size="10" font-family="Poppins, sans-serif"
        :fill="looperMode === 'tape' ? '#F2A7C3' : '#E8DDE5'" :font-weight="looperMode === 'tape' ? '700' : '400'" :opacity="looperMode === 'tape' ? 1 : 0.5"
        :transform="`rotate(-70, ${col.right}, 316)`">TAPE</text>
      <text :x="col.right + 12" y="316" text-anchor="end" font-size="10" font-family="Poppins, sans-serif"
        :fill="looperMode === 'stretch' ? '#F2A7C3' : '#E8DDE5'" :font-weight="looperMode === 'stretch' ? '700' : '400'" :opacity="looperMode === 'stretch' ? 1 : 0.5"
        :transform="`rotate(-70, ${col.right + 12}, 316)`">STRETCH</text>

      <!-- ========== LED Indicators ========== -->
      <!-- Left LED (starburst) -->
      <g :transform="`translate(${col.left}, 400)`" opacity="0.45">
        <circle r="5" fill="none" stroke="#C9A0BC" stroke-width="1" />
        <line v-for="a in [0, 45, 90, 135, 180, 225, 270, 315]" :key="'ll-' + a"
          :x1="Math.cos(a * Math.PI / 180) * 7"
          :y1="Math.sin(a * Math.PI / 180) * 7"
          :x2="Math.cos(a * Math.PI / 180) * 11"
          :y2="Math.sin(a * Math.PI / 180) * 11"
          stroke="#C9A0BC" stroke-width="0.8" />
      </g>
      <!-- Center LED (starburst, single) -->
      <g :transform="`translate(${col.center}, 400)`" opacity="0.45">
        <circle r="5" fill="none" stroke="#C9A0BC" stroke-width="1" />
        <line v-for="a in [0, 45, 90, 135, 180, 225, 270, 315]" :key="'cl-' + a"
          :x1="Math.cos(a * Math.PI / 180) * 7"
          :y1="Math.sin(a * Math.PI / 180) * 7"
          :x2="Math.cos(a * Math.PI / 180) * 11"
          :y2="Math.sin(a * Math.PI / 180) * 11"
          stroke="#C9A0BC" stroke-width="0.8" />
      </g>
      <!-- Right LED (starburst) -->
      <g :transform="`translate(${col.right}, 400)`" opacity="0.45">
        <circle r="5" fill="none" stroke="#C9A0BC" stroke-width="1" />
        <line v-for="a in [0, 45, 90, 135, 180, 225, 270, 315]" :key="'rl-' + a"
          :x1="Math.cos(a * Math.PI / 180) * 7"
          :y1="Math.sin(a * Math.PI / 180) * 7"
          :x2="Math.cos(a * Math.PI / 180) * 11"
          :y2="Math.sin(a * Math.PI / 180) * 11"
          stroke="#C9A0BC" stroke-width="0.8" />
      </g>

      <!-- ========== ROW D: BYPASS (wet) — PRESETS — BYPASS (moon) ========== -->

      <!-- Wet BYPASS footswitch (left) -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('wet-bypass') }" @click="selectControl('wet-bypass')">
        <circle :cx="col.left" cy="470" r="24"
          :fill="isSelected('wet-bypass') ? '#D64B8A' : '#4A1942'"
          :stroke="isSelected('wet-bypass') ? '#F2A7C3' : '#6B4063'"
          stroke-width="2" class="transition-colors duration-200" />
        <!-- Inner ring -->
        <circle :cx="col.left" cy="470" r="17" fill="none"
          :stroke="isSelected('wet-bypass') ? '#F2A7C3' : '#8B5E83'"
          stroke-width="1" opacity="0.5" />
      </g>
      <text :x="col.left" y="504" text-anchor="middle" fill="#E8DDE5" font-size="9" font-weight="600" font-family="Poppins, sans-serif">BYPASS</text>

      <!-- PRESETS toggle (center) -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('presets') }" @click="selectControl('presets')">
        <rect :x="col.center - 3" y="454" width="6" height="22" rx="3"
          :fill="isSelected('presets') ? '#D64B8A' : '#C9A0BC'" :opacity="isSelected('presets') ? 0.7 : 0.4" />
        <circle :cx="col.center" cy="476" r="8"
          :fill="isSelected('presets') ? '#D64B8A' : '#E8DDE5'"
          :stroke="isSelected('presets') ? '#F2A7C3' : '#C9A0BC'"
          stroke-width="1.5" class="transition-colors duration-200" />
      </g>
      <text :x="col.center" y="502" text-anchor="middle" fill="#E8DDE5" font-size="9" font-weight="600" font-family="Poppins, sans-serif">PRESETS</text>

      <!-- Moon BYPASS footswitch (right) -->
      <g class="cursor-pointer" :class="{ 'hotspot-glow': isSelected('moon-bypass') }" @click="selectControl('moon-bypass')">
        <circle :cx="col.right" cy="470" r="24"
          :fill="isSelected('moon-bypass') ? '#D64B8A' : '#4A1942'"
          :stroke="isSelected('moon-bypass') ? '#F2A7C3' : '#6B4063'"
          stroke-width="2" class="transition-colors duration-200" />
        <circle :cx="col.right" cy="470" r="17" fill="none"
          :stroke="isSelected('moon-bypass') ? '#F2A7C3' : '#8B5E83'"
          stroke-width="1" opacity="0.5" />
      </g>
      <text :x="col.right" y="504" text-anchor="middle" fill="#E8DDE5" font-size="9" font-weight="600" font-family="Poppins, sans-serif">BYPASS</text>

      <!-- Dip switch marks on edges -->
      <g opacity="0.2">
        <rect v-for="n in 8" :key="'dl-' + n" x="38" :y="160 + n * 40" width="3" height="10" rx="1" fill="#C9A0BC" />
        <rect v-for="n in 8" :key="'dr-' + n" x="289" :y="160 + n * 40" width="3" height="10" rx="1" fill="#C9A0BC" />
      </g>

      <!-- Channel labels at top -->
      <text :x="col.left" y="42" text-anchor="middle" fill="#C9A0BC" font-size="7" font-family="Poppins, sans-serif" opacity="0.6">WET</text>
      <text :x="col.center" y="42" text-anchor="middle" fill="#C9A0BC" font-size="7" font-family="Poppins, sans-serif" opacity="0.6">SHARED</text>
      <text :x="col.right" y="42" text-anchor="middle" fill="#C9A0BC" font-size="7" font-family="Poppins, sans-serif" opacity="0.6">MOON</text>
    </svg>
  </div>
</template>
