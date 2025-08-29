<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
    <Card class="w-full max-w-md shadow-sm">
      <template #content>
        <div class="space-y-8 p-6">
          <!-- Back button -->
          <div class="flex justify-start">
            <Button
              icon="pi pi-arrow-left"
              text
              severity="secondary"
              size="large"
              class="p-0 text-surface-600 dark:text-surface-400 hover:text-primary-500"
              @click="$router.push('/auth/login')" />
          </div>

          <!-- Apple-style Header -->
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-50">
              Reset Password
            </h1>
            <p class="text-surface-600 dark:text-surface-400">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <!-- Reset Form -->
          <form
            class="space-y-6"
            @submit.prevent="sendResetEmail">
            <div class="space-y-2">
              <label
                for="email"
                class="block text-sm font-medium text-surface-700 dark:text-surface-300">
                Email address
              </label>
              <InputText
                id="email"
                v-model="resetUser.receiver"
                type="email"
                placeholder="Enter your email"
                class="w-full h-12"
                required />
            </div>

            <Button
              type="submit"
              label="Send Reset Link"
              class="w-full h-12 font-semibold" />

            <Message
              v-if="resetEmailError"
              severity="error"
              :closable="false"
              class="mt-3">
              {{ resetEmailError }}
            </Message>

            <Message
              v-if="resetEmailSuccess"
              severity="success"
              :closable="false"
              class="mt-3">
              {{ resetEmailSuccess }}
            </Message>
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
import Message from 'primevue/message';
import { inject, ref } from 'vue';
import { accessTokenKey, axiosKey } from '#/plugins/symbols';

const resetEmailError = ref('');
const resetEmailSuccess = ref('');
const axios = inject(axiosKey)!;
const accessToken = inject(accessTokenKey)!;

const resetUser = ref({
  receiver: ''
});

const sendResetEmail = async () => {
  try {
    accessToken.value = undefined;
    await axios.post('auth/resetPassword', resetUser.value);
    resetUser.value.receiver = '';
    resetEmailSuccess.value = 'Email send successfully';
  } catch (_error) {
    // Handle error, e.g., display an error message
    resetEmailError.value = 'User with email not found';
  }
};
</script>
