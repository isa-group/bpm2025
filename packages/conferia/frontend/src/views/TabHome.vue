<template>
  <TabsPage
    title="Home"
    subtitle="Welcome to BPM 2025 Conference!">
    <div class="px-4 py-6 pb-20 space-y-6">
      <!-- Hero image -->
      <Card class="overflow-hidden shadow-sm">
        <template #content>
          <div class="relative">
            <img
              src="https://www.bpm2025seville.org/assets/cathedral.D2XoYRI5_1wANXk.webp"
              alt="Seville Cathedral"
              class="w-full h-48 md:h-64 object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </template>
      </Card>

      <!-- Event info card with BPM Logo -->
      <Card class="overflow-hidden shadow-sm">
        <template #header>
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-blue-100 dark:border-blue-800">
            <div class="flex flex-col items-center justify-center">
              <div class="logo-large mb-4" />
              <h2 class="text-2xl font-bold text-blue-900 dark:text-blue-100 text-center">
                BPM 2025
              </h2>
            </div>
          </div>
        </template>
        <template #content>
          <div class="p-6 text-center">
            <p class="text-lg text-gray-700 dark:text-gray-300">
              August 31 - September 5, 2025<br>
              <span class="font-semibold text-gray-900 dark:text-white">Seville, Spain</span>
            </p>
          </div>
        </template>
      </Card>

      <!-- Quick Actions -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-2">
          Quick Actions
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <Card
            class="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 transform-gpu shadow-sm"
            @click="$router.push('/tabs/calendar')">
            <template #content>
              <div class="p-4 text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i class="i-tabler:calendar text-xl dark:text-gray-300  text-gray-600" />
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm">
                  Agenda
                </h4>
                <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  View schedule
                </p>
              </div>
            </template>
          </Card>

          <Card
            class="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 transform-gpu shadow-sm"
            @click="$router.push('/tabs/attendees')">
            <template #content>
              <div class="p-4 text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i class="i-tabler:users text-xl dark:text-gray-300  text-gray-600" />
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm">
                  Attendees
                </h4>
                <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Meet people
                </p>
              </div>
            </template>
          </Card>

          <Card
            class="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 transform-gpu shadow-sm"
            @click="$router.push('/tabs/messages')">
            <template #content>
              <div class="p-4 text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i class="i-tabler:mail text-xl dark:text-gray-300  text-gray-600" />
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm">
                  Messages
                </h4>
                <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Stay updated
                </p>
              </div>
            </template>
          </Card>

          <Card
            class="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 transform-gpu shadow-sm"
            @click="$router.push('/tabs/images')">
            <template #content>
              <div class="p-4 text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i class="i-tabler:photo text-xl dark:text-gray-300  text-gray-600" />
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm">
                  Gallery
                </h4>
                <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  View photos
                </p>
              </div>
            </template>
          </Card>
        </div>
      </div>

      <!-- Pages section -->
      <div v-if="pages.length > 0">
        <div class="flex items-center space-x-3 mb-4 px-2">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Information Pages
          </h3>
        </div>

        <div class="space-y-3">
          <Card
            v-for="page in pages"
            :key="page.id"
            class="cursor-pointer hover:shadow-md transition-all duration-200 shadow-sm hover:scale-102 transform-gpu"
            @click="goToPage(page.id)">
            <template #content>
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                      <i class="i-tabler:file text-gray-600 dark:text-gray-300" />
                    </div>
                    <span class="text-gray-900 dark:text-white font-semibold text-base">
                      {{ page.name }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Badge
                      v-if="page.label"
                      severity="danger"
                      :value="page.label" />
                    <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <svg
                        class="w-4 h-4 text-gray-400"
                        viewBox="0 0 32 32"
                        fill="currentColor">
                        <path d="M12 8l10 8-10 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </TabsPage>
</template>

<script setup lang="ts">
import { inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Badge from 'primevue/badge';
import Card from 'primevue/card';
import TabsPage from '#/components/TabsPage.vue';
import { axiosKey } from '#/plugins/symbols';

const axios = inject(axiosKey)!;

interface Page {
  id: number;
  name: string;
  label?: string;
}

const router = useRouter();
const pages = reactive<Page[]>([]);

const goToPage = (pageId: number) => {
  void router.push(`/tabs/page/${pageId}`);
};

/**
 * Fetch the information pages metadata
 */
async function fetchPages() {
  try {
    const response = await axios.get('pages');

    pages.splice(0, pages.length, ...response.data.map((page: { id: number; title: string; label: string }) => ({
      id: page.id,
      name: page.title,
      label: page.label
    })));
  } catch (error) {
    console.error('Failed to fetch pages:', error);
  }
}

void fetchPages();
</script>

<style scoped>
.logo-large {
  background-image: url('@bpm2025-website/assets/icon?url');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 120px;
  width: 100%;
}

.transform-gpu {
  transform: translateZ(0);
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
