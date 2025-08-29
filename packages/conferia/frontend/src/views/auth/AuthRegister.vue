<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
    <Card class="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-sm my-4">
      <template #content>
        <div class="space-y-6 sm:space-y-8 p-6">
          <!-- Apple-style Header -->
          <div class="text-center space-y-2">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-surface-50">
              Join BPM 2025
            </h1>
            <p class="text-sm sm:text-base text-surface-600 dark:text-surface-400">
              Create your account to get started
            </p>
          </div>

          <!-- Registration Form -->
          <form
            id="form"
            class="space-y-4 sm:space-y-6"
            @submit.prevent="sendUserInformation">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div class="space-y-1 sm:space-y-2">
                <label
                  for="Firstname"
                  class="block text-sm font-medium text-surface-700 dark:text-surface-300">
                  First name
                </label>
                <InputText
                  id="Firstname"
                  v-model="userInformation.firstname"
                  placeholder="Enter your first name"
                  class="w-full h-10 sm:h-12"
                  required />
              </div>
              <div class="space-y-1 sm:space-y-2">
                <label
                  for="Surname"
                  class="block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Last name
                </label>
                <InputText
                  id="Surname"
                  v-model="userInformation.lastname"
                  placeholder="Enter your last name"
                  class="w-full h-10 sm:h-12"
                  required />
              </div>
            </div>

            <div class="space-y-1 sm:space-y-2">
              <label
                for="emailInput"
                class="block text-sm font-medium text-surface-700 dark:text-surface-300">
                Email address
              </label>
              <InputText
                id="emailInput"
                v-model="userInformation.email"
                type="email"
                placeholder="Enter your email"
                class="w-full h-10 sm:h-12"
                required />
            </div>

            <div class="space-y-1 sm:space-y-2">
              <label
                for="password"
                class="block text-sm font-medium text-surface-700 dark:text-surface-300">
                Password
              </label>
              <Password
                id="password"
                v-model="userInformation.password"
                :feedback="false"
                toggle-mask
                class="w-full"
                input-class="w-full h-10 sm:h-12"
                placeholder="Create a password"
                required />
            </div>

            <div class="space-y-1 sm:space-y-2">
              <label
                for="ConfPassword"
                class="block text-sm font-medium text-surface-700 dark:text-surface-300">
                Confirm password
              </label>
              <Password
                id="ConfPassword"
                v-model="userInformation.confirmPassword"
                :feedback="false"
                toggle-mask
                class="w-full"
                input-class="w-full h-10 sm:h-12"
                placeholder="Confirm your password"
                required />
            </div>

            <!-- Privacy Toggle -->
            <div class="bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700 rounded-xl p-3 sm:p-4">
              <div class="flex items-start space-x-3">
                <Checkbox
                  v-model="userInformation.sharingChoice"
                  class="mt-1 flex-shrink-0"
                  input-id="sharingChoice"
                  :binary="true" />
                <div class="min-w-0 flex-1">
                  <h4 class="font-medium text-surface-900 dark:text-surface-50 text-sm sm:text-base">
                    Share Profile
                  </h4>
                  <p class="text-xs sm:text-sm text-surface-600 dark:text-surface-400 mt-1 leading-relaxed">
                    Allow other attendees to see your profile information for networking
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              label="Create Account"
              class="w-full h-10 sm:h-12 font-semibold text-sm sm:text-base" />
          </form>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import { computed, inject, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { accessTokenKey, axiosKey, refreshTokenKey, userIdKey } from '#/plugins/symbols';

const router = useRouter();
const route = useRoute();
const axios = inject(axiosKey)!;
const accessToken = inject(accessTokenKey)!;
const refreshToken = inject(refreshTokenKey)!;
const userId = inject(userIdKey)!;

const userInformation = ref({
  email: '',
  firstname: '',
  lastname: '',
  password: '',
  company: '',
  country: '',
  confirmPassword: '',
  sharingChoice: true
});

const loginInformation = ref({
  email: '',
  password: ''
});

const token = route.params.token;

const hasToken = computed(() => token !== '');

/**
 * Fetch user information using the token
 */
async function getUserInformation() {
  try {
    const setUpToken = Array.isArray(token) ? token[0] : token;
    const response = await axios.get('account/userDetails', {
      headers: {
        Authorization: `Bearer ${setUpToken}`
      }
    });
    userInformation.value.email = response.data.email;
    userInformation.value.firstname = response.data.firstname;
    userInformation.value.lastname = response.data.lastname;
    userInformation.value.company = response.data.company;
    userInformation.value.country = response.data.country;
  } catch (error) {
    console.error('Failed to fetch user settings:', error);
    await router.push('/auth/login');
  }
};

const sendUserInformation = async () => {
  try {
    const setupToken = Array.isArray(token) ? token[0] : token;
    await axios.post('account/update', userInformation.value, {
      headers: {
        Authorization: `Bearer ${setupToken}`
      }
    });
    loginInformation.value.email = userInformation.value.email;
    loginInformation.value.password = userInformation.value.password;
    const response = await axios.post('auth/signin', loginInformation.value);

    accessToken.value = response.data.accessToken;
    refreshToken.value = response.data.refreshToken;
    userId.value = response.data.userId;

    await router.push('/tabs/home');
  } catch (error) {
    console.error('Failed send user information:', error);
  }
};

if (hasToken.value) {
  void getUserInformation();
}
</script>
