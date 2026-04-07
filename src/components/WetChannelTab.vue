<script setup>
import { computed } from 'vue'
import { useMoodData } from '../composables/useMoodData'
import { usePedalState } from '../composables/usePedalState'
import ModeSelector from './ModeSelector.vue'
import ControlCard from './ControlCard.vue'
import TipBlock from './TipBlock.vue'
import KnobIcon from './KnobIcon.vue'

const { data } = useMoodData()
const { wetMode, setWetMode } = usePedalState()

const wet = computed(() => data.value?.wetChannel || null)
const modeDetail = computed(() => wet.value?.modeDetails?.[wetMode.value] || null)
const controls = computed(() => wet.value?.controls || [])
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <h2 class="font-heading text-2xl text-white">Wet Channel</h2>
      <ModeSelector
        :modes="['reverb', 'delay', 'slip']"
        :active-mode="wetMode"
        label="Wet channel mode"
        @update:active-mode="setWetMode"
      />
    </div>

    <!-- Channel overview -->
    <div v-if="wet?.channelOverview" class="text-slate-400 text-sm leading-relaxed">
      {{ wet.channelOverview }}
    </div>

    <!-- Mode overview -->
    <div v-if="modeDetail" class="bg-bg-card rounded-xl p-5 border border-white/10">
      <h3 class="font-heading text-lg text-white mb-2 capitalize">{{ wetMode }} Mode</h3>
      <p class="text-slate-300 leading-relaxed">{{ modeDetail.overview }}</p>
    </div>

    <!-- How it works -->
    <div v-if="modeDetail?.howItWorks" class="bg-bg-card rounded-xl p-5 border border-white/10">
      <h3 class="text-sm font-semibold text-accent-soft uppercase tracking-wider mb-2">How It Works</h3>
      <p class="text-slate-300 leading-relaxed">{{ modeDetail.howItWorks }}</p>
    </div>

    <!-- Controls -->
    <div>
      <h3 class="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Controls</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ControlCard
          v-for="control in controls"
          :key="control.id"
          :control="control"
          :active-mode="wetMode"
        />
      </div>
    </div>

    <!-- Key Settings -->
    <div v-if="modeDetail?.keySettings">
      <h3 class="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Key Settings</h3>
      <div class="space-y-3">
        <div v-for="ks in modeDetail.keySettings" :key="ks.name" class="bg-bg-card rounded-xl p-4 border border-white/10">
          <h4 class="font-medium text-white mb-1">{{ ks.name }}</h4>
          <p class="text-slate-300 text-sm mb-3">{{ ks.description }}</p>
          <div class="flex flex-wrap gap-5">
            <KnobIcon
              v-for="knob in ks.knobs"
              :key="knob.name"
              :position="knob.position"
              :label="knob.name"
              :size="40"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Freeze behavior -->
    <div v-if="modeDetail?.freezeBehavior" class="bg-primary/30 rounded-xl p-5 border border-mauve/20">
      <h3 class="text-sm font-semibold text-mauve uppercase tracking-wider mb-2">Freeze Behavior</h3>
      <p class="text-slate-300 leading-relaxed">{{ modeDetail.freezeBehavior }}</p>
    </div>

    <!-- Footswitch info -->
    <div v-if="wet?.footswitch" class="bg-bg-card rounded-xl p-5 border border-white/10">
      <h3 class="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Footswitch</h3>
      <div class="space-y-2 text-sm">
        <div class="flex gap-2">
          <span class="text-accent font-semibold shrink-0">TAP</span>
          <span class="text-slate-300">{{ wet.footswitch.tap }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-accent font-semibold shrink-0">HOLD</span>
          <span class="text-slate-300">{{ wet.footswitch.hold }}</span>
        </div>
      </div>
    </div>

    <!-- CLOCK interaction -->
    <div v-if="wet?.clockInteraction" class="bg-bg-card rounded-xl p-5 border border-white/10">
      <h3 class="text-sm font-semibold text-muted uppercase tracking-wider mb-2">CLOCK Interaction</h3>
      <p class="text-slate-300 text-sm leading-relaxed">{{ wet.clockInteraction }}</p>
    </div>

    <!-- Signal flow -->
    <div v-if="wet?.signalFlow" class="bg-bg-card rounded-xl p-4 border border-white/10">
      <h3 class="text-sm font-semibold text-muted uppercase tracking-wider mb-2">Signal Flow</h3>
      <p class="text-accent-soft text-sm font-mono">{{ wet.signalFlow }}</p>
    </div>

    <!-- Tips -->
    <TipBlock v-if="modeDetail?.tips" :tips="modeDetail.tips" />
  </div>
</template>
