<script setup>
import { computed } from 'vue'
import { useMoodData } from '../composables/useMoodData'
import { usePedalState } from '../composables/usePedalState'

const { data } = useMoodData()
const { selectedControlId, wetMode, looperMode, clearControl } = usePedalState()

const selectedControl = computed(() => {
  if (!data.value || !selectedControlId.value) return null
  const id = selectedControlId.value
  const all = [
    ...data.value.sharedControls,
    ...data.value.wetChannel.controls,
    ...data.value.microLooper.controls,
  ]
  return all.find((c) => c.id === id) || null
})

const description = computed(() => {
  const ctrl = selectedControl.value
  if (!ctrl) return ''
  if (ctrl.modeDescriptions) {
    const mode = ctrl.channel === 'wet' ? wetMode.value : looperMode.value
    return ctrl.modeDescriptions[mode] || ctrl.description || ''
  }
  return ctrl.description || ''
})

const channelLabel = computed(() => {
  const ctrl = selectedControl.value
  if (!ctrl) return ''
  if (ctrl.channel === 'shared') return 'Shared'
  if (ctrl.channel === 'wet') return 'Wet Channel'
  if (ctrl.channel === 'loop') return 'Micro-Looper'
  return ''
})

const activeMode = computed(() => {
  const ctrl = selectedControl.value
  if (!ctrl || !ctrl.modeDescriptions) return ''
  return ctrl.channel === 'wet' ? wetMode.value : looperMode.value
})

// All mode descriptions for knobs that change per mode
const allModeDescriptions = computed(() => {
  const ctrl = selectedControl.value
  if (!ctrl || !ctrl.modeDescriptions) return null
  return ctrl.modeDescriptions
})
</script>

<template>
  <div class="bg-bg-card rounded-xl p-6 border border-white/10">
    <template v-if="selectedControl">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="font-heading text-xl text-white">{{ selectedControl.name }}</h3>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent-soft">{{ channelLabel }}</span>
            <span v-if="activeMode" class="text-xs px-2 py-0.5 rounded-full bg-mauve/20 text-mauve capitalize">{{ activeMode }}</span>
          </div>
        </div>
        <button
          class="text-muted hover:text-white transition-colors cursor-pointer"
          aria-label="Close info panel"
          @click="clearControl"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Main description -->
      <p class="text-slate-300 leading-relaxed mb-3">{{ description }}</p>

      <!-- Mode-specific descriptions for knobs that change per mode -->
      <div v-if="allModeDescriptions" class="mt-4 space-y-2">
        <p class="text-xs text-muted uppercase tracking-wider font-medium">Per-mode function</p>
        <div v-for="(desc, mode) in allModeDescriptions" :key="mode"
          class="flex gap-2 text-sm"
          :class="mode === activeMode ? 'text-accent-soft font-medium' : 'text-slate-400'"
        >
          <span class="capitalize shrink-0 w-16">{{ mode }}</span>
          <span>{{ desc }}</span>
        </div>
      </div>

      <!-- Range / positions -->
      <p v-if="selectedControl.range" class="text-sm text-muted mt-3">
        Range: <span class="text-accent-soft">{{ selectedControl.range }}</span>
      </p>

      <!-- Toggle positions (routing, presets) -->
      <div v-if="selectedControl.positions" class="mt-4 space-y-2">
        <div v-for="pos in selectedControl.positions" :key="pos.value"
          class="text-sm flex gap-2"
        >
          <span class="text-accent-soft font-medium shrink-0 w-20">{{ pos.label }}</span>
          <span class="text-slate-300">{{ pos.description }}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="text-center py-8 text-muted">
        <p class="text-lg mb-1">Click any control to explore</p>
        <p class="text-sm">Select a knob, toggle, or footswitch on the pedal to see its description</p>
      </div>
    </template>
  </div>
</template>
