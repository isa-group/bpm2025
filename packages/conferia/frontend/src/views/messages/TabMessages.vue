<template>
  <ion-page>
    <HeaderBar name="Messages" @reloadPage="reloadPage" />
    <ion-content id="main-content" :fullscreen="true">

      <ion-refresher slot="fixed" @ionRefresh="reloadPage">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-list lines="full">
        <ion-item button v-for="message in messages" :key="message.id" @click="() => {
          trackButtonClick('Open Message', 'Messages Page', 'Feature');
          setVisibleMessage(message.id);
        }">
          <ion-label>
            <h2 :class="{bold :!message.read}">
              <ion-icon
                  v-if="!message.read"
                  :icon="bookmark" slot="start" color="danger"></ion-icon>
              {{ message.title }}
            </h2>
          </ion-label>
          <ion-note slot="end" class="ion-text-right">
            {{ dayjs(message.date).fromNow() }}<br>
            By {{ message.author }}
          </ion-note>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed" class="custom-fab">
        <ion-fab-button @click="() => {
          trackButtonClick('Post New Message', 'Messages Page', 'Feature');
          openPostMessage();
        }">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-modal :is-open="isOpen" @didDismiss="closeMessage()">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/tabs/messages" @click="() => {
                trackButtonClick('Close Message', 'Messages Page', 'Feature');
                closeMessage();
              }"></ion-back-button>
            </ion-buttons>
            <ion-title>Message</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-grid>
            <ion-row>
              <ion-col>
                <p style="font-size: .8em">
                  Posted {{ dayjs(activeMessage.date).fromNow() }}<br>
                  {{ dayjs(activeMessage.date).format('D MMMM, HH:mm') }}
                </p>
              </ion-col>
              <ion-col class="ion-text-right">
                <ion-chip :router-link="`/attendee/${activeMessage.authorId}`" @click="() => {
                  trackButtonClick('Open Author Profile', 'Messages Page', 'Feature');
                  closeMessage();
                }">
                  <ion-avatar>
                    <img :src="activeMessage.avatar || 'https://ionicframework.com/docs/img/demos/avatar.svg'" alt="Profile picture" />
                  </ion-avatar>
                  <ion-label>{{ activeMessage.author }}</ion-label>
                </ion-chip>
              </ion-col>
            </ion-row>
          </ion-grid>
          <div class="ion-padding-horizontal">
            <h1>{{ activeMessage.title }}</h1>
            <p style="white-space: pre-wrap">{{ activeMessage.message }}</p>
            <p class="ion-text-right" v-if="userId == activeMessage.authorId">
              <ion-button color="danger" @click="() => {
                trackButtonClick('Delete Message', 'Messages Page', 'Feature');
                deleteMessage();
              }">
                <ion-icon :icon="trashOutline"></ion-icon> Delete
              </ion-button>
            </p>
          </div>
        </ion-content>
      </ion-modal>
      <ion-modal :is-open="isOpenPost" @didDismiss="closePostMessage()">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/tabs/messages" @click="() => {
                trackButtonClick('Close Post New Message', 'Messages Page', 'Feature');
                closePostMessage();
              }"></ion-back-button>
            </ion-buttons>
            <ion-title>Post new message</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <form @submit.prevent="() => {
            trackButtonClick('Submit New Message', 'Messages Page', 'Feature');
            submitForm();
          }">
            <ion-input
                v-model="formData.title"
                type="text" required
                label="Title"
                placeholder="Message title"
                label-placement="stacked"></ion-input>
            <ion-textarea
                v-model="formData.message" required
                label="Message"
                placeholder="Write here the text of your message..."
                label-placement="stacked"
                rows="20"></ion-textarea>
            <p v-if="postError" class="error-message">{{ postError }}</p>
            <ion-button expand="full" type="submit" class="ion-margin-top">Post Message</ion-button>
          </form>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
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
import {bookmark, bookmarkOutline, mail, starOutline, starSharp, trashOutline} from 'ionicons/icons';
import { ref } from 'vue';
import HeaderBar from "@/components/HeaderBar.vue";
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import {add} from "ionicons/icons";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import backend from "/backend.config.ts";
import {googleanalytics} from "@/composables/googleanalytics.ts";

const { trackButtonClick } = googleanalytics();

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
const token = ref(localStorage.getItem("accessToken"))
const userId = ref(localStorage.getItem("userId"));

const submitForm = async () => {
  try {
    const response = await axios.post(backend.construct("message"),
    {
            title: formData.value.title,
            text: formData.value.message
          },{
            headers: { Authorization: `Bearer ${token.value}` }
          }
    );
    postError.value = '';
    if (response.data && response.data.accessToken && response.data.refreshToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      token.value = response.data.accessToken;
    }
  } catch (error) {
    postError.value = "Failed to post the message!";
    console.error("Failed to fetch user details:", error);
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
      { headers: {Authorization: `Bearer ${token.value}`}});
}

const openPostMessage = () => {
  isOpenPost.value = true;
}

const closeMessage = () => {
  isOpen.value = false;
}

const closePostMessage = () => {
  formData.value.title = '';
  formData.value.message = '';
  isOpenPost.value = false;
  postError.value = '';
}

const deleteMessage = async () => {
  const alert = await alertController.create({
    header: 'Confirm!',
    message: 'Are you sure you want to delete this message?',
    buttons: [
      { text: 'Cancel',  role: 'cancel', },
      { text: 'Delete',
        handler: async () => {
          await axios.delete(backend.construct(`message/${activeMessage.value.id}`), {
            headers: {Authorization: `Bearer ${token.value}`}});

          closeMessage();
          await fetchMessages();

          return;
        },
      },
    ],
  });
  await alert.present();
}

const reloadPage = async (event) => {
  await fetchMessages();
  if (event) {
    event.target.complete();
  }
}

const fetchMessages = async () => {
  try {
    const response = await axios.get(backend.construct('message'),{ headers: { Authorization: `Bearer ${token.value}` } });
    const tmp_messages = response.data;
    const lastDownloadMessages = localStorage.getItem('lastDownloadMessages');
    await Promise.all(tmp_messages.map(async msg => {
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
      responseType: 'blob'  // This tells axios to expect a binary response instead of JSON
    });
    return URL.createObjectURL(response.data);  // Convert the blob to a URL and return it
  } catch (error) {
    console.error("Error fetching image:", error);
    return '';  // Return an empty string or a default image path in case of error
  }
}

onMounted(fetchMessages);

</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
