<template>
  <IonApp class="app-container">
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
/* Theme variables */
import '#/theme/variables.css';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useLocalStorage, usePreferredDark } from '@vueuse/core';
import { watchEffect } from 'vue';

const theme = useLocalStorage('theme', undefined);
const isDark = usePreferredDark();

watchEffect(() => {
  if (theme.value) {
    document.documentElement.classList.toggle('dark', theme.value === 'dark');
  } else {
    // If no saved theme, use the system preference
    document.documentElement.classList.toggle('dark', isDark.value);
  }
});
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
