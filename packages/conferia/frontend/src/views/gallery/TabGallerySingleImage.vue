<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sticky Header -->
    <div class="sticky top-16 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between px-4 py-4">
        <div class="flex items-center space-x-3">
          <button
            @click="goBack"
            class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg class="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
              <path d="M32 15H3.41l8.29-8.29-1.41-1.42L1 14.59V17.41l9.29 9.29 1.41-1.42L3.41 17H32z"/>
            </svg>
          </button>
          <div class="flex-1">
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">
              Photo Details
            </h1>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="downloadImage"
            class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Download image"
          >
            <svg class="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
              <path d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4ZM21 21l-1.41-1.41L17 22.17V2h-2v20.17l-2.59-2.58L11 21l5 5Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <!-- Content -->
    <div v-else class="pb-20">
      <!-- Image Container -->
      <div class="relative bg-black">
        <img 
          :src="image" 
          :alt="imagePath"
          class="w-full h-auto max-h-[70vh] object-contain"
          @error="handleImageError"
        />
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
                  @error="imageData.imageAuthorAvatar = ''"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg class="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M16 8a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <button
                  @click="goToProfile"
                  class="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
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
            <div v-if="imageData.uploadTime" class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <svg class="w-4 h-4" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14Zm0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4Z"/>
                <path d="M20.59 22L15 16.41V7h2v8.58l5 5.01L20.59 22Z"/>
              </svg>
              <span>{{ dayjs(imageData.uploadTime).fromNow() }} ({{ dayjs(imageData.uploadTime).format('D MMM, HH:mm') }})</span>
            </div>
            
            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <svg class="w-4 h-4" viewBox="0 0 32 32" fill="currentColor">
                <path d="M22.45 6a5.47 5.47 0 0 1 3.91 1.64 5.7 5.7 0 0 1 0 8L16 26 5.64 15.64a5.7 5.7 0 0 1 0-8 5.48 5.48 0 0 1 7.82 0L16 10.24l2.53-2.58A5.44 5.44 0 0 1 22.45 6m0-2a7.47 7.47 0 0 0-5.34 2.24L16 7.36l-1.11-1.12A7.49 7.49 0 0 0 4.22 16.9L16 28.73l11.78-11.83A7.49 7.49 0 0 0 22.45 4Z"/>
              </svg>
              <span>{{ imageData.imageLikes }} {{ imageData.imageLikes === 1 ? 'like' : 'likes' }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="p-4 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
            <button
              @click="changeLikeStatus"
              :disabled="likeLoading"
              class="flex items-center space-x-2 px-4 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :class="imageData.imageIsLiked 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'"
            >
              <svg 
                class="w-5 h-5" 
                viewBox="0 0 32 32" 
                fill="currentColor"
                v-if="!likeLoading"
              >
                <path v-if="imageData.imageIsLiked" d="M22.45 6a5.47 5.47 0 0 1 3.91 1.64 5.7 5.7 0 0 1 0 8L16 26 5.64 15.64a5.7 5.7 0 0 1 0-8 5.48 5.48 0 0 1 7.82 0L16 10.24l2.53-2.58A5.44 5.44 0 0 1 22.45 6Z"/>
                <path v-else d="M22.45 6a5.47 5.47 0 0 1 3.91 1.64 5.7 5.7 0 0 1 0 8L16 26 5.64 15.64a5.7 5.7 0 0 1 0-8 5.48 5.48 0 0 1 7.82 0L16 10.24l2.53-2.58A5.44 5.44 0 0 1 22.45 6m0-2a7.47 7.47 0 0 0-5.34 2.24L16 7.36l-1.11-1.12A7.49 7.49 0 0 0 4.22 16.9L16 28.73l11.78-11.83A7.49 7.49 0 0 0 22.45 4Z"/>
              </svg>
              <div v-else class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span class="font-medium">{{ imageData.imageIsLiked ? 'Liked' : 'Like' }}</span>
            </button>
            
            <Button
              v-if="Number(userId) == imageData.authorId"
              severity="danger"
              outlined
              size="small"
              @click="deletePicture"
              :loading="deleteLoading"
            >
              <template #icon>
                <svg class="w-4 h-4 mr-2" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M12 12h2v12h-2zm6 0h2v12h-2z"/>
                  <path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zM8 8h16v18H8zm9-4V2h-2v2H9v2h14V4z"/>
                </svg>
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import Button from 'primevue/button';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import backend from '#/plugins/backend.config';

dayjs.extend(relativeTime);

const toast = useToast();
const token = ref(localStorage.getItem('accessToken'));
const userId = ref(localStorage.getItem('userId'));

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const likeLoading = ref(false);
const deleteLoading = ref(false);

const imageData = ref({
  imageAuthor: '',
  imageLikes: 0,
  imageIsLiked: false,
  authorId: 0,
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
    const response = await axios.get(backend.construct(`gallery/image/${filepath}`), { 
      headers: { Authorization: `Bearer ${token.value}` },
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

const getImageUrl = (filepath: string): string => {
  return backend.construct(`gallery/images/${filepath}?format=jpg`);
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
    await axios.put(backend.construct('gallery/changeLikeStatusGalleyImage'), {
      likes: imageData.value.imageIsLiked,
      path: imagePath
    }, { headers: { Authorization: `Bearer ${token.value}` } });
    
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

const getAvatarImage = async (id: number): Promise<string> => {
  try {
    const response = await axios.get(backend.construct(`account/getProfilePicture/${id}`), {
      headers: { Authorization: `Bearer ${token.value}` },
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
    await axios.delete(backend.construct('gallery/images'), {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
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
    router.push('/tabs/images');
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

const downloadImage = (): void => {
  const imageUrl = getImageUrl(imagePath);
  fetch(imageUrl)
    .then(res => res.blob())
    .then((blob) => {
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
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not download image',
        life: 3000
      });
    });
};

const goBack = (): void => {
  router.back();
};

const goToProfile = (): void => {
  if (imageData.value.authorId) {
    router.push(`/attendee/${imageData.value.authorId}`);
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
/* Modern styles with transitions */
.transform-gpu {
  transform: translateZ(0);
}

/* Smooth animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

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
