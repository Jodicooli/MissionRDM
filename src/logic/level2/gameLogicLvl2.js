import { useGameInfo } from '@/store/gameInfo'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import hintImageEN3 from '@/assets/en/postits/hint3.png'
import hintImageFR3 from '@/assets/fr/postits/hint3.png'

import { useRoadmapStore } from '@/store/roadmap'
import { playSound } from '@/utils/playSound'
import stepFoundSound from '@/assets/audio/stepFound.mp3'
import levelSound from '@/assets/audio/level.mp3'

export function useGameLogicLvl2(setFeedback) {

    const game = useGameInfo()
    const { t, locale } = useI18n()
    const router = useRouter()
    const roadmap = useRoadmapStore()

    function handleCodeInput(code) {
        const firstCode = '9'
        const secondCode = '15'
        const thirdCode = '31'
        const fourthCode = '1'
        const fifthCode = '36'
        const hintCode1 = '6'
        const hintCode1Alt = '7'
        const continueLvl3 = '11'

        // check if the code is already entered
        if (game.enteredCodes.includes(code)) {
        setFeedback('error', '')
        return
        }
            console.log('First code entered:', code)

        // Step 1: User enters 9 → update currentScenarioImage to second 
        if (code === firstCode && !game.enteredCodes.includes(hintCode1)) {
            game.enteredCodes.push('9')
            setFeedback('success', '')
            playSound(stepFoundSound)
            game.currentScenarioImage = "second"
            roadmap.addEntry('step2', 'step2_2')
            return
        }

        // Step 2: User enters 15 → 7.5 x 2 = 15, save 15
        if (code === secondCode && game.currentScenarioImage === 'second') {
            game.enteredCodes.push('15')
            setFeedback('success', '')
            game.currentScenarioImage = "third"
            return
        }

        // Step 3: User enters 31 → 15 + 16 = 31, save 31
        if (code === thirdCode && game.currentScenarioImage === 'third') {
            game.enteredCodes.push('31')
            setFeedback('success', '')
            playSound(stepFoundSound)
            roadmap.addEntry('step2', 'step2_3')
            game.currentScenarioImage = "fourth"
            return
        }

        // Step 4: User enters 1 → examp1e.txt, save 1
        if (code === fourthCode && game.currentScenarioImage === 'fourth') {
            game.enteredCodes.push('1')
            setFeedback('success', '')
            game.currentScenarioImage = "fifth"
            return
        }

        // Step 5: User enters 36 → R36PTION
        if (code === fifthCode && game.currentScenarioImage === 'fifth') {
            game.enteredCodes.push('36')
            setFeedback('success', '')
            playSound(stepFoundSound)
            roadmap.addEntry('step2', 'step2_1')
            game.currentScenarioImage = 'final'
            return
        }

        // Step 6: User enters 6 or 7 → hint for continue to level 3
        if ((code === hintCode1 || code === hintCode1Alt) && game.currentScenarioImage === 'final') {
            // if en than the code is 7 in french 6 
            if ((locale.value === 'en' && code !== hintCode1Alt) || (locale.value === 'fr' && code !== hintCode1)) {
                setFeedback('error', '')
                return
            }
            setFeedback('success', '')
            game.firstHintFound = true
            const image = locale.value === 'en' ? hintImageEN3 : hintImageFR3
            game.showOverlay({
                type: 'image',
                src: image,
            })
            return
        }

        // Step 7: User enters 11 → continue to level 3
        if (code === continueLvl3 && game.currentScenarioImage === 'final' && game.firstHintFound) {
            setFeedback('success', '')
            game.enteredCodes.push(continueLvl3)
            playSound(levelSound)
            game.showCongratsModal = true
            setFeedback('success', '')
            return
        }

        // If the code does not match any step, show an error
        setFeedback('error', '')
    }

    // Function to continue to level 3
    function continueToLevel3() {
        game.showCongratsModal = false
        game.resetAfterLevel()
        game.level = 3
        router.push('/level/3')
    }

  return { handleCodeInput, continueToLevel3 }


}