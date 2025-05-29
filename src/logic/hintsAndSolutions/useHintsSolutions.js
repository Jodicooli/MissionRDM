import { useGameInfo } from '@/store/gameInfo'
import { useHintsSolutionsLvl1 } from '@/logic/hintsAndSolutions/useHintsSolutionsLvl1.js'

export function useHintsSolutions() {
    const game = useGameInfo()
    
    // Determine current step based on your exact game logic and pass it to the composable of the corresponding level
    if (game.getLvl() === 1) {
        return useHintsSolutionsLvl1()
    }

    if (game.getLvl() === 2) {
        console.log('Hints and solutions for level 2 are not implemented yet.')
        return {
            currentHint: () => 'Hints and solutions for level 2 are not implemented yet.',
            currentSolution: () => 'Solutions for level 2 are not implemented yet.'
        }
    }

}