<template>
  <TabsPage
    title="Attendees"
    subtitle="Connect with fellow conference participants">
    <div class="px-4 py-6 pb-20 space-y-6">
      <!-- Search bar -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div class="relative">
          <svg
            class="absolute left-3 top-3 w-5 h-5 text-gray-400"
            viewBox="0 0 32 32"
            fill="currentColor">
            <path d="M28.99 27.59L22 20.6a11 11 0 1 0-1.41 1.41l6.99 6.99a1 1 0 0 0 1.41-1.41ZM5 14a9 9 0 1 1 9 9 9 9 0 0 1-9-9Z" />
          </svg>
          <input
            v-model="state.searchQuery"
            type="text"
            placeholder="Search attendees..."
            class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
      </div>

      <!-- Attendees section -->
      <div>
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800 mb-4">
          <h3 class="font-bold text-lg text-blue-900 dark:text-blue-100">
            Conference Participants
          </h3>
        </div>

        <!-- Attendees list -->
        <div class="space-y-3">
          <div
            v-for="person in state.persons"
            :key="person.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
            @click="navigateToAttendee(person.id)">
            <div class="p-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <UserAvatar
                    :user="person"
                    :image-url="person.imageURL" />
                </div>

                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 dark:text-white text-lg">
                    {{ person.firstname }} {{ person.lastname }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm truncate">
                    {{ formatCompanyCountry(person) }}
                  </p>
                </div>

                <svg
                  class="w-5 h-5 text-gray-400"
                  viewBox="0 0 32 32"
                  fill="currentColor">
                  <path d="M12 8l10 8-10 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading indicator -->
        <div
          v-if="state.loading"
          class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>

        <!-- Infinite scroll trigger (invisible) -->
        <div
          v-if="!state.allLoaded && !state.loading"
          ref="loadMoreTrigger"
          class="h-4 w-full" />

        <!-- Load more button (fallback) -->
        <div
          v-if="!state.allLoaded && !state.loading"
          class="flex justify-center py-6">
          <button
            class="px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            @click="loadMore">
            Load More
          </button>
        </div>

        <!-- No results message -->
        <div
          v-if="state.persons.length === 0 && !state.loading"
          class="text-center py-12">
          <svg
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
            viewBox="0 0 32 32"
            fill="currentColor">
            <path d="M30 30h-2v-5a5.006 5.006 0 0 0-5-5v-2a7.008 7.008 0 0 1 7 7ZM22 30h-2v-5a5.006 5.006 0 0 0-5-5H9a5.006 5.006 0 0 0-5 5v5H2v-5a7.008 7.008 0 0 1 7-7h6a7.008 7.008 0 0 1 7 7ZM20 2v2a5 5 0 0 1 0 10v2a7 7 0 0 0 0-14ZM12 4a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7Z" />
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
  </TabsPage>
</template>

<script setup lang="ts">
import { watch, reactive, inject, onMounted, onUnmounted, onActivated, nextTick, ref } from 'vue';
import { useDebounceFn, useLocalStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
import UserAvatar from '#/components/UserAvatar.vue';
import { axiosKey } from '#/plugins/symbols';
import TabsPage from '#/components/TabsPage.vue';

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

const axios = inject(axiosKey)!;
const router = useRouter();

// Store scroll position and page state in localStorage
const scrollPosition = useLocalStorage('attendees-scroll-position', 0);
const storedPage = useLocalStorage('attendees-page', 0);
const storedPersons = useLocalStorage<Attendee[]>('attendees-data', []);
const storedSearchQuery = useLocalStorage('attendees-search', '');
const storedAllLoaded = useLocalStorage('attendees-all-loaded', false);

const state = reactive({
  persons: [] as Attendee[],
  searchQuery: '',
  page: 0,
  loading: false,
  allLoaded: false
});

const loadMoreTrigger = ref<HTMLElement>();
let intersectionObserver: IntersectionObserver | null = null;

const fetchAttendees = async () => {
  if (state.loading || state.allLoaded) return;
  
  try {
    state.loading = true;
    const response = await axios.get<PageResponse>('attendees', {
      params: {
        page: state.page.toString(),
        size: '25',
        search: state.searchQuery
      }
    });
    const persons = response.data.content;
    
    // Load images for new persons
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
    
    // Store the updated data
    storedPersons.value = state.persons;
    storedPage.value = state.page;
    storedAllLoaded.value = state.allLoaded;
  } catch (error) {
    console.error('Failed to fetch attendees:', error);
  } finally {
    state.loading = false;
  }
};

const debouncedFetchAttendees = useDebounceFn(fetchAttendees, 300);

watch(() => state.searchQuery, (newQuery, oldQuery) => {
  if (newQuery !== oldQuery) {
    // Reset state for new search
    state.page = 0;
    state.allLoaded = false;
    state.persons = [];
    
    // Clear stored data when search changes
    storedSearchQuery.value = newQuery;
    storedPersons.value = [];
    storedPage.value = 0;
    storedAllLoaded.value = false;
    scrollPosition.value = 0;
    
    void debouncedFetchAttendees();
  }
}, { immediate: false });

const getImage = async (person: Attendee) => {
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
  await fetchAttendees();
};

// Store scroll position when navigating to attendee detail
const navigateToAttendee = (personId: number) => {
  // Store current scroll position
  scrollPosition.value = window.scrollY;
  
  // Navigate to attendee detail page
  void router.push(`/attendee/${personId}`);
};

// Clear cached data (useful for debugging or when needed)
const clearCache = () => {
  scrollPosition.value = 0;
  storedPage.value = 0;
  storedPersons.value = [];
  storedSearchQuery.value = '';
  storedAllLoaded.value = false;
};

// Setup infinite scroll using Intersection Observer
const setupInfiniteScroll = () => {
  if (!loadMoreTrigger.value || intersectionObserver) return;

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !state.loading && !state.allLoaded) {
          void loadMore();
        }
      });
    },
    {
      rootMargin: '100px' // Start loading 100px before the trigger comes into view
    }
  );

  intersectionObserver.observe(loadMoreTrigger.value);
};

// Restore scroll position
const restoreScrollPosition = () => {
  if (scrollPosition.value > 0) {
    // Use requestAnimationFrame for better scroll restoration
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPosition.value,
        behavior: 'auto'
      });
    });
  }
};

// Handle page visibility changes (for browser back navigation)
const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    // Page became visible again - restore scroll position
    setTimeout(() => {
      restoreScrollPosition();
    }, 100);
  }
};

// Handle browser back/forward navigation
const handlePopState = () => {
  setTimeout(() => {
    restoreScrollPosition();
  }, 50);
};

onMounted(async () => {
  // Restore search query
  state.searchQuery = storedSearchQuery.value || '';
  
  // Check if we have stored data and it matches current search
  if (storedPersons.value.length > 0 && storedSearchQuery.value === state.searchQuery) {
    // Restore stored state
    state.persons = storedPersons.value;
    state.page = storedPage.value;
    state.allLoaded = storedAllLoaded.value;
    
    // Wait for DOM to render then restore scroll and setup infinite scroll
    await nextTick();
    restoreScrollPosition();
    setupInfiniteScroll();
  } else {
    // Fresh load
    await fetchAttendees();
    await nextTick();
    setupInfiniteScroll();
  }
  
  // Listen for page visibility changes (browser back navigation)
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Listen for browser back/forward navigation
  window.addEventListener('popstate', handlePopState);
});

// This lifecycle hook is called when component is reactivated (useful for keep-alive)
onActivated(async () => {
  await nextTick();
  restoreScrollPosition();
  setupInfiniteScroll();
});

onUnmounted(() => {
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  }
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  window.removeEventListener('popstate', handlePopState);
});
</script>
