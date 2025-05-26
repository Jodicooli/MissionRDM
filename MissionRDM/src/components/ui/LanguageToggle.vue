<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 relative px-4">
    <!-- Language Toggle -->
    <div class="absolute top-4 right-4">
      <select
        v-model="currentLocale"
        @change="changeLanguage"
        class="bg-white border border-gray-300 text-gray-800 px-3 py-1 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="en">🇬🇧 English</option>
        <option value="fr">🇫🇷 Français</option>
      </select>
    </div>

    <!-- Main Card -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center text-blue-800 mb-6">
        {{ $t('startScreen.title') }}
      </h1>

      <label for="playerName" class="block text-sm font-medium mb-2">
        {{ $t('startScreen.enterName') }}
      </label>
      <input
        id="playerName"
        v-model="playerName"
        type="text"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
        :placeholder="$t('startScreen.namePlaceholder')"
      />

      <div class="flex flex-col space-y-4">
        <button
          class="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-all"
          @click="startGame"
          :disabled="!playerName.trim()"
        >
          {{ $t('startScreen.startGame') }}
        </button>
        <button
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg transition-all"
          @click="goToTutorial"
        >
          {{ $t('startScreen.tutorial') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameInfo } from '@/store/gameInfo'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const game = useGameInfo()
const { locale } = useI18n()

const playerName = ref('')
const currentLocale = ref(locale.value)

function startGame() {
  game.playerName = playerName.value.trim()
  router.push('/level/1')
}

function goToTutorial() {
  game.playerName = playerName.value.trim()
  router.push('/tutorial')
}

function changeLanguage() {
  locale.value = currentLocale.value
  localStorage.setItem('lang', currentLocale.value)
}
</script>