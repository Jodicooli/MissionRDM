<!-- src/components/ui/RoadmapButton.vue -->
<template>
  <button
    class="absolute top-2 right-2 px-4 py-2 rounded font-semibold shadow border border-gray-600 transition-all duration-300"
    :class="[
      shouldFlash 
        ? 'bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-400 animate-pulse' 
        : 'bg-[#121212] hover:bg-[#1f1f1f] text-white'
    ]"
    @click="$emit('click')"
  >
    📜
  </button>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoadmapStore } from '@/store/roadmap'

defineEmits(['click'])

const roadmapStore = useRoadmapStore()
const { shouldFlash } = storeToRefs(roadmapStore)
</script>