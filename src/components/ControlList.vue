<script setup>
import { computed } from 'vue'
import { useMoodData } from '../composables/useMoodData'
import { usePedalState } from '../composables/usePedalState'

const { data } = useMoodData()
const { selectedControlId, selectControl } = usePedalState()

const groups = computed(() => {
  if (!data.value) return []
  return [
    { label: 'Shared Controls', controls: data.value.sharedControls },
    { label: 'Wet Channel', controls: data.value.wetChannel.controls },
    { label: 'Micro-Looper', controls: data.value.microLooper.controls },
  ]
})
</script>

<template>
  <div class="space-y-6">
    <div v-for="group in groups" :key="group.label">
      <h3 class="text-xs text-muted uppercase tracking-wider mb-2">{{ group.label }}</h3>
      <div class="space-y-2">
        <button
          v-for="control in group.controls"
          :key="control.id"
          class="w-full text-left px-4 py-3 rounded-lg border transition-colors cursor-pointer"
          :class="
            selectedControlId === control.id
              ? 'bg-accent/20 border-accent text-white'
              : 'bg-bg-card border-white/10 text-slate-300 hover:border-mauve'
          "
          @click="selectControl(control.id)"
        >
          <span class="font-medium">{{ control.name }}</span>
          <span v-if="control.range" class="text-xs text-muted ml-2">{{ control.range }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
