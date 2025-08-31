<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
    <ContextProvider>
      <RouterView />
      <Toast />

      <!-- PWA Install Prompt -->
      <div
        v-if="isInstallable"
        class="fixed bottom-4 right-4 z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <svg
                class="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">
                Install BPM 2025
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Add to home screen for quick access
              </p>
            </div>
          </div>
          <div class="mt-3 flex space-x-2">
            <button
              class="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-2 rounded-md transition-colors"
              @click="installApp">
              Install
            </button>
            <button
              class="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium px-3 py-2 rounded-md transition-colors"
              @click="isInstallable = false">
              Later
            </button>
          </div>
        </div>
      </div>
    </ContextProvider>
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import ContextProvider from '#/components/ContextProvider.vue';
import { usePWA } from '#/composables/usePWA';

const { isInstallable, installApp } = usePWA();
</script>
