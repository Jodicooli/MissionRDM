<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <LanguageToggle class="absolute top-4 right-4" />
    <router-view />
  </div>
</template>

<script setup>
import LanguageToggle from '@/components/ui/LanguageToggle.vue'
</script>
