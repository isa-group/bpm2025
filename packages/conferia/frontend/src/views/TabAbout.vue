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

    <div class="px-4 py-6 pb-20 space-y-6">
      <!-- App Logo and Title -->
      <Card class="overflow-hidden shadow-sm">
        <template #header>
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-2 border-b border-blue-100 dark:border-blue-800">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <i class="i-carbon-information text-xl text-white"></i>
              </div>
              <h2 class="text-lg font-bold text-blue-900 dark:text-blue-100">Application Information</h2>
            </div>
          </div>
        </template>
        <template #content>
          <div class="p-4 space-y-6">
            <!-- Development Info -->
            <div class="space-y-4">
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <i class="i-carbon-education text-white"></i>
                </div>
                <div class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p class="font-medium text-gray-900 dark:text-white mb-2">Original Development</p>
                  <p>
                    The original version of this application has been developed at the Technical University of Denmark (DTU) by Anders Fuglsang, Sigurd Valentin Flach de Neergaard during their BSc project entitled <em>"<a
                      href="https://findit.dtu.dk/en/catalog/668f22de1713b1dc48f78e49"
                      target="_blank"
                      class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium">Development of web application with robustness guarantees</a>"</em>.
                  </p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <i class="i-carbon-code text-white"></i>
                </div>
                <div class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p class="font-medium text-gray-900 dark:text-white mb-2">Updates & Extensions</p>
                  <p>
                    The application has then been updated and extended by Andrea Burattin and Giovanni Meroni.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Contact Information -->
      <Card class="shadow-sm">
        <template #header>
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-4 py-2 border-b border-green-100 dark:border-green-800">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <i class="i-carbon-email text-xl text-white"></i>
              </div>
              <h3 class="text-lg font-bold text-green-900 dark:text-green-100">Contact Information</h3>
            </div>
          </div>
        </template>
        <template #content>
          <div class="p-6">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 rounded-full flex items-center justify-center">
                <i class="i-carbon-user text-blue-600 dark:text-blue-300"></i>
              </div>
              <div>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  For questions, please send an email to Andrea Burattin at 
                  <a 
                    href="mailto:andbur@dtu.dk"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium ml-1">andbur@dtu.dk</a>
                </p>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Privacy Section -->
      <Card class="shadow-sm">
        <template #header>
          <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 px-4 py-2 border-b border-orange-100 dark:border-orange-800">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <i class="i-carbon-security text-xl text-white"></i>
              </div>
              <h3 class="text-lg font-bold text-orange-900 dark:text-orange-100">Privacy & Terms</h3>
            </div>
          </div>
        </template>
        <template #content>
          <div class="p-6">
            <div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Learn more about how we handle your data and privacy
              </p>
              <a 
                @click="openPrivacy"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium cursor-pointer inline-flex items-center space-x-2 whitespace-nowrap">
                <i class="i-carbon-document"></i>
                <span>View Privacy Note</span>
              </a>
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
