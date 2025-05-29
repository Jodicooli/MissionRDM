import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useRoadmapStore = defineStore('roadmap', () => {
  const { t } = useI18n()

  // Top-level steps (visible from start)
  const roadmapSteps = ref([
    { key: 'step1', label: '', items: [] },
    { key: 'step2', label: '', items: [] },
    { key: 'step3', label: '', items: [] },
    { key: 'step4', label: '', items: [] },
    { key: 'step5', label: '', items: [] },
    { key: 'step6', label: '', items: [] }
  ])

  // Flash notification state
  const shouldFlash = ref(false)

  // Define initial entries with their indentation levels
  const initialEntries = {
    step1: [
      { key: 'step1_1_A', level: 2, isNew: false },
      { key: 'step1_1_D', level: 2, isNew: false },
      { key: 'step1_1_H', level: 2, isNew: false },
      { key: 'step1_4', level: 1, isNew: false },
      { key: 'step1_5', level: 1, isNew: false }
    ],
    step4: [
      { key: 'step4_4', level: 1, isNew: false }
    ],
    step6: [
      { key: 'step6_2', level: 1, isNew: false }
    ]
  }

  // Function to sort entries by their key structure
  function sortEntries(entries) {
    return entries.sort((a, b) => {
      const keyA = a.key
      const keyB = b.key
      
      // Split keys into parts for comparison
      const partsA = keyA.split('_')
      const partsB = keyB.split('_')
      
      // Compare each part
      for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
        const partA = partsA[i] || ''
        const partB = partsB[i] || ''
        
        // If both parts are numbers, compare numerically
        if (!isNaN(partA) && !isNaN(partB)) {
          const numA = parseInt(partA)
          const numB = parseInt(partB)
          if (numA !== numB) return numA - numB
        }
        // If one is a letter (A-H) and other is number, letter comes after
        else if (partA.match(/^[A-H]$/) && !isNaN(partB)) {
          return 1
        }
        else if (partB.match(/^[A-H]$/) && !isNaN(partA)) {
          return -1
        }
        // If both are letters, compare alphabetically
        else if (partA.match(/^[A-H]$/) && partB.match(/^[A-H]$/)) {
          if (partA !== partB) return partA.localeCompare(partB)
        }
        // Default string comparison
        else {
          if (partA !== partB) return partA.localeCompare(partB)
        }
      }
      
      return 0
    })
  }

  // Set labels and initial entries on initialization
  function initializeSteps() {
    roadmapSteps.value.forEach(step => {
      step.label = t(`roadmap.${step.key}`)
      
      // Add initial entries for this step if they exist
      if (initialEntries[step.key]) {
        const entries = initialEntries[step.key].map(entry => ({
          text: t(`roadmap.${entry.key}`),
          level: entry.level,
          key: entry.key
        }))
        
        // Sort entries before adding them
        step.items = sortEntries(entries)
      }
    })
  }

  // Trigger flash notification
  function triggerFlash() {
    shouldFlash.value = true
    setTimeout(() => {
      shouldFlash.value = false
    }, 1500) 
  }

  // Add an entry to a step with automatic level detection and sorting
  function addEntry(stepKey, entryKey) {
    const step = roadmapSteps.value.find(s => s.key === stepKey)
    if (!step) return

    const label = t(`roadmap.${entryKey}`)
    const existingItem = step.items.find(item => item.key === entryKey)
    if (!existingItem) {
      // Automatically determine level based on entry key pattern
      let level = 0
      if (entryKey.includes('_')) {
        const parts = entryKey.split('_')
        level = parts.length - 1
        if (parts[parts.length - 1].match(/^[A-H]$/)) {
          level = 2
        }
      }
      
      step.items.push({
        text: label,
        level: level,
        key: entryKey,
        isNew: true  
      })
      
      // Sort items after adding
      step.items = sortEntries(step.items)
      
      // Trigger flash notification
      triggerFlash()
    }
  }

  // Reset all roadmap progress (keep structure but remove all items)
  function resetRoadmap() {
    roadmapSteps.value.forEach(step => {
      step.items = []
    })
    // Re-initialize with initial entries
    initializeSteps()
  }

  return {
    roadmapSteps,
    shouldFlash,
    initializeSteps,
    addEntry,
    resetRoadmap,
    triggerFlash
  }
})