<script setup>
import { computed } from 'vue'
import { useMoodData } from '../composables/useMoodData'
import { useMidi } from '../composables/useMidi'
import MidiCCTable from './MidiCCTable.vue'

const { data } = useMoodData()
const { midiSearch, setMidiSearch } = useMidi()

const synthMode = computed(() => data.value?.midi?.synthMode || null)
const steppedValues = computed(() => data.value?.midi?.steppedValues || {})
</script>

<template>
  <div class="space-y-8">
    <h2 class="font-heading text-2xl text-white">MIDI Reference</h2>

    <!-- Getting Started -->
    <div v-if="synthMode" class="bg-primary/30 rounded-xl p-5 border border-mauve/20">
      <h3 class="text-sm font-semibold text-mauve uppercase tracking-wider mb-3">Getting Started with MIDI</h3>
      <div class="space-y-2 text-sm text-slate-300">
        <p><span class="text-accent-soft font-medium">Connection:</span> {{ synthMode.gettingStarted.connection }}</p>
        <p><span class="text-accent-soft font-medium">Channel:</span> {{ synthMode.gettingStarted.channel }}</p>
      </div>
    </div>

    <!-- MIDI search -->
    <div class="relative">
      <input
        type="text"
        :value="midiSearch"
        placeholder="Search MIDI CCs..."
        aria-label="Search MIDI CC parameters"
        class="w-full pl-4 pr-4 py-2 bg-primary/50 border border-white/10 rounded-lg text-slate-100 placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors text-sm"
        @input="setMidiSearch($event.target.value)"
      />
    </div>

    <!-- CC Table -->
    <MidiCCTable />

    <!-- Stepped Values -->
    <section>
      <h3 class="font-heading text-xl text-white mb-4">Stepped Values Reference</h3>
      <p class="text-slate-300 text-sm mb-4">
        Some parameters use stepped (quantized) MIDI values instead of continuous 0–127 ranges.
      </p>

      <div class="space-y-6">
        <div v-for="(sv, key) in steppedValues" :key="key" class="bg-bg-card rounded-xl p-4 border border-white/10">
          <h4 class="font-medium text-white mb-1">{{ sv.name }}</h4>
          <p class="text-xs text-muted mb-3">CC {{ sv.cc }}</p>
          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead>
                <tr class="border-b border-white/10">
                  <th class="text-left py-1 px-2 text-muted font-medium">MIDI Range</th>
                  <th class="text-left py-1 px-2 text-muted font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="step in sv.steps" :key="step.midiRange" class="border-b border-white/5">
                  <td class="py-1 px-2 text-accent-soft font-mono">{{ step.midiRange }}</td>
                  <td class="py-1 px-2 text-slate-300">{{ step.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Synth Mode -->
    <section v-if="synthMode">
      <h3 class="font-heading text-xl text-white mb-4">Synth Mode</h3>
      <p class="text-slate-300 mb-4">{{ synthMode.overview }}</p>

      <div class="mb-4">
        <p class="text-sm text-muted mb-1">
          <span class="text-accent-soft font-medium">Enter:</span> {{ synthMode.gettingStarted.enterSynthMode }}
        </p>
      </div>

      <!-- Output Types -->
      <h4 class="text-sm font-semibold text-mauve uppercase tracking-wider mb-3">Output Types</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div v-for="ot in synthMode.outputTypes" :key="ot.name" class="bg-bg-card rounded-xl p-4 border border-white/10">
          <h5 class="font-medium text-white mb-1">{{ ot.name }}</h5>
          <p class="text-xs text-muted mb-2">CC58: {{ ot.cc58value }}</p>
          <p class="text-slate-300 text-sm">{{ ot.description }}</p>
        </div>
      </div>

      <!-- Synth CCs -->
      <h4 class="text-sm font-semibold text-mauve uppercase tracking-wider mb-3">Synth Mode CCs</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-white/10">
              <th class="text-left py-2 px-3 text-muted font-medium">CC#</th>
              <th class="text-left py-2 px-3 text-muted font-medium">Name</th>
              <th class="text-left py-2 px-3 text-muted font-medium">Range</th>
              <th class="text-left py-2 px-3 text-muted font-medium hidden sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cc in synthMode.cc" :key="cc.cc" class="border-b border-white/5 hover:bg-white/5">
              <td class="py-2 px-3 text-accent-soft font-mono font-medium">{{ cc.cc }}</td>
              <td class="py-2 px-3 text-white">{{ cc.name }}</td>
              <td class="py-2 px-3 text-slate-300 font-mono text-xs">{{ cc.range }}</td>
              <td class="py-2 px-3 text-slate-400 text-xs hidden sm:table-cell">{{ cc.notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
