<template>
  <ion-page>
    <HeaderBar name="Calendar" />

    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="() => {
          trackButtonClick('Previous Month Calendar', 'Agenda', 'Feature')
          changeMonth(-1)
        }">Prev</ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">{{ currentMonthName }} {{ state.currentYear }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="() => {
          trackButtonClick('Next Month Calendar', 'Agenda', 'Feature')
          changeMonth(1)
        }">Next</ion-button>
      </ion-buttons>
    </ion-toolbar>


    <ion-content>
      <div class="calendar">
        <div class="day" v-for="day in state.weekDays" :key="day">{{ day }}</div>
        <div
            class="date-box"
            v-for="day in state.daysOfMonth"
            :key="day.dateString"
            :class="{ 'not-current': !day.isCurrentMonth }"
            @click="() => {
              trackButtonClick('Calendar Date', 'Agenda', 'Feature')
              day.hasSession ? dateClicked(day): null
            }"
        >
          <div class="date-text">{{ day.date }}</div>
          <ion-icon :icon="star" v-if="day.hasSession" class="session-dot"></ion-icon>
        </div>
      </div>
    </ion-content>

  </ion-page>
</template>



<script setup>
import { reactive, onMounted, computed, nextTick } from 'vue';
import {
  IonPage,
  IonToolbar,
  IonContent,
  IonButton,
  IonIcon,
  IonTitle,
  IonButtons,
} from '@ionic/vue';
import HeaderBar from "@/components/HeaderBar.vue";
import axios from 'axios';
import { useRouter } from 'vue-router';
import { star } from 'ionicons/icons';
import { useRoute } from 'vue-router';
import backend from "/backend.config.ts";
import {googleanalytics} from "@/composables/googleanalytics.ts";

const{trackButtonClick} = googleanalytics()

const route = useRoute();
const router = useRouter();
const token = localStorage.getItem("accessToken");

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



function changeMonth(change) {
  const newDate = new Date(state.currentYear, state.currentMonth + change);
  state.currentMonth = newDate.getMonth();
  state.currentYear = newDate.getFullYear();

  // Recalculate days for the new month and update the state
  state.daysOfMonth = getDaysOfMonth(state.currentYear, state.currentMonth);

  // Assuming sessions do not need to be re-fetched, just re-mark the days
  markDaysWithSessions(); // Ensure days are re-marked according to the new month
}



async function fetchSessions() {
  try {
    const { id, type } = route.query;
    let response;

    if (id) {
      response = await axios.get(backend.construct(`agenda/session/likedlist/${id}`), {
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } else if (type === 'personal') {
      const currentUserIdResponse = await axios.get(backend.construct('account/id'), {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const currentUserId = currentUserIdResponse.data.id;
      response = await axios.get(backend.construct(`agenda/session/likedlist/${currentUserId}`), {
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } else {
      response = await axios.get(backend.construct('agenda/sessions'), {
        headers: { 'Authorization': `Bearer ${token}` },
      });
    }

    state.sessions = response.data;
    markDaysWithSessions();
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
  }
}



function markDaysWithSessions() {
  state.daysOfMonth.forEach(day => {
    // Check if the day is part of the current month
    if (!day.isCurrentMonth) return;

    // Look for sessions on this day
    const hasSession = state.sessions.some(session => {
      // Adjust to use the correct property name
      const startTime = session.startTime?.split('T')[0] ?? "";
      return day.dateString === startTime;
    });

    // Update the day's hasSession property if applicable
    if (hasSession) day.hasSession = true;
  });
}



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
  const theme = localStorage.getItem('theme'); // Get the theme from localStorage
  const rootStyle = document.documentElement.style;

  if (theme === 'dark') {
    rootStyle.setProperty('--text-color', '#ffffff'); // Dark background color
    rootStyle.setProperty('--secondary-text-color', '#686868');       // Light text color
    rootStyle.setProperty('--calendar-background-color', '#2a2a2a')
    rootStyle.setProperty('--icon-color', '#098BFF')

  } else {
    rootStyle.setProperty('--calendar-background-color', '#E6E6FA'); // Light background color
    rootStyle.setProperty('--text-color', '#000000');
    rootStyle.setProperty('--icon-color', '#000000')// Dark text color
    // Set other light theme colors as needed
  }
};


onMounted(() => {
  fetchSessions();
  applyTheme();
});

</script>



<style>

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 columns for 7 days of the week */
  gap: 1%; /* Space between each "day" box, adjusted to be responsive */
}

.day, .date-box {
  aspect-ratio: 1; /* Makes the box square */
  display: flex;
  position: relative;
}

.day {
  justify-content: center;
  align-items: center;
  background-color: transparent; /* No background for day names */
  color: var(--text-color); /* White color for the day names */
}

.calendar .date-box {
  justify-content: flex-end; /* Positions the date in the bottom-right */
  align-items: flex-end;
  padding: 5%; /* Responsive padding */
  cursor: pointer; /* Indicates the item is clickable */
  background-color: var(--calendar-background-color); /* Slight background color for date boxes */
  border-radius: 5%; /* Responsive border radius */
}

.date-text {
  font-size: 1.2em; /* Slightly larger and responsive font size */
  color: var(--text-color); /* White color for the numbers */
}

.session-dot {
  position: absolute;
  top: 15%; /* Centers the dot vertically */
  left: 15%; /* Centers the dot horizontally */
  transform: translate(-50%, -50%); /* Ensures the dot is perfectly centered */
  width: 20%; /* Size of the dot in em for responsiveness */
  height: 20%;
  color : #098BFF;
  background-color: var(--calendar-background-color); /* Color of the dot */
  border-radius: 50%; /* Makes the dot circular */
}


</style>