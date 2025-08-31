<template>
  <TabsPage
    :title="state.passedUserId ? 'Personal Agenda' : 'Agenda'"
    :subtitle="state.passedUserId ? 'Your personalized conference schedule' : 'Full conference program'">
    <template #header-post>
      <button
        class="flex items-center space-x-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        @click="goToCalendar">
        <i class="w-4 h-4 i-tabler:calendar" />
        <span class="font-medium">Calendar</span>
      </button>
    </template>
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
          @click="navigateToAgendaType('all')">
          Full Agenda
        </button>
        <button
          :class="[
            'flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200',
            agendaSegmentValue === 'personal'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          ]"
          @click="navigateToAgendaType('personal')">
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
          @click="day.hasSession && selectDay(day.value)">
          <div class="text-center">
            <div class="text-xs font-bold">
              {{ day.label.split(', ')[0] }}
            </div>
            <div class="text-xs mt-0.5">
              {{ day.label.split(', ')[1] }}
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="px-4 py-6 pb-20">
      <!-- Session List -->
      <div
        v-if="state.selectedDay && groupedSessionsByTime && Object.keys(groupedSessionsByTime).length > 0"
        class="space-y-6">
        <div
          v-for="(group, timeSlot) in groupedSessionsByTime"
          :key="timeSlot"
          class="space-y-3">
          <!-- Time Slot Header -->
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
            <h2 class="font-bold text-lg text-blue-900 dark:text-blue-100">
              {{ formatTimeSlot(timeSlot) }}
            </h2>
          </div>

          <!-- Sessions of this time -->
          <div class="space-y-3">
            <div
              v-for="session in group"
              :key="session.id"
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
              @click="showSession(session.id)">
              <div class="p-4">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                      {{ session.session_name }}
                    </h3>
                    <!-- Session Time - left aligned below title -->
                    <p class="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
                      {{ formatSessionTime(session) }}
                    </p>
                    <p
                      v-if="session.session_host && session.session_host.trim() && session.session_host !== 'TBA'"
                      class="text-gray-600 dark:text-gray-300 text-sm mb-1">
                      Host: {{ session.session_host }}
                    </p>
                    <p
                      v-if="session.session_location"
                      class="text-gray-500 dark:text-gray-400 text-sm">
                      {{ session.session_location }}
                    </p>
                  </div>

                  <!-- Like Button -->
                  <div class="flex flex-col items-center space-y-1">
                    <button
                      class="w-8 h-8 rounded-md transition-colors duration-200 flex items-center justify-center text-size-2xl"
                      :class="session.isLiked
                        ? 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
                        : 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'"
                      @click.stop="toggleLike(session)">
                      {{ session.isLiked ? '♥' : '♡' }}
                    </button>
                    <span
                      v-if="(session.likes ?? 0) > 0"
                      class="text-xs text-gray-500 dark:text-gray-400">
                      {{ session.likes }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-12">
        <div class="mb-4">
          <i class="i-tabler:calendar text-6xl text-gray-400" />
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
      @did-dismiss="sessionModalOpen = false" />
  </TabsPage>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed, watch, ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TabsPage from '#/components/TabsPage.vue';
import TabSessionDetails from '#/views/calendar/TabSessionDetails.vue';
import { axiosKey } from '#/plugins/symbols';

const router = useRouter();
const route = useRoute();
const axios = inject(axiosKey)!;

const sessionIdDetail = ref('');
const sessionModalOpen = ref(false);

interface Session {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  startTime: string;
  endTime: string;
  isLiked: boolean;
  abstract?: string;
  authors?: string;
  type?: string;
  session_name?: string;
  session_host?: string;
  session_location?: string;
  likes?: number;
}

interface UniqueDay {
  value: string;
  label: string;
  hasSession: boolean;
}

const state = reactive<{
  sessions: Session[];
  uniqueDays: UniqueDay[];
  selectedDay: string | null;
  agendaType: string;
  likedSessionIds: Set<number>;
  currentUserId: number | null;
  passedUserId: number | null;
}>({
  sessions: [],
  uniqueDays: [],
  selectedDay: null,
  agendaType: 'all',
  likedSessionIds: new Set(),
  currentUserId: null,
  passedUserId: route.params.id ? parseInt(route.params.id as string) : null
});

const agendaSegmentValue = computed(() => {
  return state.passedUserId ? null : state.agendaType;
});

/**
 * Fetches sessions based on agenda type and user preferences
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
 * Fetches the main ICPM agenda with all available sessions
 */
async function fetchICPMAgenda() {
  try {
    await fetchLikedSessions();
    const response = await axios.get('agenda/sessions');
    const sessionsData = response.data;
    const processedSessions = processSessions(sessionsData);
    // Remove week filtering - show all sessions
    state.sessions = processedSessions;
  } catch (error) {
    console.error('Failed to fetch ICPM agenda:', error);
  }
}

/**
 * Fetches personalized agenda for a specific user
 */
async function fetchPersonalAgenda(userId: number): Promise<void> {
  try {
    await fetchLikedSessions();
    const response = await axios.get(`agenda/session/likedlist/${userId}`);
    const sessionsData = response.data;
    const processedSessions = processSessions(sessionsData);
    // Remove week filtering - show all sessions
    state.sessions = processedSessions;
  } catch (error) {
    console.error(`Failed to fetch personal agenda for user ${userId}:`, error);
  }
}

/**
 * Fetches the current authenticated user's ID
 */
async function fetchCurrentUserId() {
  try {
    const response = await axios.get('account/id');
    state.currentUserId = response.data.id;
  } catch (error) {
    console.error('Failed to fetch current user ID:', error);
    state.currentUserId = null;
  }
}

/**
 * Fetches the list of sessions that the user has liked/favorited
 */
async function fetchLikedSessions() {
  try {
    const response = await axios.get('agenda/session/hearts');
    state.likedSessionIds = new Set(response.data.map((id: number) => id.toString()));
  } catch (error) {
    console.error('Failed to fetch liked sessions:', error);
    state.likedSessionIds = new Set();
  }
}

/**
 * Toggles like status for a session and updates the server
 */
async function toggleLike(session: Session): Promise<void> {
  const previouslyLiked = session.isLiked;
  session.isLiked = !session.isLiked;
  try {
    await axios.post(
      'agenda/session/like',
      {
        likes: session.isLiked,
        id: session.id
      }
    );
    if (session.isLiked) {
      state.likedSessionIds.add(session.id);
      session.likes = (session.likes ?? 0) + 1;
    } else {
      state.likedSessionIds.delete(session.id);
      session.likes = Math.max((session.likes ?? 0) - 1, 0);
    }
  } catch (error) {
    console.error('Failed to change like status:', error);
    session.isLiked = previouslyLiked;
  }
}

/**
 * Fix UTF-8 encoding issues for text that may contain special characters
 */
function fixTextEncoding(text: string | undefined): string | undefined {
  if (!text) return text;

  try {
    // Common double-encoded UTF-8 patterns for Polish and other European characters
    let fixed = text
      // Polish characters
      .replace(/Å›/g, 'ś')
      .replace(/Ä…/g, 'ą')
      .replace(/Å„/g, 'ń')
      .replace(/Å‚/g, 'ł')
      .replace(/Å¼/g, 'ż')
      .replace(/Å¯/g, 'ź')
      .replace(/Ä™/g, 'ę')
      .replace(/Ä‡/g, 'ć')
      .replace(/Ã³/g, 'ó')

      // German/French characters
      .replace(/Ã¡/g, 'á')
      .replace(/Ã©/g, 'é')
      .replace(/Ã­/g, 'í')
      .replace(/Ãº/g, 'ú')
      .replace(/Ã±/g, 'ñ')
      .replace(/Ã¼/g, 'ü')
      .replace(/Ã¤/g, 'ä')
      .replace(/Ã¶/g, 'ö')
      .replace(/ÃŸ/g, 'ß')

      // More double-encoded patterns
      .replace(/â€™/g, "'")
      .replace(/â€œ/g, '"')
      .replace(/â€/g, '"')
      .replace(/â€"/g, '–')
      .replace(/â€"/g, '—');

    // Handle question mark replacements for specific known cases
    // This is specifically for "Mateusz ?la?y?ski" -> "Mateusz Ślażyński"
    if (fixed.includes('?la?y?ski')) {
      fixed = fixed.replace('?la?y?ski', 'ślażyński');
    }
    if (fixed.includes('Mateusz ?')) {
      fixed = fixed.replace('Mateusz ?la?y?ski', 'Mateusz Ślażyński');
    }

    return fixed;
  } catch (error) {
    console.warn('Error fixing text encoding:', error);
    return text;
  }
}

/**
 * Process session data and add timezone adjustment and like status
 */
function processSessions(sessionsData: Record<string, unknown>[]): Session[] {
  return sessionsData.map((session: Record<string, unknown>) => {
    const sessionIdAsString = session.id?.toString();
    const isLikedCheck = state.likedSessionIds.has(parseInt(sessionIdAsString ?? '0'));

    // Use original times without timezone adjustment
    const startTime = new Date(session.startTime as string);
    const endTime = new Date(session.endTime as string);

    // Format times properly (YYYY-MM-DD HH:MM:SS)
    const formatDateTime = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return {
      id: session.id as number,
      title: fixTextEncoding((session.name ?? session.session_name ?? 'Untitled Session') as string)!,
      session_name: fixTextEncoding((session.name ?? session.session_name) as string | undefined),
      session_host: fixTextEncoding((session.host ?? session.session_host) as string | undefined),
      session_location: fixTextEncoding((session.location ?? session.session_location) as string | undefined),
      start_time: formatDateTime(startTime),
      end_time: formatDateTime(endTime),
      startTime: formatDateTime(startTime),
      endTime: formatDateTime(endTime),
      type: session.type as string,
      isLiked: isLikedCheck,
      likes: (session.likes ?? 0) as number,
      abstract: fixTextEncoding(session.abstract as string),
      authors: fixTextEncoding(session.authors as string)
    };
  });
}

/**
 * Extract unique days from sessions and determine date range
 */
function uniqueDays(): void {
  state.uniqueDays = [];
  const sessionDates = state.sessions.map(session => new Date(session.start_time.split(' ')[0]));

  if (sessionDates.length === 0) return;

  const earliestDate = new Date(Math.min(...sessionDates.map(d => d.getTime())));
  const latestDate = new Date(Math.max(...sessionDates.map(d => d.getTime())));

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
 * Set the selected day for filtering sessions
 */
function selectDay(value: string): void {
  state.selectedDay = value;
}

/**
 * Navigate to different agenda type (personal/general) with query parameters
 */
function navigateToAgendaType(type: string): void {
  const query: Record<string, string> = {};

  // Copy existing query parameters
  for (const [key, value] of Object.entries(route.query)) {
    if (typeof value === 'string') {
      query[key] = value;
    } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
      query[key] = value[0];
    }
  }

  // Add or update the `type` parameter based on the selected segment
  if (type === 'personal') {
    query.type = 'personal';
  } else {
    delete query.type; // Remove `type` for ICMP
  }

  // Navigate with the updated query parameters
  void router.push({ path: '/tabs/calendar', query });
  state.agendaType = type;
}

/**
 * Navigate to calendar view with current day and type selection
 */
function goToCalendar(): void {
  const query: Record<string, string> = { date: state.selectedDay ?? '' };
  if (state.passedUserId) {
    query.id = state.passedUserId.toString();
  } else if (state.agendaType === 'personal') {
    query.type = 'personal';
  }
  void router.push({ name: 'CalendarView', query });
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
  await fetchSessions();
});

const filteredSessions = computed(() => {
  if (!state.selectedDay) return state.sessions;
  return state.sessions
    .filter(session => session.start_time.startsWith(state.selectedDay!))
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
});

const groupedSessionsByTime = computed(() => {
  // Sort all sessions by start time
  const sortedSessions = [...filteredSessions.value].sort((a, b) =>
    new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );

  // Group sessions by time slots (start time)
  const timeGroups: Record<string, Session[]> = {};

  for (const session of sortedSessions) {
    const timeKey = session.start_time; // Use full start time as key

    if (!timeGroups[timeKey]) {
      timeGroups[timeKey] = [];
    }
    timeGroups[timeKey].push(session);
  }

  // Sort time groups chronologically
  const sortedTimeKeys = Object.keys(timeGroups).sort((a, b) =>
    new Date(a).getTime() - new Date(b).getTime()
  );

  const orderedGroups: Record<string, Session[]> = {};
  for (const timeKey of sortedTimeKeys) {
    orderedGroups[timeKey] = timeGroups[timeKey];
  }

  return orderedGroups;
});

/**
 * Extract workshop name from session title
 * Expected format: "(WORKSHOP NAME) — Session Title" or "WORKSHOP NAME — Session Title"
 */
function extractWorkshopName(sessionTitle: string): string {
  const parenthesesRegex = /^\(([^)]+)\)\s*—/;
  let match = parenthesesRegex.exec(sessionTitle);
  if (match) {
    return match[1];
  }

  const dashRegex = /^([^—]+)—/;
  match = dashRegex.exec(sessionTitle);
  if (match) {
    return match[1].trim();
  }

  const alphanumericRegex = /^([A-Z0-9]+)\s*—/;
  match = alphanumericRegex.exec(sessionTitle);
  if (match) {
    return match[1];
  }

  return sessionTitle; // Return full title if no pattern matches
}

/**
 * Format time slot for display as header
 */
function formatTimeSlot(timeSlot: string): string {
  try {
    const timePart = timeSlot.split(' ')[1];
    if (!timePart) {
      return 'Time TBA';
    }

    // Extract just hours:minutes from HH:MM:SS format
    const time = timePart.substring(0, 5);
    return time;
  } catch (error) {
    console.error('Error formatting time slot:', error, timeSlot);
    return 'Time TBA';
  }
}

/**
 * Format session type for display (kept for potential future use)
 */
function formatSessionType(type: string): string {
  const typeMap: Record<string, string> = {
    KEYNOTE: 'Keynote',
    FOOD: 'Lunch',
    COFFEE: 'Coffee Breaks',
    PRACTICAL: 'Practical Sessions',
    QnA: 'Q&A Sessions',
    MAIN: 'Main Track',
    DOCTORALCONSORTIUM: 'Doctoral Consortium',
    PANEL: 'Panel Discussions',
    TUTORIAL: 'Tutorials',
    WORKSHOP: 'Workshops',
    DEMO: 'Demonstrations',
    BPMFORUM: 'BPM Forum',
    EDUCATORSFORUM: 'Educators Forum',
    PROCESSTECHNOLOGYFORUM: 'Process Technology Forum',
    INDUSTRYFORUM: 'Industry Forum',
    RESPONSIBLEBPMFORUM: 'Responsible BPM Forum',
    JOURNALFIRST: 'Journal First Track',
    OTHER: 'Other Sessions'
  };

  // Handle workshop groups
  if (type.startsWith('WORKSHOP_')) {
    const workshopName = type.replace('WORKSHOP_', '');
    return workshopName;
  }

  return typeMap[type] || type;
}

/**
 * Format session time for display
 */
function formatSessionTime(session: Session): string {
  try {
    const startTimePart = session.start_time.split(' ')[1];
    const endTimePart = session.end_time.split(' ')[1];

    if (!startTimePart || !endTimePart) {
      return 'Time TBA';
    }

    // Extract just hours:minutes from HH:MM:SS format
    const startTime = startTimePart.substring(0, 5);
    const endTime = endTimePart.substring(0, 5);

    return `${startTime} - ${endTime}`;
  } catch (error) {
    console.error('Error formatting session time:', error, session);
    return 'Time TBA';
  }
}

const showSession = (id: number): void => {
  sessionIdDetail.value = id.toString();
  sessionModalOpen.value = true;
};
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

</style>
