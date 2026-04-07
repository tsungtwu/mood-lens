<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useMoodData } from './composables/useMoodData'
import { usePedalState } from './composables/usePedalState'
import TabNav from './components/TabNav.vue'
import PedalPanel from './components/PedalPanel.vue'
import InfoPanel from './components/InfoPanel.vue'
import ControlList from './components/ControlList.vue'
import ModeSelector from './components/ModeSelector.vue'
import WetChannelTab from './components/WetChannelTab.vue'
import MicroLooperTab from './components/MicroLooperTab.vue'
import HiddenOptionsTab from './components/HiddenOptionsTab.vue'
import ClockRoutingTab from './components/ClockRoutingTab.vue'
import DipSwitchesTab from './components/DipSwitchesTab.vue'
import MidiTab from './components/MidiTab.vue'

const { isLoaded, loadError, loadData } = useMoodData()
const { activeTab, setTab, hashToTab } = usePedalState()

onMounted(async () => {
  await loadData()
  hashToTab()
  window.addEventListener('hashchange', hashToTab)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', hashToTab)
})
</script>

<template>
  <!-- Header -->
  <header class="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between mb-4">
        <h1 class="font-heading text-2xl md:text-3xl text-white tracking-wide">MOOD Lens</h1>
        <a href="https://www.chasebliss.com/mood-mkii" target="_blank" rel="noopener" class="text-xs text-muted hover:text-accent-soft transition-colors">MOOD MKII</a>
      </div>
      <TabNav :active-tab="activeTab" @update:tab="setTab" />
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
    <!-- Loading -->
    <div v-if="!isLoaded && !loadError" class="text-center py-20">
      <p class="text-muted">Loading pedal data...</p>
    </div>

    <!-- Error -->
    <div v-else-if="loadError" class="text-center py-20">
      <p class="text-xl text-red-400 mb-2">{{ loadError }}</p>
    </div>

    <!-- Tabs -->
    <template v-else>
      <div v-if="activeTab === 'overview'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="hidden md:block">
          <PedalPanel />
        </div>
        <div class="block md:hidden">
          <ControlList />
        </div>
        <InfoPanel />
      </div>

      <WetChannelTab v-else-if="activeTab === 'wet-channel'" />
      <MicroLooperTab v-else-if="activeTab === 'micro-looper'" />
      <HiddenOptionsTab v-else-if="activeTab === 'hidden-options'" />
      <ClockRoutingTab v-else-if="activeTab === 'clock-routing'" />
      <DipSwitchesTab v-else-if="activeTab === 'dip-switches'" />
      <MidiTab v-else-if="activeTab === 'midi'" />
    </template>
  </main>

  <!-- Footer -->
  <footer class="border-t border-white/10 py-6 text-center text-xs text-muted/60">
    <p>
      MOOD Lens — Interactive reference for
      <a
        href="https://www.chasebliss.com/mood-mkii"
        target="_blank"
        rel="noopener"
        class="underline hover:text-muted transition-colors"
      >
        Chase Bliss MOOD MKII
      </a>
    </p>
    <p class="mt-1">Data sourced from MOOD MKII manual. Not affiliated with Chase Bliss Audio.</p>
  </footer>
</template>
