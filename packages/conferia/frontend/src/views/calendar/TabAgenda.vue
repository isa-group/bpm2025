<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Apple-style Header -->
    <div class="sticky top-16 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between px-4 py-4">
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ state.passedUserId ? 'Personal Agenda' : 'Agenda' }}
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {{ state.passedUserId ? 'Your personalized conference schedule' : 'Full conference program' }}
          </p>
        </div>
        <button
          @click="goToCalendar"
          class="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          <i class="i-carbon-calendar text-lg"></i>
          <span class="font-medium">Calendar</span>
        </button>
      </div>
    </div>

    <!-- ICMP/Personal Segment Bar -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div class="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
        <button
          :class="[
            'flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200',
            agendaSegmentValue === 'all'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          ]"
          @click="navigateToAgendaType('all')"
        >
          Full Agenda
        </button>
        <button
          :class="[
            'flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200',
            agendaSegmentValue === 'personal'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          ]"
          @click="navigateToAgendaType('personal')"
        >
          Personal Agenda
        </button>
      </div>
    </div>

    <!-- Days Segment Bar -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div class="flex space-x-2 overflow-x-auto scrollbar-hide">
        <button
          v-for="day in state.uniqueDays"
          :key="day.value"
          :class="[
            'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200',
            state.selectedDay === day.value
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
            !day.hasSession ? 'opacity-50 cursor-not-allowed' : ''
          ]"
          @click="day.hasSession ? selectDay(day.value) : null"
        >
          <div class="text-center">
            <div class="text-xs font-bold">{{ day.label.split(', ')[0] }}</div>
            <div class="text-xs mt-0.5">{{ day.label.split(', ')[1] }}</div>
          </div>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="px-4 py-6 pb-20">
      <!-- Session List -->
      <div v-if="state.selectedDay && groupedSessionsByTimeSlot && Object.keys(groupedSessionsByTimeSlot).length > 0" class="space-y-6">
        <div 
          v-for="(group, timeSlot) in groupedSessionsByTimeSlot"
          :key="timeSlot"
          class="space-y-3"
        >
          <!-- Time Slot Header -->
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
            <h2 class="font-bold text-lg text-blue-900 dark:text-blue-100">{{ timeSlot }}</h2>
          </div>
          
          <!-- Sessions in this time slot -->
          <div class="space-y-3">
            <div 
              v-for="session in group"
              :key="session.id"
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
              @click="showSession(session.id)"
            >
              <div class="p-4">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                      {{ session.session_name }}
                    </h3>
                    <p v-if="session.session_host" class="text-gray-600 dark:text-gray-300 text-sm mb-1">
                      Host: {{ session.session_host }}
                    </p>
                    <p v-if="session.session_location" class="text-gray-500 dark:text-gray-400 text-sm">
                      📍 {{ session.session_location }}
                    </p>
                  </div>
                  
                  <!-- Like Button -->
                  <div class="flex flex-col items-center space-y-1">
                    <button
                      @click.stop="toggleLike(session)"
                      class="p-2 rounded-full transition-colors"
                      :class="session.isLiked 
                        ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-red-500'"
                    >
                      <i 
                        :class="session.isLiked ? 'i-carbon-favorite-filled' : 'i-carbon-favorite'"
                        class="text-xl"
                      ></i>
                    </button>
                    <span v-if="session.likes > 0" class="text-xs text-gray-500 dark:text-gray-400">
                      {{ session.likes }} {{ session.likes === 1 ? 'like' : 'likes' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="mb-4">
          <i class="i-carbon-calendar text-6xl text-gray-400"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {{ state.selectedDay ? 'No sessions available' : 'Select a day' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          {{ state.selectedDay 
            ? 'No sessions scheduled for this day' 
            : 'Choose a day from above to view the agenda' 
          }}
        </p>
      </div>
    </div>

    <!-- Session Detail Modal -->
    <TabSessionDetails
      :id="sessionIdDetail"
      :is-open="sessionModalOpen"
      @did-dismiss="sessionModalOpen = false"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted, computed, watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import TabSessionDetails from '#/views/calendar/TabSessionDetails.vue';
import backend from '#/plugins/backend.config';

const router = useRouter();
const route = useRoute();

const token = localStorage.getItem('accessToken');

const sessionIdDetail = ref('');
const sessionModalOpen = ref(false);

// Helper function to format day buttons
const formatDayButton = (day) => {
  const dayObj = state.uniqueDays.find(d => d.value === day);
  if (dayObj) {
    const parts = dayObj.label.split(', ');
    return parts.length > 1 ? `${parts[0]}, ${parts[1]}` : dayObj.label;
  }
  return day;
};

const state = reactive({
  sessions: [],
  uniqueDays: [],
  selectedDay: null,
  weekStart: new Date(),
  weekEnd: new Date(),
  agendaType: 'all',
  likedSessionIds: new Set(),
  currentUserId: null,
  passedUserId: route.params.id ? parseInt(route.params.id) : null
});

const agendaSegmentValue = computed(() => {
  return state.passedUserId ? null : state.agendaType;
});

/**
 *
 */
async function fetchSessions() {
  try {
    if (state.passedUserId) {
      await fetchPersonalAgenda(state.passedUserId);
    } else if (state.agendaType === 'all') {
      await fetchICPMAgenda();
    } else {
      if (!state.currentUserId) {
        await fetchCurrentUserId();
      }
      if (state.currentUserId) {
        await fetchPersonalAgenda(state.currentUserId);
      }
    }
    uniqueDays();
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
  }
}

/**
 *
 */
async function fetchICPMAgenda() {
  try {
    await fetchLikedSessions();
    const response = await axios.get(backend.construct('agenda/sessions'), {
      headers: { Authorization: `Bearer ${token}` }
    });
    const sessionsData = response.data;
    const processedSessions = await processSessions(sessionsData);
    const { weekStart, weekEnd } = determineWeekRangeFromSessions(processedSessions);
    state.sessions = processedSessions.filter((session) => {
      const sessionDate = new Date(session.start_time);
      return sessionDate >= weekStart && sessionDate <= weekEnd;
    });
  } catch (error) {
    console.error('Failed to fetch ICPM agenda:', error);
  }
}

/**
 *
 */
async function fetchPersonalAgenda(userId) {
  try {
    await fetchLikedSessions();
    console.log('Fetching personal agenda for user ID:', userId);
    const response = await axios.get(backend.construct(`agenda/session/likedlist/${userId}`), {
      headers: { Authorization: `Bearer ${token}` }
    });
    const sessionsData = response.data;
    console.log('Fetched personal agenda sessions:', sessionsData);
    const processedSessions = await processSessions(sessionsData);
    const { weekStart, weekEnd } = determineWeekRangeFromSessions(processedSessions);
    state.sessions = processedSessions.filter((session) => {
      const sessionDate = new Date(session.start_time);
      return sessionDate >= weekStart && sessionDate <= weekEnd;
    });
  } catch (error) {
    console.error(`Failed to fetch personal agenda for user ${userId}:`, error);
  }
}

/**
 *
 */
async function fetchCurrentUserId() {
  try {
    const response = await axios.get(backend.construct('account/id'), {
      headers: { Authorization: `Bearer ${token}` }
    });
    state.currentUserId = response.data.id;
    console.log('Fetched current user ID:', state.currentUserId);
  } catch (error) {
    console.error('Failed to fetch current user ID:', error);
    state.currentUserId = null;
  }
}

/**
 *
 */
async function fetchLikedSessions() {
  try {
    const response = await axios.get(backend.construct('agenda/session/hearts'), {
      headers: { Authorization: `Bearer ${token}` }
    });
    state.likedSessionIds = new Set(response.data.map(id => id.toString()));
  } catch (error) {
    console.error('Failed to fetch liked sessions:', error);
    state.likedSessionIds = new Set();
  }
}

/**
 *
 */
async function toggleLike(session) {
  const previouslyLiked = session.isLiked;
  session.isLiked = !session.isLiked;
  try {
    await axios.post(
      backend.construct('agenda/session/like'),
      {
        likes: session.isLiked,
        id: session.id
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    if (session.isLiked) {
      state.likedSessionIds.add(session.id);
      session.likes++;
    } else {
      state.likedSessionIds.delete(session.id);
      session.likes--;
    }
  } catch (error) {
    console.error('Failed to change like status:', error);
    session.isLiked = previouslyLiked;
  }
}

/**
 *
 */
async function processSessions(sessionsData) {
  return sessionsData.map((session) => {
    const sessionIdAsString = session.id.toString();
    const isLikedCheck = state.likedSessionIds.has(sessionIdAsString);
    return {
      id: sessionIdAsString,
      session_name: session.name,
      session_host: session.host,
      session_location: session.location,
      start_time: session.startTime.replace('T', ' ').slice(0, -3),
      end_time: session.endTime.replace('T', ' ').slice(0, -3),
      type: session.type,
      isLiked: isLikedCheck,
      likes: session.likes
    };
  });
}

/**
 *
 */
function determineWeekRangeFromSessions(processedSessions) {
  let weekStart, weekEnd;
  if (route.query.date) {
    const queryDate = new Date(route.query.date);
    const weekRange = determineWeek(queryDate);
    weekStart = weekRange.startOfWeek;
    weekEnd = weekRange.endOfWeek;
  } else {
    const earliestSessionDate = processedSessions.reduce((earliest, session) => {
      const sessionDate = new Date(session.start_time);
      return !earliest || sessionDate < earliest ? sessionDate : earliest;
    }, null);
    if (earliestSessionDate) {
      const weekRange = determineWeek(earliestSessionDate);
      weekStart = weekRange.startOfWeek;
      weekEnd = weekRange.endOfWeek;
    } else {
      const today = new Date();
      const weekRange = determineWeek(today);
      weekStart = weekRange.startOfWeek;
      weekEnd = weekRange.endOfWeek;
    }
  }
  return { weekStart, weekEnd };
}

/**
 *
 */
function determineWeek(date) {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + (startOfWeek.getDay() === 0 ? -6 : 1));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return { startOfWeek, endOfWeek };
}

/**
 *
 */
function uniqueDays() {
  state.uniqueDays = [];
  let earliestDate = null;
  let latestDate = null;
  state.sessions.forEach((session) => {
    const sessionDate = new Date(session.start_time.split(' ')[0]);
    if (!earliestDate || sessionDate < earliestDate) {
      earliestDate = sessionDate;
    }
    if (!latestDate || sessionDate > latestDate) {
      latestDate = sessionDate;
    }
  });
  if (!earliestDate || !latestDate) return;
  for (let d = new Date(earliestDate); d <= latestDate; d.setDate(d.getDate() + 1)) {
    const formattedDate = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    state.uniqueDays.push({
      value: formattedDate,
      label: dayLabel,
      hasSession: state.sessions.some(session => session.start_time.startsWith(formattedDate))
    });
  }
  const firstDayWithSession = state.uniqueDays.find(day => day.hasSession);
  if (firstDayWithSession) {
    state.selectedDay = firstDayWithSession.value;
  }
}

/**
 *
 */
function selectDay(value) {
  state.selectedDay = value;
}

/**
 *
 */
function navigateToAgendaType(type) {
  const query = { ...route.query }; // Get current query parameters

  // Add or update the `type` parameter based on the selected segment
  if (type === 'personal') {
    query.type = 'personal';
  } else {
    delete query.type; // Remove `type` for ICPM
  }

  // Navigate with the updated query parameters
  router.push({ path: '/tabs/calendar', query });
  state.agendaType = type;
}

/**
 *
 */
function goToCalendar() {
  const query = { date: state.selectedDay };
  if (state.passedUserId) {
    query.id = state.passedUserId;
  } else if (state.agendaType === 'personal') {
    query.type = 'personal';
  }
  router.push({ name: 'CalendarView', query });
}

onMounted(async () => {
  await fetchCurrentUserId();

  // Check if `type` is provided in the query and update `agendaType`
  if (route.query.type === 'personal') {
    state.agendaType = 'personal';
  }

  await fetchSessions();
});

watch(() => state.agendaType, async () => {
  console.log('Agenda type changed to:', state.agendaType);
  await fetchSessions();
});

const filteredSessions = computed(() => {
  return state.sessions
    .filter(session => session.start_time.startsWith(state.selectedDay))
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
});

const groupedSessionsByTimeSlot = computed(() => {
  const groups = {};
  for (const session of filteredSessions.value) {
    const timeSlot = `${session.start_time.split(' ')[1]}-${session.end_time.split(' ')[1]}`;
    if (!groups[timeSlot]) {
      groups[timeSlot] = [];
    }
    groups[timeSlot].push(session);
  }
  return groups;
});

const showSession = (id) => {
  sessionIdDetail.value = id;
  sessionModalOpen.value = true;
};
</script>

<style scoped>

ion-segment {
  padding-bottom: 0.3em; /* Adjust as needed */
}

ion-segment-button ion-label {
  align-items: center;
  font-size: 0.75rem; /* Adjust as needed */
  text-align: center;
}

ion-segment-button .day-name {
  font-size: 0.7rem; /* Adjust as needed */
  font-weight: bold;
  display: block;
}

ion-segment-button .day-date {
  font-size: 0.65rem; /* Adjust to fit the box */
  margin-top: 0.125rem;
}

.day-without-session {
  opacity: 0.5;
  pointer-events: none;
}

.larger-icon {
  font-size: 1.5rem; /* Adjust as needed */
  width: 1.625rem;
  height: 1.625rem;
}

/* personal/icpm toolbar below */

.full-width-segment {
  width: 100%;
}

.half-width-segment-button {
  height: 2rem; /* Adjust as needed */
}

.segment-label {
  font-size: 0.75rem; /* Adjust as needed */
  line-height: 1.2;
  white-space: normal; /* Allow text wrapping */
  display: flex;
}

.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

</style>
