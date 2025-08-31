<template>
  <TabsPage
    title="Photo Details">
    <template #header-pre>
      <Button
        icon="i-tabler:arrow-left"
        size="small"
        variant="outlined"
        rounded
        @click="$router.back()" />
    </template>
    <template #header-post>
      <div class="flex items-center space-x-2">
        <button
          class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          title="Download image"
          @click="void downloadImage()">
          <svg
            class="w-5 h-5"
            viewBox="0 0 32 32"
            fill="currentColor">
            <path d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4ZM21 21l-1.41-1.41L17 22.17V2h-2v20.17l-2.59-2.58L11 21l5 5Z" />
          </svg>
        </button>
      </div>
    </template>
    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
    </div>

    <!-- Content -->
    <div
      v-else
      class="pb-20">
      <!-- Image Container -->
      <div class="relative bg-black">
        <img
          :src="image"
          :alt="imagePath"
          class="w-full h-auto max-h-[70vh] object-contain"
          @error="handleImageError">
      </div>

      <!-- Content Card -->
      <div class="p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <!-- Author Info -->
          <div class="p-4 border-b border-gray-100 dark:border-gray-700">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                <img
                  v-if="imageData.imageAuthorAvatar"
                  :src="imageData.imageAuthorAvatar"
                  alt="Profile picture"
                  class="w-full h-full object-cover"
                  @error="imageData.imageAuthorAvatar = ''">
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg
                    class="w-6 h-6"
                    viewBox="0 0 32 32"
                    fill="currentColor">
                    <path d="M16 8a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <button
                  class="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  @click="goToProfile">
                  <span class="font-medium">{{ imageData.imageAuthor || 'Unknown Author' }}</span>
                </button>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Published by this attendee
                </p>
              </div>
            </div>
          </div>

          <!-- Image Details -->
          <div class="p-4 space-y-3">
            <div
              v-if="imageData.uploadTime"
              class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <svg
                class="w-4 h-4"
                viewBox="0 0 32 32"
                fill="currentColor">
                <path d="M16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14Zm0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4Z" />
                <path d="M20.59 22L15 16.41V7h2v8.58l5 5.01L20.59 22Z" />
              </svg>
              <span>{{ dayjs(imageData.uploadTime).fromNow() }} ({{ dayjs(imageData.uploadTime).format('D MMM, HH:mm') }})</span>
            </div>

            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <svg
                class="w-4 h-4"
                viewBox="0 0 32 32"
                fill="currentColor">
                <path d="M22.45 6a5.47 5.47 0 0 1 3.91 1.64 5.7 5.7 0 0 1 0 8L16 26 5.64 15.64a5.7 5.7 0 0 1 0-8 5.48 5.48 0 0 1 7.82 0L16 10.24l2.53-2.58A5.44 5.44 0 0 1 22.45 6m0-2a7.47 7.47 0 0 0-5.34 2.24L16 7.36l-1.11-1.12A7.49 7.49 0 0 0 4.22 16.9L16 28.73l11.78-11.83A7.49 7.49 0 0 0 22.45 4Z" />
              </svg>
              <span>{{ imageData.imageLikes }} {{ imageData.imageLikes === 1 ? 'like' : 'likes' }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="p-4 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
            <button
              :disabled="likeLoading"
              class="flex items-center space-x-2 px-4 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :class="imageData.imageIsLiked
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'"
              @click="changeLikeStatus">
              <svg
                v-if="!likeLoading"
                class="w-5 h-5"
                viewBox="0 0 32 32"
                fill="currentColor">
                <path
                  v-if="imageData.imageIsLiked"
                  d="M22.45 6a5.47 5.47 0 0 1 3.91 1.64 5.7 5.7 0 0 1 0 8L16 26 5.64 15.64a5.7 5.7 0 0 1 0-8 5.48 5.48 0 0 1 7.82 0L16 10.24l2.53-2.58A5.44 5.44 0 0 1 22.45 6Z" />
                <path
                  v-else
                  d="M22.45 6a5.47 5.47 0 0 1 3.91 1.64 5.7 5.7 0 0 1 0 8L16 26 5.64 15.64a5.7 5.7 0 0 1 0-8 5.48 5.48 0 0 1 7.82 0L16 10.24l2.53-2.58A5.44 5.44 0 0 1 22.45 6m0-2a7.47 7.47 0 0 0-5.34 2.24L16 7.36l-1.11-1.12A7.49 7.49 0 0 0 4.22 16.9L16 28.73l11.78-11.83A7.49 7.49 0 0 0 22.45 4Z" />
              </svg>
              <div
                v-else
                class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span class="font-medium">{{ imageData.imageIsLiked ? 'Liked' : 'Like' }}</span>
            </button>

            <Button
              v-if="userId === imageData.authorId"
              severity="danger"
              outlined
              size="small"
              :loading="deleteLoading"
              @click="deletePicture">
              <template #icon>
                <svg
                  class="w-4 h-4 mr-2"
                  viewBox="0 0 32 32"
                  fill="currentColor">
                  <path d="M12 12h2v12h-2zm6 0h2v12h-2z" />
                  <path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zM8 8h16v18H8zm9-4V2h-2v2H9v2h14V4z" />
                </svg>
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </TabsPage>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { axiosKey, userIdKey } from '#/plugins/symbols';
import TabsPage from '#/components/TabsPage.vue';
import { usePhotoGallery } from '#/composables/usePhotoGallery';

dayjs.extend(relativeTime);

const toast = useToast();
const userId = inject(userIdKey)!;
const axios = inject(axiosKey)!;

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const likeLoading = ref(false);
const deleteLoading = ref(false);

const {
  getImageUrl
} = usePhotoGallery();

const imageData = ref({
  imageAuthor: '',
  imageLikes: 0,
  imageIsLiked: false,
  authorId: '',
  imageAuthorAvatar: '',
  uploadTime: ''
});
const image = ref('');
const imagePath = route.params.imageId as string;

onMounted(async () => {
  try {
    await getImageData(imagePath);
    image.value = getImageUrl(imagePath);
  } catch (error) {
    console.error('Error loading image:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not load image details',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
});

const getImageData = async (filepath: string): Promise<void> => {
  try {
    const response = await axios.get(`gallery/image/${filepath}`, {
      params: { format: 'jpg' }
    });
    imageData.value.imageAuthor = response.data.imageAuthor;
    imageData.value.imageLikes = response.data.imageLikes;
    imageData.value.imageIsLiked = response.data.hasLiked;
    imageData.value.authorId = response.data.authorId;
    imageData.value.imageAuthorAvatar = await getAvatarImage(response.data.authorId);
    imageData.value.uploadTime = response.data.uploadTime;
  } catch (error) {
    console.error('Error fetching image data:', error);
    throw error;
  }
};

const changeLikeStatus = async (): Promise<void> => {
  if (likeLoading.value) return;

  likeLoading.value = true;
  const previousLikeStatus = imageData.value.imageIsLiked;
  const previousLikeCount = imageData.value.imageLikes;

  // Optimistic update
  imageData.value.imageIsLiked = !imageData.value.imageIsLiked;
  imageData.value.imageLikes += imageData.value.imageIsLiked ? 1 : -1;

  try {
    await axios.put('gallery/changeLikeStatusGalleyImage', {
      likes: imageData.value.imageIsLiked,
      path: imagePath
    });

    toast.add({
      severity: 'success',
      summary: imageData.value.imageIsLiked ? 'Liked!' : 'Unliked',
      detail: imageData.value.imageIsLiked ? 'You liked this image' : 'You removed your like',
      life: 2000
    });
  } catch (error) {
    // Revert optimistic update
    imageData.value.imageIsLiked = previousLikeStatus;
    imageData.value.imageLikes = previousLikeCount;

    console.error('Error changing like status:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not update like status',
      life: 3000
    });
  } finally {
    likeLoading.value = false;
  }
};

const getAvatarImage = async (id: string): Promise<string> => {
  try {
    const response = await axios.get(`account/getProfilePicture/${id}`, {
      params: { format: 'webp' },
      responseType: 'blob'
    });
    if (response.data.size === 0) {
      return '';
    }
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching avatar:', error);
    return '';
  }
};

const deletePicture = async (): Promise<void> => {
  if (deleteLoading.value) return;

  // Use browser confirm instead of Ionic alert
  const confirmed = confirm('Are you sure you want to delete this picture?');
  if (!confirmed) return;

  deleteLoading.value = true;

  try {
    await axios.delete('gallery/images', {
      data: {
        imagePaths: [imagePath]
      }
    });

    toast.add({
      severity: 'success',
      summary: 'Deleted',
      detail: 'Image has been deleted successfully',
      life: 3000
    });

    // Navigate back to gallery
    void router.push('/tabs/images');
  } catch (error) {
    console.error('Error deleting image:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not delete image',
      life: 3000
    });
  } finally {
    deleteLoading.value = false;
  }
};

const downloadImage = async (): Promise<void> => {
  try {
    const imageUrl = getImageUrl(imagePath);
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = imagePath;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast.add({
      severity: 'success',
      summary: 'Download started',
      detail: 'Image download has started',
      life: 3000
    });
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not download image',
      life: 3000
    });
  }
};

const goToProfile = (): void => {
  if (imageData.value.authorId) {
    void router.push(`/attendee/${imageData.value.authorId}`);
  }
};

const handleImageError = (): void => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Could not load image',
    life: 3000
  });
};
</script>

<style scoped>
/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-thumb {
  background: #4a5568;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}
</style>
