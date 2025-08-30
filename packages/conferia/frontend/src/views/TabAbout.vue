<template>
  <TabsPage
    title="About"
    subtitle="Learn more about this application">
    <div class="px-4 py-6 pb-20 space-y-6">
      <!-- App Logo and Title -->
      <Card class="overflow-hidden shadow-sm">
        <template #header>
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-2 border-b border-blue-100 dark:border-blue-800">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <i class="i-tabler:info-circle text-xl text-white" />
              </div>
              <h2 class="text-lg font-bold text-blue-900 dark:text-blue-100">
                Application Information
              </h2>
            </div>
          </div>
        </template>
        <template #content>
          <div class="p-4 space-y-6">
            <!-- Development Info -->
            <div class="space-y-4">
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <i class="i-mdi:university text-white" />
                </div>
                <div class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p class="font-medium text-gray-900 dark:text-white mb-2">
                    Original Development
                  </p>
                  <p>
                    The original version of this application has been developed at the Technical University of Denmark (DTU) by Anders Fuglsang, Sigurd Valentin Flach de Neergaard during their BSc project entitled <em>"<a
                      href="https://findit.dtu.dk/en/catalog/668f22de1713b1dc48f78e49"
                      target="_blank"
                      class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium">Development of web application with robustness guarantees</a>"</em>.
                  </p>
                  <p>
                    The application has then been updated and extended by Andrea Burattin and Giovanni Meroni.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <i class="i-tabler:code text-white" />
                </div>
                <div class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p class="font-medium text-gray-900 dark:text-white mb-2">
                    Updates & Extensions
                  </p>
                  <p>
                    The user interface has been revamped by the BPM2025 conference organizing team:
                  </p>
                  <br>
                  <ul>
                    <li>
                      · Fernando Fernández (also in charge of all the web & payment system):
                      <a
                        href="https://github.com/ferferga"
                        target="_blank"
                        class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium">
                        GitHub
                      </a>
                    </li>
                    <li>
                      · Adrián Romero Flores:
                      <a
                        href="https://github.com/adrrf"
                        target="_blank"
                        class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium">
                        GitHub
                      </a>
                    </li>
                    <li>
                      · Álvaro Jesús Bernal Caunedo:
                      <a
                        href="https://github.com/alvarobernal2412"
                        target="_blank"
                        class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium">
                        GitHub
                      </a>
                    </li>
                  </ul>
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
                <i class="i-tabler:mail text-xl text-white" />
              </div>
              <h3 class="text-lg font-bold text-green-900 dark:text-green-100">
                Contact Information
              </h3>
            </div>
          </div>
        </template>
        <template #content>
          <div class="p-6">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 rounded-full flex items-center justify-center">
                <i class="i-tabler:user text-blue-600 dark:text-blue-300" />
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
                <i class="i-tabler:shield-check text-xl text-white" />
              </div>
              <h3 class="text-lg font-bold text-orange-900 dark:text-orange-100">
                Privacy & Terms
              </h3>
            </div>
          </div>
        </template>
        <template #content>
          <div class="p-6">
            <div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Learn more about how we handle your data and privacy
              </p>
              <PrivacyNote />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </TabsPage>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import PrivacyNote from '#/components/PrivacyNote.vue';
import TabsPage from '#/components/TabsPage.vue';
</script>
