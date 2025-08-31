<template>
  <div class="flex flex-col min-h-screen">
    <!-- Main content area -->
    <div class="flex-1 pb-16">
      <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Sticky Header -->
        <div
          v-if="title || subtitle"
          class="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between px-4 py-4">
            <slot name="header-pre" />
            <div class="flex-col">
              <h1
                v-if="title"
                class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ title }}
              </h1>
              <p
                v-if="subtitle && !$slots.subtitle"
                class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {{ subtitle }}
              </p>
              <slot
                v-else-if="$slots.subtitle"
                name="subtitle" />
            </div>
            <slot name="header-post" />
          </div>
        </div>
        <slot />
      </div>
    </div>

    <!-- Bottom navigation bar -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40 shadow-lg dark:shadow-gray-800/50">
      <div class="max-w-1024px mx-auto px-4">
        <div class="flex justify-around items-center py-2">
          <template
            v-for="button in buttons"
            :key="`${button.name}-${button.count ?? 0}`">
            <RouterLink
              :to="button.link"
              class="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
              :class="{
                'text-blue-600 dark:text-blue-400': $route.path.includes(button.link),
                'text-gray-600 dark:text-gray-400': !$route.path.includes(button.link)
              }">
              <i
                v-if="button.icon"
                class="w-6 h-6 mb-1"
                :class="button.icon" />
              <UserAvatar
                v-else
                :user="userDetails as { firstname: string, lastname: string }" />
              <span
                v-if="button.name"
                class="text-xs font-medium">{{ button.name }}</span>
              <div
                v-if="(button?.count ?? 0) > 0"
                class="absolute -top-1 -right-1 z-1000 bg-red-500 dark:bg-red-600 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1 shadow-md">
                {{ button.count }}
              </div>
            </RouterLink>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useIntervalFn, useLocalStorage } from '@vueuse/core';
import { axiosKey, userDetailsKey } from '#/plugins/symbols';
import UserAvatar from '#/components/UserAvatar.vue';

const { title, subtitle } = defineProps<{
  title?: string;
  subtitle?: string;
}>();

const axios = inject(axiosKey)!;

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
  },
  {
    link: '/profile',
    name: 'Account'
  }
]);

const userDetails = inject(userDetailsKey);

const updates = useLocalStorage('updates', {
  numberOfMessages: 0,
  numberOfPictures: 0,
  lastDownloadMessages: undefined,
  lastDownloadPictures: undefined
});

/**
 * Updates the message counters shown in the application
 */
async function fetchData() {
  try {
    const response = await axios.get('updates');
    updates.value = response.data;
  } catch {}
}

void fetchData();

useIntervalFn(() => void fetchData(), 30 * 1000);
</script>
