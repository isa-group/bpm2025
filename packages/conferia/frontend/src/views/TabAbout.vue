<template>
  <ion-page>
    <HeaderBar name="About this app" />

    <ion-content id="main-content" :fullscreen="true">
      <div class="ion-padding">
        <p>The original version of this application has been developed at the Technical University of Denmark (DTU) by Anders Fuglsang, Sigurd Valentin Flach de Neergaard during their BSc project entitled <em>"<a href="https://findit.dtu.dk/en/catalog/668f22de1713b1dc48f78e49" target="_blank">Development of web application with robustness guarantees</a>"</em>. The application has then been updated and extended by Andrea Burattin and Giovanni Meroni.</p>
        <p>For questions, please send an email to Andrea Burattin <a href="mailto:andbur@dtu.dk">andbur@dtu.dk</a>.</p>

        <p class="ion-text-right"><ion-button fill="clear" @click="() => {
          trackButtonClick('Open Privacy Police', 'About Page', 'Feature')
          openPrivacy
        }">Privacy note</ion-button></p>
        <PrivacyNote :isOpen="isPrivacyOpen" @update:isOpen="isPrivacyOpen = $event" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="js">
import {IonPage, IonContent, IonButton} from '@ionic/vue';
import HeaderBar from "@/components/HeaderBar.vue";
import PrivacyNote from "@/components/PrivacyNote.vue";
import {ref} from "vue";
import {googleanalytics} from "@/composables/googleanalytics.ts";

const{trackButtonClick} = googleanalytics()

const isPrivacyOpen = ref(false);
const openPrivacy = () => {
  isPrivacyOpen.value = true;
};
</script>
