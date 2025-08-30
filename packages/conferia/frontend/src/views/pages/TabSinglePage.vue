<template>
  <TabsPage
    :title="pageData.title || 'Page'">
    <template #header-pre>
      <Button
        icon="i-tabler:arrow-left"
        size="small"
        variant="outlined"
        rounded
        @click="$router.back()" />
    </template>

    <div class="px-4 py-6 pb-20">
      <!-- Loading state -->
      <div
        v-if="loading"
        class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="text-center py-12">
        <div class="text-red-500 dark:text-red-400 mb-2">
          <svg
            class="w-12 h-12 mx-auto mb-4"
            viewBox="0 0 32 32"
            fill="currentColor">
            <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z" />
            <path d="M15 8h2v11h-2zm1 14a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 22Z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Error loading page
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          {{ error }}
        </p>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          @click="loadPageData">
          Try Again
        </button>
      </div>

      <!-- Content -->
      <div v-else-if="pageData.title">
        <!-- HTML Content -->
        <div
          v-if="pageData.layoutId === 1"
          class="prose prose-gray dark:prose-invert max-w-none"
          v-html="pageData.content" />

        <!-- List Layout -->
        <div
          v-else-if="pageData.layoutId === 2"
          class="space-y-3">
          <div
            v-for="message in pageData.messages"
            :key="message.id"
            class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p class="text-gray-900 dark:text-white">
              {{ message.content }}
            </p>
          </div>
        </div>

        <!-- Iframe Content -->
        <div
          v-else-if="pageData.layoutId === 3"
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
          <iframe
            ref="iframeRef"
            class="w-full border-none"
            style="min-height: 500px; height: 70vh;"
            :src="pageData.content" />
        </div>

        <!-- Default/Unknown layout -->
        <div
          v-else
          class="text-center py-12">
          <div class="text-gray-400 dark:text-gray-500 mb-4">
            <svg
              class="w-12 h-12 mx-auto"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM6 6h20v20H6Z" />
              <path d="M16 24a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6Z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Unknown layout type
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Layout ID: {{ pageData.layoutId }}
          </p>
        </div>
      </div>
    </div>
  </TabsPage>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { inject, reactive, ref } from 'vue';
import { axiosKey } from '#/plugins/symbols';
import TabsPage from '#/components/TabsPage.vue';

interface PageData {
  title: string;
  content: string;
  layoutId: number | null;
  messages?: { id: number; content: string }[];
}

const route = useRoute();
const pageData = reactive<PageData>({ title: '', content: '', layoutId: null });
const axios = inject(axiosKey)!;
const loading = ref(true);
const error = ref<string | null>(null);
const iframeRef = ref<HTMLIFrameElement | null>(null);

const loadPageData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get(`pages/${route.params.id}`);

    Object.assign(pageData, response.data);
  } catch (err: unknown) {
    console.error('Failed to fetch page data:', err);
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosError = err as { response?: { data?: { message?: string } }; message?: string };
      error.value = axiosError.response?.data?.message ?? axiosError.message ?? 'Failed to load page content';
    } else if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = 'Failed to load page content';
    }
  } finally {
    loading.value = false;
  }
};

void loadPageData();
</script>

<style scoped>
/* Prose styling for HTML content */
.prose {
  color: theme('colors.gray.700');
  max-width: none;
}

.prose :where(h1):not(:where([class~="not-prose"] *)) {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 2rem;
}

.prose :where(h2):not(:where([class~="not-prose"] *)) {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose :where(h3):not(:where([class~="not-prose"] *)) {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 1.25rem;
  line-height: 1.625;
}

.prose :where(ul):not(:where([class~="not-prose"] *)) {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  padding-left: 1.625rem;
}

.prose :where(li):not(:where([class~="not-prose"] *)) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.prose :where(a):not(:where([class~="not-prose"] *)) {
  color: theme('colors.blue.600');
  text-decoration: underline;
}

.prose :where(strong):not(:where([class~="not-prose"] *)) {
  font-weight: 600;
}

.prose :where(blockquote):not(:where([class~="not-prose"] *)) {
  font-style: italic;
  border-left: 0.25rem solid theme('colors.gray.300');
  padding-left: 1rem;
  margin: 1.5rem 0;
}

/* Dark mode styles */
.dark .prose {
  color: theme('colors.gray.300');
}

.dark .prose :where(a):not(:where([class~="not-prose"] *)) {
  color: theme('colors.blue.400');
}

.dark .prose :where(blockquote):not(:where([class~="not-prose"] *)) {
  border-left-color: theme('colors.gray.600');
}

.dark .prose :where(h1, h2, h3, h4, h5, h6):not(:where([class~="not-prose"] *)) {
  color: theme('colors.white');
}
</style>
