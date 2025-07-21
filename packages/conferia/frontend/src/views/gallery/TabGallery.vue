<template>
  <IonPage>
    <HeaderBar
      name="Gallery"
      @open-action-sheet="openActionSheet"
      @reload-page="reloadPage"
      @open-filter="openFilter" />
    <IonPopover
      :is-open="showFilterOptions"
      class="filterPopover"
      :event="popoverEvent"
      @ion-popover-did-dismiss="showFilterOptions = false">
      <IonList>
        <IonItem>
          <IonSelect
            v-model="filterAndSearch.filterChoice"
            label="Order by:"
            interface="popover">
            <IonSelectOption value="uploadTime">
              Date
            </IonSelectOption>
            <IonSelectOption value="likes">
              Likes
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            v-model="filterAndSearch.orderValue"
            label="Direction:"
            interface="popover">
            <IonSelectOption value="true">
              Ascending
            </IonSelectOption>
            <IonSelectOption value="false">
              Descending
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
      <div class="applyFilterButton">
        <IonButton
          expand="block"
          class="applyButtonText"
          @click="() => { trackButtonClick('Apply Filter Button', 'Gallery', 'Feature'); applyFilter(); }">
          Apply
        </IonButton>
      </div>
    </IonPopover>
    <IonContent
      ref="content"
      :fullscreen="true">
      <IonRefresher
        slot="fixed"
        @ion-refresh="reloadPage">
        <IonRefresherContent />
      </IonRefresher>

      <IonSearchbar
        v-model="filterAndSearch.searchInput"
        placeholder="Search authors..."
        @ion-change="fetchGalleryMetadata" />
      <IonGrid>
        <IonRow>
          <IonCol
            v-for="(image, index) in images"
            :key="index"
            size="4">
            <IonImg
              :src="getImageUrl(image)"
              class="gallery-image"
              :class="{ 'selected-image': imagesSelectedList.includes(image) }"
              @click="() => { trackButtonClick('Gallery Image Click', 'Gallery', 'Feature'); selectMultiple ? selectImage(image) : goToImage(image); }" />
          </IonCol>
        </IonRow>
      </IonGrid>
      <!-- Infinite Scroll -->
      <IonInfiniteScroll
        threshold="10%"
        @ion-infinite="loadMore">
        <IonInfiniteScrollContent
          loading-spinner="bubbles"
          loading-text="Loading more photos..." />
      </IonInfiniteScroll>

      <IonFab
        v-if="selectMultiple"
        slot="fixed"
        vertical="bottom"
        horizontal="center"
        class="custom-fab">
        <IonFabButton @click="untoggleSelectImage">
          <IonIcon :icon="close" />
        </IonFabButton>
        <IonFabButton @click="() => { trackButtonClick('Download Images Button', 'Gallery', 'Feature'); downloadImages(); }">
          <IonIcon :icon="download" />
        </IonFabButton>
      </IonFab>
      <IonFab
        v-if="!selectMultiple"
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        class="custom-fab">
        <IonFabButton @click="() => { trackButtonClick('Upload Gallery Image Button', 'Gallery', 'Feature'); uploadGalleryImage(); }">
          <IonIcon :icon="add" />
        </IonFabButton>
      </IonFab>
    </IonContent>
  </IonPage>
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
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  type InfiniteScrollCustomEvent,
  actionSheetController,
  IonSearchbar,
  IonSelectOption,
  IonSelect,
  IonPopover,
  IonButton,
  IonItem,
  IonRefresher, IonRefresherContent, toastController
} from '@ionic/vue';
import { close, download, add } from 'ionicons/icons';
import axios from 'axios';
import { onMounted, type Ref, ref, watch } from 'vue';
import { debounce } from 'lodash';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import backend from '../../../backend.config';
import router from '@/router';
import HeaderBar from '@/components/HeaderBar.vue';
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import { googleanalytics } from '@/composables/googleanalytics';

const { trackButtonClick } = googleanalytics();
const { takePhotoGallery } = usePhotoGallery();

const token = ref(localStorage.getItem('accessToken'));
const route = useRoute();

const images = ref<string[]>([]);
const hasMore = ref(true);
const pageNr = ref(0);
const pageSize = 100;

const showFilterOptions = ref(false);
const popoverEvent = ref<MouseEvent | null>(null);
const filterAndSearch = ref({
  searchInput: '',
  filterChoice: 'uploadTime',
  orderValue: false
});

const selectMultiple = ref(false);
const imagesSelectedList = ref<string[]>([]);

const content: Ref<InstanceType<typeof IonContent> | null> = ref(null);

onMounted(async () => {
  if (route.params.id) {
    try {
      const response = await axios.get(backend.construct(`account/getName/${route.params.id}`), {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });
      filterAndSearch.value.searchInput = response.data.firstname + ' ' + response.data.lastname;
    } catch (e) {
      console.log('No user with this id');
    }
  }
  await fetchGalleryMetadata();
});

const openFilter = (event: MouseEvent) => {
  popoverEvent.value = event;
  showFilterOptions.value = true;
};

const applyFilter = () => {
  images.value = [];
  hasMore.value = true;
  pageNr.value = 0;
  showFilterOptions.value = false; // Close the popover
  fetchGalleryMetadata();
};

const actionSheet = ref<HTMLIonActionSheetElement | null>(null);
const openActionSheet = async () => {
  actionSheet.value = await actionSheetController.create({
    header: 'Gallery Options',
    buttons: [{
      text: 'Go to My Gallery',
      handler: () => {
        router.push('/tabs/images/myGallery');
        trackButtonClick('My Gallery', 'Gallery', 'Navigation');
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

const reloadPage = async (event) => {
  images.value = [];
  hasMore.value = true;
  pageNr.value = 0;
  await fetchGalleryMetadata();

  if (event) {
    event.target.complete();
  }
};

const fetchGalleryMetadata = async () => {
  if (!hasMore.value) return;
  try {
    const response = await axios.get(backend.construct('gallery/images'), {
      params: {
        pageNr: pageNr.value,
        pageSize: pageSize,
        search: filterAndSearch.value.searchInput,
        filterChoice: filterAndSearch.value.filterChoice,
        orderValue: filterAndSearch.value.orderValue
      },
      headers: {
        Authorization: `Bearer ${token.value}`
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
  }
};

const debouncedFetchAttendees = debounce(fetchGalleryMetadata, 300); // 300ms delay

watch(
  () => filterAndSearch.value.searchInput,
  async (newQuery, oldQuery) => {
    if (newQuery !== oldQuery) {
      images.value = [];
      hasMore.value = true;
      pageNr.value = 0;
      debouncedFetchAttendees();
    }
  }, { immediate: false });

const getImageUrl = (filepath: string) => {
  return backend.construct(`gallery/images/${filepath}?format=webp`);
};

const getImageJPG = (filepath: string) => {
  return backend.construct(`gallery/images/${filepath}?format=jpg`);
};

const loadMore = async (event?: InfiniteScrollCustomEvent) => {
  await fetchGalleryMetadata();
  if (event) {
    await event.target.complete();
  }
};

const uploadGalleryImage = async () => {
  try {
    const photoBlob = await takePhotoGallery();
    const formData = new FormData();

    // Append the photo blob to the form data, the 'file' key should match the name expected in the backend
    formData.append('file', photoBlob as Blob);

    const toast = await toastController.create({
      message: 'Your picture is being processed.',
      duration: 5000,
      positionAnchor: 'footer'
    });
    await toast.present();

    // Make the POST request with the form data and proper headers
    const uploadResponse = await axios.post(backend.construct('gallery/images'), formData, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'multipart/form-data' // This might be optional as axios sets it automatically with the correct boundary
      }
    });
    if (uploadResponse.status === 200) {
      console.log('Upload successful');
      const toast = await toastController.create({
        message: 'Your picture has been posted.',
        duration: 5000,
        positionAnchor: 'footer'
      });
      await toast.present();
      await reloadPage(null);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

const downloadImage = (filePath: string) => {
  const image = getImageJPG(filePath);
  fetch(image)
    .then(res => res.blob())
    .then((blob) => {
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
};

const downloadImages = () => {
  if (imagesSelectedList.value.length === 0) {
    console.log('Zero elements selected');
    return;
  }
  for (const image of imagesSelectedList.value) {
    downloadImage(image);
  }
  imagesSelectedList.value = [];
};

const selectImage = (imageId: string) => {
  if (imagesSelectedList.value.includes(imageId)) {
    imagesSelectedList.value = imagesSelectedList.value.filter(image => image !== imageId);
    return;
  }
  imagesSelectedList.value.push(imageId);
};

const untoggleSelectImage = () => {
  selectMultiple.value = false;
  imagesSelectedList.value = [];
};

const goToImage = (imageId: string) => {
  router.push(`/tabs/singleimage/${imageId}`);
};
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

.filterPopover {
  --width: 60%;
}

.applyFilterButton {
  display: flex;
  justify-content: flex-end;
  padding: 8px;
}

.applyButtonText {
  font-size: 12px;
}
</style>
