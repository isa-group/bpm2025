<template>
  <IonPage>
    <IonContent class="bg-gray-50 dark:bg-gray-900">
      <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md space-y-8">
          <!-- Apple-style Header -->
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Set New Password</h1>
            <p class="text-gray-600 dark:text-gray-300">Create a new password for your account</p>
          </div>

          <!-- Reset Password Form -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <form id="form" @submit.prevent="resetPassword" class="space-y-6">
              <div class="space-y-2">
                <label for="firstPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <IonInput
                  id="firstPassword"
                  v-model="resetInformation.password"
                  type="password"
                  placeholder="Enter new password"
                  class="h-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                  required
                />
              </div>

              <div class="space-y-2">
                <label for="secondPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <IonInput
                  id="secondPassword"
                  v-model="resetInformation.confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  class="h-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                  required
                />
              </div>

              <!-- Password Requirements -->
              <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Password Requirements</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Choose something you'll remember</li>
                  <li>• Make it secure and unique</li>
                </ul>
              </div>

              <IonButton
                type="submit"
                expand="block"
                class="h-12 rounded-xl font-semibold"
              >
                Reset Password
              </IonButton>

              <div v-if="resetError" class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3">
                <p class="text-red-700 dark:text-red-300 text-sm">{{ resetError }}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonInput } from '@ionic/vue';
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
    const response = await axios.post(backend.construct('account/resetPassword'), resetInformation.value, { headers: { Authorization: `Bearer ${resetToken}` } });
    localStorage.setItem('resetToken', '');

    await router.push('/auth/login');
  } catch (error) {
    resetError.value = 'Failed to reset password';
    console.error('Failed to reset password', error);
  }
};
</script>

<style scoped>
.reset-password-container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  text-align: center;
}
.signup-header{
  margin-top: 2rem;
}
h2 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

p {
  margin-bottom: 2em;
}
#form {
  text-align: left;
  margin-top: 2rem;
}

</style>
