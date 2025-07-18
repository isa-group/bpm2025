<template>
  <ion-page>
    <HeaderBar name="Home" />

    <ion-content id="main-content" :fullscreen="true">
      <img src="https://www.bpm2025seville.org/assets/cathedral.D2XoYRI5_1wANXk.webp"  alt=""/>

      <ion-card>
        <ion-card-header>
          <div id="logo-large" />
          <ion-card-title>BPM 2025</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          August 31 - September 5, 2025<br>
          Seville, Spain
        </ion-card-content>
      </ion-card>
      <p class="ion-padding" style="font-size: 1.5rem; margin-bottom: 0">
        Pages
      </p>
      <ion-list lines="full">
        <ion-item
            button
            v-for="page in pages"
            :key="page.id"
            :routerLink="`/tabs/page/${page.id}`"
            @click="() => trackButtonClick('Navigate to Page', 'Home Page', 'Feature')">
          <ion-label >{{ page.name }}</ion-label>
          <ion-badge v-if="page.label" color="danger">{{ page.label }}</ion-badge>
        </ion-item>
      </ion-list>
<!--      <InstallApplication />-->
    </ion-content>
  </ion-page>
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
import HeaderBar from "@/components/HeaderBar.vue";
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import {onBeforeRouteLeave} from "vue-router";
import backend from "/backend.config.ts";
import {googleanalytics} from "@/composables/googleanalytics.ts";

const{trackButtonClick} = googleanalytics()

const pages = reactive([]);
const token = localStorage.getItem("accessToken")

const closeSettingsMenu = async () => {
  await menuController.close('settings-menu');
};

onBeforeRouteLeave((to, from) => {
  closeSettingsMenu();
});

onMounted(async () => {
  try {
    const response = await axios.get(backend.construct( 'pages'),{ headers: { Authorization: `Bearer ${token}` } });
    pages.splice(0, pages.length, ...response.data.map(page => ({
      id: page.id,
      name: page.title,

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
/* Light Mode */
body:not(.dark) #logo-large {
  background-image: url('@/assets/images/logo-1.svg');
}

/* Dark Mode */
body.dark #logo-large {
  background-image: url('@/assets/images/logo-1.svg');
}
</style>
