<template>
  <IonPage>
    <HeaderBar name="Agenda" />

    <!-- ICPM/Personal Segment Bar -->
    <IonToolbar class="agenda-type-bar">
      <IonSegment
        color="dark"
        :value="agendaSegmentValue"
        class="full-width-segment">
        <IonSegmentButton
          value="all"
          class="half-width-segment-button"
          @click="() => {
            navigateToAgendaType('all')
          }">
          <IonLabel class="segment-label">
            <span>Full Agenda</span>
          </IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="personal"
          class="half-width-segment-button"
          @click="() =>{
            navigateToAgendaType('personal')
          }">
          <IonLabel class="segment-label">
            <span>Personalized Agenda</span>
          </IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </IonToolbar>
    <IonToolbar :style="`--days-count: ${state.uniqueDays.length}`">
      <IonSegment
        v-model="state.selectedDay"
        value="all"
        scrollable>
        <IonSegmentButton
          v-for="day in state.uniqueDays"
          :key="day.value"
          :value="day.value"
          :class="{'day-without-session': !day.hasSession, 'day-with-session': day.hasSession}"
          @click="() => {
            day.hasSession ? selectDay(day.value) : null
          }">
          <IonLabel>
            <span class="day-name">{{ day.label.split(', ')[0] }}</span>
            <span class="day-date">{{ day.label.split(', ')[1] }}</span>
          </IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <template #end>
        <IonButtons>
          <IonButton
            @click="() =>{
              goToCalendar
            }">
            <IonIcon
              :icon="calendarIcon"
              class="larger-icon" />
          </IonButton>
        </IonButtons>
      </template>
    </IonToolbar>

    <TabSessionDetails
      :id="sessionIdDetail"
      :is-open="sessionModalOpen"
      @did-dismiss="sessionModalOpen = false"
      @close="sessionModalOpen = false" />

    <IonContent id="main-content">
      <div v-if="state.selectedDay">
        <div
          v-for="(group, timeSlot) in groupedSessionsByTimeSlot"
          :key="timeSlot">
          <IonItemDivider color="light">
            <IonLabel>
              <h2>{{ timeSlot }}</h2>
            </IonLabel>
          </IonItemDivider>
          <IonItem
            v-for="session in group"
            :key="session.id"
            button
            @click="() => {
              showSession(session.id)
            }">
            <template #end>
              <IonNote class="ion-text-right">
                <IonIcon
                  :icon="session.isLiked ? heart : heartOutline"
                  :color="session.isLiked ? 'danger' : 'medium'"
                  style="font-size: 2.5em"
                  @click.stop="() => {
                    toggleLike(session)
                  }" /><br>
                <span v-if="session.likes > 0">
                  {{ session.likes + ' like' + (session.likes > 1 ? 's' : '') }}
                </span>
                <span v-else>&nbsp;</span>
              </IonNote>
            </template>
            <IonLabel>
              <h3>{{ session.session_name }}</h3>
              <p>{{ session.session_host }}</p>
              <p>{{ session.session_location }}</p>
            </IonLabel>
          </IonItem>
        </div>
      </div>
      <div v-else>
        <p class="ion-padding select-day">
          Select a day from the top to see the agenda.
        </p>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { reactive, onMounted, computed, watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import {
  IonPage,
  IonToolbar,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonButtons,
  IonItemDivider,
  IonSegment,
  IonSegmentButton,
  IonLabel, IonNote
} from '@ionic/vue';
import { heart, heartOutline, calendarNumber } from 'ionicons/icons';
import HeaderBar from '#/components/HeaderBar.vue';
import TabSessionDetails from '#/views/calendar/TabSessionDetails.vue';
import backend from '/backend.config.ts';

const router = useRouter();
const route = useRoute();

const calendarIcon = calendarNumber;
const token = localStorage.getItem('accessToken');

const sessionIdDetail = ref('');
const sessionModalOpen = ref(false);

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

</style>
