<template>
  <IonPage>
    <HeaderBar name="Home" />

    <IonContent
      id="main-content"
      :fullscreen="true">
      <img
        src="https://www.bpm2025seville.org/assets/cathedral.D2XoYRI5_1wANXk.webp"
        alt="">

      <IonCard>
        <IonCardHeader>
          <div id="logo-large" />
          <IonCardTitle>BPM 2025</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          August 31 - September 5, 2025<br>
          Seville, Spain
        </IonCardContent>
      </IonCard>
      <p
        class="ion-padding"
        style="font-size: 1.5rem; margin-bottom: 0">
        Pages
      </p>
      <IonList lines="full">
        <IonItem
          v-for="page in pages"
          :key="page.id"
          button
          :router-link="`/tabs/page/${page.id}`">
          <IonLabel>{{ page.name }}</IonLabel>
          <IonBadge
            v-if="page.label"
            color="danger">
            {{ page.label }}
          </IonBadge>
        </IonItem>
      </IonList>
      <!--      <InstallApplication />-->
    </IonContent>
  </IonPage>
</template>

<script setup lang="js">
import {
  IonPage,
  IonContent,
  IonBadge,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  menuController, IonToast
} from '@ionic/vue';
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { onBeforeRouteLeave } from 'vue-router';
import HeaderBar from '#/components/HeaderBar.vue';
import backend from '#/plugins/backend.config';

const pages = reactive([]);
const token = localStorage.getItem('accessToken');

const closeSettingsMenu = async () => {
  await menuController.close('settings-menu');
};

onBeforeRouteLeave((to, from) => {
  closeSettingsMenu();
});

onMounted(async () => {
  try {
    const response = await axios.get(backend.construct('pages'), { headers: { Authorization: `Bearer ${token}` } });
    pages.splice(0, pages.length, ...response.data.map(page => ({
      id: page.id,
      name: page.title

    })));
  } catch (error) {
    console.error('Failed to fetch pages', error);
  }
});
</script>

<style scoped>
#logo-large {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 150px;
  width: 100%;
  margin-bottom: 10px;
}

#logo-large {
  background-image: url('@bpm2025-website/assets/icon');
}
</style>
