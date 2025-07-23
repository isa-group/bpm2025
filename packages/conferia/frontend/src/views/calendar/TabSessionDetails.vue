<template>
  <IonModal
    :is-open="isOpen"
    @will-present="loading = true"
    @did-present="openModal()">
    <IonHeader>
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonBackButton
              default-href="/tabs/calendar"
              @click="() => {
                closeModal()
              }" />
          </IonButtons>
        </template>
        <IonTitle>Session Detail</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent
      id="main-content"
      :fullscreen="true">
      <div v-if="loading">
        <p
          class="ion-text-center"
          style="margin-top: 50%; opacity: 0.5">
          <em>Loading...</em>
        </p>
      </div>
      <div
        v-else
        class="ion-padding">
        <h1>{{ pageData.name }}</h1>
        <p><strong>Session chair:</strong> {{ pageData.host }}</p>
        <p>
          <strong>Time:</strong> {{ dayjs(pageData.startTime).format('D MMMM, HH:mm') }}-{{ dayjs(pageData.endTime).format('HH:mm') }}<br>
          <strong>Location:</strong> {{ pageData.location }}
        </p>
        <div v-html="pageData.content" />
      </div>
    </IonContent>
  </IonModal>
</template>

<script setup>
import { IonContent, IonModal, IonTitle, IonButtons, IonToolbar, IonHeader, IonBackButton, IonLoading } from '@ionic/vue';
import { reactive, ref } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import backend from '#/backend.config';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close']);

const loading = ref(true);

// const route = useRoute();
const pageData = reactive({
  name: '', // Session name for the header
  host: '',
  location: '',
  startTime: '',
  endTime: '',
  content: '' // Session content
});
const token = localStorage.getItem('accessToken');
const closeModal = () => {
  emit('close');
};

const openModal = async () => {
  try {
    if (props.id != '') {
      loading.value = true;
      const response = await axios.get(backend.construct(`agenda/session/${props.id}`),
        { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
        Object.assign(pageData, response.data);
        loading.value = false;
      });
    }
  } catch (error) {
    console.error('Failed to fetch session data', error);
  }
};
</script>
