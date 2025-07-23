<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sticky Header (matching agenda style) -->
    <div class="sticky top-16 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="px-4 py-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          About
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Learn more about this application
        </p>
      </div>
    </div>

    <div class="px-4 py-6 pb-20 max-w-4xl mx-auto">
      <Card class="shadow-sm">
        <template #header>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 border-b border-blue-100 dark:border-blue-800">
            <h2 class="text-xl font-bold text-blue-900 dark:text-blue-100">Application Information</h2>
          </div>
        </template>
        <template #content>
          <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              The original version of this application has been developed at the Technical University of Denmark (DTU) by Anders Fuglsang, Sigurd Valentin Flach de Neergaard during their BSc project entitled <em>"<a
                href="https://findit.dtu.dk/en/catalog/668f22de1713b1dc48f78e49"
                target="_blank"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline">Development of web application with robustness guarantees</a>"</em>. The application has then been updated and extended by Andrea Burattin and Giovanni Meroni.
            </p>
            <p>
              For questions, please send an email to Andrea Burattin <a 
                href="mailto:andbur@dtu.dk"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline">andbur@dtu.dk</a>.
            </p>

            <div class="text-right pt-4">
              <Button
                label="Privacy note"
                @click="openPrivacy"
                severity="secondary"
                text
                class="px-4 py-2"
              />
            </div>
          </div>
        </template>
      </Card>

      <PrivacyNote
        :is-open="isPrivacyOpen"
        @update:is-open="isPrivacyOpen = $event" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import PrivacyNote from '#/components/PrivacyNote.vue';

const isPrivacyOpen = ref(false);
const openPrivacy = () => {
  isPrivacyOpen.value = true;
};
</script>
