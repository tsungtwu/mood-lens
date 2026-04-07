import { ref } from 'vue'

const activeTab = ref('overview')
const wetMode = ref('reverb')
const looperMode = ref('env')
const selectedControlId = ref(null)

const TAB_HASH_MAP = {
  overview: '#overview',
  'wet-channel': '#wet-channel',
  'micro-looper': '#micro-looper',
  'hidden-options': '#hidden-options',
  'clock-routing': '#clock-routing',
  'dip-switches': '#dip-switches',
  midi: '#midi',
}

const HASH_TAB_MAP = Object.fromEntries(
  Object.entries(TAB_HASH_MAP).map(([k, v]) => [v, k])
)

export function usePedalState() {
  function setTab(tab) {
    activeTab.value = tab
    window.location.hash = TAB_HASH_MAP[tab] || ''
  }

  function hashToTab() {
    const hash = window.location.hash || '#overview'
    const tab = HASH_TAB_MAP[hash]
    if (tab) activeTab.value = tab
  }

  function setWetMode(mode) {
    wetMode.value = mode
  }

  function setLooperMode(mode) {
    looperMode.value = mode
  }

  function selectControl(id) {
    selectedControlId.value = id
  }

  function clearControl() {
    selectedControlId.value = null
  }

  return {
    activeTab,
    wetMode,
    looperMode,
    selectedControlId,
    setTab,
    hashToTab,
    setWetMode,
    setLooperMode,
    selectControl,
    clearControl,
  }
}
