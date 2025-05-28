import { useRoute } from 'vue-router'
import { useGameLogicLvl1 } from '@/logic/level1/gameLogicLvl1.js'

export function useGameLogic(setFeedback) {
  const route = useRoute()

  if (route.path.includes('/level/1')) {
    return useGameLogicLvl1(setFeedback)
  }

  // Add more logic routes here as needed
  return {
    handleCodeInput: () => {
      setFeedback('error', 'No logic defined for this level.')
    }
  }
}
