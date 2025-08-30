<template>
  <TabsPage
    title="Gallery"
    :subtitle="selectMultiple ? `${imagesSelectedList.length} selected` : 'Share and discover conference moments'">
    <template #header-post>
      <div class="flex items-center space-x-2">
        <!-- Selection mode actions -->
        <template v-if="selectMultiple">
          <button
            :disabled="imagesSelectedList.length === 0"
            class="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            @click="downloadImages">
            <svg
              class="w-4 h-4"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4ZM21 21l-1.41-1.41L17 22.17V2h-2v20.17l-2.59-2.58L11 21l5 5Z" />
            </svg>
            <span class="font-medium">Download</span>
          </button>
          <button
            class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            @click="untoggleSelectImage">
            <svg
              class="w-5 h-5"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M24 9.4 22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6l1.4 1.4l6.6-6.6l6.6 6.6l1.4-1.4L17.4 16Z" />
            </svg>
          </button>
        </template>
        <!-- Normal mode actions -->
        <template v-else>
          <button
            class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            @click="op?.toggle">
            <svg
              class="w-5 h-5"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1 2 2 0 0 0-.64.1l-2.43.82a11.35 11.35 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.48 11.48 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .38 2.55L5 15.24v1.53l-1.92 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1 2 2 0 0 0 .64-.1l2.43-.82a11.35 11.35 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.48 11.48 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1 2 2 0 0 0 1.73-1L29.3 21a2 2 0 0 0-.38-2.55ZM25.21 24l-2.43-.82a2 2 0 0 0-1.39.24 9.48 9.48 0 0 1-1.85 1.05 2 2 0 0 0-1.15 1.63l-.51 2.52h-4.72l-.51-2.52a2 2 0 0 0-1.15-1.63 9.35 9.35 0 0 1-1.85-1.05 2 2 0 0 0-1.39-.24L6.79 24l-2.36-4 1.92-1.68a2 2 0 0 0 .67-1.68v-2.13a2 2 0 0 0-.67-1.68L4.43 12l2.36-4 2.42.82a2 2 0 0 0 1.39-.24 9.48 9.48 0 0 1 1.85-1.05A2 2 0 0 0 13.6 5.9l.51-2.52h4.72l.51 2.52a2 2 0 0 0 1.15 1.63 9.35 9.35 0 0 1 1.85 1.05 2 2 0 0 0 1.39.24L25.21 8l2.36 4-1.92 1.68a2 2 0 0 0-.67 1.68v2.13a2 2 0 0 0 .67 1.68L27.57 20Z" />
              <path d="M16 22a6 6 0 1 1 6-6 5.94 5.94 0 0 1-6 6Zm0-10a4 4 0 1 0 4 4 3.91 3.91 0 0 0-4-4Z" />
            </svg>
          </button>
          <button
            class="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            @click="uploadGalleryImage">
            <i class="w-4 h-4 i-tabler:circle-plus-filled" />
            <span class="font-medium">Upload</span>
          </button>
        </template>
      </div>
    </template>

    <!-- Filter Overlay -->
    <Popover
      ref="op"
      @show="showFilterOptions = true"
      @hide="showFilterOptions = false">
      <div class="p-6 min-w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h3 class="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
          Filter Images
        </h3>

        <!-- Filter by uploader -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Uploader
          </label>
          <Select
            v-model="selectedUploader"
            :options="uploaderOptions"
            option-label="label"
            option-value="value"
            placeholder="All uploaders"
            class="w-full" />
        </div>

        <!-- Search by filename -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search by Filename
          </label>
          <InputText
            v-model="searchQuery"
            placeholder="Search filename..."
            class="w-full" />
        </div>

        <div class="flex gap-3">
          <Button
            label="Clear"
            class="flex-1"
            severity="secondary"
            @click="clearFilter" />
          <Button
            label="Apply"
            class="w-full mt-4"
            severity="primary"
            @click="applyFilter" />
        </div>
      </div>
    </Popover>    <div class="px-4 py-6 pb-20 pt-8">
      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-400"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M19 3C13.488281 3 9 7.488281 9 13c0 2.394531.84375 4.589844 2.25 6.3125L3.78125 26.78125L5.21875 28.21875L12.6875 20.75C14.410156 22.15625 16.605469 23 19 23c5.511719 0 10-4.488281 10-10S24.511719 3 19 3Zm0 2c4.429688 0 8 3.570313 8 8s-3.570313 8-8 8s-8-3.570313-8-8S14.570313 5 19 5Z" />
            </svg>
          </div>
          <InputText
            v-model="filterAndSearch.searchInput"
            placeholder="Search authors..."
            class="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
        </div>
      </div>

      <!-- Gallery Grid -->
      <div
        v-if="images.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="aspect-square relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md"
          :class="{
            'ring-3 ring-blue-500 shadow-lg': imagesSelectedList.includes(image),
            'opacity-60': selectMultiple && !imagesSelectedList.includes(image)
          }"
          @click="selectMultiple ? selectImage(image) : goToImage(image)">
          <img
            :src="getImageUrl(image)"
            :alt="`Image ${String(Number(index) + 1)}`"
            class="w-full h-full object-cover"
            loading="lazy">

          <!-- Gradient overlay for selection -->
          <div
            v-if="selectMultiple"
            class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <!-- Selection indicator -->
          <div
            v-if="selectMultiple && imagesSelectedList.includes(image)"
            class="absolute top-3 right-3 bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
            <svg
              class="w-4 h-4"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="m14 21.414-5-5.001L10.413 15 14 18.586 21.585 11 23 12.415l-9 8.999z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="!hasMore && images.length === 0"
        class="text-center py-16">
        <div class="mb-6">
          <div class="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg
              class="w-10 h-10 text-gray-400"
              viewBox="0 0 32 32"
              fill="currentColor">
              <path d="M19,14a3,3,0,1,0-3-3A3,3,0,0,0,19,14Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,19,10Z" />
              <path d="M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4Zm0,22H6V20l5-5,5.59,5.59a2,2,0,0,0,2.82,0L21,19l5,5Zm0-4.83-3.59-3.59a2,2,0,0,0-2.82,0L18,19.17l-5.59-5.59a2,2,0,0,0-2.82,0L6,17.17V6H26Z" />
            </svg>
          </div>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          No images
        </h3>
        <p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          No images have been uploaded to the gallery yet. Be the first to share a special moment.
        </p>
        <div class="mt-6">
          <Button
            label="Upload image"
            severity="primary"
            class="px-6 py-2"
            @click="uploadGalleryImage" />
        </div>
      </div>

      <!-- Load More Button -->
      <div
        v-if="hasMore"
        class="mt-8 text-center">
        <Button
          label="Load more"
          severity="secondary"
          outlined
          class="px-8 py-3"
          @click="loadMore" />
      </div>
    </div>
  </TabsPage>
</template>

<script setup lang="ts">
import { inject, onMounted, type Ref, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Popover from 'primevue/popover';
import router from '#/plugins/router';
import { usePhotoGallery } from '#/composables/usePhotoGallery';
import { axiosKey } from '#/plugins/symbols';
import TabsPage from '#/components/TabsPage.vue';

// Interfaces
interface FilterAndSearch {
  searchInput: string;
  filterChoice: string;
  orderValue: boolean;
}

interface SelectOption {
  label: string;
  value: string | boolean;
}

const {
  takePhotoGallery: _takePhotoGallery,
  getImageUrl,
  getImageJPG
} = usePhotoGallery();
const toast = useToast();
const axios = inject(axiosKey)!;

const route = useRoute();
const op: Ref<InstanceType<typeof Popover> | null> = ref(null);

const images = ref<string[]>([]);
const hasMore = ref(true);
const pageNr = ref(0);
const pageSize = 100;

const showFilterOptions = ref(false);
const filterAndSearch: Ref<FilterAndSearch> = ref({
  searchInput: '',
  filterChoice: 'uploadTime',
  orderValue: false
});

const selectMultiple = ref(false);
const imagesSelectedList = ref<string[]>([]);

// Add missing reactive properties
const selectedUploader = ref<string | null>(null);
const uploaderOptions = ref<SelectOption[]>([]);
const searchQuery = ref('');

onMounted(async (): Promise<void> => {
  if (route.params.id) {
    try {
      const response = await axios.get<{ firstname: string; lastname: string }>(`account/getName/${route.params.id}`);
      filterAndSearch.value.searchInput = response.data.firstname + ' ' + response.data.lastname;
    } catch (_e) {
      // User not found
    }
  }
  await fetchGalleryMetadata();
});

const applyFilter = (): void => {
  images.value = [];
  hasMore.value = true;
  pageNr.value = 0;
  if (op.value) {
    op.value.hide();
  }
  void fetchGalleryMetadata();
};

const clearFilter = (): void => {
  selectedUploader.value = null;
  searchQuery.value = '';
  filterAndSearch.value.searchInput = '';
  filterAndSearch.value.filterChoice = 'uploadTime';
  filterAndSearch.value.orderValue = false;
};

const reloadPage = async (): Promise<void> => {
  images.value = [];
  hasMore.value = true;
  pageNr.value = 0;
  await fetchGalleryMetadata();
};

const fetchGalleryMetadata = async (): Promise<void> => {
  if (!hasMore.value) return;
  try {
    const response = await axios.get('gallery/images', {
      params: {
        pageNr: pageNr.value,
        pageSize: pageSize,
        search: filterAndSearch.value.searchInput,
        filterChoice: filterAndSearch.value.filterChoice,
        orderValue: filterAndSearch.value.orderValue
      }
    });
    if (response.data.imagePaths.length > 0) {
      images.value = [...images.value, ...response.data.imagePaths];
      pageNr.value++;
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not load images',
      life: 3000
    });
  }
};

const debouncedFetchAttendees = useDebounceFn(fetchGalleryMetadata, 300);

watch(
  () => filterAndSearch.value.searchInput,
  (newQuery, oldQuery) => {
    if (newQuery !== oldQuery) {
      images.value = [];
      hasMore.value = true;
      pageNr.value = 0;
      void debouncedFetchAttendees();
    }
  }, { immediate: false });

const loadMore = async (): Promise<void> => {
  await fetchGalleryMetadata();
};

const uploadGalleryImage = async (): Promise<void> => {
  try {
    // Simulate photo capture for now
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    const file = await new Promise<File | null>((resolve) => {
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        resolve(target.files?.[0] ?? null);
      };
      input.click();
    });

    if (!file) {
      toast.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No image was selected',
        life: 3000
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    toast.add({
      severity: 'info',
      summary: 'Processing',
      detail: 'Your image is being processed...',
      life: 5000
    });

    // Make the POST request with the form data
    const uploadResponse = await axios.post('gallery/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (uploadResponse.status === 200) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Your image has been published',
        life: 5000
      });
      await reloadPage();
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not upload image',
      life: 3000
    });
  }
};

const downloadImage = async (filePath: string): Promise<void> => {
  try {
    const image = getImageJPG(filePath);
    const res = await fetch(image);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not download image',
      life: 3000
    });
  }
};

const downloadImages = (): void => {
  if (imagesSelectedList.value.length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Select at least one image',
      life: 3000
    });
    return;
  }
  for (const image of imagesSelectedList.value) {
    void downloadImage(image);
  }
  imagesSelectedList.value = [];
  toast.add({
    severity: 'success',
    summary: 'Download started',
    detail: `Downloading ${imagesSelectedList.value.length} images`,
    life: 3000
  });
};

const selectImage = (imageId: string): void => {
  if (imagesSelectedList.value.includes(imageId)) {
    imagesSelectedList.value = imagesSelectedList.value.filter(image => image !== imageId);
    return;
  }
  imagesSelectedList.value.push(imageId);
};

const untoggleSelectImage = (): void => {
  selectMultiple.value = false;
  imagesSelectedList.value = [];
};

const goToImage = (imageId: string): void => {
  void router.push(`/tabs/singleimage/${imageId}`);
};
</script>
