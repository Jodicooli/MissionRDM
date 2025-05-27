import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const EN_STEPS = [
  { title: 'Step 1: Project design and planning', items: [], completed: false },
  { title: 'Step 2: Data collection/creation', items: [], completed: false },
  { title: 'Step 3: Data processing and analysis', items: [], completed: false },
  { title: 'Step 4: Data preservation and archiving', items: [], completed: false },
  { title: 'Step 5: Data sharing', items: [], completed: false },
  { title: 'Step 6: Data reuse', items: [], completed: false }
]

const FR_STEPS = [
  { title: 'Étape 1 : Elaboration et planification du projet', items: [], completed: false },
  { title: 'Étape 2 : Collecte/création des données', items: [], completed: false },
  { title: 'Étape 3 : Traitement et analyse des données', items: [], completed: false },
  { title: 'Étape 4 : Préservation et archivage des données', items: [], completed: false },
  { title: 'Étape 5 : Partage des données', items: [], completed: false },
  { title: 'Étape 6 : Réutilisation des données', items: [], completed: false }
]

export const useRoadmapStore = defineStore('roadmap', () => {
  const steps = ref([])

  // -- Load initial language version or from localStorage
  function initialize(lang = 'en') {
    const saved = localStorage.getItem(`roadmap-${lang}`)
    if (saved) {
      steps.value = JSON.parse(saved)
    } else {
      steps.value = lang === 'fr' ? FR_STEPS : EN_STEPS
    }
  }

  function addItemToStep(stepIndex, item) {
    if (steps.value[stepIndex] && !steps.value[stepIndex].items.includes(item)) {
      steps.value[stepIndex].items.push(item)
    }
  }

  function markStepCompleted(index) {
    if (steps.value[index]) {
      steps.value[index].completed = true
    }
  }

  function resetRoadmap(lang = 'en') {
    steps.value = lang === 'fr' ? FR_STEPS : EN_STEPS
  }

  // -- Persist changes
  watch(steps, (newSteps) => {
    const langKey = steps.value[0]?.title.startsWith('Étape') ? 'fr' : 'en'
    localStorage.setItem(`roadmap-${langKey}`, JSON.stringify(newSteps))
  }, { deep: true })

  return {
    steps,
    initialize,
    addItemToStep,
    markStepCompleted,
    resetRoadmap
  }
})
