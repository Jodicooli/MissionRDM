<template>
  <div class="flex flex-col h-full">
    <!-- Header: Avatar + Name -->
    <div class="flex items-center gap-3 mb-3">
      <img
        :src="avatar"
        :alt="from"
        class="w-10 h-10 rounded-full object-cover border border-white"
      />
      <div class="text-sm font-bold text-white">{{ name }}</div>
    </div>

    <!-- Scrollable Message Area -->
    <div class="flex-1 overflow-y-auto bg-amber-100 text-black px-4 py-3 rounded shadow text-sm">
      <p class="whitespace-pre-line">{{ body }}</p>
    </div>

    <!-- Close Button -->
    <button
      class="mt-3 self-end text-xs text-amber-400 hover:text-amber-300"
      @click="$emit('close')"
    >
      ✖ {{ $t ? $t('phone.close') : 'Close' }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  from: String,
  name: String,
  body: String,
  avatar: String
})
defineEmits(['close'])
</script>
