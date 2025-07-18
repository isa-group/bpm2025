<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/images"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ imagePath }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <img :src="image" />
        <ion-card-content>
          <p class="Published-text">
            Published by:
            <ion-chip :router-link="`/attendee/${imageData.authorId}`" @click="() => {
              trackButtonClick('View Author Profile', 'Image Detail', 'Navigation');
            }">
              <ion-avatar>
                <img :src="imageData.imageAuthorAvatar || 'https://ionicframework.com/docs/img/demos/avatar.svg'" alt="Profile picture" />
              </ion-avatar>
              <ion-label>{{ imageData.imageAuthor }}</ion-label>
            </ion-chip>
          </p>
          <p v-if="imageData.uploadTime">
            Picture uploaded {{ dayjs(imageData.uploadTime).fromNow() }} ({{ dayjs(imageData.uploadTime).format('D MMM, HH:mm') }})
          </p>
          <p v-if="imageData.imageLikes > 0">
            Likes: {{ imageData.imageLikes }}
          </p>
        </ion-card-content>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-icon v-if="imageData.imageIsLiked" :icon="thumbsUp" class="like-icon" @click="() => {
                  trackButtonClick('Unlike Image', 'Image Detail', 'Feature');
                  changeLikeStatus();
                }"></ion-icon>
                <ion-icon v-else :icon="thumbsUpOutline" class="like-icon" @click="() => {
                  trackButtonClick('Like Image', 'Image Detail', 'Feature');
                  changeLikeStatus();
                }"></ion-icon>
              </ion-col>
              <ion-col>
                <p class="ion-text-right" v-if="Number(userId) == imageData.authorId">
                  <ion-button color="danger" @click="() => {
                    trackButtonClick('Delete Image', 'Image Detail', 'Feature');
                    deletePicture();
                  }">
                    <ion-icon :icon="trashOutline"></ion-icon> Delete
                  </ion-button>
                </p>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
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
} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {thumbsUpOutline, thumbsUp, trashOutline} from "ionicons/icons";
import backend from "../../../backend.config";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import {googleanalytics} from "@/composables/googleanalytics";

const { trackButtonClick } = googleanalytics();

dayjs.extend(relativeTime);

const token = ref(localStorage.getItem("accessToken"))
const userId = ref(localStorage.getItem("userId"));

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

const getImageData = async (filepath:string) => {
  try {
    const response = await axios.get(backend.construct(`gallery/image/${filepath}`, {format: 'jpg'}), { headers: { Authorization: `Bearer ${token.value}` } });
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

const getImageUrl = (filepath:string) => {
  return backend.construct(`gallery/images/${filepath}`, {format: 'jpg'});
};

const changeLikeStatus = async () => {
  try{
    await axios.put(backend.construct(`gallery/changeLikeStatusGalleyImage`), {
      likes: !imageData.value.imageIsLiked,
      path: imagePath
    }, { headers: { Authorization: `Bearer ${token.value}` } })
    imageData.value.imageIsLiked = !imageData.value.imageIsLiked;
    if (imageData.value.imageIsLiked) {
      imageData.value.imageLikes = imageData.value.imageLikes + 1;
    } else {
      imageData.value.imageLikes = imageData.value.imageLikes - 1;
    }
  } catch (e) {
    console.error('Error changing like status:', e);
  }
}

const getAvatarImage = async (id:number) => {
  try {
    const response = await axios.get(backend.construct(`account/getProfilePicture/${id}`), {
      headers: { Authorization: `Bearer ${token.value}` },
      params: {
        format: 'webp'
      },
      responseType: 'blob'  // This tells axios to expect a binary response instead of JSON
    });
    if (response.data.size === 0) {
      return '';
    }
    return URL.createObjectURL(response.data);  // Convert the blob to a URL and return it
  } catch (error) {
    console.error("Error fetching image:", error);
    return '';  // Return an empty string or a default image path in case of error
  }
}

const deletePicture = async () => {
  const alert = await alertController.create({
    header: 'Confirm!',
    message: 'Are you sure you want to delete this picture?',
    buttons: [
      { text: 'Cancel',  role: 'cancel', },
      { text: 'Delete',
        handler: async () => {
          await axios.delete(backend.construct("gallery/images"), {
            headers: {
              Authorization: `Bearer ${token.value}`,
              'Content-Type': 'application/json'
            },
            data: {
              imagePaths: [imagePath]
            }
          });

          router.push('/tabs/images/' + Math.random());

          return;
        },
      },
    ],
  });

  await alert.present();
}

</script>

<style scoped>
.like-icon{
  font-size: 32px;
}

.Published-text{
  font-size: 18px;
}
</style>