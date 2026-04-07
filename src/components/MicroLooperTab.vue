<script setup>
import { computed } from 'vue'
import { useMoodData } from '../composables/useMoodData'
import { usePedalState } from '../composables/usePedalState'
import ModeSelector from './ModeSelector.vue'
import ControlCard from './ControlCard.vue'
import TipBlock from './TipBlock.vue'
import KnobIcon from './KnobIcon.vue'

const { data } = useMoodData()
const { looperMode, setLooperMode } = usePedalState()

const looper = computed(() => data.value?.microLooper || null)
const modeDetail = computed(() => looper.value?.modeDetails?.[looperMode.value] || null)
const controls = computed(() => looper.value?.controls || [])
const overdubInfo = computed(() => looper.value?.overdubInfo || null)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <h2 class="font-heading text-2xl text-white">Micro-Looper</h2>
      <ModeSelector
        :modes="['env', 'tape', 'stretch']"
        :active-mode="looperMode"
        label="Micro-looper mode"
        @update:active-mode="setLooperMode"
      />
    </div>

    <!-- Channel overview -->
    <div v-if="looper?.channelOverview" class="text-slate-400 text-sm leading-relaxed">
      {{ looper.channelOverview }}
    </div>

    <!-- Mode overview -->
    <div v-if="modeDetail" class="bg-bg-card rounded-xl p-5 border border-white/10">
      <h3 class="font-heading text-lg text-white mb-2 capitalize">{{ looperMode }} Mode</h3>
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
          :active-mode="looperMode"
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

    <!-- Tape Speed Reference -->
    <div v-if="modeDetail?.speedReference" class="bg-bg-card rounded-xl p-5 border border-white/10">
      <h3 class="text-sm font-semibold text-muted uppercase tracking-wider mb-3">MODIFY Speed Reference</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-white/10">
              <th class="text-left py-2 px-3 text-muted font-medium">Knob Position</th>
              <th class="text-left py-2 px-3 text-muted font-medium">Speed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ref in modeDetail.speedReference" :key="ref.position" class="border-b border-white/5">
              <td class="py-2 px-3 text-accent-soft">{{ ref.position }}</td>
              <td class="py-2 px-3 text-slate-300">{{ ref.speed }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Freeze / Overdub behavior per mode -->
    <div v-if="modeDetail?.freezeBehavior" class="bg-primary/30 rounded-xl p-5 border border-mauve/20">
      <h3 class="text-sm font-semibold text-mauve uppercase tracking-wider mb-2">Overdub Behavior</h3>
      <p class="text-slate-300 leading-relaxed">{{ modeDetail.freezeBehavior }}</p>
    </div>

    <!-- Overdub info (shared across Tape/Stretch) -->
    <div v-if="overdubInfo && (looperMode === 'tape' || looperMode === 'stretch')" class="bg-bg-card rounded-xl p-5 border border-white/10">
      <h3 class="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Overdub Details</h3>
      <p class="text-slate-300 leading-relaxed mb-3">{{ overdubInfo.description }}</p>
      <ul v-if="overdubInfo.details" class="space-y-1.5 mb-4">
        <li v-for="(detail, i) in overdubInfo.details" :key="i" class="text-slate-400 text-sm flex gap-2">
          <span class="text-mauve shrink-0">•</span>
          <span>{{ detail }}</span>
        </li>
      </ul>
      <TipBlock :tips="overdubInfo.tips" title="Overdub tips" />
    </div>

    <!-- Footswitch info -->
    <div v-if="looper?.footswitch" class="bg-bg-card rounded-xl p-5 border border-white/10">
      <h3 class="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Footswitch</h3>
      <div class="space-y-2 text-sm">
        <div class="flex gap-2">
          <span class="text-accent font-semibold shrink-0">TAP</span>
          <span class="text-slate-300">{{ looper.footswitch.tap }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-accent font-semibold shrink-0">HOLD</span>
          <span class="text-slate-300">{{ looper.footswitch.hold }}</span>
        </div>
      </div>
    </div>

    <!-- CLOCK interaction -->
    <div v-if="looper?.clockInteraction" class="bg-bg-card rounded-xl p-5 border border-white/10">
      <h3 class="text-sm font-semibold text-muted uppercase tracking-wider mb-2">CLOCK Interaction</h3>
      <p class="text-slate-300 text-sm leading-relaxed">{{ looper.clockInteraction }}</p>
    </div>

    <!-- Signal flow -->
    <div v-if="looper?.signalFlow" class="bg-bg-card rounded-xl p-4 border border-white/10">
      <h3 class="text-sm font-semibold text-muted uppercase tracking-wider mb-2">Signal Flow</h3>
      <p class="text-accent-soft text-sm font-mono">{{ looper.signalFlow }}</p>
    </div>

    <!-- Tips -->
    <TipBlock v-if="modeDetail?.tips" :tips="modeDetail.tips" />
  </div>
</template>
