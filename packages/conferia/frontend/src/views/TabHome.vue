<template>
  <div class="flex flex-col min-h-dvh">
    <HeaderBar name="Home" />
    <main id="main-content" class="flex-1">
      <img src="https://www.bpm2025seville.org/assets/cathedral.D2XoYRI5_1wANXk.webp" alt="" class="w-full h-48 object-cover" />

      <section class="px-4 -mt-8">
        <div class="rounded-xl shadow-lg bg-white dark:bg-neutral-900/80 backdrop-blur px-4 py-3 border border-neutral-200/60 dark:border-neutral-800/60">
          <div id="logo-large" class="h-24 w-full bg-center bg-no-repeat bg-contain mb-2" />
          <h2 class="text-xl font-700">BPM 2025</h2>
          <p>August 31 - September 5, 2025<br>Seville, Spain</p>
        </div>
      </section>

      <section class="px-4 mt-6">
        <p class="text-xl mb-2">Pages</p>
        <ul class="divide-y divide-neutral-200/60 dark:divide-neutral-800/60 rounded-lg overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60">
          <li v-for="page in pages" :key="page.id">
            <RouterLink :to="`/tabs/page/${page.id}`" class="flex items-center justify-between px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
              <span>{{ page.name }}</span>
              <span v-if="page.label" class="inline-flex items-center rounded-full bg-red-500/90 text-white text-xs px-2 py-0.5">{{ page.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="js">
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import HeaderBar from '#/components/HeaderBar.vue';
import backend from '#/plugins/backend.config';

const pages = reactive([]);
const token = localStorage.getItem('accessToken');

onMounted(async () => {
  try {
    const response = await axios.get(backend.construct('pages'), { headers: { Authorization: `Bearer ${token}` } });
    pages.splice(0, pages.length, ...response.data.map(page => ({ id: page.id, name: page.title })));
  } catch (error) {
    console.error('Failed to fetch pages', error);
  }
});
</script>

<style scoped>
#logo-large { background-image: url('@bpm2025-website/assets/icon'); }
</style>
