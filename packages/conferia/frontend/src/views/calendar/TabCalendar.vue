<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Apple-style Header -->
    <div class="sticky top-16 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between px-4 py-4">
        <button
          @click="changeMonth(-1)"
          class="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <i class="i-carbon-chevron-left text-lg"></i>
          <span class="font-medium">Prev</span>
        </button>
        
        <div class="flex-1 text-center">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ currentMonthName }} {{ state.currentYear }}
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Conference Calendar
          </p>
        </div>

        <button
          @click="changeMonth(1)"
          class="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <span class="font-medium">Next</span>
          <i class="i-carbon-chevron-right text-lg"></i>
        </button>
      </div>
    </div>

    <!-- Calendar Content -->
    <div class="px-4 py-6 pb-20">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-0">
          <!-- Day Headers -->
          <div
            v-for="day in state.weekDays"
            :key="day"
            class="p-4 text-center bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
          >
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ day }}</span>
          </div>
          
          <!-- Date Cells -->
          <div
            v-for="day in state.daysOfMonth"
            :key="day.dateString"
            class="relative aspect-square p-2 border-b border-r border-gray-200 dark:border-gray-600 transition-colors cursor-pointer"
            :class="[
              day.hasSession ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700',
              !day.isCurrentMonth ? 'opacity-40' : '',
              !day.hasSession ? 'cursor-default' : ''
            ]"
            @click="day.hasSession ? dateClicked(day) : null"
          >
            <div class="flex flex-col h-full">
              <span 
                class="text-sm font-medium"
                :class="[
                  day.isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                ]"
              >
                {{ day.date }}
              </span>
              
              <!-- Session Indicator -->
              <div v-if="day.hasSession" class="flex-1 flex items-center justify-center">
                <div class="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed, nextTick } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import backend from '#/plugins/backend.config';

const route = useRoute();
const router = useRouter();
const token = localStorage.getItem('accessToken');

const today = new Date();
const state = reactive({
  sessions: [],
  uniqueDays: [],
  selectedDay: null,
  daysOfMonth: getDaysOfMonth(today.getFullYear(), today.getMonth()),
  currentMonth: today.getMonth(),
  currentYear: today.getFullYear(),
  // Computed properties for month name and array of week days
  weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
});

const currentMonthName = computed(() => {
  const date = new Date(state.currentYear, state.currentMonth);
  return date.toLocaleString('default', { month: 'long' });
});

/**
 *
 */
function getDaysOfMonth(year, month) {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const numDays = new Date(year, month + 1, 0).getDate();
  const days = [];

  // Placeholder days for alignment
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({
      date: null,
      dateString: `placeholder-${i}`,
      hasSession: false,
      isCurrentMonth: false
    });
  }

  // Actual days of the month
  for (let day = 1; day <= numDays; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    days.push({ date: day, dateString, hasSession: false, isCurrentMonth: true });
  }

  return days;
}

/**
 *
 */
function changeMonth(change) {
  const newDate = new Date(state.currentYear, state.currentMonth + change);
  state.currentMonth = newDate.getMonth();
  state.currentYear = newDate.getFullYear();

  // Recalculate days for the new month and update the state
  state.daysOfMonth = getDaysOfMonth(state.currentYear, state.currentMonth);

  // Assuming sessions do not need to be re-fetched, just re-mark the days
  markDaysWithSessions(); // Ensure days are re-marked according to the new month
}

/**
 *
 */
async function fetchSessions() {
  try {
    const { id, type } = route.query;
    let response;

    if (id) {
      response = await axios.get(backend.construct(`agenda/session/likedlist/${id}`), {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else if (type === 'personal') {
      const currentUserIdResponse = await axios.get(backend.construct('account/id'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const currentUserId = currentUserIdResponse.data.id;
      response = await axios.get(backend.construct(`agenda/session/likedlist/${currentUserId}`), {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      response = await axios.get(backend.construct('agenda/sessions'), {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    state.sessions = response.data;
    markDaysWithSessions();
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
  }
}

/**
 *
 */
function markDaysWithSessions() {
  state.daysOfMonth.forEach((day) => {
    // Check if the day is part of the current month
    if (!day.isCurrentMonth) return;

    // Look for sessions on this day
    const hasSession = state.sessions.some((session) => {
      // Adjust to use the correct property name
      const startTime = session.startTime?.split('T')[0] ?? '';
      return day.dateString === startTime;
    });

    // Update the day's hasSession property if applicable
    if (hasSession) day.hasSession = true;
  });
}

/**
 *
 */
function dateClicked(day) {
  if (!day.isCurrentMonth || day.date == null) return;

  // Get the clicked date and ensure it's in UTC
  const clickedDate = new Date(Date.UTC(state.currentYear, state.currentMonth, day.date));
  const query = { date: clickedDate.toISOString().slice(0, 10) };

  // Extract user ID and agenda type from the route parameters or query
  const routeUserId = route.params.id || route.query.id;
  const agendaType = route.query.type;

  // Redirect to the desired path with the ID and date parameter
  if (routeUserId) {
    router.push({ path: `/tabs/calendar/${routeUserId}`, query }).then(() => {
      nextTick(() => window.location.reload());
    });
  } else if (agendaType === 'personal') {
    query.type = 'personal';
    router.push({ path: '/tabs/calendar', query }).then(() => {
      nextTick(() => window.location.reload());
    });
  } else {
    router.push({ path: '/tabs/calendar', query }).then(() => {
      nextTick(() => window.location.reload());
    });
  }
}

const applyTheme = () => {
  // Theme is now handled by Tailwind CSS dark mode classes
  // No need for custom CSS variables
};

onMounted(() => {
  fetchSessions();
  applyTheme();
});

</script>

<style scoped>
/* All styling is now handled by Tailwind CSS classes */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>
