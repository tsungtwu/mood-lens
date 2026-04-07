<script setup>
import { computed } from 'vue'

const props = defineProps({
  control: { type: Object, required: true },
  activeMode: { type: String, required: true },
})

const description = computed(() => {
  if (props.control.modeDescriptions) {
    return props.control.modeDescriptions[props.activeMode] || ''
  }
  return props.control.description || ''
})
</script>

<template>
  <div class="bg-bg-card rounded-xl p-5 border border-white/10">
    <h4 class="font-heading text-lg text-white mb-2">{{ control.name }}</h4>
    <p class="text-slate-300 leading-relaxed mb-2">{{ description }}</p>
    <p v-if="control.range" class="text-sm text-muted">
      Range: <span class="text-accent-soft">{{ control.range }}</span>
    </p>
  </div>
</template>
