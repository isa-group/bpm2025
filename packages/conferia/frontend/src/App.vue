<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 pt-16">
    <RouterView />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
</script>
