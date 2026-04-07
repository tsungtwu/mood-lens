<script setup>
defineProps({
  activeTab: { type: String, required: true },
})

const emit = defineEmits(['update:tab'])

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'wet-channel', label: 'Wet Channel' },
  { id: 'micro-looper', label: 'Micro-Looper' },
  { id: 'hidden-options', label: 'Hidden Options' },
  { id: 'clock-routing', label: 'Clock & Routing' },
  { id: 'dip-switches', label: 'Dip Switches' },
  { id: 'midi', label: 'MIDI' },
]
</script>

<template>
  <nav aria-label="Main navigation" class="overflow-x-auto scrollbar-hide">
    <div class="flex gap-1 min-w-max">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :aria-current="activeTab === tab.id ? 'page' : undefined"
        class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
        :class="
          activeTab === tab.id
            ? 'bg-accent text-white'
            : 'text-muted hover:text-white hover:bg-white/5'
        "
        @click="emit('update:tab', tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>
  </nav>
</template>
