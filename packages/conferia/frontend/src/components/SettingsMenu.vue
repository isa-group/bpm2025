<template>
  <Dialog
    :visible="visible"
    modal
    position="topright"
    class="w-80"
    @update:visible="$emit('hide')">
    <template #header>
      <div class="flex items-center space-x-3">
        <h3 class="text-lg font-semibold">Account</h3>
      </div>
    </template>

    <div class="space-y-4">
      <!-- User info section -->
      <div class="text-center p-4 bg-surface-50 dark:bg-surface-800 rounded-lg">
        <div class="logo-large mb-3"></div>
        <p class="text-surface-700 dark:text-surface-300">
          Welcome {{ name.firstname }} {{ name.lastname }}
        </p>
      </div>

      <!-- Menu items -->
      <div class="space-y-2">
        <Button
          label="Profile Settings"
          icon="pi pi-user"
          severity="secondary"
          text
          class="w-full justify-start"
          @click="navigateAndClose('/profile/settings/')" />

        <Button
          label="About the app"
          icon="pi pi-info-circle"
          severity="secondary"
          text
          class="w-full justify-start"
          @click="navigateAndClose('/tabs/about/')" />

        <Button
          label="Logout"
          icon="pi pi-sign-out"
          severity="secondary"
          text
          class="w-full justify-start text-red-600 hover:text-red-700"
          @click="logout" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import backend from '#/plugins/backend.config';

defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['hide']);

const router = useRouter();
const name = reactive({
  firstname: '',
  lastname: ''
});
const token = localStorage.getItem('accessToken');

onMounted(async () => {
  try {
    const response = await axios.get(backend.construct('account/getName'), { headers: { Authorization: `Bearer ${token}` } });
    name.firstname = response.data.firstname;
    name.lastname = response.data.lastname;
  } catch (error) {
    console.error('Failed to fetch user name', error);
  }
});

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  router.push('/auth/login');
  emits('hide');
};

const navigateAndClose = (path: string) => {
  router.push(path);
  emits('hide');
};
</script>

<style scoped>
.logo-large {
  background-image: url('@bpm2025-website/assets/icon');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 100px;
  width: 100%;
}
</style>
