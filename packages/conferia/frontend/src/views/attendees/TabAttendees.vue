<template>
  <div class="flex flex-col min-h-dvh">
    <HeaderBar name="Attendees" />
    <main class="flex-1">
      <div class="p-4">
        <input
          v-model="state.searchQuery"
          type="search"
          placeholder="Search attendees..."
          class="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:(ring-2 ring-primary-500 border-primary-500)"
          @input="fetchAttendees" />
      </div>
      <ul class="divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
        <li v-for="person in state.persons" :key="person.id">
          <RouterLink :to="`/attendee/${person.id}`" class="flex items-center gap-3 px-4 py-3">
            <img :src="person.imageURL || 'https://ionicframework.com/docs/img/demos/avatar.svg'" alt="Profile picture" class="h-10 w-10 rounded-full object-cover" />
            <div>
              <h2 class="font-600">{{ person.firstname }} {{ person.lastname }}</h2>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ formatCompanyCountry(person) }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <div v-if="!state.allLoaded" class="p-4 flex justify-center">
        <button @click="loadMore({ target: { complete: () => {} } })" class="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">Load more attendees...</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { watch, reactive, onMounted } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import axios from 'axios';
import HeaderBar from '#/components/HeaderBar.vue';
import backend from '#/plugins/backend.config';

const state = reactive({
  persons: [],
  searchQuery: '',
  page: 0,
  loading: false,
  allLoaded: false
});

const fetchAttendees = async () => {
  const token = localStorage.getItem('accessToken');
  try {
    state.loading = true;
    const response = await axios.get(backend.construct('attendees', { page: state.page, size: 25, search: state.searchQuery }), {
      headers: { Authorization: `Bearer ${token}` }
    });
    const persons = response.data.content;
    await Promise.all(persons.map(async (person) => {
      if (person.avatar_path) {
        person.imageURL = await getImage(person);
      }
    }));
    if (state.page === 0) {
      state.persons = persons;
    } else {
      state.persons.push(...persons);
    }
    state.page++;
    state.allLoaded = response.data.last;
    state.loading = false;
  } catch (error) {
    console.error('Failed to fetch attendees:', error);
    state.loading = false;
  }
};

const debouncedFetchAttendees = useDebounceFn(fetchAttendees, 300);

watch(() => state.searchQuery, async (newQuery, oldQuery) => {
  if (newQuery !== oldQuery) {
    state.page = 0;
    debouncedFetchAttendees();
  }
}, { immediate: false });

const getImage = async (person) => {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(backend.construct(`account/getProfilePicture/${person.id}`), {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        format: 'webp'
      },
      responseType: 'blob' // This tells axios to expect a binary response instead of JSON
    });
    return URL.createObjectURL(response.data); // Convert the blob to a URL and return it
  } catch (error) {
    console.error('Error fetching image:', error);
    return ''; // Return an empty string or a default image path in case of error
  }
};

const formatCompanyCountry = (person) => {
  const parts = [];
  if (person.company) parts.push(person.company);
  if (person.country) parts.push(person.country);
  return parts.join(', '); // Only adds a comma if both parts exist
};

const loadMore = async (event) => {
  await fetchAttendees();
  if (event && event.target && typeof event.target.complete === 'function') event.target.complete();
};

onMounted(fetchAttendees);

</script>
