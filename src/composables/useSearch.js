import { ref } from 'vue'

const searchQuery = ref('')
let debounceTimer = null

export function useSearch() {
  function setSearch(query) {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      searchQuery.value = query
    }, 150)
  }

  function clearSearch() {
    clearTimeout(debounceTimer)
    searchQuery.value = ''
  }

  function matches(text) {
    if (!searchQuery.value) return true
    return text.toLowerCase().includes(searchQuery.value.toLowerCase())
  }

  return { searchQuery, setSearch, clearSearch, matches }
}
