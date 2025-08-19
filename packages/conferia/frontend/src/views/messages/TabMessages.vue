<template>
  <div class="flex flex-col min-h-dvh">
    <HeaderBar name="Messages" @reload-page="reloadPage" />
    <main id="main-content" class="flex-1">
      <div class="p-4">
        <button class="px-3 py-1.5 text-sm rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800" @click="reloadPage()">Refresh</button>
      </div>

      <ul class="divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
        <li v-for="message in messages" :key="message.id">
          <button class="w-full text-left px-4 py-3" @click="setVisibleMessage(message.id)">
            <h2 :class="{ 'font-700': !message.read }" class="flex items-center gap-2">
              <span v-if="!message.read" class="i-ph-bookmark-duotone text-red-500" />
              {{ message.title }}
            </h2>
            <div class="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              {{ dayjs(message.date).fromNow() }} · By {{ message.author }}
            </div>
          </button>
        </li>
      </ul>

      <!-- FAB -->
      <button class="fixed bottom-18 right-4 h-14 w-14 rounded-full bg-primary-600 text-white shadow-lg grid place-items-center hover:bg-primary-500" @click="openPostMessage">
        <span class="i-ph-plus-bold text-7" />
      </button>

      <!-- View Message Modal -->
      <div v-if="isOpen" class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" @click.self="closeMessage">
        <div class="w-full max-w-xl rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60">
          <div class="flex items-center h-12 px-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
            <h3 class="font-600">Message</h3>
            <button class="ml-auto i-ph-x-bold text-5" @click="closeMessage" aria-label="Close" />
          </div>
          <div class="p-4 space-y-4">
            <div class="flex items-start justify-between gap-3">
              <p class="text-xs text-neutral-600 dark:text-neutral-400">
                Posted {{ dayjs(activeMessage.date).fromNow() }}<br>
                {{ dayjs(activeMessage.date).format('D MMMM, HH:mm') }}
              </p>
              <RouterLink :to="`/attendee/${activeMessage.authorId}`" @click="closeMessage" class="inline-flex items-center gap-2 px-2 py-1 rounded-full border border-neutral-200/60 dark:border-neutral-800/60">
                <img :src="activeMessage.avatar || 'https://ionicframework.com/docs/img/demos/avatar.svg'" alt="Profile picture" class="h-6 w-6 rounded-full object-cover">
                <span class="text-sm">{{ activeMessage.author }}</span>
              </RouterLink>
            </div>
            <h1 class="text-xl font-700">{{ activeMessage.title }}</h1>
            <p class="whitespace-pre-wrap">{{ activeMessage.message }}</p>
            <div v-if="userId == activeMessage.authorId" class="text-right">
              <button class="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-red-500 text-red-600 hover:bg-red-50" @click="deleteMessage">
                <span class="i-ph-trash-duotone" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Post Modal -->
      <div v-if="isOpenPost" class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" @click.self="closePostMessage">
        <div class="w-full max-w-xl rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60">
          <div class="flex items-center h-12 px-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
            <h3 class="font-600">Post new message</h3>
            <button class="ml-auto i-ph-x-bold text-5" @click="closePostMessage" aria-label="Close" />
          </div>
          <form class="p-4 space-y-3" @submit.prevent="submitForm">
            <label class="block text-sm font-600">Title</label>
            <input v-model="formData.title" type="text" required placeholder="Message title" class="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:(ring-2 ring-primary-500 border-primary-500)" />
            <label class="block text-sm font-600">Message</label>
            <textarea v-model="formData.message" rows="10" required placeholder="Write here the text of your message..." class="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:(ring-2 ring-primary-500 border-primary-500)"></textarea>
            <p v-if="postError" class="text-red-600 text-sm">{{ postError }}</p>
            <div class="pt-2">
              <button type="submit" class="w-full px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-500">Post Message</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  <!-- Toast -->
    <div v-if="toast" class="fixed bottom-4 inset-x-0 z-50 grid place-items-center">
      <div class="px-4 py-2 rounded bg-neutral-900 text-white shadow">{{ toast }}</div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import HeaderBar from '#/components/HeaderBar.vue';
import backend from '#/plugins/backend.config';

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

  // simple toast replacement
  showToast('Your message has been posted.');

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
  const ok = window.confirm('Are you sure you want to delete this message?');
  if (!ok) return;
  await axios.delete(backend.construct(`message/${activeMessage.value.id}`), {
    headers: { Authorization: `Bearer ${token.value}` }
  });
  closeMessage();
  await fetchMessages();
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

// toast helpers
const toast = ref(null);
const showToast = (msg) => {
  toast.value = msg;
  setTimeout(() => (toast.value = null), 3000);
};
</script>
