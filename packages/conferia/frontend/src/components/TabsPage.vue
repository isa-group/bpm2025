<template>
  <div class="flex flex-col min-h-screen">
    <!-- Main content area -->
    <div class="flex-1 pb-16 -mt-16">
      <RouterView />
    </div>

    <!-- Bottom navigation bar -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40 shadow-lg dark:shadow-gray-800/50">
      <div class="max-w-1024px mx-auto px-4">
        <div class="flex justify-around items-center py-2">
          <template
            v-for="button in buttons"
            :key="`${button.name}-${count ?? 0}`">
            <RouterLink
              :to="button.link"
              class="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
              :class="{
                'text-blue-600 dark:text-blue-400': $route.path.includes(button.link),
                'text-gray-600 dark:text-gray-400': !$route.path.includes(button.link)
              }">
              <i
                class="w-6 h-6 mb-1"
                :class="button.icon" />
              <span class="text-xs font-medium">{{ button.name }}</span>
              <div
                v-if="(button?.count ?? 0) > 0"
                class="absolute -top-1 -right-1 bg-red-500 dark:bg-red-600 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1 shadow-md">
                {{ button.count }}
              </div>
            </RouterLink>
          </template>
          <!-- Settings menu -->
          <button
            class="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            @click="showSettings = true">
            <i class="i-tabler:settings w-6 h-6 mb-1" />
            <span class="text-xs font-medium">Settings</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Settings Menu -->
    <SettingsMenu
      :visible="showSettings"
      @hide="showSettings = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import backend from '#/plugins/backend.config';
import SettingsMenu from '#/components/SettingsMenu.vue';
import { useIntervalFn, useLocalStorage } from '@vueuse/core';

const token = ref(localStorage.getItem('accessToken'));
const showSettings = ref(false);

const buttons = computed(() => [
  { 
    icon: 'i-tabler:home',
    link: '/tabs/home',
    name: 'Home'
  },
  { 
    icon: 'i-tabler:calendar-pin',
    link: '/tabs/calendar',
    name: 'Agenda'
  },
  { 
    icon: 'i-tabler:users',
    link: '/tabs/attendees',
    name: 'Attendees'
  },
  { 
    icon: 'i-tabler:message',
    link: '/tabs/messages',
    count: updates.value.numberOfMessages,
    name: 'Messages'
  },
  { 
    icon: 'i-tabler:photo',
    link: '/tabs/images',
    count: updates.value.numberOfPictures,
    name: 'Gallery'
  }
]);

const updates = useLocalStorage('updates', { 
  numberOfMessages: 0,
  numberOfPictures: 0,
  lastDownloadMessages: undefined,
  lastDownloadPictures: undefined
});

async function fetchData() {
  try {
    const response = await axios.get(backend.construct('updates'), { headers: { Authorization: `Bearer ${token.value}` } });
    updates.value = response.data;
  } catch {}
}

void fetchData()

useIntervalFn(() => void fetchData(), 30 * 1000);
</script>
