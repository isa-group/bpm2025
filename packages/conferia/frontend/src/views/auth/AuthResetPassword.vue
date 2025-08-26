<template>
  <IonPage>
    <IonContent class="bg-gray-50 dark:bg-gray-900">
      <IonToolbar class="bg-transparent">
        <template #start>
          <IonButtons>
            <IonBackButton default-href="/auth/login" />
          </IonButtons>
        </template>
      </IonToolbar>

      <div class="min-h-screen flex items-center justify-center p-4 pt-16">
        <div class="w-full max-w-md space-y-8">
          <!-- Apple-style Header -->
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              Reset Password
            </h1>
            <p class="text-gray-600 dark:text-gray-300">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <!-- Reset Form -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <form
              class="space-y-6"
              @submit.prevent="sendResetEmail">
              <div class="space-y-2">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <IonInput
                  id="email"
                  v-model="resetUser.receiver"
                  type="email"
                  placeholder="Enter your email"
                  class="h-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                  required />
              </div>

              <IonButton
                type="submit"
                expand="block"
                class="h-12 rounded-xl font-semibold">
                Send Reset Link
              </IonButton>

              <div
                v-if="resetEmailError"
                class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3">
                <p class="text-red-700 dark:text-red-300 text-sm">
                  {{ resetEmailError }}
                </p>
              </div>

              <div
                v-if="resetEmailSuccess"
                class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-3">
                <p class="text-green-700 dark:text-green-300 text-sm">
                  {{ resetEmailSuccess }}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonInput,
  IonPage,
  IonContent,
  IonButtons,
  IonBackButton,
  IonToolbar
} from '@ionic/vue';
import { ref } from 'vue';
import axios from 'axios';
import backend from '#/plugins/backend.config';

const resetEmailError = ref('');
const resetEmailSuccess = ref('');

const resetUser = ref({
  receiver: ''
});

const sendResetEmail = async () => {
  try {
    localStorage.setItem('accessToken', '');
    await axios.post(backend.construct('auth/resetPassword'), resetUser.value);
    resetUser.value.receiver = '';
    resetEmailSuccess.value = 'Email send successfully';
  } catch (_error) {
    // Handle error, e.g., display an error message
    resetEmailError.value = 'User with email not found';
  }
};

</script>

<style scoped>
.reset-container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  text-align: center;
}

.reset-header h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

form {
  text-align: left;
  margin-top: 2rem;
}

/* ion-input {
  --padding-start: 5px;
  --placeholder-color: rgba(255, 255, 255, 0.6);
  --color: #fff;
  background: #000;
  border: 1px solid #fff;
  border-radius: 4px;
  margin-bottom: 2rem;
} */

ion-button {
  --color: white;
  margin-top: 2.5rem;
  --border-radius: 4px;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

.success-message {
  color: #428cff;
  margin-top: 1rem;
}
</style>
