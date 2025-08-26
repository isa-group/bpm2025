<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sticky Header (matching agenda style) -->
    <div class="sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between px-4 py-4">
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Messages
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Stay updated with conference announcements
          </p>
        </div>
        <button
          class="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          @click="openPostMessage">
          <svg
            class="w-5 h-5"
            viewBox="0 0 32 32"
            fill="currentColor">
            <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm7 15h-6v6h-2v-6H9v-2h6V9h2v6h6v2z" />
          </svg>
          <span class="font-medium">Post</span>
        </button>
      </div>
    </div>

    <div class="px-4 py-6 pb-20 space-y-6">
      <!-- Messages section -->
      <div>
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800 mb-4">
          <h3 class="font-bold text-lg text-blue-900 dark:text-blue-100">
            Conference Messages
          </h3>
        </div>

        <!-- Messages list -->
        <div class="space-y-3">
          <div
            v-for="message in messages"
            :key="message.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
            @click="setVisibleMessage(message.id)">
            <div class="p-4">
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-1">
                    <div
                      v-if="!message.read"
                      class="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                    <h3 class="font-semibold text-gray-900 dark:text-white text-lg">
                      {{ message.title }}
                    </h3>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {{ message.message.substring(0, 150) }}{{ message.message.length > 150 ? '...' : '' }}
                  </p>
                </div>
              </div>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>By {{ message.author }}</span>
                <span>{{ dayjs(message.date).fromNow() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message detail modal -->
    <Dialog
      :visible="isOpen"
      modal
      header="Message Details"
      class="w-full max-w-3xl mx-4"
      :style="{ maxHeight: '90vh', overflow: 'hidden' }"
      :pt="{
        content: { class: 'p-6' },
        header: { class: 'px-6 py-4' }
      }"
      @update:visible="closeMessage">
      <div class="space-y-6 max-h-[70vh] overflow-y-auto">
        <!-- Author and date info -->
        <div class="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
          <div
            class="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
            @click="navigateToAuthor">
            <Avatar
              :image="activeMessage.avatar || 'https://ionicframework.com/docs/img/demos/avatar.svg'"
              shape="circle"
              size="large"
              class="ring-2 ring-blue-100 dark:ring-blue-800 flex-shrink-0" />
            <div class="min-w-0">
              <div class="font-semibold text-gray-900 dark:text-white truncate">
                {{ activeMessage.author }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                View profile
              </div>
            </div>
          </div>

          <div class="text-right flex-shrink-0">
            <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ dayjs(activeMessage.date).format('MMMM D, YYYY') }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ dayjs(activeMessage.date).format('HH:mm') }} • {{ dayjs(activeMessage.date).fromNow() }}
            </div>
          </div>
        </div>

        <!-- Message title and content combined -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <!-- Title section -->
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 border-b border-blue-100 dark:border-blue-800">
            <h3 class="text-2xl font-bold text-blue-900 dark:text-blue-100 break-words">
              {{ activeMessage.title }}
            </h3>
          </div>

          <!-- Content section (larger) -->
          <div class="p-6">
            <div class="prose prose-gray dark:prose-invert max-w-none">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-base break-words">
                {{ activeMessage.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    <!-- Post message modal -->
    <Dialog
      :visible="isOpenPost"
      modal
      header="Post new message"
      class="w-full max-w-lg mx-4"
      @update:visible="closePostMessage">
      <form
        class="space-y-4"
        @submit.prevent="submitForm">
        <div>
          <FloatLabel>
            <InputText
              id="titleInput"
              v-model="formData.title"
              type="text"
              class="w-full"
              required />
            <label for="titleInput">Title</label>
          </FloatLabel>
        </div>

        <div>
          <FloatLabel>
            <Textarea
              id="messageInput"
              v-model="formData.message"
              rows="10"
              class="w-full"
              required />
            <label for="messageInput">Message</label>
          </FloatLabel>
        </div>

        <Message
          v-if="postError"
          severity="error"
          :closable="false">
          {{ postError }}
        </Message>

        <Button
          type="submit"
          label="Post Message"
          class="w-full"
          :loading="isSubmitting" />
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import FloatLabel from 'primevue/floatlabel';
import Avatar from 'primevue/avatar';
import Message from 'primevue/message';
import { useToast } from 'primevue/usetoast';
import backend from '#/plugins/backend.config';

interface MessageType {
  id: number;
  title: string;
  message: string;
  date: string;
  author: string;
  authorId: number;
  avatar?: string;
  read: boolean;
}

dayjs.extend(relativeTime);

const router = useRouter();
const toast = useToast();

const messages = ref<MessageType[]>([]);
const isOpen = ref(false);
const isOpenPost = ref(false);
const postError = ref('');
const activeMessage = ref<MessageType>({} as MessageType);
const isSubmitting = ref(false);

const formData = ref({
  title: '',
  message: ''
});
const token = ref(localStorage.getItem('accessToken'));

const navigateToAuthor = () => {
  if (activeMessage.value.authorId) {
    void router.push(`/attendee/${activeMessage.value.authorId}`);
    closeMessage();
  }
};

const submitForm = async () => {
  isSubmitting.value = true;
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

    closePostMessage();
    toast.add({ severity: 'success', summary: 'Success', detail: 'Your message has been posted.', life: 5000 });
    await fetchMessages();
  } catch (error: unknown) {
    postError.value = 'Failed to post the message!';
    console.error('Failed to post message:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const setVisibleMessage = async (id: number) => {
  const message = messages.value.find(message => message.id === id);
  if (message) {
    activeMessage.value = message;
    isOpen.value = true;
    await axios.get(
      backend.construct(`message/read/${id}`),
      { headers: { Authorization: `Bearer ${token.value}` } });
  }
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

const fetchMessages = async () => {
  try {
    const response = await axios.get(backend.construct('message'), { headers: { Authorization: `Bearer ${token.value}` } });
    const tmp_messages = response.data;
    await Promise.all(tmp_messages.map(async (msg: { avatar?: string }) => {
      if (msg.avatar) {
        msg.avatar = await getAvatarImage(msg.avatar);
      }
    }));
    messages.value = tmp_messages;
  } catch (error) {
    console.error('Failed to fetch messages', error);
  }
};

const getAvatarImage = async (id: string) => {
  try {
    const response = await axios.get(backend.construct(`account/getProfilePicture/${id}`), {
      headers: { Authorization: `Bearer ${token.value}` },
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

onMounted(fetchMessages);
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
