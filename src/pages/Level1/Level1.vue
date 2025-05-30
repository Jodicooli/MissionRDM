<template>
  <div class="min-h-screen bg-[#1b1b1b] text-white p-4 sm:p-6 flex items-center justify-center">
    <!-- Inner content layout -->
    <div class="flex flex-col lg:flex-row gap-6 items-center justify-center w-full max-w-7xl">
      
      <transition name="fade">
        <PhoneCall
          v-if="game.activeCall"
          :name="game.activeCall.name"
          :avatar="game.activeCall.avatar"
          :body="game.activeCall.body"
          @close="game.endCall()"
          class="absolute top-4 left-1/2 transform -translate-x-1/2 z-50"
        />
      </transition>

      <!-- Congratulations Modal -->
      <CongratsModal
        v-if="game.showCongratsModal"
        :visible="game.showCongratsModal"
        :level="1"
        :steps="congratsSteps"
        @close="game.showCongratsModal = false"
        @continue="handleContinueToLevel2"
      />

      <!-- Sidebar: Timer + Phone -->
      <div class="flex flex-col gap-4 w-full max-w-sm lg:w-[300px]">
        <Timer />
        <Phone>
          <PhoneMessage
            v-if="game.activeMessage"
            :from="game.activeMessage.from"
            :name="game.activeMessage.name"
            :avatar="game.activeMessage.avatar"
            :body="game.activeMessage.body"
            @close="handleMessageClose"
          />

          <PhoneKeypad v-else />
        </Phone>
        
      </div>

      <RiddleModal
        v-if="game.activeRiddle"
        :visible="true"
        :title="t('riddle1.title1')"
        :question="t('riddle1.question1')"
        :placeholder="t('riddle1.placeholder1')"
        :image="riddleImage"
        :correctAnswers="correctAnswers"
        :successMessage="t('riddle1.correct1')"
        :failureMessage="t('riddle1.incorrect1')"
        @close="game.activeRiddle = false"
      />

      <!-- Main Scenario Area -->
      <div class="w-full">
        <ScenarioDisplay :imageSrc="scenarioImage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGameInfo } from '@/store/gameInfo'
import { useGameLogicLvl1 } from '@/logic/level1/gameLogicLvl1.js'
import Timer from '@/components/others/TimerComponent.vue'
import Phone from '@/components/phone/PhoneComponent.vue'
import PhoneMessage from '@/components/messageAndCall/PhoneMessageComponent.vue'
import PhoneKeypad from '@/components/phone/PhoneKeypadComponent.vue'
import ScenarioDisplay from '@/components/scenario/ScenarioScreenComponent.vue'
import RiddleModal from '@/components/riddle/RiddleModalComponent.vue'
import PhoneCall from '@/components/messageAndCall/PhoneCallComponent.vue'
import CongratsModal from '@/components/others/CongratsModalComponent.vue'
import EnScenario from '@/assets/en/lvl1/scenario1.png'
import EnScenario2 from '@/assets/en/lvl1/scenario1.2.png'
import FrScenario from '@/assets/fr/lvl1/scenario1.png'
import FrScenario2 from '@/assets/fr/lvl1/scenario1.2.png'
import FrScenario3 from '@/assets/fr/lvl1/scenario1.3.png'
import EnScenario3 from '@/assets/en/lvl1/scenario1.3.png'
import EnScenarioFinal from '@/assets/en/lvl1/scenario1.4.png'
import FrScenarioFinal from '@/assets/fr/lvl1/scenario1.4.png'
import EnScenarioCongrats from '@/assets/en/lvl1/scenario1.5.png'
import FrScenarioCongrats from '@/assets/fr/lvl1/scenario1.5.png'
import RiddleImageEN from '@/assets/en/riddles/riddle1.png'
import RiddleImageFR from '@/assets/fr/riddles/riddle1.png'
import { useRoadmapStore } from '@/store/roadmap'

const roadmap = useRoadmapStore()
const { locale, messages, t } = useI18n()

const correctAnswers = computed(() =>
  messages.value[locale.value]?.riddle1?.correctAnswers1 || []
)

onMounted(() => {
  roadmap.resetRoadmap()
})

const game = useGameInfo()

// Initialize game logic
const setFeedback = (type, message) => game.setFeedback(type, message)
const { continueToLevel2 } = useGameLogicLvl1(setFeedback)

const riddleImage = computed(() =>
  locale.value === 'fr' ? RiddleImageFR : RiddleImageEN
)

function handleMessageClose() {
  game.activeMessage = null
  if (!game.riddleSolved) {
    game.activeRiddle = true
  }
}

function handleContinueToLevel2() {
  continueToLevel2()
}

// Get congratulations steps from roadmap entries completed in level 1
const congratsSteps = computed(() => [
  {
    label: t('roadmap.step1'),
    items: [
      t('roadmap.step1_1'),
      t('roadmap.step1_1_A'),
      t('roadmap.step1_1_B'),
      t('roadmap.step1_1_C'),
      t('roadmap.step1_1_D'),
      t('roadmap.step1_1_E'),
      t('roadmap.step1_1_F'),
      t('roadmap.step1_1_G'),
      t('roadmap.step1_2'),
      t('roadmap.step1_3'),
      t('roadmap.step1_4'),
      t('roadmap.step1_5')
    ]
  }
])

const images = {
  en: { default: EnScenario, updated: EnScenario2, third: EnScenario3, final: EnScenarioFinal, congrats: EnScenarioCongrats },
  fr: { default: FrScenario, updated: FrScenario2, third: FrScenario3, final: FrScenarioFinal, congrats: FrScenarioCongrats }
}

const scenarioImage = computed(() => {
  const lang = locale.value
  const state = game.currentScenarioImage || 'default'
  return images[lang]?.[state] || images[lang].default
})
</script>