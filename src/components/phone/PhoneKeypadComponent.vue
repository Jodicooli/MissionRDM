<template>
    <div class="flex flex-col gap-4">
      <!-- Help + Solution -->
      <div class="grid grid-cols-2 gap-2 text-center">
    <button 
      @click="showClues"
      class="bg-red-600 hover:bg-red-700 py-2 rounded shadow text-sm font-semibold transition-all"
    >
      {{ t('phone.help') }}
    </button>
    <button 
      @click="showSolutions"
      class="bg-yellow-600 hover:bg-yellow-700 py-2 rounded shadow text-sm font-semibold transition-all"
    >
      {{ t('phone.solution') }}
    </button>
  </div>

  <!-- Hint Modal -->
  <div v-if="showHintModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]" @click="closeHints">
    <div class="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 max-h-96 overflow-y-auto z-[10000]" @click.stop>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-white">
          {{ hintModalType === 'clues' ? t('phone.help') : t('phone.solution') }}
          - Level {{ game.getLvl() }}
        </h3>
        <button @click="closeHints" class="text-gray-400 hover:text-white text-xl leading-none z-[10001]">
          ✕
        </button>
      </div>
      
      <div class="bg-gray-700 p-4 rounded">
        <p class="text-white text-sm whitespace-pre-line">
          {{ hintModalType === 'clues' ? currentHint : currentSolution }}
        </p>
      </div>
      
      <button @click="closeHints" class="w-full mt-4 bg-amber-600 hover:bg-amber-700 py-2 rounded text-white font-semibold">
        {{ t('phone.close') }}
      </button>
    </div>
  </div>

    <!-- Characters -->
    <div class="flex justify-around gap-2">
      <button
        v-for="(char, i) in characters"
        :key="i"
        class="w-12 h-12 bg-gray-700 rounded-full overflow-hidden relative group hover:ring-2 hover:ring-amber-400" 
        @click="makeCall(char)"
        :title="t('phone.hoverCall')"
      >
        <img :src="char.avatar" alt="Character" class="w-full h-full object-cover" />
      </button>
    </div>

    <!-- Input Display + Delete -->
    <div class="flex items-center gap-2">
      <div class="flex-1">
        <input
          v-model="input"
          type="text"
          class="w-full px-2 py-1 bg-gray-800 border rounded text-center text-lg tracking-widest transition-all duration-200"
          :class="[
            statusType === 'success' ? 'border-green-500' :
            statusType === 'error' ? 'border-red-500' : 'border-gray-600'
          ]"
          :placeholder="t('phone.placeholder')"
          readonly
        />
        <p
          v-if="statusMessage"
          :class="[
            'text-sm mt-1 text-center font-semibold',
            statusType === 'success' ? 'text-green-400' : 'text-red-400'
          ]"
        >
          {{ statusMessage }}
        </p>
      </div>
      <button
        @click="deleteLast"
        class="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
      >
        {{ t('phone.delete') }}
      </button>
    </div>

    <!-- Number Pad -->
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="num in numbers"
        :key="num"
        class="bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg text-lg font-bold transition-colors"
        @click="appendNumber(num)"
      >
        {{ num }}
      </button>
    </div>

    <!-- Call / Submit -->
    <button
      class="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded text-base font-semibold transition-colors"
      @click="validateCode"
    >
      {{ t('phone.enter') }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGameLogicLvl1 } from '@/logic/level1/gameLogicLvl1.js'
import { useHintsSolutions } from '@/composables/hintsAndSolutions/useHintsSolutions.js'
import char1 from '@/assets/characters/char1.png'
import char2 from '@/assets/characters/char2.png'
import char3 from '@/assets/characters/char3.png'
import { useGameInfo } from '@/store/gameInfo.js'
import { playSound } from '@/utils/playSound'
import callSound from '@/assets/audio/call.mp3'

const game = useGameInfo()
const { t } = useI18n()

// Hints functionality
const {
  currentHint,
  currentSolution,
  showClues,
  showSolutions,
  closeHints,
  showHintModal,
  hintModalType
} = useHintsSolutions()

const input = ref('')
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const { handleCodeInput } = useGameLogicLvl1(setFeedback)

function appendNumber(num) {
  input.value += num
}

function deleteLast() {
  input.value = input.value.slice(0, -1)
}

const characters = [
  { name: 'Santiago', avatar: char1, key: 'Santiago' },
  { name: 'Inès', avatar: char2, key: 'Inès' },
  { name: 'Jack', avatar: char3, key: 'Jack' }
]

function makeCall(character) {
  if (!game.isCharCallable(character.name)) {
    game.startCall(character.name, character.avatar, t('phone.callUnavailable'))
  } else {
    playSound(callSound)
    const lvl = game.getLvl()
    if (lvl === 1) {
      game.startCall(character.name, character.avatar, t(`phone.call1`))
    } 
  }
}

function validateCode() {
  if (!input.value.trim()) return
  handleCodeInput(input.value.trim()) 
  input.value = ''
}

const statusMessage = ref('')
const statusType = ref('') 

function setFeedback(type, message) {
  statusType.value = type
  statusMessage.value = message
  setTimeout(() => {
    statusMessage.value = ''
    statusType.value = ''
  }, 2000)
}
</script>