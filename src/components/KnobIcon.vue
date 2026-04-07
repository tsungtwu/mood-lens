<script setup>
import { computed } from 'vue'

const props = defineProps({
  position: { type: Number, required: true },
  size: { type: Number, default: 40 },
  label: { type: String, default: '' }
})

// Convert 0-100 position to angle in degrees
// 0 = 7 o'clock (-135°), 50 = noon (0°), 100 = 5 o'clock (135°)
const angle = computed(() => {
  return (props.position / 100) * 270 - 135
})

const r = computed(() => props.size / 2)
const indicatorLength = computed(() => r.value * 0.7)
</script>

<template>
  <div class="inline-flex flex-col items-center gap-1">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <!-- Outer ring -->
      <circle :cx="r" :cy="r" :r="r - 2" fill="#1a0a16" stroke="#8B5E83" stroke-width="1.5" />
      <!-- Inner circle -->
      <circle :cx="r" :cy="r" :r="r * 0.55" fill="#2D0D26" stroke="#C9A0BC" stroke-width="0.8" />
      <!-- Position indicator line -->
      <line
        :x1="r" :y1="r"
        :x2="r + indicatorLength * Math.sin(angle * Math.PI / 180)"
        :y2="r - indicatorLength * Math.cos(angle * Math.PI / 180)"
        stroke="#D64B8A" stroke-width="2" stroke-linecap="round"
      />
      <!-- Center dot -->
      <circle :cx="r" :cy="r" r="2" fill="#F2A7C3" />
    </svg>
    <span v-if="label" class="text-[10px] text-muted uppercase tracking-wider leading-none">{{ label }}</span>
  </div>
</template>
