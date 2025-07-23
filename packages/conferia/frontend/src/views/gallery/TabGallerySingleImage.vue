<template>
  <IonPage>
    <IonHeader>
      <IonToolbar class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <template #start>
          <IonButtons>
            <IonBackButton default-href="/tabs/images" />
          </IonButtons>
        </template>
        <IonTitle class="text-lg font-semibold">Photo Details</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="bg-gray-50 dark:bg-gray-900">
      <!-- Image Container -->
      <div class="relative bg-black">
        <img 
          :src="image" 
          :alt="imagePath"
          class="w-full h-auto max-h-96 object-contain"
        />
      </div>

      <!-- Content Card -->
      <div class="p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <!-- Author Info -->
          <div class="p-4 border-b border-gray-100 dark:border-gray-700">
            <div class="flex items-center space-x-3">
              <IonAvatar class="w-12 h-12">
                <img
                  :src="imageData.imageAuthorAvatar || 'https://ionicframework.com/docs/img/demos/avatar.svg'"
                  alt="Profile picture"
                  class="rounded-full"
                />
              </IonAvatar>
              <div class="flex-1">
                <IonChip
                  :router-link="`/attendee/${imageData.authorId}`"
                  class="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full"
                >
                  <IonLabel class="font-medium">{{ imageData.imageAuthor }}</IonLabel>
                </IonChip>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Published by this attendee
                </p>
              </div>
            </div>
          </div>

          <!-- Image Details -->
          <div class="p-4 space-y-3">
            <div v-if="imageData.uploadTime" class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <i class="i-carbon-time text-lg"></i>
              <span>{{ dayjs(imageData.uploadTime).fromNow() }} ({{ dayjs(imageData.uploadTime).format('D MMM, HH:mm') }})</span>
            </div>
            
            <div v-if="imageData.imageLikes > 0" class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <i class="i-carbon-thumbs-up text-lg"></i>
              <span>{{ imageData.imageLikes }} {{ imageData.imageLikes === 1 ? 'like' : 'likes' }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="p-4 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
            <button
              @click="changeLikeStatus"
              class="flex items-center space-x-2 px-4 py-2 rounded-full transition-colors"
              :class="imageData.imageIsLiked 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'"
            >
              <IonIcon
                :icon="imageData.imageIsLiked ? thumbsUp : thumbsUpOutline"
                class="text-lg"
              />
              <span class="font-medium">{{ imageData.imageIsLiked ? 'Liked' : 'Like' }}</span>
            </button>
            
            <IonButton
              v-if="Number(userId) == imageData.authorId"
              color="danger"
              fill="outline"
              size="small"
              @click="deletePicture"
              class="rounded-full"
            >
              <IonIcon :icon="trashOutline" class="mr-2" />
              Delete
            </IonButton>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonAvatar, IonLabel, IonChip, IonButton, alertController, IonGrid, IonRow, IonCol
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { thumbsUpOutline, thumbsUp, trashOutline } from 'ionicons/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import backend from '#/plugins/backend.config';

dayjs.extend(relativeTime);

const token = ref(localStorage.getItem('accessToken'));
const userId = ref(localStorage.getItem('userId'));

const route = useRoute();
const router = useRouter();

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

onMounted(() => {
  getImageData(imagePath);
  image.value = getImageUrl(imagePath);
});

const getImageData = async (filepath: string) => {
  try {
    const response = await axios.get(backend.construct(`gallery/image/${filepath}`, { format: 'jpg' }), { headers: { Authorization: `Bearer ${token.value}` } });
    imageData.value.imageAuthor = response.data.imageAuthor;
    imageData.value.imageLikes = response.data.imageLikes;
    imageData.value.imageIsLiked = response.data.hasLiked;
    imageData.value.authorId = response.data.authorId;
    imageData.value.imageAuthorAvatar = await getAvatarImage(response.data.authorId);
    imageData.value.uploadTime = response.data.uploadTime;
  } catch (e) {
    console.error('Error fetching image data:', e);
  }
};

const getImageUrl = (filepath: string) => {
  return backend.construct(`gallery/images/${filepath}`, { format: 'jpg' });
};

const changeLikeStatus = async () => {
  try {
    await axios.put(backend.construct('gallery/changeLikeStatusGalleyImage'), {
      likes: !imageData.value.imageIsLiked,
      path: imagePath
    }, { headers: { Authorization: `Bearer ${token.value}` } });
    imageData.value.imageIsLiked = !imageData.value.imageIsLiked;
    if (imageData.value.imageIsLiked) {
      imageData.value.imageLikes = imageData.value.imageLikes + 1;
    } else {
      imageData.value.imageLikes = imageData.value.imageLikes - 1;
    }
  } catch (e) {
    console.error('Error changing like status:', e);
  }
};

const getAvatarImage = async (id: number) => {
  try {
    const response = await axios.get(backend.construct(`account/getProfilePicture/${id}`), {
      headers: { Authorization: `Bearer ${token.value}` },
      params: {
        format: 'webp'
      },
      responseType: 'blob' // This tells axios to expect a binary response instead of JSON
    });
    if (response.data.size === 0) {
      return '';
    }
    return URL.createObjectURL(response.data); // Convert the blob to a URL and return it
  } catch (error) {
    console.error('Error fetching image:', error);
    return ''; // Return an empty string or a default image path in case of error
  }
};

const deletePicture = async () => {
  const alert = await alertController.create({
    header: 'Confirm!',
    message: 'Are you sure you want to delete this picture?',
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      { text: 'Delete',
        handler: async () => {
          await axios.delete(backend.construct('gallery/images'), {
            headers: {
              'Authorization': `Bearer ${token.value}`,
              'Content-Type': 'application/json'
            },
            data: {
              imagePaths: [imagePath]
            }
          });

          router.push('/tabs/images/' + Math.random());

          return;
        }
      }
    ]
  });

  await alert.present();
};

</script>

<style scoped>
.like-icon{
  font-size: 32px;
}

.Published-text{
  font-size: 18px;
}
</style>
