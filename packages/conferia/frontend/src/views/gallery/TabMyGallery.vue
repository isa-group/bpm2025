<template>
  <ion-page>
    <HeaderBar name="My Gallery" @openActionSheet="openActionSheet" @reloadPage="() => {
      trackButtonClick('Reload Gallery', 'My Gallery', 'Feature');
      reloadPage();
    }"></HeaderBar>

    <ion-content :fullscreen="true" ref="content">
      <ion-grid>
        <ion-row>
          <ion-col size="4" v-for="(image, index) in imagesListMyGallery" :key="index">
            <ion-img :src="getImageWebP(image)" class="gallery-image" :class="{ 'selected-image': imagesSelectedList.includes(image) }"
                     @click="() => {
              trackButtonClick(selectMultiple ? 'Select Image' : 'Open Image', 'My Gallery', 'Feature');
              selectMultiple ? selectImage(image) : goToImage(image);
            }"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab v-if="selectMultiple" vertical="bottom" horizontal="center" slot="fixed" class="custom-fab">
        <ion-fab-button @click="() => {
          trackButtonClick('Deselect Images', 'My Gallery', 'Feature');
          untoggleSelectImage();
        }">
          <ion-icon :icon="close"></ion-icon>
        </ion-fab-button>
        <ion-fab-button color="danger" @click="() => {
          trackButtonClick('Delete Selected Images', 'My Gallery', 'Feature');
          deleteGalleryImage();
        }">
          <ion-icon :icon="trashOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button @click="() => {
          trackButtonClick('Download Selected Images', 'My Gallery', 'Feature');
          downloadImages();
        }">
          <ion-icon :icon="download"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  actionSheetController
} from '@ionic/vue';
import { close, download, trashOutline} from "ionicons/icons";
import axios from "axios";
import {usePhotoGallery} from "@/composables/usePhotoGallery";
import {onMounted, ref} from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import router from "@/router";
import {onBeforeRouteLeave, onBeforeRouteUpdate} from "vue-router";
import backend from "../../../backend.config";
import {googleanalytics} from "@/composables/googleanalytics";

const { trackButtonClick } = googleanalytics();
const { takePhotoGallery } = usePhotoGallery();
const token = ref(localStorage.getItem("accessToken"))

const imagesListMyGallery = ref<string[]>([]);
const selectMultiple = ref(false);
const imagesSelectedList = ref<string[]>([]);

onMounted(async () => {
  await fetchMyGalleryMetadata()
});

onBeforeRouteUpdate((to, from, next) => {
  if (to.path === '/tabs/images/myGallery') {
    fetchMyGalleryMetadata();
  }
  next();
});

const resetMyGalleryData = async () => {
  imagesListMyGallery.value = [];
  imagesSelectedList.value = [];
  selectMultiple.value = false;
};

onBeforeRouteLeave((to, from) => {
  resetMyGalleryData();
});

const actionSheet = ref<HTMLIonActionSheetElement | null>(null);
const openActionSheet = async () => {
  actionSheet.value = await actionSheetController.create({
    header: 'My Gallery Options',
    buttons: [{
      text: 'Go to Gallery',
      handler: () => {
        router.push('/tabs/images');
      }
    }, {
      text: 'Select Images',
      handler: () => {
        selectMultiple.value = true;
      }
    }, {
      text: 'Upload image',
      handler: () => {
        uploadGalleryImage();
      }
    }]
  });
  return actionSheet.value.present();
};

const reloadPage = async () => {
  imagesListMyGallery.value = [];
  await fetchMyGalleryMetadata();
}

const fetchMyGalleryMetadata = async () => {
  try {
    const response = await axios.get(backend.construct(`gallery/myImages`), {headers: {Authorization: `Bearer ${token.value}`}});
    if (response.data.imagePaths.length > 0) {
      imagesListMyGallery.value = [...imagesListMyGallery.value, ...response.data.imagePaths];
    }
  } catch (error) {
    console.error('Error fetching gallery images:', error);
  }
};

const uploadGalleryImage = async () => {
  try {
    const photoBlob = await takePhotoGallery();
    // Create an instance of FormData
    const formData = new FormData();

    // Append the photo blob to the form data, the 'file' key should match the name expected in the backend
    formData.append('file', photoBlob as Blob);

    // Make the POST request with the form data and proper headers
    const uploadResponse = await axios.post(backend.construct("gallery/images"), formData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'multipart/form-data' // This might be optional as axios sets it automatically with the correct boundary
      }
    });
    if (uploadResponse.status === 200) {
      console.log('Upload successful');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}
const deleteGalleryImage = async () => {
  if (imagesSelectedList.value.length === 0) {
    console.log("Zero elements selected")
    return;
  }
  try {
    await axios.delete(backend.construct("gallery/images"), {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      data: {
        imagePaths: imagesSelectedList.value
      }
    });
    imagesListMyGallery.value = imagesListMyGallery.value.filter(image => !imagesSelectedList.value.includes(image));
    imagesSelectedList.value = [];
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

const downloadImage = (filePath:string) => {
  const image = getImageJPG(filePath);
  fetch(image)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filePath;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        self.postMessage('Download complete');
      })
      .catch(() => self.postMessage('Download failed'));
}

const downloadImages = () => {
  if (imagesSelectedList.value.length === 0) {
    console.log("Zero elements selected")
    return;
  }
  for (const image of imagesSelectedList.value) {
    downloadImage(image)
  }
  imagesSelectedList.value = [];
}

const getImageWebP = (filepath:string) => {
  return backend.construct(`gallery/images/${filepath}`, {format: 'webp'});
};
const getImageJPG = (filepath:string) => {
  return backend.construct(`gallery/images/${filepath}`, {format: 'jpg'});
};

const goToImage = (imageId:string) => {
  router.push(`/tabs/singleimage/${imageId}`);
}

const selectImage = (imageId:string) => {
  if (imagesSelectedList.value.includes(imageId)) {
    imagesSelectedList.value = imagesSelectedList.value.filter(image => image !== imageId);
    return;
  }
  imagesSelectedList.value.push(imageId);
}

const untoggleSelectImage = () => {
  selectMultiple.value = false;
  imagesSelectedList.value = [];
}


</script>

<style scoped>
.selected-image {
  border: 2px solid #3880ff; /* Adjust as needed */
}

.gallery-image {
  width: 100%; /* Responsive width */
  height: 100px; /* Fixed height */
  object-fit: cover; /* Cover the container without distorting the aspect ratio */
}
.custom-fab {
  display: flex;
  flex-direction: row; /* Aligns children (fab buttons) in a row */
  justify-content: center; /* Centers the buttons horizontally */
  align-items: center; /* Aligns the buttons vertically at the center */
}
.custom-fab ion-fab-button:not(:last-child) {
  margin-right: 10px; /* Adds space to the right of each button except the last one */
}

</style>