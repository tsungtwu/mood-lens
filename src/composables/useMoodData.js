import { ref } from 'vue'

const data = ref(null)
const isLoaded = ref(false)
const loadError = ref(null)
let isLoading = false

export function useMoodData() {
  async function loadData() {
    if (isLoading || isLoaded.value) return
    isLoading = true
    loadError.value = null
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}data/mood.json`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = await res.json()
      isLoaded.value = true
    } catch (e) {
      loadError.value = 'Unable to load pedal data. Please refresh the page and try again.'
      console.error('Failed to load mood.json:', e)
    } finally {
      isLoading = false
    }
  }

  return { data, isLoaded, loadError, loadData }
}
