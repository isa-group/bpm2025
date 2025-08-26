<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
    <Card class="w-full max-w-md shadow-sm">
      <template #content>
        <div class="space-y-8 p-6">
          <!-- Apple-style Header -->
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-50">
              Set New Password
            </h1>
            <p class="text-surface-600 dark:text-surface-400">
              Create a new password for your account
            </p>
          </div>

          <!-- Reset Password Form -->
          <form
            id="form"
            class="space-y-6"
            @submit.prevent="resetPassword">
            <div class="space-y-2">
              <label
                for="firstPassword"
                class="block text-sm font-medium text-surface-700 dark:text-surface-300">
                New Password
              </label>
              <Password
                id="firstPassword"
                v-model="resetInformation.password"
                :feedback="false"
                toggle-mask
                class="w-full"
                input-class="w-full h-12"
                placeholder="Enter new password"
                required />
            </div>

            <div class="space-y-2">
              <label
                for="secondPassword"
                class="block text-sm font-medium text-surface-700 dark:text-surface-300">
                Confirm Password
              </label>
              <Password
                id="secondPassword"
                v-model="resetInformation.confirmPassword"
                :feedback="false"
                toggle-mask
                class="w-full"
                input-class="w-full h-12"
                placeholder="Confirm new password"
                required />
            </div>

            <!-- Password Requirements -->
            <div class="bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700 rounded-lg p-4">
              <h4 class="font-medium text-surface-900 dark:text-surface-50 mb-2">
                Password Requirements
              </h4>
              <ul class="text-sm text-surface-600 dark:text-surface-400 space-y-1">
                <li>• Choose something you'll remember</li>
                <li>• Make it secure and unique</li>
              </ul>
            </div>

            <Button
              type="submit"
              label="Reset Password"
              class="w-full h-12 font-semibold" />

            <Message
              v-if="resetError"
              severity="error"
              :closable="false"
              class="mt-3">
              {{ resetError }}
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
import Password from 'primevue/password';
import Message from 'primevue/message';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import backend from '#/plugins/backend.config';

const route = useRoute();
const router = useRouter();

const resetInformation = ref({
  password: '',
  confirmPassword: ''
});

const token = route.params.token;
const resetError = ref('');

const resetPassword = async () => {
  try {
    if (resetInformation.value.password !== resetInformation.value.confirmPassword) {
      resetError.value = 'The passwords do not match.';
      return false;
    }
    const resetToken = Array.isArray(token) ? token[0] : token;
    localStorage.setItem('resetToken', resetToken);
    const _response = await axios.post(backend.construct('account/resetPassword'), resetInformation.value, { headers: { Authorization: `Bearer ${resetToken}` } });
    localStorage.setItem('resetToken', '');

    await router.push('/auth/login');
  } catch (error) {
    resetError.value = 'Failed to reset password';
    console.error('Failed to reset password', error);
  }
};
</script>
