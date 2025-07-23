<template>
  <IonPage>
    <HeaderBar
      name="Messages"
      @reload-page="reloadPage" />
    <IonContent
      id="main-content"
      :fullscreen="true">
      <IonRefresher
        slot="fixed"
        @ion-refresh="reloadPage">
        <IonRefresherContent />
      </IonRefresher>

      <IonList lines="full">
        <IonItem
          v-for="message in messages"
          :key="message.id"
          button
          @click="() => {
            setVisibleMessage(message.id);
          }">
          <IonLabel>
            <h2 :class="{bold :!message.read}">
              <IonIcon
                v-if="!message.read"
                slot="start"
                :icon="bookmark"
                color="danger" />
              {{ message.title }}
            </h2>
          </IonLabel>
          <template #end>
            <IonNote class="ion-text-right">
              {{ dayjs(message.date).fromNow() }}<br>
              By {{ message.author }}
            </IonNote>
          </template>
        </IonItem>
      </IonList>

      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        class="custom-fab">
        <IonFabButton
          @click="() => {
            openPostMessage();
          }">
          <IonIcon :icon="add" />
        </IonFabButton>
      </IonFab>

      <IonModal
        :is-open="isOpen"
        @did-dismiss="closeMessage()">
        <IonHeader>
          <IonToolbar>
            <template #start>
              <IonButtons>
                <IonBackButton
                  default-href="/tabs/messages"
                  @click="() => {
                    closeMessage();
                  }" />
              </IonButtons>
            </template>
            <IonTitle>Message</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <p style="font-size: .8em">
                  Posted {{ dayjs(activeMessage.date).fromNow() }}<br>
                  {{ dayjs(activeMessage.date).format('D MMMM, HH:mm') }}
                </p>
              </IonCol>
              <IonCol class="ion-text-right">
                <IonChip
                  :router-link="`/attendee/${activeMessage.authorId}`"
                  @click="() => {
                    closeMessage();
                  }">
                  <IonAvatar>
                    <img
                      :src="activeMessage.avatar || 'https://ionicframework.com/docs/img/demos/avatar.svg'"
                      alt="Profile picture">
                  </IonAvatar>
                  <IonLabel>{{ activeMessage.author }}</IonLabel>
                </IonChip>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div class="ion-padding-horizontal">
            <h1>{{ activeMessage.title }}</h1>
            <p style="white-space: pre-wrap">
              {{ activeMessage.message }}
            </p>
            <p
              v-if="userId == activeMessage.authorId"
              class="ion-text-right">
              <IonButton
                color="danger"
                @click="() => {
                  deleteMessage();
                }">
                <IonIcon :icon="trashOutline" /> Delete
              </IonButton>
            </p>
          </div>
        </IonContent>
      </IonModal>
      <IonModal
        :is-open="isOpenPost"
        @did-dismiss="closePostMessage()">
        <IonHeader>
          <IonToolbar>
            <template #start>
              <IonButtons>
                <IonBackButton
                  default-href="/tabs/messages"
                  @click="() => {
                    closePostMessage();
                  }" />
              </IonButtons>
            </template>
            <IonTitle>Post new message</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <form
            @submit.prevent="() => {
              submitForm();
            }">
            <IonInput
              v-model="formData.title"
              type="text"
              required
              label="Title"
              placeholder="Message title"
              label-placement="stacked" />
            <IonTextarea
              v-model="formData.message"
              required
              label="Message"
              placeholder="Write here the text of your message..."
              label-placement="stacked"
              rows="20" />
            <p
              v-if="postError"
              class="error-message">
              {{ postError }}
            </p>
            <IonButton
              expand="full"
              type="submit"
              class="ion-margin-top">
              Post Message
            </IonButton>
          </form>
        </IonContent>
      </IonModal>
    </IonContent>
  </IonPage>
</template>

<script setup lang="js">
import {
  IonPage,
  IonContent,
  IonButton,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButtons,
  IonCol,
  IonRow,
  IonGrid,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonModal,
  IonFab,
  IonIcon,
  IonFabButton,
  IonTextarea,
  IonInput,
  IonAvatar,
  IonRefresher,
  IonRefresherContent,
  IonChip,
  IonBackButton,
  toastController,
  alertController
} from '@ionic/vue';
import { bookmark, bookmarkOutline, mail, starOutline, starSharp, trashOutline, add } from 'ionicons/icons';
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import HeaderBar from '#/components/HeaderBar.vue';
import backend from '#/backend.config';

dayjs.extend(relativeTime);

const messages = ref([]);
const isOpen = ref(false);
const isOpenPost = ref(false);
const postError = ref('');
const activeMessage = ref({});

const formData = ref({
  title: '',
  message: ''
});
const token = ref(localStorage.getItem('accessToken'));
const userId = ref(localStorage.getItem('userId'));

const submitForm = async () => {
  try {
    const response = await axios.post(backend.construct('message'),
      {
        title: formData.value.title,
        text: formData.value.message
      }, {
        headers: { Authorization: `Bearer ${token.value}` }
      }
    );
    postError.value = '';
    if (response.data?.accessToken && response.data.refreshToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      token.value = response.data.accessToken;
    }
  } catch (error) {
    postError.value = 'Failed to post the message!';
    console.error('Failed to fetch user details:', error);
  }

  closePostMessage();

  const toast = await toastController.create({
    message: 'Your message has been posted.',
    duration: 5000,
    positionAnchor: 'footer'
  });
  await toast.present();

  await fetchMessages();
};

const setVisibleMessage = async (id) => {
  activeMessage.value = messages.value.find(message => message.id === id);
  isOpen.value = true;
  await axios.get(
    backend.construct(`message/read/${activeMessage.value.id}`),
    { headers: { Authorization: `Bearer ${token.value}` } });
};

const openPostMessage = () => {
  isOpenPost.value = true;
};

const closeMessage = () => {
  isOpen.value = false;
};

const closePostMessage = () => {
  formData.value.title = '';
  formData.value.message = '';
  isOpenPost.value = false;
  postError.value = '';
};

const deleteMessage = async () => {
  const alert = await alertController.create({
    header: 'Confirm!',
    message: 'Are you sure you want to delete this message?',
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      { text: 'Delete',
        handler: async () => {
          await axios.delete(backend.construct(`message/${activeMessage.value.id}`), {
            headers: { Authorization: `Bearer ${token.value}` } });

          closeMessage();
          await fetchMessages();

          return;
        }
      }
    ]
  });
  await alert.present();
};

const reloadPage = async (event) => {
  await fetchMessages();
  if (event) {
    event.target.complete();
  }
};

const fetchMessages = async () => {
  try {
    const response = await axios.get(backend.construct('message'), { headers: { Authorization: `Bearer ${token.value}` } });
    const tmp_messages = response.data;
    const lastDownloadMessages = localStorage.getItem('lastDownloadMessages');
    await Promise.all(tmp_messages.map(async (msg) => {
      if (msg.avatar) {
        msg.avatar = await getAvatarImage(msg.avatar);
      }
    }));
    messages.value = tmp_messages;
  } catch (error) {
    console.error('Failed to fetch pages', error);
  }
};

const getAvatarImage = async (id) => {
  try {
    const response = await axios.get(backend.construct(`account/getProfilePicture/${id}`), {
      headers: { Authorization: `Bearer ${token.value}` },
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

onMounted(fetchMessages);

</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
