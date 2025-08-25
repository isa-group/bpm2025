<template>
  <div class="app-container min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 pt-16">
    <RouterView />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage, usePreferredDark } from '@vueuse/core';
import { watchEffect } from 'vue';
import Toast from 'primevue/toast';

const theme = useLocalStorage('theme', undefined);
const isDark = usePreferredDark();

watchEffect(() => {
  if (theme.value) {
    document.documentElement.classList.toggle('dark', theme.value === 'dark');
  } else {
    // If no saved theme, use the system preference
    document.documentElement.classList.toggle('dark', isDark.value);
  }
});
</script>

<style>
/* Set a max width and center the container */
.app-container {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
