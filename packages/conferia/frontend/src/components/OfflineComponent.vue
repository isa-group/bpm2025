<template>
  <ion-toast
      :is-open="isOffline"
      color="danger"
      message="You are offline. Please check your internet connection."
      :duration="8000"
      position="top"
      :buttons="toastButtons"
      @did-dismiss="handleDismiss">
  </ion-toast>
</template>

<script setup>
import { IonToast } from '@ionic/vue';
import { inject, ref, onMounted, watch } from 'vue';

const isOffline = inject('isOffline', ref(false)); // Ensure default is set if not provided

const handleDismiss = () => {
  isOffline.value = false; // Reset the offline status on dismiss
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
