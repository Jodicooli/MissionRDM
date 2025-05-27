<!-- src/components/ui/RoadmapButton.vue -->
<template>
  <button
    class="absolute top-2 right-2 bg-[#121212] hover:bg-[#1f1f1f] text-white px-4 py-2 
           rounded font-semibold shadow border border-gray-600 transition-all"
    @click="$emit('click')"
  >
    📜
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>
