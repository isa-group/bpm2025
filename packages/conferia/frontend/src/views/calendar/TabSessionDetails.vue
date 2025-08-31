<template>
  <!-- Modal Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    @click="closeModal">
    <!-- Modal Container -->
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
      @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex-1">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white text-left">
            Session Details
          </h2>
        </div>
        <button
          class="w-8 h-8 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center"
          @click="closeModal">
          <span class="text-lg">✕</span>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
        <!-- Loading State -->
        <div
          v-if="loading"
          class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin w-8 h-8 border-4 border-blue-200 dark:border-blue-800 border-t-blue-500 dark:border-t-blue-400 rounded-lg" />
          <p class="text-gray-600 dark:text-gray-300 mt-4">
            Loading session details...
          </p>
        </div>

        <!-- Content -->
        <div
          v-else
          class="space-y-6">
          <!-- Session Title -->
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {{ pageData.name }}
            </h1>
          </div>

          <!-- Session Info Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Host Info -->
            <div 
              v-if="pageData.host && pageData.host.trim() && pageData.host !== 'TBA'"
              class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Host</span>
              </div>
              <p class="text-gray-900 dark:text-white font-medium">
                {{ pageData.host }}
              </p>
            </div>

            <!-- Location Info -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Location</span>
              </div>
              <p class="text-gray-900 dark:text-white font-medium">
                {{ pageData.location || 'TBA' }}
              </p>
            </div>
          </div>

          <!-- Time Info -->
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
            <div class="flex items-center space-x-2 mb-2">
              <span class="text-sm font-medium text-blue-700 dark:text-blue-300">Schedule</span>
            </div>
            <p class="text-blue-900 dark:text-blue-100 font-medium">
              {{ dayjs(pageData.startTime).format('D MMMM, HH:mm') }} - {{ dayjs(pageData.endTime).format('HH:mm') }}
            </p>
          </div>

          <!-- Session Content -->
          <div
            v-if="pageData.content"
            class="prose dark:prose-invert max-w-none">
            <div
              class="text-gray-700 dark:text-gray-300 leading-relaxed"
              v-html="pageData.content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { axiosKey } from '#/plugins/symbols';

const { isOpen, id } = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['didDismiss']);
const axios = inject(axiosKey)!;
const loading = ref(true);

// const route = useRoute();
const pageData = reactive({
  name: '', // Session name for the header
  host: '',
  location: '',
  startTime: '',
  endTime: '',
  content: '' // Session content
});

const closeModal = () => {
  emit('didDismiss');
};

// Watch for isOpen changes to trigger data loading
watch(() => isOpen, (newValue) => {
  if (newValue) {
    void openModal();
  }
});

/**
 * Fix UTF-8 encoding issues for text that may contain special characters
 */
function fixTextEncoding(text: string | undefined): string | undefined {
  if (!text) return text;
  
  try {
    // Common double-encoded UTF-8 patterns for Polish and other European characters
    let fixed = text
      // Polish characters
      .replace(/Å›/g, 'ś')
      .replace(/Ä…/g, 'ą')
      .replace(/Å„/g, 'ń')
      .replace(/Å‚/g, 'ł')
      .replace(/Å¼/g, 'ż')
      .replace(/Å¯/g, 'ź')
      .replace(/Ä™/g, 'ę')
      .replace(/Ä‡/g, 'ć')
      .replace(/Ã³/g, 'ó')
      
      // German/French characters
      .replace(/Ã¡/g, 'á')
      .replace(/Ã©/g, 'é')
      .replace(/Ã­/g, 'í')
      .replace(/Ãº/g, 'ú')
      .replace(/Ã±/g, 'ñ')
      .replace(/Ã¼/g, 'ü')
      .replace(/Ã¤/g, 'ä')
      .replace(/Ã¶/g, 'ö')
      .replace(/ÃŸ/g, 'ß')
      
      // More double-encoded patterns
      .replace(/â€™/g, "'")
      .replace(/â€œ/g, '"')
      .replace(/â€/g, '"')
      .replace(/â€"/g, '–')
      .replace(/â€"/g, '—');
    
    // Handle question mark replacements for specific known cases
    // This is specifically for "Mateusz ?la?y?ski" -> "Mateusz Ślażyński"
    if (fixed.includes('?la?y?ski')) {
      fixed = fixed.replace('?la?y?ski', 'ślażyński');
    }
    if (fixed.includes('Mateusz ?')) {
      fixed = fixed.replace('Mateusz ?la?y?ski', 'Mateusz Ślażyński');
    }
    
    return fixed;
  } catch (error) {
    console.warn('Error fixing text encoding:', error);
    return text;
  }
}

const openModal = async () => {
  try {
    if (id !== '') {
      loading.value = true;
      const response = await axios.get(`agenda/session/${id}`);

      const sessionData = response.data;

      // Use original times without timezone adjustment and fix text encoding
      Object.assign(pageData, {
        ...sessionData,
        name: fixTextEncoding(sessionData.name),
        host: fixTextEncoding(sessionData.host),
        location: fixTextEncoding(sessionData.location),
        content: fixTextEncoding(sessionData.content)
      });

      loading.value = false;
    }
  } catch (error) {
    console.error('Failed to fetch session data', error);
    loading.value = false;
  }
};
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Prose styling for dark mode content */
:deep(.prose) {
  color: inherit;
  max-width: none;
}

:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3),
:deep(.prose h4),
:deep(.prose h5),
:deep(.prose h6) {
  color: inherit;
}

:deep(.prose p),
:deep(.prose li),
:deep(.prose strong) {
  color: inherit;
}

:deep(.prose a) {
  color: #2563eb;
  text-decoration: none;
}

:deep(.prose a:hover) {
  color: #1d4ed8;
}

/* Dark mode prose links */
html.dark :deep(.prose a) {
  color: #60a5fa;
}

html.dark :deep(.prose a:hover) {
  color: #93c5fd;
}
</style>
