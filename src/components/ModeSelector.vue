<script setup>
defineProps({
  modes: { type: Array, required: true },
  activeMode: { type: String, required: true },
  label: { type: String, default: '' },
})

const emit = defineEmits(['update:activeMode'])
</script>

<template>
  <div class="flex items-center gap-2" role="radiogroup" :aria-label="label || 'Mode selector'">
    <button
      v-for="mode in modes"
      :key="mode"
      role="radio"
      :aria-checked="activeMode === mode"
      class="px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors cursor-pointer"
      :class="
        activeMode === mode
          ? 'bg-accent text-white'
          : 'bg-white/5 text-muted hover:text-white hover:bg-white/10'
      "
      @click="emit('update:activeMode', mode)"
    >
      {{ mode }}
    </button>
  </div>
</template>
