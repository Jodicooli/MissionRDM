<template>
  <div class="grid gap-6 text-white">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="p-5 rounded-xl bg-[#1a1a1a] border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg font-semibold text-amber-400 tracking-wide">
          {{ step.title }}
        </h3>
        <span
          v-if="step.completed"
          class="text-sm bg-green-600 text-white px-2 py-0.5 rounded-full font-medium shadow-sm"
        >
            {{ $t('roadmap.complete') }}
        </span>
      </div>

      <ul v-if="step.items.length" class="list-disc list-inside text-sm text-gray-300 space-y-1">
        <li v-for="(item, i) in step.items" :key="i">{{ item }}</li>
      </ul>

      <p v-else class="italic text-gray-500 text-sm">{{ $t('roadmap.entries') }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: Array
})
</script>
