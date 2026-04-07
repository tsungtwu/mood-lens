<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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
const showVideoMenu = ref(false)

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
        <div class="flex items-center gap-2">
          <div class="relative flex items-center">
            <button
              class="text-muted hover:text-red-400 transition-colors cursor-pointer"
              aria-label="Video Manual"
              @click="showVideoMenu = !showVideoMenu"
              @blur="setTimeout(() => showVideoMenu = false, 150)"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </button>
            <div v-if="showVideoMenu" class="absolute right-0 top-8 bg-bg-card border border-white/10 rounded-lg shadow-lg py-1 whitespace-nowrap z-50">
              <a href="https://youtu.be/O87_xgGxJgI" target="_blank" rel="noopener" class="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">Video Manual Part 1</a>
              <a href="https://www.youtube.com/watch?v=9UzYim0o_Wo" target="_blank" rel="noopener" class="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">Video Manual Part 2</a>
            </div>
          </div>
          <a href="https://www.chasebliss.com/mood-mkii" target="_blank" rel="noopener" class="text-xs text-muted hover:text-accent-soft transition-colors">MOOD MKII</a>
        </div>
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
