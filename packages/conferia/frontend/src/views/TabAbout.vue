<template>
  <div class="flex flex-col min-h-dvh">
    <HeaderBar name="About this app" />
    <main id="main-content" class="flex-1 p-4 space-y-4">
      <p>
        The original version of this application has been developed at the Technical University of Denmark (DTU) by Anders Fuglsang, Sigurd Valentin Flach de Neergaard during their BSc project entitled <em>"<a
          href="https://findit.dtu.dk/en/catalog/668f22de1713b1dc48f78e49"
          target="_blank">Development of web application with robustness guarantees</a>"</em>. The application has then been updated and extended by Andrea Burattin and Giovanni Meroni.
      </p>
      <p>For questions, please send an email to Andrea Burattin <a href="mailto:andbur@dtu.dk">andbur@dtu.dk</a>.</p>

      <p class="text-right">
        <button class="text-primary-600 hover:underline" @click="openPrivacy">Privacy note</button>
      </p>
      <PrivacyNote :is-open="isPrivacyOpen" @update:is-open="isPrivacyOpen = $event" />
    </main>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
import HeaderBar from '#/components/HeaderBar.vue';
import PrivacyNote from '#/components/PrivacyNote.vue';

const isPrivacyOpen = ref(false);
const openPrivacy = () => {
  isPrivacyOpen.value = true;
};
</script>
