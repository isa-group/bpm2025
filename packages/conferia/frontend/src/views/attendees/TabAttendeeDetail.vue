<template>
  <TabsPage
    :title="`${attendee.firstname} ${attendee.lastname}`">
    <template #header-pre>
      <Button
        icon="i-tabler:arrow-left"
        size="small"
        variant="outlined"
        rounded
        @click="$router.back()" />
    </template>

    <div class="px-4 py-6 pb-20">
      <!-- Profile Section -->
      <div class="flex flex-col items-center mb-8">
        <div class="mb-6">
          <UserAvatar
            size="x-large"
            :image-url="attendee.imageURL"
            :user="attendee"
            class="w-32 h-32 border-4 border-white dark:border-gray-700" />
        </div>

        <div class="text-center">
          <div class="space-y-2 text-gray-600 dark:text-gray-300">
            <div
              v-if="attendee.company"
              class="flex items-center justify-center gap-2">
              <i class="i-tabler:building text-lg" />
              <span>{{ attendee.company }}</span>
            </div>

            <div
              v-if="attendee.country"
              class="flex items-center justify-center gap-2">
              <i class="i-tabler:map-pin text-lg" />
              <span>{{ attendee.country }}</span>
            </div>

            <div
              v-if="attendee.email"
              class="flex items-center justify-center gap-2">
              <i class="i-tabler:mail text-lg" />
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
                <i class="i-tabler:calendar text-4xl text-purple-500" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                See Personalized Agenda
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                See this attendant's personal schedule
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
                <i class="i-tabler:photo text-4xl text-green-500" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Personal Gallery
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                View the images uploaded by this user
              </p>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </TabsPage>
</template>

<script setup lang="ts">
import { reactive, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import UserAvatar from '#/components/UserAvatar.vue';
import TabsPage from '#/components/TabsPage.vue';
import { axiosKey } from '#/plugins/symbols';

// Interfaces
interface AttendeeDetail {
  id?: string;
  firstname: string;
  lastname: string;
  company: string;
  country: string;
  email: string;
  avatar_path?: string;
  imageURL?: string;
}

const router = useRouter();
const route = useRoute();
const attendeeId = route.params.id;
const axios = inject(axiosKey)!;

const attendee: AttendeeDetail = reactive({
  firstname: '',
  lastname: '',
  company: '',
  country: '',
  email: '',
  imageURL: undefined
});

/**
 * Fetch attendee details from API
 */
async function fetchAttendeeDetails(): Promise<void> {
  try {
    const response = await axios.get(`attendees/${attendeeId}`);
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
async function getImage(person: AttendeeDetail) {
  try {
    const response = await axios.get(`account/getProfilePicture/${person.id}`, {
      params: {
        format: 'webp'
      },
      responseType: 'blob'
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
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

void fetchAttendeeDetails();
</script>

<style scoped>
/* Estilos modernos con transiciones */
.transform-gpu {
  transform: translateZ(0);
}
</style>
