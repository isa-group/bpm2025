<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sticky Header (matching agenda style) -->
    <div class="sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="px-4 py-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Attendees
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Connect with fellow conference participants
        </p>
      </div>
    </div>
    
    <div class="px-4 py-6 pb-20 space-y-6">
      <!-- Search bar -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div class="relative">
          <svg class="absolute left-3 top-3 w-5 h-5 text-gray-400" viewBox="0 0 32 32" fill="currentColor">
            <path d="M28.99 27.59L22 20.6a11 11 0 1 0-1.41 1.41l6.99 6.99a1 1 0 0 0 1.41-1.41ZM5 14a9 9 0 1 1 9 9 9 9 0 0 1-9-9Z"/>
          </svg>
          <input
            v-model="state.searchQuery"
            type="text"
            placeholder="Search attendees..."
            class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <!-- Attendees section -->
      <div>
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800 mb-4">
          <h3 class="font-bold text-lg text-blue-900 dark:text-blue-100">Conference Participants</h3>
        </div>

        <!-- Attendees list -->
        <div class="space-y-3">
          <div
            v-for="person in state.persons"
            :key="person.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
            @click="$router.push(`/attendee/${person.id}`)">
            <div class="p-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    :src="person.imageURL || 'https://ionicframework.com/docs/img/demos/avatar.svg'"
                    alt="Avatar"
                    class="w-12 h-12 rounded-full object-cover bg-gray-200 dark:bg-gray-600" />
                </div>
                
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 dark:text-white text-lg">
                    {{ person.firstname }} {{ person.lastname }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm truncate">
                    {{ formatCompanyCountry(person) }}
                  </p>
                </div>

                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M12 8l10 8-10 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Loading indicator -->
        <div v-if="state.loading" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- Load more trigger -->
        <div
          v-if="!state.allLoaded && !state.loading"
          ref="loadMoreTrigger"
          class="flex justify-center py-6">
          <button
            @click="loadMore"
            class="px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
            Load More
          </button>
        </div>

        <!-- No results message -->
        <div
          v-if="state.persons.length === 0 && !state.loading"
          class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" viewBox="0 0 32 32" fill="currentColor">
            <path d="M30 30h-2v-5a5.006 5.006 0 0 0-5-5v-2a7.008 7.008 0 0 1 7 7ZM22 30h-2v-5a5.006 5.006 0 0 0-5-5H9a5.006 5.006 0 0 0-5 5v5H2v-5a7.008 7.008 0 0 1 7-7h6a7.008 7.008 0 0 1 7 7ZM20 2v2a5 5 0 0 1 0 10v2a7 7 0 0 0 0-14ZM12 4a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7Z"/>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ state.searchQuery ? 'No attendees found' : 'No attendees available' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ state.searchQuery ? 'Try adjusting your search terms.' : 'Check back later for more participants.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, reactive, onMounted, onUnmounted } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import axios from 'axios';
import { useRouter } from 'vue-router';
import backend from '#/plugins/backend.config';

interface Attendee {
  id: number;
  firstname: string;
  lastname: string;
  company?: string;
  country?: string;
  avatar_path?: string;
  imageURL?: string;
}

interface PageResponse {
  content: Attendee[];
  last: boolean;
}

const router = useRouter();

const state = reactive({
  persons: [] as Attendee[],
  searchQuery: '',
  page: 0,
  loading: false,
  allLoaded: false
});

const fetchAttendees = async () => {
  const token = localStorage.getItem('accessToken');
  try {
    state.loading = true;
    const response = await axios.get<PageResponse>(backend.construct('attendees', { page: state.page.toString(), size: '25', search: state.searchQuery }), {
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

const getImage = async (person: Attendee) => {
  const token = localStorage.getItem('accessToken');
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
    return '';
  }
};

const formatCompanyCountry = (person: Attendee) => {
  const parts = [];
  if (person.company) parts.push(person.company);
  if (person.country) parts.push(person.country);
  return parts.join(', ');
};

const loadMore = async () => {
  if (!state.loading && !state.allLoaded) {
    await fetchAttendees();
  }
};

onMounted(fetchAttendees);
</script>
