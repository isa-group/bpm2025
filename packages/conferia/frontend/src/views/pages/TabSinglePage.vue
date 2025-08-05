<template>
  <IonPage>
    <HeaderBar
      :name="pageData.title"
      :show-reload="true"
      @reload-page="reload" />

    <IonContent
      id="main-content"
      :fullscreen="true">
      <div
        v-if="pageData.layoutId === 1"
        class="ion-padding"
        v-html="pageData.content" />

      <IonList v-else-if="pageData.layoutId === 2">
        <IonItem
          v-for="message in pageData.messages"
          :key="message.id">
          <IonLabel>{{ message.content }}</IonLabel>
        </IonItem>
      </IonList>

      <iframe
        v-else-if="pageData.layoutId === 3"
        ref="iframeRef"
        class="full-page"
        :src="pageData.content" />
    </IonContent>
  </IonPage>
</template>

<script setup lang="js">
import { IonPage, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import HeaderBar from '#/components/HeaderBar.vue';
import backend from '#/plugins/backend.config';

const route = useRoute();
const pageData = reactive({ title: '', content: '', layoutId: null });
const token = localStorage.getItem('accessToken');

onMounted(async () => {
  try {
    const response = await axios.get(backend.construct(`pages/${route.params.id}`), { headers: { Authorization: `Bearer ${token}` } });
    Object.assign(pageData, response.data);
  } catch (error) {
    console.error('Failed to fetch page data', error);
    // Handle error appropriately
  }
});

const iframeRef = ref(null);
const reload = () => {
  const iframeSrc = iframeRef.value.src;
  iframeRef.value.src = ''; // Temporarily clear the src
  setTimeout(() => {
    iframeRef.value.src = iframeSrc; // Reassign the original URL after a short delay
  }, 0);
};
</script>

<style scoped>
.full-page {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

</style>
