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
          class="absolute top-0 left-0 z-50 w-full"
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

      <!-- Main Scenario Area -->
      <div class="w-full">
        <ScenarioDisplay :imageSrc="scenarioImage" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGameInfo } from '@/store/gameInfo'
import Timer from '@/components/Timer.vue'
import Phone from '@/components/Phone.vue'
import PhoneMessage from '@/components/PhoneMessage.vue'
import PhoneKeypad from '@/components/PhoneKeypad.vue'
import ScenarioDisplay from '@/components/ScenarioDisplay.vue'
import PhoneCall from '@/components/PhoneCall.vue'
import EnScenario from '@/assets/en/lvl2/scenario1.png'
import FrScenario from '@/assets/fr/lvl2/scenario1.png'


const { locale, messages, t } = useI18n()

const game = useGameInfo()

function handleMessageClose() {
  game.activeMessage = null
  if (!game.riddleSolved) {
    game.activeRiddle = true
  }
}

const images = {
  en: { default: EnScenario },
  fr: { default: FrScenario }
}

const scenarioImage = computed(() => {
  const lang = locale.value
  const state = game.currentScenarioImage || 'default'
  return images[lang]?.[state] || images[lang].default
})
</script>