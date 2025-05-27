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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGameInfo } from '@/store/gameInfo'
import Timer from '@/components/Timer.vue'
import Phone from '@/components/Phone.vue'
import PhoneMessage from '@/components/PhoneMessage.vue'
import PhoneKeypad from '@/components/PhoneKeypad.vue'
import ScenarioDisplay from '@/components/ScenarioDisplay.vue'
import RiddleModal from '@/components/RiddleModal.vue'
import PhoneCall from '@/components/PhoneCall.vue'
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
import RiddleImageEN from '@/assets/riddles/en/riddle1.png'
import RiddleImageFR from '@/assets/riddles/fr/riddle1.png'

const { locale, messages, t } = useI18n()

const correctAnswers = computed(() =>
  messages.value[locale.value]?.riddle1?.correctAnswers1 || []
)

const game = useGameInfo()

const riddleImage = computed(() =>
  locale.value === 'fr' ? RiddleImageFR : RiddleImageEN
)

function handleMessageClose() {
  game.activeMessage = null
  if (!game.riddleSolved) {
    game.activeRiddle = true
  }
}

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