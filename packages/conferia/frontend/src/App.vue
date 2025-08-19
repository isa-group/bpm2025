<template>
  <div class="mx-auto max-w-[1024px] min-h-dvh flex flex-col bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
    <router-view />
  </div>
  
</template>

<script setup lang="ts">
/* Theme variables */
import '#/theme/variables.css';
import { useLocalStorage, usePreferredDark } from '@vueuse/core';
import { watchEffect } from 'vue';

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

