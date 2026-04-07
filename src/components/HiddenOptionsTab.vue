<script setup>
import { computed } from 'vue'
import { useMoodData } from '../composables/useMoodData'
import { useSearch } from '../composables/useSearch'

const { data } = useMoodData()
const { matches } = useSearch()

const hiddenOptions = computed(() => {
  if (!data.value) return []
  return data.value.hiddenOptions.filter(
    (opt) => matches(opt.name) || matches(opt.description) || matches(opt.controlledBy)
  )
})
</script>

<template>
  <div class="space-y-6">
    <h2 class="font-heading text-2xl text-white">Hidden Options</h2>

    <div class="bg-primary/30 rounded-xl p-5 border border-mauve/20">
      <h3 class="text-sm font-semibold text-mauve uppercase tracking-wider mb-2">How to Access</h3>
      <p class="text-slate-300 text-sm leading-relaxed">
        Hold the left footswitch and turn the corresponding knob to adjust hidden options.
        Values are saved per preset.
      </p>
    </div>

    <div class="space-y-4">
      <div
        v-for="opt in hiddenOptions"
        :key="opt.id"
        class="bg-bg-card rounded-xl p-5 border border-white/10"
      >
        <div class="flex items-start justify-between flex-wrap gap-2 mb-2">
          <h3 class="font-heading text-lg text-white">{{ opt.name }}</h3>
          <span class="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent-soft">{{ opt.controlledBy }}</span>
        </div>
        <p class="text-slate-300 leading-relaxed mb-2">{{ opt.description }}</p>
        <p class="text-sm text-muted">Direction: <span class="text-accent-soft">{{ opt.direction }}</span></p>
      </div>
    </div>

    <p v-if="!hiddenOptions.length" class="text-center text-muted py-8">No matching hidden options</p>
  </div>
</template>
