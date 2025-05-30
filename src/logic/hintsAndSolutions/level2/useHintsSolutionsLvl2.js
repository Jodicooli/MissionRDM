import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGameInfo } from '@/store/gameInfo'

export function useHintsSolutionsLvl2() {
  const { t } = useI18n()
  const game = useGameInfo()

  // Determine current step based on your exact game logic
  const getCurrentStep = () => {
    const codes = game.enteredCodes


    // Step 1: (seventh hint) number 6 or 7 entered
    if (game.firstHintFound) {
      return 'seventh'
    }

    // Step 2: (sixth hint) code 36 entered
    if (codes.includes('36')) {
      return 'sixth'
    }

    // Step 3: (fifth hint) code 1 entered
    if (codes.includes('1')) {
      return 'fifth'
    }

    // Step 4: (fourth hint) code 31 entered
    if (codes.includes('31')) {
      return 'fourth'
    }

    // Step 5: (third hint) code 15 entered
    if (codes.includes('15') && !game.secondHintFound) {
      return 'third'
    }

    // Step 6: (second hint) found 9
    if (codes.includes('9')) {
      return 'second'
    }

    // Step 7: (first hint) no codes entered
    if (codes.length === 0) {
      return 'first'
    }

    // Default fallback
    return 'first'
  }

  // Get current hints
  const currentHint = computed(() => {
    const step = getCurrentStep()
    return t(`level2.hints.${step}`)
  })

  const currentSolution = computed(() => {
    const step = getCurrentStep()
    return t(`level2.solutions.${step}`)
  })

  const showClues = () => {
    game.showHints('clues')
  }

  const showSolutions = () => {
    game.showHints('solutions')
  }

  const closeHints = () => {
    game.closeHints()
  }

  return {
    currentHint,
    currentSolution,
    showClues,
    showSolutions,
    closeHints,
    showHintModal: computed(() => game.showHintModal),
    hintModalType: computed(() => game.hintModalType),
    getCurrentStep 
  }
}