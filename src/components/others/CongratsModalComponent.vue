<template>
  <div v-if="visible" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center animate-fadeIn">
  <div class="bg-gradient-to-br from-[#1b1b1b] via-[#2a2a2a] to-[#1b1b1b] text-white rounded-2xl p-4 w-[90vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw] max-h-[90vh] sm:max-h-[80vh] overflow-y-auto relative border border-amber-400/30 shadow-2xl animate-slideUp">      <!-- Celebration particles effect -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <div class="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
        <div class="absolute top-10 right-1/4 w-1 h-1 bg-amber-300 rounded-full animate-bounce" style="animation-delay: 0.3s;"></div>
        <div class="absolute top-5 left-3/4 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style="animation-delay: 0.5s;"></div>
      </div>

      <!-- Main title with celebration -->
      <div class="text-center mb-4">
        <div class="text-3xl mb-2 animate-bounce">🎉</div>
        <h2 class="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent mb-1 animate-pulse">
          {{ t('congrats.title') }}
        </h2>
        <div class="text-amber-300/80 text-sm">
          {{ t('congrats.subtitle', { level: level }) }}
        </div>
      </div>

      <!-- Medal section with enhanced design -->
      <div class="flex justify-center mb-6">
        <div class="relative">
          <!-- Medal glow effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-xl opacity-60 animate-pulse scale-110"></div>
          
          <!-- Main medal -->
          <div class="relative w-20 h-20 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl text-3xl font-bold border-4 border-white transform hover:scale-105 transition-transform duration-300">
            <div class="absolute inset-2 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full flex items-center justify-center">
              <span class="text-white drop-shadow-lg">{{ level }}</span>
            </div>
            
            <!-- Medal highlights -->
            <div class="absolute top-3 left-8 w-4 h-4 bg-white/30 rounded-full blur-sm"></div>
            <div class="absolute top-6 right-6 w-2 h-2 bg-white/50 rounded-full"></div>
          </div>
          
        </div>
      </div>

      <!-- Achievement section -->
      <div class="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-3 mb-4 border border-green-500/30">
        <div class="flex items-center justify-center mb-1">
          <h3 class="text-lg font-bold text-green-400">{{ t('congrats.achievement') }}</h3>
        </div>
        <p class="text-center text-green-200/80 text-xs">
          {{ t('congrats.message') }}
        </p>
      </div>

      <!-- Roadmap Steps with improved hierarchy -->
      <div class="space-y-3 mb-4">
        
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="bg-gradient-to-r from-[#2a2a2a] to-[#333333] rounded-xl p-3 border border-gray-600/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-start">
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-amber-300 mb-1 flex items-center">
                {{ step.label }}
              </h4>
              <ul class="space-y-0.5">
                <li 
                  v-for="(item, i) in step.items" 
                  :key="i"
                  class="text-xs text-gray-300 flex items-start"
                  :class="getItemIndentation(item)"
                >
                  <span class="text-green-400 mr-2 mt-0.5 text-xs">●</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Continue Button with enhanced styling -->
      <button
      @click="$emit('continue')"
      class="w-auto px-8 py-2.5 bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-500 hover:via-green-400 hover:to-green-500 rounded-xl text-white text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-green-400/30 mx-auto block"
    >
      <span class="flex items-center justify-center">
        {{ t('congrats.continue') }}
      </span>
    </button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  visible: Boolean,
  level: Number,
  steps: Array
})

defineEmits(['continue'])

// Function to add proper indentation for sub-items (A, B, C, etc.)
function getItemIndentation(item) {
  // Check if the item starts with a letter followed by a dot (like "A. ", "B. ")
  const hasSubLetter = /^[A-Z]\.\s/.test(item)
  return hasSubLetter ? 'ml-6' : 'ml-0'
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.4s ease-out;
}

.clip-ribbon {
  clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%);
}

.clip-ribbon-small {
  clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%);
}
</style>