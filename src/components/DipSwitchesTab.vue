<script setup>
import { computed } from 'vue'
import { useMoodData } from '../composables/useMoodData'

const { data } = useMoodData()

const leftBank = computed(() => data.value?.dipSwitches?.leftBank || [])
const rightBank = computed(() => data.value?.dipSwitches?.rightBank || [])
</script>

<template>
  <div class="space-y-8">
    <h2 class="font-heading text-2xl text-white">Dip Switches</h2>

    <p class="text-slate-300">
      MOOD MKII has two banks of 8 dip switches on the back of the pedal.
      The left bank controls ramping/expression parameters. The right bank customizes pedal behavior.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Bank -->
      <section>
        <h3 class="font-heading text-lg text-accent-soft mb-4">Left Bank — Ramping / Expression</h3>
        <div class="space-y-3">
          <div
            v-for="sw in leftBank"
            :key="sw.id"
            class="bg-bg-card rounded-xl p-4 border border-white/10"
          >
            <div class="flex items-center gap-3 mb-2">
              <span class="text-xs bg-mauve/20 text-mauve px-2 py-0.5 rounded-full">{{ sw.position }}</span>
              <h4 class="font-medium text-white">{{ sw.name }}</h4>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div class="flex gap-2">
                <span class="text-accent-soft font-medium shrink-0">ON:</span>
                <span class="text-slate-300">{{ sw.onDescription }}</span>
              </div>
              <div class="flex gap-2">
                <span class="text-muted font-medium shrink-0">OFF:</span>
                <span class="text-slate-400">{{ sw.offDescription }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Bank -->
      <section>
        <h3 class="font-heading text-lg text-accent-soft mb-4">Right Bank — Customize</h3>
        <div class="space-y-3">
          <div
            v-for="sw in rightBank"
            :key="sw.id"
            class="bg-bg-card rounded-xl p-4 border border-white/10"
          >
            <div class="flex items-center gap-3 mb-2">
              <span class="text-xs bg-mauve/20 text-mauve px-2 py-0.5 rounded-full">{{ sw.position }}</span>
              <h4 class="font-medium text-white">{{ sw.name }}</h4>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div class="flex gap-2">
                <span class="text-accent-soft font-medium shrink-0">ON:</span>
                <span class="text-slate-300">{{ sw.onDescription }}</span>
              </div>
              <div class="flex gap-2">
                <span class="text-muted font-medium shrink-0">OFF:</span>
                <span class="text-slate-400">{{ sw.offDescription }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
