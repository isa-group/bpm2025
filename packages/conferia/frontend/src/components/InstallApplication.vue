<template>
  <ion-toast
      v-if="!isInstalled"
      :is-open="true"
      color="danger"
      message="We recommend installing the application."
      position-anchor="footer"
      duration="10000"
      :buttons="toastButtons"
  />
</template>

<script setup lang="ts">
import {IonToast} from "@ionic/vue";
import {onMounted, ref} from "vue";

const isInstalled = ref(false);
const toastButtons = [
  {
    text: 'Dismiss',
    handler: () => {
      isInstalled.value = true;
    },
  },
];

const checkInstallation = () => {
  if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
    isInstalled.value = true;
  } else {
    window.addEventListener('appinstalled', () => {
      isInstalled.value = true;
    });
  }
}

onMounted(checkInstallation);

</script>