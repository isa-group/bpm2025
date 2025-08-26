<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Apple-style page header -->
    <div class="sticky top-16 z-40 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="p-4 flex items-center space-x-4">
        <Button
          icon="i-carbon-arrow-left"
          severity="secondary"
          text
          @click="$router.back()" />
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ attendee.firstname }} {{ attendee.lastname }}
          </h1>
        </div>
      </div>
    </div>

    <div class="px-4 py-6 pb-20">
      <!-- Profile Section -->
      <div class="flex flex-col items-center mb-8">
        <div class="mb-6">
          <Avatar
            :image="attendee.imageURL || 'https://ionicframework.com/docs/img/demos/avatar.svg'"
            size="xlarge"
            shape="circle"
            class="w-32 h-32 shadow-lg border-4 border-white dark:border-gray-700" />
        </div>

        <div class="text-center">
          <div class="space-y-2 text-gray-600 dark:text-gray-300">
            <div
              v-if="attendee.company"
              class="flex items-center justify-center gap-2">
              <i class="i-carbon-building text-lg" />
              <span>{{ attendee.company }}</span>
            </div>

            <div
              v-if="attendee.country"
              class="flex items-center justify-center gap-2">
              <i class="i-carbon-location text-lg" />
              <span>{{ attendee.country }}</span>
            </div>

            <div
              v-if="attendee.email"
              class="flex items-center justify-center gap-2">
              <i class="i-carbon-email text-lg" />
              <a
                :href="`mailto:${attendee.email}`"
                class="text-blue-600 dark:text-blue-400 hover:underline">
                {{ attendee.email }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Cards -->
      <div class="space-y-4">
        <Card
          class="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-102 transform-gpu"
          @click="goToPersonalizedAgenda">
          <template #content>
            <div class="p-6 text-center">
              <div class="mb-4">
                <i class="i-carbon-calendar text-4xl text-purple-500" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                See Personalized Agenda
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                Ver sesiones personalizadas
              </p>
            </div>
          </template>
        </Card>

        <Card
          class="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-102 transform-gpu"
          @click="goToPersonalGallery">
          <template #content>
            <div class="p-6 text-center">
              <div class="mb-4">
                <i class="i-carbon-image text-4xl text-green-500" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Mi Galería
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                Imágenes personales del evento
              </p>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import backend from '#/plugins/backend.config';

// Interfaces
interface AttendeeDetail {
  id?: string;
  firstname: string;
  lastname: string;
  company: string;
  country: string;
  email: string;
  avatar_path?: string;
  imageURL: string;
}

const router = useRouter();
const route = useRoute();
const attendeeId = route.params.id;
const token = localStorage.getItem('accessToken');

const attendee: AttendeeDetail = reactive({
  firstname: '',
  lastname: '',
  company: '',
  country: '',
  email: '',
  imageURL: ''
});

/**
 * Fetch attendee details from API
 */
async function fetchAttendeeDetails(): Promise<void> {
  try {
    const response = await axios.get(backend.construct(`attendees/${attendeeId}`), {
      headers: { Authorization: `Bearer ${token}` }
    });
    Object.assign(attendee, response.data);
    if (attendee.avatar_path) {
      attendee.imageURL = await getImage(attendee);
    }
  } catch (error) {
    console.error('Failed to fetch attendee details:', error);
  }
}

/**
 * Get profile image from backend
 */
async function getImage(person: AttendeeDetail): Promise<string> {
  try {
    const response = await axios.get(backend.construct(`account/getProfilePicture/${person.id}`), {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        format: 'webp'
      },
      responseType: 'blob'
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    return 'https://ionicframework.com/docs/img/demos/avatar.svg';
  }
}

/**
 * Navigate to personalized agenda
 */
function goToPersonalizedAgenda(): void {
  void router.push({ path: `/tabs/calendar/${attendeeId}` });
}

/**
 * Navigate to personal gallery
 */
function goToPersonalGallery(): void {
  void router.push({ path: `/tabs/images/${attendeeId}` });
}

onMounted(fetchAttendeeDetails);
</script>

<style scoped>
/* Estilos modernos con transiciones */
.transform-gpu {
  transform: translateZ(0);
}
</style>
