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
          <!-- Home tab -->
          <RouterLink
            to="/tabs/home"
            class="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/tabs/home', 'text-gray-600 dark:text-gray-400': $route.path !== '/tabs/home' }">
            <svg
              class="w-6 h-6 mb-1"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M16.612 2.214a1.01 1.01 0 0 0-1.242 0L1 13.419l1.243 1.572L4 13.621V26a2.009 2.009 0 0 0 2 2h20a2.009 2.009 0 0 0 2-2V13.621l1.757 1.37L31 13.419ZM18 26h-4v-8h4Zm2 0v-8a2.009 2.009 0 0 0-2-2h-4a2.009 2.009 0 0 0-2 2v8H6V12.062l10-7.79 10 7.79V26Z" />
            </svg>
            <span class="text-xs font-medium">Home</span>
          </RouterLink>

          <!-- Agenda tab -->
          <RouterLink
            to="/tabs/calendar"
            class="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path.startsWith('/tabs/calendar'), 'text-gray-600 dark:text-gray-400': !$route.path.startsWith('/tabs/calendar') }">
            <svg
              class="w-6 h-6 mb-1"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M26 4h-4V2h-2v2h-8V2h-2v2H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM6 6h4v2h2V6h8v2h2V6h4v4H6Zm0 6h20v14H6Z" />
            </svg>
            <span class="text-xs font-medium">Agenda</span>
          </RouterLink>

          <!-- Attendees tab -->
          <RouterLink
            to="/tabs/attendees"
            class="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path.startsWith('/tabs/attendees') || $route.path.startsWith('/attendee'), 'text-gray-600 dark:text-gray-400': !$route.path.startsWith('/tabs/attendees') && !$route.path.startsWith('/attendee') }">
            <svg
              class="w-6 h-6 mb-1"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M30 30h-2v-5a5.006 5.006 0 0 0-5-5v-2a7.008 7.008 0 0 1 7 7ZM22 30h-2v-5a5.006 5.006 0 0 0-5-5H9a5.006 5.006 0 0 0-5 5v5H2v-5a7.008 7.008 0 0 1 7-7h6a7.008 7.008 0 0 1 7 7ZM20 2v2a5 5 0 0 1 0 10v2a7 7 0 0 0 0-14ZM12 4a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7Z" />
            </svg>
            <span class="text-xs font-medium">Attendees</span>
          </RouterLink>

          <!-- Messages tab -->
          <RouterLink
            to="/tabs/messages"
            class="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === '/tabs/messages', 'text-gray-600 dark:text-gray-400': $route.path !== '/tabs/messages' }">
            <svg
              class="w-6 h-6 mb-1"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm-2.2 2L16 14.78 6.2 8ZM4 24V8.91l11.43 7.91a1 1 0 0 0 1.14 0L28 8.91V24Z" />
            </svg>
            <span class="text-xs font-medium">Messages</span>
            <div
              v-if="updates.numberOfMessages > 0"
              class="absolute -top-1 -right-1 bg-red-500 dark:bg-red-600 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1 shadow-md">
              {{ updates.numberOfMessages }}
            </div>
          </RouterLink>

          <!-- Gallery tab -->
          <RouterLink
            to="/tabs/images"
            class="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path.startsWith('/tabs/images') || $route.path.startsWith('/singleimage'), 'text-gray-600 dark:text-gray-400': !$route.path.startsWith('/tabs/images') && !$route.path.startsWith('/singleimage') }">
            <svg
              class="w-6 h-6 mb-1"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M19,14a3,3,0,1,0-3-3A3,3,0,0,0,19,14Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,19,10Z" />
              <path d="M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4Zm0,22H6V20l5-5,5.59,5.59a2,2,0,0,0,2.82,0L21,19l5,5Zm0-4.83-3.59-3.59a2,2,0,0,0-2.82,0L18,19.17l-5.59-5.59a2,2,0,0,0-2.82,0L6,17.17V6H26Z" />
            </svg>
            <span class="text-xs font-medium">Gallery</span>
            <div
              v-if="updates.numberOfPictures > 0"
              class="absolute -top-1 -right-1 bg-red-500 dark:bg-red-600 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1 shadow-md">
              {{ updates.numberOfPictures }}
            </div>
          </RouterLink>

          <!-- Settings menu -->
          <button
            class="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            @click="showSettings = true">
            <svg
              class="w-6 h-6 mb-1"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1 2 2 0 0 0-.64.1l-2.43.82a11.35 11.35 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.48 11.48 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .38 2.55L5 15.24v1.53l-1.92 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1 2 2 0 0 0 .64-.1l2.43-.82a11.35 11.35 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.48 11.48 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1 2 2 0 0 0 1.73-1L29.3 21a2 2 0 0 0-.38-2.55ZM25.21 24l-2.43-.82a2 2 0 0 0-1.39.24 9.48 9.48 0 0 1-1.85 1.05 2 2 0 0 0-1.15 1.63l-.51 2.52h-4.72l-.51-2.52a2 2 0 0 0-1.15-1.63 9.35 9.35 0 0 1-1.85-1.05 2 2 0 0 0-1.39-.24L6.79 24l-2.36-4 1.92-1.68a2 2 0 0 0 .67-1.68v-2.13a2 2 0 0 0-.67-1.68L4.43 12l2.36-4 2.42.82a2 2 0 0 0 1.39-.24 9.48 9.48 0 0 1 1.85-1.05A2 2 0 0 0 13.6 5.9l.51-2.52h4.72l.51 2.52a2 2 0 0 0 1.15 1.63 9.35 9.35 0 0 1 1.85 1.05 2 2 0 0 0 1.39.24L25.21 8l2.36 4-1.92 1.68a2 2 0 0 0-.67 1.68v2.13a2 2 0 0 0 .67 1.68L27.57 20Z" />
              <path d="M16 22a6 6 0 1 1 6-6 5.94 5.94 0 0 1-6 6Zm0-10a4 4 0 1 0 4 4 3.91 3.91 0 0 0-4-4Z" />
            </svg>
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
import { onBeforeUnmount, onMounted, ref } from 'vue';
import axios from 'axios';
import backend from '#/plugins/backend.config';
import SettingsMenu from '#/components/SettingsMenu.vue';

const updates = ref({ numberOfMessages: 0, numberOfPictures: 0 });
const intervalId = ref(0);
const token = ref(localStorage.getItem('accessToken'));
const showSettings = ref(false);

const fetchData = async () => {
  try {
    const response = await axios.get(backend.construct('updates'), { headers: { Authorization: `Bearer ${token.value}` } });
    Object.assign(updates.value, response.data);
    localStorage.setItem('lastDownloadMessages', response.data.lastDownloadMessages);
    localStorage.setItem('lastDownloadPictures', response.data.lastDownloadPictures);
  } catch (error) {
    // Error fetching updates
  }
};

onMounted(() => {
  void fetchData();
  intervalId.value = window.setInterval(() => void fetchData(), 30 * 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});
</script>
