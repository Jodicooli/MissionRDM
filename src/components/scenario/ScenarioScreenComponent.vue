<template>
  <div
    class="relative w-full max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] mx-auto 
           bg-[#1f1f1f] rounded-lg overflow-hidden shadow-lg 
           flex items-center justify-center"
  >
    <!-- Roadmap Button -->
    <RoadmapButton @click="showRoadmap = true" />

    <!-- Roadmap Modal -->
    <RoadmapModal :visible="showRoadmap" :steps="roadmap.steps" @close="showRoadmap = false" />

    <!-- Overlay Notes -->
    <div
      v-for="note in game.overlayNotes"
      :key="note.id"
      class="absolute top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <!-- TEXT Overlay -->
      <div
        v-if="note.type === 'text'"
        class="relative bg-yellow-200 text-black px-4 py-2 rounded shadow font-semibold text-lg max-w-xl"
      >
        <button
          class="absolute top-1 right-1 text-black hover:text-red-600 text-lg font-bold"
          @click="game.removeOverlay(note.id)"
        >
          &times;
        </button>
        {{ note.text }}
      </div>

      <!-- IMAGE Overlay -->
      <div v-else-if="note.type === 'image'" class="relative max-w-3xl">
        <button
          class="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 p-1 rounded-full z-10"
          @click="game.removeOverlay(note.id)"
        >
          &times;
        </button>
        <img
          :src="note.src"
          :alt="note.alt || 'Hint'"
          class="w-full h-auto object-contain rounded-lg shadow-2xl border-4 border-amber-400"
        />
      </div>
    </div>

    <!-- Main Scenario Image -->
    <img
      :src="imageSrc"
      alt="Scenario"
      class="max-h-[80vh] w-auto object-contain"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import RoadmapButton from '@/components/roadmap/RoadmapButtonComponent.vue'
import RoadmapModal from '@/components/roadmap/RoadmapModalComponent.vue'
import { useRoadmapStore } from '@/store/roadmap'
import { useI18n } from 'vue-i18n'
import { useGameInfo } from '@/store/gameInfo'

const game = useGameInfo()

const roadmap = useRoadmapStore()
const { locale } = useI18n()
const showRoadmap = ref(false)

defineProps({
  imageSrc: String
})

onMounted(() => {
  roadmap.initialize(locale.value)
})
</script>
