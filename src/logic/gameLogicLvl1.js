import { useGameInfo } from '@/store/gameInfo'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import hintImageEN from '@/assets/postits/en/hint1.png'
import hintImageFR from '@/assets/postits/fr/hint1.png'
import hintImageEN2 from '@/assets/postits/en/hint2.png'
import hintImageFR2 from '@/assets/postits/fr/hint2.png'
import char1 from '@/assets/characters/char1.png'

export function useGameLogicLvl1(setFeedback) {
  const game = useGameInfo()
  const { t, locale } = useI18n()
  const router = useRouter()

  function handleCodeInput(code) {
    const hintCode = '8'
    const countCode = '4'
    const hintCode2 = '29'
    const finalCode = '21'
    const lastCode = '26'
    const finishLvl1Code = '28'
    const continueLvl2 = '88'

    // check if the code is already entered
    if (game.enteredCodes.includes(code)) {
      setFeedback('error', t('phone.codeAlreadyFound'))
      return
    }

    // Step 1: User enters 8 → hint
    if (code === hintCode && !game.enteredCodes.includes(countCode)) {
      const image = locale.value === 'fr' ? hintImageFR : hintImageEN
      setFeedback('success', t('phone.codeFound'))
      game.fristHintFound = true
      game.showOverlay({
        type: 'image',
        src: image,
      })
      return
    }

    // Step 2: User enters 4 → confirm post-it count, save 8 and 4
    if (code === countCode && game.fristHintFound) {
      game.enteredCodes.push('4')
      game.enteredCodes.push('8')
      setFeedback('success', t('phone.codeFound'))
      const image2 = locale.value === 'fr' ? hintImageFR2 : hintImageEN2
      game.showOverlay({
        type: 'image',
        src: image2,
      })
      checkUpdateScenarioImage()
      return
    }

    // Step 3: User enters 29 → Riddle for 1.1
    if (code === hintCode2) {
      if (game.riddleSolved) {
        setFeedback('error', t('phone.codeAlreadyFound'))
        if (!game.enteredCodes.includes(hintCode2)) {
          checkUpdateScenarioImage()
        }
        return
      }
      
      game.activeMessage = {
        from: 'S15',
        name: 'Santiago',
        image: 'santiago',
        avatar: char1,
        body: t('phone.messageBodylvl1')
      }
      return
    }

    // Step 4: User enters 21 → Find 26 on screen
    if (code === finalCode && game.currentScenarioImage === 'updated') {
      setFeedback('success', t('phone.codeFound'))
      game.enteredCodes.push(hintCode2)
      game.currentScenarioImage = 'third'
      game.riddleSolved = false
      game.enteredCodes.push(finalCode)
      return
    }

    // Step 5: User enters 26 → Riddle for 1.2
    if (game.currentScenarioImage === 'third' && code === lastCode) {
      game.enteredCodes.push(lastCode)
      game.currentScenarioImage = 'final'
      setFeedback('success', t('phone.codeFound'))
      game.setCharCallable('Santiago', true)
      return
    }

    // Step 6: User enters 28 → cong
    if (game.currentScenarioImage === 'final' && code === finishLvl1Code) {
      game.enteredCodes.push(finishLvl1Code)
      game.currentScenarioImage = 'congrats'
      setFeedback('success', t('phone.codeFound'))
      game.setCharCallable('Santiago', false)
      return
    }

    // Step 7: User enters 88 → continue to level 2
    if (game.currentScenarioImage === 'congrats' && code === continueLvl2) {
      game.enteredCodes.push(continueLvl2)
      game.level = 2
      router.push('/level/2')
      return
    }

    // Invalid entry
    setFeedback('error', t('phone.invalidCode'))
  }

  return { handleCodeInput }
}

export function checkUpdateScenarioImage() {
  // Check if both codes 4 and 29 have been discovered and update scenario image
  const game = useGameInfo()
  if (game.enteredCodes.includes('8') && game.enteredCodes.includes('4') && game.riddleSolved) {
    game.currentScenarioImage = 'updated'
    game.activeMessage = null
    game.activeRiddle = null
  }
}