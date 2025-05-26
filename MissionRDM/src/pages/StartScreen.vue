<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 relative px-4">
    <!-- Language Toggle -->
    <div class="absolute top-4 right-4">
      <select
        v-model="currentLocale"
        @change="changeLanguage"
        class="bg-gray-700 border border-gray-500 text-white px-3 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="en">🇬🇧 English</option>
        <option value="fr">🇫🇷 Français</option>
      </select>
    </div>

    <!-- Main Card / Terminal Style Panel -->
    <div class="w-full max-w-md bg-gray-800 rounded-xl border border-gray-700 shadow-2xl p-8">
      <h1 class="text-3xl font-bold text-center text-red-500 mb-6 tracking-wide">
        {{ $t('startScreen.title') }}
      </h1>

      <label for="playerName" class="block text-sm font-semibold mb-2 text-gray-300">
        {{ $t('startScreen.enterName') }}
      </label>
      <input
        id="playerName"
        v-model="playerName"
        type="text"
        class="w-full border border-gray-600 bg-gray-700 text-white rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        :placeholder="$t('startScreen.namePlaceholder')"
      />

      <div class="flex flex-col space-y-4">
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-200"
          @click="startGame"
          :disabled="!playerName.trim()"
        >
          {{ $t('startScreen.startGame') }}
        </button>
        <button
          class="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 rounded-md transition-all duration-200"
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
