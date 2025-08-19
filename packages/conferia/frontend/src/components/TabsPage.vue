<template>
  <div class="min-h-dvh flex flex-col">
    <router-view />

    <!-- Bottom Navigation -->
    <nav class="sticky bottom-0 left-0 right-0 z-50 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60">
      <ul class="mx-auto max-w-[1024px] grid grid-cols-5 text-center text-xs">
        <li>
          <RouterLink to="/tabs/home" class="flex flex-col items-center py-2.5 gap-1" :class="isActive('/tabs/home') ? 'text-primary-600 font-600' : 'text-neutral-500 dark:text-neutral-400'">
            <span class="i-ph-house-simple-duotone text-5" />
            <span>Home</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/tabs/calendar" class="flex flex-col items-center py-2.5 gap-1" :class="isActive('/tabs/calendar') ? 'text-primary-600 font-600' : 'text-neutral-500 dark:text-neutral-400'">
            <span class="i-ph-calendar-duotone text-5" />
            <span>Agenda</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/tabs/attendees" class="relative flex flex-col items-center py-2.5 gap-1" :class="isActive('/tabs/attendees') ? 'text-primary-600 font-600' : 'text-neutral-500 dark:text-neutral-400'">
            <span class="i-ph-users-three-duotone text-5" />
            <span>Attendees</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/tabs/messages" class="relative flex flex-col items-center py-2.5 gap-1" :class="isActive('/tabs/messages') ? 'text-primary-600 font-600' : 'text-neutral-500 dark:text-neutral-400'">
            <span class="i-ph-chat-circle-dots-duotone text-5" />
            <span>Messages</span>
            <span v-if="updates.numberOfMessages>0" class="absolute -top-1 right-6 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px]">{{ updates.numberOfMessages }}</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/tabs/images" class="relative flex flex-col items-center py-2.5 gap-1" :class="isActive('/tabs/images') ? 'text-primary-600 font-600' : 'text-neutral-500 dark:text-neutral-400'">
            <span class="i-ph-image-duotone text-5" />
            <span>Gallery</span>
            <span v-if="updates.numberOfPictures>0" class="absolute -top-1 right-6 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px]">{{ updates.numberOfPictures }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import axios from 'axios';
import backend from '#/plugins/backend.config';
import { useRoute } from 'vue-router';

const route = useRoute();
const updates = ref({ numberOfMessages: 0, numberOfPictures: 0 });
const intervalId = ref<number | undefined>(undefined);
const token = ref(localStorage.getItem('accessToken'));

const fetchData = async () => {
  try {
    const response = await axios.get(backend.construct('updates'), { headers: { Authorization: `Bearer ${token.value}` } });
    Object.assign(updates.value, response.data);
    localStorage.setItem('lastDownloadMessages', response.data.lastDownloadMessages);
    localStorage.setItem('lastDownloadPictures', response.data.lastDownloadPictures);
  } catch (error) {
    console.log(`Failed to fetch updates: ${error}`);
  }
};

const isActive = (path: string) => route.path.startsWith(path);

onMounted(() => {
  fetchData();
  intervalId.value = window.setInterval(fetchData, 30 * 1000);
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>
