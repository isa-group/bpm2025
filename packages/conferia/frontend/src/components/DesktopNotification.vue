<template>
  <ion-toast
      v-if="isDesktop"
      :is-open="true"
      color="danger"
      message="This application is designed to be used on a smartphone."
      position="top"
      :buttons="toastButtons"
      @didDismiss="handleDismiss">
  </ion-toast>
</template>

<script setup>
import {IonButton, IonToast} from "@ionic/vue";

let isDesktop = window.innerWidth > 1024;

const handleDismiss = () => {
  isDesktop = false; // Reset the offline status on dismiss
};

const toastButtons = [
  {
    text: 'Dismiss',
    handler: handleDismiss,
  },
];
</script>

<style>

</style>