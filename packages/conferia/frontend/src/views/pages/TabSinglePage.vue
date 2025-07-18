<template>
  <ion-page>
    <HeaderBar :name="pageData.title" :showReload="true" @reloadPage="reload" />

    <ion-content id="main-content" :fullscreen="true">
      <div v-if = "pageData.layoutId === 1" class="ion-padding" v-html="pageData.content"></div>

      <ion-list v-else-if = "pageData.layoutId === 2">
        <ion-item v-for = "message in pageData.messages" :key="message.id">
          <ion-label>{{ message.content }}</ion-label>
        </ion-item>
      </ion-list>

      <iframe v-else-if = "pageData.layoutId === 3" class="full-page" ref="iframeRef" :src="pageData.content" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="js">
import {IonPage, IonContent, IonList, IonItem, IonLabel} from '@ionic/vue';
import HeaderBar from "@/components/HeaderBar.vue";
import { useRoute } from 'vue-router';
import {onMounted, reactive, ref} from 'vue';
import axios from 'axios';
import backend from "/backend.config.ts";

const route = useRoute();
const pageData = reactive({title: '', content: '', layoutId: null });
const token = localStorage.getItem("accessToken")

onMounted(async () => {
  try {
    const response = await axios.get(backend.construct(`pages/${route.params.id}`),{ headers: { Authorization: `Bearer ${token}` } });
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
}
</script>

<style scoped>
.full-page {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

</style>
