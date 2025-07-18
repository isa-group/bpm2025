<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" id="footer">
        <ion-tab-button tab="home" href="/tabs/home" @click="trackButtonClick('home','Main Feature','Navigation')">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="calendar" href="/tabs/calendar" @click="trackButtonClick('calendar', 'Main Feature','Navigation')">
          <ion-icon aria-hidden="true" :icon="calendar" />
          <ion-label>Agenda</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="attendees" href="/tabs/attendees" @click="trackButtonClick('attendees','Main Feature','Navigation')">
          <ion-icon aria-hidden="true" :icon="people" />
          <ion-label>Attendees</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="messages" href="/tabs/messages" @click="trackButtonClick('messages','Main Feature','Navigation')">
          <ion-badge v-if="updates.numberOfMessages > 0" color="danger">{{ updates.numberOfMessages }}</ion-badge>
          <ion-icon aria-hidden="true" :icon="mail" />
          <ion-label>Messages</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="images" href="/tabs/images" @click="trackButtonClick('images','Main Feature','Navigation')">
          <ion-badge v-if="updates.numberOfPictures > 0" color="danger">{{ updates.numberOfPictures }}</ion-badge>
          <ion-icon aria-hidden="true" :icon="images" />
          <ion-label>Gallery</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonBadge } from '@ionic/vue';
import { home, calendar, people, images, mail  } from 'ionicons/icons';
import {onBeforeUnmount, onMounted, ref} from "vue";
import axios from "axios";
import backend from "../../backend.config";
import {googleanalytics} from "@/composables/googleanalytics";

const { trackButtonClick } = googleanalytics();

const updates = ref({numberOfMessages: 0, numberOfPictures: 0});
const intervalId = ref(0);
const token = ref(localStorage.getItem("accessToken"))

const fetchData = async () => {
  try {
    const response = await axios.get(backend.construct('updates'),{ headers: { Authorization: `Bearer ${token.value}` } });
    Object.assign(updates.value, response.data);
    localStorage.setItem('lastDownloadMessages', response.data.lastDownloadMessages);
    localStorage.setItem('lastDownloadPictures', response.data.lastDownloadPictures);
  } catch (error) {
    console.log(`Failed to fetch updates: ${error}`);
  }
}

onMounted(() => {
  fetchData();
  intervalId.value = window.setInterval(fetchData, 30*1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});

</script>
