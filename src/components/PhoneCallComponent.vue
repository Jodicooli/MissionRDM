<template>
    <div class="bg-[#1b1b1b] text-white p-4 rounded shadow-lg max-w-xl w-fit border border-white">
        <div class="flex items-center gap-3 mb-3">
            <img :src="avatar" class="w-10 h-10 rounded-full border border-white" />
        <div class="font-bold">{{ name }}</div>
    </div>
    <h2 class="text-lg sm:text-xl font-bold mb-4">
        <span class="text-white">{{ titleStart }}</span>
        <span class="text-blue-400">{{ titleMiddle }}</span>
        <span class="text-white">{{ titleEnd }}</span>
    </h2>
    <p class="text-sm whitespace-pre-line">{{ body }}</p>
    <button
      class="mt-3 text-xs text-blue-400 hover:text-blue-300"
      @click="$emit('close')"
    >
      ✖ {{ $t('phone.close') }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  avatar: String,
  name: String,
  body: String,
  titleStart: String,
  titleMiddle: String,
  titleEnd: String
})
defineEmits(['close'])
</script>