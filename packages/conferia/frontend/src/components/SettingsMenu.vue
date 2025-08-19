<template>
  <aside class="px-4 py-3 border-b border-neutral-200/60 dark:border-neutral-800/60">
    <div class="flex items-center gap-3">
      <div id="logo-large" class="h-12 w-12 bg-center bg-no-repeat bg-contain" />
      <div>
        <p class="text-sm text-neutral-600 dark:text-neutral-300">Welcome</p>
        <p class="text-base font-600">{{ name.firstname }} {{ name.lastname }}</p>
      </div>
    </div>
    <nav class="mt-3">
      <ul class="flex flex-col divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
        <li>
          <RouterLink to="/profile/settings/" class="flex items-center gap-3 py-3">
            <span class="i-ph-gear-six-duotone text-5 text-primary-600" />
            <span>Settings</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/tabs/about/" class="flex items-center gap-3 py-3">
            <span class="i-ph-info-duotone text-5 text-primary-600" />
            <span>About the app</span>
          </RouterLink>
        </li>
        <li>
          <button class="flex items-center gap-3 py-3 w-full text-left" @click="logout">
            <span class="i-ph-sign-out-duotone text-5 text-primary-600" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import backend from '#/plugins/backend.config';

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
    console.error('Failed to fetch pages', error);
  }
});

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  router.push('/auth/login');
};
</script>

<style scoped>
#logo-large { background-image: url('@bpm2025-website/assets/icon'); }
</style>
