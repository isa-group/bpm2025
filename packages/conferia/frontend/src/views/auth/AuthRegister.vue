<template>
  <IonPage>
    <IonContent class="bg-gray-50 dark:bg-gray-900">
      <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md space-y-8">
          <!-- Apple-style Header -->
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Join BPM 2025</h1>
            <p class="text-gray-600 dark:text-gray-300">Create your account to get started</p>
          </div>

          <!-- Registration Form -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <form id="form" @submit.prevent="sendUserInformation" class="space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="Firstname" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First name
                  </label>
                  <IonInput
                    id="Firstname"
                    v-model="userInformation.firstname"
                    placeholder="Enter your first name"
                    class="h-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label for="Surname" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last name
                  </label>
                  <IonInput
                    id="Surname"
                    v-model="userInformation.lastname"
                    placeholder="Enter your last name"
                    class="h-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label for="emailInput" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <IonInput
                  id="emailInput"
                  v-model="userInformation.email"
                  type="email"
                  placeholder="Enter your email"
                  class="h-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                  required
                />
              </div>

              <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <IonInput
                  id="password"
                  v-model="userInformation.password"
                  type="password"
                  placeholder="Create a password"
                  class="h-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                  required
                />
              </div>

              <div class="space-y-2">
                <label for="ConfPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm password
                </label>
                <IonInput
                  id="ConfPassword"
                  v-model="userInformation.confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  class="h-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
                  required
                />
              </div>

              <!-- Privacy Toggle -->
              <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
                <div class="flex items-start space-x-3">
                  <IonToggle
                    v-model="userInformation.sharingChoice"
                    :checked="true"
                    class="mt-1"
                  />
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">Share Profile</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Allow other attendees to see your profile information for networking
                    </p>
                  </div>
                </div>
              </div>

              <IonButton
                type="submit"
                expand="block"
                class="h-12 rounded-xl font-semibold"
              >
                Create Account
              </IonButton>
            </form>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonInput, IonButton, IonToggle } from '@ionic/vue';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import backend from '#/plugins/backend.config';

const router = useRouter();
const route = useRoute();

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

onMounted(() => {
  if (hasToken.value) {
    getUserInformation();
  }
});

const getUserInformation = async () => {
  try {
    const setUpToken = Array.isArray(token) ? token[0] : token;
    localStorage.setItem('setUpToken', setUpToken);
    const response = await axios.get(backend.construct('account/userDetails'), {
      headers: { Authorization: `Bearer ${setUpToken}` } });
    localStorage.setItem('setUpToken', '');
    console.log(response.data);
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
    const accessToken = Array.isArray(token) ? token[0] : token;
    localStorage.setItem('accessToken', accessToken);
    await axios.post(backend.construct('account/update'), userInformation.value, { headers: { Authorization: `Bearer ${accessToken}` } });
    localStorage.setItem('accessToken', '');
    loginInformation.value.email = userInformation.value.email;
    loginInformation.value.password = userInformation.value.password;
    const response = await axios.post(backend.construct('auth/signin'), loginInformation.value);
    console.log(response.data);

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('userId', response.data.userId);
    await router.push('/tabs/home');
  } catch (error) {
    console.error('Failed send user information:', error);
  }
};

</script>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  text-align: center;
}
.signup-header{
  margin-top: 2rem;
}
#form {
  text-align: left;
  margin-top: 2rem;
}

ion-input {
  --padding-start: 5px;
  --placeholder-color: rgba(255, 255, 255, 0.6);
  /* --color: #fff; */
  border: 1px solid #fff;
  border-radius: 4px;
  margin-bottom: 2rem;
}
ion-toggle {
  font-size: 0.8em;
}
</style>
