import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameInfo } from '@/store/gameInfo'

export function useStartScreen() {
  const router = useRouter()
  const game = useGameInfo()
  const playerName = ref('')

  function startGame() {
    game.playerName = playerName.value.trim()
    router.push('/introduction')
  }

  function goToTutorial() {
    game.playerName = playerName.value.trim()
    router.push('/tutorial')
  }

  return { playerName, startGame, goToTutorial }
}
