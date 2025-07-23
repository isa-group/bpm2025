<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />
      <template #bottom>
        <IonTabBar id="footer">
          <IonTabButton
            tab="home"
            href="/tabs/home">
            <IonIcon
              aria-hidden="true"
              :icon="home" />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="calendar"
            href="/tabs/calendar">
            <IonIcon
              aria-hidden="true"
              :icon="calendar" />
            <IonLabel>Agenda</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="attendees"
            href="/tabs/attendees">
            <IonIcon
              aria-hidden="true"
              :icon="people" />
            <IonLabel>Attendees</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="messages"
            href="/tabs/messages">
            <IonBadge
              v-if="updates.numberOfMessages > 0"
              color="danger">
              {{ updates.numberOfMessages }}
            </IonBadge>
            <IonIcon
              aria-hidden="true"
              :icon="mail" />
            <IonLabel>Messages</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="images"
            href="/tabs/images">
            <IonBadge
              v-if="updates.numberOfPictures > 0"
              color="danger">
              {{ updates.numberOfPictures }}
            </IonBadge>
            <IonIcon
              aria-hidden="true"
              :icon="images" />
            <IonLabel>Gallery</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </template>
    </IonTabs>
  </IonPage>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonBadge } from '@ionic/vue';
import { home, calendar, people, images, mail } from 'ionicons/icons';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import axios from 'axios';
import backend from '#/backend.config';

const updates = ref({ numberOfMessages: 0, numberOfPictures: 0 });
const intervalId = ref(0);
const token = ref(localStorage.getItem('accessToken'));

const fetchData = async () => {
  try {
    const response = await axios.get(backend.construct('updates'), { headers: { Authorization: `Bearer ${token.value}` } });
    Object.assign(updates.value, response.data);
    localStorage.setItem('lastDownloadMessages', response.data.lastDownloadMessages);
    localStorage.setItem('lastDownloadPictures', response.data.lastDownloadPictures);
  } catch (error) {
    console.log(`Failed to fetch updates: ${error}`);
  }
};

onMounted(() => {
  fetchData();
  intervalId.value = window.setInterval(fetchData, 30 * 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});

</script>
