import { useGameInfo } from '@/store/gameInfo'
<<<<<<< Updated upstream:src/composables/hintsAndSolutions/useHintsSolutions.js
import { useHintsSolutionsLvl1 } from '@/composables/hintsAndSolutions/useHintsSolutionsLvl1.js'
=======
import { useRoute } from 'vue-router'
import { useHintsSolutionsLvl1 } from '@/logic/hintsAndSolutions/level1/useHintsSolutionsLvl1.js'
import { useHintsSolutionsLvl12 } from '@/logic/hintsAndSolutions/level2/useHintsSolutionsLvl12.js'
>>>>>>> Stashed changes:src/logic/hintsAndSolutions/useHintsSolutions.js

export function useHintsSolutions() {
    const game = useGameInfo()
    const route = useRoute()
    // Determine current step based on your exact game logic and pass it to the composable of the corresponding level
    if (route.path.includes('/level/1')) {
        return useHintsSolutionsLvl1()
    }
    if (route.path.includes('/level/2')) {
        return useHintsSolutionsLvl12()
    }
    if (game.getLvl() === 3) {
        console.log('Hints and solutions for level 3 are not implemented yet.')
        return {
            currentHint: () => 'Hints and solutions for level 3 are not implemented yet.',
            currentSolution: () => 'Solutions for level 3 are not implemented yet.'
        }
    }

}