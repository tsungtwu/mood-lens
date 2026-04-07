import { ref, computed } from 'vue'
import { useMoodData } from './useMoodData'

const midiSearch = ref('')
const activeCcCategory = ref('all')
const sortBy = ref('cc')

export function useMidi() {
  const { data } = useMoodData()

  const allCCs = computed(() => data.value?.midi?.cc || [])

  const categories = computed(() => {
    const cats = new Set(allCCs.value.map((c) => c.category))
    return ['all', ...Array.from(cats).sort()]
  })

  const filteredCCs = computed(() => {
    let result = allCCs.value

    if (activeCcCategory.value !== 'all') {
      result = result.filter((c) => c.category === activeCcCategory.value)
    }

    const query = midiSearch.value.toLowerCase()
    if (query) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          String(c.cc).includes(query) ||
          c.notes.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query)
      )
    }

    return [...result].sort((a, b) => {
      if (sortBy.value === 'cc') return a.cc - b.cc
      if (sortBy.value === 'name') return a.name.localeCompare(b.name)
      if (sortBy.value === 'category') return a.category.localeCompare(b.category)
      return 0
    })
  })

  function setMidiSearch(query) {
    midiSearch.value = query
  }

  function setCcCategory(cat) {
    activeCcCategory.value = cat
  }

  function setSortBy(field) {
    sortBy.value = field
  }

  return {
    midiSearch,
    activeCcCategory,
    sortBy,
    categories,
    filteredCCs,
    setMidiSearch,
    setCcCategory,
    setSortBy,
  }
}
