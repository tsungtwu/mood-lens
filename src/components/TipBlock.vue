<script setup>
defineProps({
  tips: { type: Array, required: true },
  title: { type: String, default: 'Try this' },
})
</script>

<template>
  <div v-if="tips.length" class="bg-accent/10 border border-accent/30 rounded-xl p-5">
    <h4 class="text-sm font-semibold text-accent-soft uppercase tracking-wider mb-3">{{ title }}</h4>
    <ul class="space-y-2">
      <li v-for="(tip, i) in tips" :key="i" class="text-slate-300 text-sm leading-relaxed flex gap-2">
        <span class="text-accent shrink-0">•</span>
        <span>{{ tip }}</span>
      </li>
    </ul>
  </div>
</template>
