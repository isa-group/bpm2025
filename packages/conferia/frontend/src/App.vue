<template>
  <ion-app class="app-container">
    <DesktopNotification />
    <OfflinePopup />
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import OfflinePopup from './components/OfflineComponent.vue';
import DesktopNotification from './components/DesktopNotification.vue';
</script>

<style scoped>
/* Set a max width and center the container */
.app-container {
  max-width: 1024px; /* Set the max width */
  margin: 0 auto;    /* Center horizontally */
}

/* Center the content inside the content-wrapper */
.content-wrapper {
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center;     /* Vertically center */
  height: 100%;            /* Full height to allow vertical centering */
  padding: 16px;           /* Optional padding */
}

/* Ensure ion-content fills the available space */
ion-content {
  --padding-start: 0px; /* Remove default padding */
  --padding-end: 0px;
}
</style>