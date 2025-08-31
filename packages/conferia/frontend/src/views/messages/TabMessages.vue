<template>
  <TabsPage
    title="Messages"
    subtitle="Stay updated with conference announcements">
    <template #header-post>
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
    </template>
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
            <UserAvatar
              :image-url="activeMessage.avatar"
              :user="{ firstname: activeMessage.author.charAt(0), lastname: '' }"
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

        <!-- Delete button (only for message author) -->
        <div
          v-if="userId === activeMessage.authorId"
          class="flex justify-end">
          <Button
            label="Delete Message"
            severity="danger"
            outlined
            size="small"
            :loading="isDeleting"
            @click="deleteMessage(activeMessage.id)">
            <template #icon>
              <svg
                class="w-4 h-4 mr-2"
                viewBox="0 0 32 32"
                fill="currentColor">
                <path d="M12 12h2v12h-2zm6 0h2v12h-2z" />
                <path d="M4 6v2h2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zM8 8h16v16H8z" />
                <path d="M12 2h8v2h-8z" />
              </svg>
            </template>
          </Button>
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
  </TabsPage>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';
import { useToast } from 'primevue/usetoast';
import UserAvatar from '#/components/UserAvatar.vue';
import { axiosKey, userIdKey } from '#/plugins/symbols';
import TabsPage from '#/components/TabsPage.vue';

interface MessageType {
  id: number;
  title: string;
  message: string;
  date: string;
  author: string;
  authorId: string;
  avatar?: string;
  read: boolean;
}

dayjs.extend(relativeTime);

const router = useRouter();
const axios = inject(axiosKey)!;
const userId = inject(userIdKey)!;
const toast = useToast();

const messages = ref<MessageType[]>([]);
const isOpen = ref(false);
const isOpenPost = ref(false);
const postError = ref('');
const activeMessage = ref<MessageType>({} as MessageType);
const isSubmitting = ref(false);
const isDeleting = ref(false);

const formData = ref({
  title: '',
  message: ''
});

const navigateToAuthor = () => {
  if (activeMessage.value.authorId) {
    void router.push(`/attendee/${activeMessage.value.authorId}`);
    closeMessage();
  }
};

const submitForm = async () => {
  isSubmitting.value = true;
  try {
    await axios.post('message',
      {
        title: formData.value.title,
        text: formData.value.message
      }
    );
    postError.value = '';

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

const deleteMessage = async (messageId: number) => {
  if (isDeleting.value) return;

  const confirmed = confirm('Are you sure you want to delete this message?');
  if (!confirmed) return;

  isDeleting.value = true;
  try {
    await axios.delete(`message/${messageId}`);

    // Remove message from local list
    messages.value = messages.value.filter(msg => msg.id !== messageId);

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message has been deleted successfully.',
      life: 3000
    });

    // Close modal if the deleted message is currently open
    if (activeMessage.value.id === messageId) {
      closeMessage();
    }
  } catch (error: unknown) {
    console.error('Failed to delete message:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete the message.',
      life: 3000
    });
  } finally {
    isDeleting.value = false;
  }
};

const setVisibleMessage = async (id: number) => {
  const message = messages.value.find(message => message.id === id);
  if (message) {
    activeMessage.value = message;
    isOpen.value = true;
    await axios.get(`message/read/${id}`);
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
    const response = await axios.get('message');
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
    const response = await axios.get(`account/getProfilePicture/${id}`, {
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

void fetchMessages();
</script>
