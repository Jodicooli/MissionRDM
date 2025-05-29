<template>
  <div class="min-h-screen flex items-center justify-center bg-[#121212] text-gray-200 px-4 relative font-mono">
    <LanguageToggle />

    <!-- Escape Game Panel -->
    <div class="w-full max-w-lg bg-[#202020] rounded-xl border border-gray-700 shadow-[0_0_30px_rgba(255,191,0,0.2)] p-10">
      <h1 class="text-4xl font-bold text-center text-amber-400 mb-10 tracking-widest uppercase leading-snug">
        {{ $t('startScreen.title') }}
      </h1>
      <p class="text-gray-400 mb-6 text-center">
        {{ $t('startScreen.subtitle') }}
      </p>
      <label for="playerName" class="block text-base font-semibold mb-3 text-gray-400 tracking-wide">
        {{ $t('startScreen.enterName') }}
      </label>
      <input
        id="playerName"
        v-model="playerName"
        type="text"
        class="w-full border border-gray-700 bg-[#1a1a1a] text-white rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner placeholder-gray-500"
        :class="{ 'border-red-500': !isNameValid && playerName.trim() }"
        :placeholder="$t('startScreen.namePlaceholder')"
      />
      <p v-if="!isNameValid && playerName.trim()" class="text-red-500 text-sm mb-4">
        {{ $t('startScreen.nameError') }}
      </p>

      <div class="flex flex-col space-y-4">
        <button
          class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-md shadow-md uppercase tracking-wide transition-all duration-150"
          @click="startGame"
          :disabled="!isNameValid"
        >
          {{ $t('startScreen.startGame') }}
        </button>
        <button
          class="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-3 rounded-md shadow-inner uppercase transition-all duration-150"
          @click="goToTutorial"
        >
          {{ $t('startScreen.tutorial') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStartScreen } from '@/composables/useStartScreen'
import LanguageToggle from '@/components/others/LanguageToggleComponent.vue'
import { isValidName } from '@/logic/startScreenLogic.js'
import { computed } from 'vue'

const { playerName, startGame, goToTutorial } = useStartScreen()

const isNameValid = computed(() => {
  return isValidName(playerName.value)
})

</script>
