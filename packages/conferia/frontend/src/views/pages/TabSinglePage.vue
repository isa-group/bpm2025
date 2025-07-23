<template>
  <IonPage>
    <IonHeader>
      <IonToolbar class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <template #start>
          <IonButtons>
            <IonBackButton />
          </IonButtons>
        </template>
        <IonTitle class="text-lg font-semibold">{{ pageData.title || 'Page' }}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent
      id="main-content"
      :fullscreen="true"
      class="bg-gray-50 dark:bg-gray-900"
    >
      <!-- HTML Content -->
      <div
        v-if="pageData.layoutId === 1"
        class="p-4"
        v-html="pageData.content"
      />

      <!-- List Layout -->
      <div v-else-if="pageData.layoutId === 2" class="p-4">
        <div class="space-y-2">
          <div
            v-for="message in pageData.messages"
            :key="message.id"
            class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
          >
            <p class="text-gray-900 dark:text-white">{{ message.content }}</p>
          </div>
        </div>
      </div>

      <!-- Iframe Content -->
      <iframe
        v-else-if="pageData.layoutId === 3"
        ref="iframeRef"
        class="w-full h-full border-none"
        :src="pageData.content"
      />
    </IonContent>
  </IonPage>
</template>

<script setup lang="js">
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
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
/* Styles are handled by Tailwind CSS classes */
</style>
