<template>
  <div class="bg-gray-800 text-white px-6 py-1 rounded-lg text-center shadow-sm font-mono text-lg sm:text-xl lg:text-2xl border-2 border-black">
    Time: {{ time }}
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const time = ref('00:00')
let seconds = 0

// Start the timer when the component is mounted
onMounted(() => {
  setInterval(() => {
    seconds++
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
    const secs = String(seconds % 60).padStart(2, '0')
    time.value = `${mins}:${secs}`
  }, 1000)
})

</script>