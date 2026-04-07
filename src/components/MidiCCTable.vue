<script setup>
import { useMidi } from '../composables/useMidi'

const { filteredCCs, categories, activeCcCategory, sortBy, setCcCategory, setSortBy } = useMidi()

function cycleSortBy() {
  const fields = ['cc', 'name', 'category']
  const idx = fields.indexOf(sortBy.value)
  setSortBy(fields[(idx + 1) % fields.length])
}
</script>

<template>
  <div class="space-y-4">
    <!-- Category filter pills -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat"
        class="px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors cursor-pointer"
        :class="
          activeCcCategory === cat
            ? 'bg-accent text-white'
            : 'bg-white/5 text-muted hover:text-white hover:bg-white/10'
        "
        @click="setCcCategory(cat)"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-white/10">
            <th
              class="text-left py-2 px-3 text-muted font-medium cursor-pointer hover:text-white"
              @click="setSortBy('cc')"
            >
              CC# {{ sortBy === 'cc' ? '▾' : '' }}
            </th>
            <th
              class="text-left py-2 px-3 text-muted font-medium cursor-pointer hover:text-white"
              @click="setSortBy('name')"
            >
              Name {{ sortBy === 'name' ? '▾' : '' }}
            </th>
            <th
              class="text-left py-2 px-3 text-muted font-medium cursor-pointer hover:text-white hidden sm:table-cell"
              @click="setSortBy('category')"
            >
              Category {{ sortBy === 'category' ? '▾' : '' }}
            </th>
            <th class="text-left py-2 px-3 text-muted font-medium">Range</th>
            <th class="text-left py-2 px-3 text-muted font-medium hidden md:table-cell">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cc in filteredCCs"
            :key="cc.cc + cc.name"
            class="border-b border-white/5 hover:bg-white/5"
          >
            <td class="py-2 px-3 text-accent-soft font-mono font-medium">{{ cc.cc }}</td>
            <td class="py-2 px-3 text-white">{{ cc.name }}</td>
            <td class="py-2 px-3 text-muted capitalize hidden sm:table-cell">{{ cc.category }}</td>
            <td class="py-2 px-3 text-slate-300 font-mono text-xs">{{ cc.range }}</td>
            <td class="py-2 px-3 text-slate-400 text-xs hidden md:table-cell">{{ cc.notes }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="!filteredCCs.length" class="text-center text-muted py-4">No matching MIDI CCs</p>
    <p class="text-xs text-muted">{{ filteredCCs.length }} parameter{{ filteredCCs.length !== 1 ? 's' : '' }}</p>
  </div>
</template>
