<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
    <Card class="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-sm my-4">
      <template #content>
        <div class="space-y-6 sm:space-y-8 p-6">
          <!-- Logo and header with Apple-style title -->
          <div class="text-center">
            <img
              :src="logo.src"
              alt="BPM Logo"
              class="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto mb-4 sm:mb-6">
            
            <!-- Apple-style page title -->
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-surface-50 mb-2">
              Welcome to BPM 2025
            </h1>
            <p class="text-sm sm:text-base text-surface-600 dark:text-surface-400 mb-4 sm:mb-6">
              Sign in to access your conference experience
            </p>
            
            <!-- Toggle buttons with improved spacing -->
            <div class="flex border border-surface-300 dark:border-surface-600 rounded-lg overflow-hidden mb-4 sm:mb-6">
              <button
                :class="[
                  'flex-1 py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium transition-all duration-200',
                  selectedSegment === 'login' 
                    ? 'bg-primary-500 text-gray-700 shadow-sm' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-gray-100'
                ]"
                @click="selectedSegment = 'login'">
                Log in
              </button>
              <button
                :class="[
                  'flex-1 py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium transition-all duration-200',
                  selectedSegment === 'register' 
                    ? 'bg-primary-500 text-gray-700 shadow-sm' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-gray-100'
                ]"
                @click="selectedSegment = 'register'">
                Register
              </button>
            </div>
          </div>

          <!-- Login form with improved spacing and styling -->
          <form
            v-if="selectedSegment === 'login'"
            class="space-y-4 sm:space-y-6"
            @submit.prevent="login">
            <div class="space-y-1 sm:space-y-2">
              <label for="emailInput" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1 sm:mb-2">
                Email Address
              </label>
              <InputText
                id="emailInput"
                v-model="loginUser.email"
                type="email"
                class="w-full h-10 sm:h-12"
                placeholder="Enter your email"
                required />
            </div>
            
            <div class="space-y-1 sm:space-y-2">
              <label for="passwordInput" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1 sm:mb-2">
                Password
              </label>
              <Password
                id="passwordInput"
                v-model="loginUser.password"
                :feedback="false"
                toggle-mask
                class="w-full"
                input-class="w-full h-10 sm:h-12"
                placeholder="Enter your password"
                required />
            </div>

            <div class="text-right mt-3 sm:mt-4">
              <RouterLink
                to="/auth/login/resetpassword"
                class="text-primary-500 hover:text-primary-600 text-sm font-medium">
                Forgot password?
              </RouterLink>
            </div>

            <Button
              type="submit"
              label="Sign In"
              class="w-full h-10 sm:h-12 mt-4 sm:mt-6 text-sm sm:text-base"
              :loading="isLoading" />

            <!-- Error message -->
            <Message
              v-if="loginError"
              severity="error"
              :closable="false"
              class="mt-3 sm:mt-4 text-sm">
              {{ loginError }}
            </Message>
          </form>

          <!-- Register form with improved spacing -->
          <form
            v-else
            class="space-y-4 sm:space-y-6"
            @submit.prevent="sendConfirmationEmail">
            <div class="space-y-3 sm:space-y-4 text-sm text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 p-3 sm:p-4 rounded-lg">
              <p class="font-medium text-surface-700 dark:text-surface-300">Important:</p>
              <p class="text-xs sm:text-sm leading-relaxed">You must use the same email address you used to register at the conference.</p>
              <p class="text-xs sm:text-sm leading-relaxed">Please allow up to 12 hours for emails to be synchronized between the conference registration system and this app.</p>
            </div>

            <div class="space-y-1 sm:space-y-2">
              <label for="registerEmailInput" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1 sm:mb-2">
                Email Address
              </label>
              <InputText
                id="registerEmailInput"
                v-model="registerUser.receiver"
                type="email"
                class="w-full h-10 sm:h-12"
                placeholder="Enter your conference registration email"
                required />
            </div>

            <Button
              type="submit"
              label="Send Confirmation Email"
              class="w-full h-10 sm:h-12 mt-4 sm:mt-6 text-sm sm:text-base"
              :loading="isLoading" />

            <!-- Error message -->
            <Message
              v-if="registerError"
              severity="error"
              :closable="false"
              class="mt-3 sm:mt-4 text-sm">
              {{ registerError }}
            </Message>

            <!-- Success message -->
            <Message
              v-if="registerSuccess"
              severity="success"
              :closable="false"
              class="mt-3 sm:mt-4 text-sm">
              {{ registerSuccess }}
            </Message>

            <div class="text-center mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-surface-200 dark:border-surface-700">
              <Button
                label="Privacy Policy"
                link
                class="text-xs sm:text-sm"
                @click="openPrivacy" />
            </div>
          </form>
        </div>
      </template>
    </Card>

    <PrivacyNote
      :is-open="isPrivacyOpen"
      @update:is-open="isPrivacyOpen = $event" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Message from 'primevue/message';
import logo from '@bpm2025-website/assets/icon';
import backend from '#/plugins/backend.config';
import PrivacyNote from '#/components/PrivacyNote.vue';

const router = useRouter();

const loginError = ref('');
const registerError = ref('');
const registerSuccess = ref('');
const isLoading = ref(false);
const selectedSegment = ref('login');
const isPrivacyOpen = ref(false);

const loginUser = ref({
  email: '',
  password: ''
});
const registerUser = ref({
  receiver: ''
});

const openPrivacy = () => {
  isPrivacyOpen.value = true;
};

const login = async () => {
  isLoading.value = true;
  try {
    const response = await axios.post(backend.construct('auth/signin'), loginUser.value);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('userId', response.data.userId);
    await router.push('/tabs/home');
    loginError.value = '';
    loginUser.value.email = '';
    loginUser.value.password = '';
  } catch (error: any) {
    console.error('Login failed', error);
    if (error.response && error.response.status === 401) {
      loginError.value = 'Invalid email or password. Please try again.';
    } else {
      loginError.value = 'Login failed. Please try again later.';
    }
  } finally {
    isLoading.value = false;
  }
};

const sendConfirmationEmail = async () => {
  isLoading.value = true;
  try {
    await axios.post(backend.construct('auth/signup'), registerUser.value);
    registerSuccess.value = 'Confirmation email sent! Check your inbox.';
    registerError.value = '';
  } catch (error: any) {
    console.error('Registration failed', error);
    if (error.response) {
      if (error.response.status === 409) {
        registerError.value = 'Email already exists or registration link already sent.';
      } else if (error.response.status === 404) {
        registerError.value = 'Email not found in registration system. Please check your email or contact support.';
      } else {
        registerError.value = 'Registration failed. Please try again later.';
      }
    } else {
      registerError.value = 'Network error. Please check your connection.';
    }
    registerSuccess.value = '';
  } finally {
    isLoading.value = false;
  }
};
</script>
