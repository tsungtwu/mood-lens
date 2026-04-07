<script setup>
import { computed } from 'vue'
import { useMoodData } from '../composables/useMoodData'

const { data } = useMoodData()

const clockSteps = computed(() => data.value?.clock?.steps || [])
const channelEffects = computed(() => data.value?.clock?.channelEffects || {})
const routingPositions = computed(() => data.value?.routing?.positions || [])
</script>

<template>
  <div class="space-y-8">
    <!-- Clock Section -->
    <section>
      <h2 class="font-heading text-2xl text-white mb-4">Clock (Sample Rate)</h2>

      <p class="text-slate-300 mb-4">
        The CLOCK knob controls the sample rate of the entire pedal, affecting both channels simultaneously.
        Lower sample rates produce lo-fi, degraded textures; higher rates yield cleaner, more transparent sound.
      </p>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-white/10">
              <th class="text-left py-2 px-3 text-muted font-medium">Rate</th>
              <th class="text-left py-2 px-3 text-muted font-medium">Hz</th>
              <th class="text-left py-2 px-3 text-muted font-medium">Quality</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="step in clockSteps" :key="step.value" class="border-b border-white/5 hover:bg-white/5">
              <td class="py-2 px-3 text-accent-soft font-medium">{{ step.value }}</td>
              <td class="py-2 px-3 text-slate-300">{{ step.hz.toLocaleString() }}</td>
              <td class="py-2 px-3 text-slate-300">{{ step.quality }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div class="bg-bg-card rounded-xl p-4 border border-white/10">
          <h4 class="text-sm font-semibold text-mauve uppercase tracking-wider mb-1">Wet Channel Effect</h4>
          <p class="text-slate-300 text-sm">{{ channelEffects.wetChannel }}</p>
        </div>
        <div class="bg-bg-card rounded-xl p-4 border border-white/10">
          <h4 class="text-sm font-semibold text-mauve uppercase tracking-wider mb-1">Micro-Looper Effect</h4>
          <p class="text-slate-300 text-sm">{{ channelEffects.microLooper }}</p>
        </div>
      </div>
    </section>

    <!-- Routing Section -->
    <section>
      <h2 class="font-heading text-2xl text-white mb-4">Routing</h2>

      <p class="text-slate-300 mb-4">
        The ROUTING toggle determines how the two channels interact — whether they process independently or feed into each other.
      </p>

      <div class="space-y-4">
        <div
          v-for="pos in routingPositions"
          :key="pos.value"
          class="bg-bg-card rounded-xl p-5 border border-white/10"
        >
          <h3 class="font-heading text-lg text-white mb-2">{{ pos.label }}</h3>
          <p class="text-slate-300 leading-relaxed">{{ pos.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
