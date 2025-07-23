<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="signup-container">
        <div class="signup-header">
          <h1>Sign up</h1>
        </div>
        <form
          id="form"
          @submit.prevent="sendUserInformation">
          <IonInput
            id="Firstname"
            v-model="userInformation.firstname"
            label="First name"
            label-placement="stacked"
            required />
          <IonInput
            id="Surname"
            v-model="userInformation.lastname"
            label="Surname"
            label-placement="stacked"
            required />
          <IonInput
            id="emailInput"
            v-model="userInformation.email"
            label="Email"
            label-placement="stacked"
            type="email"
            required />
          <IonInput
            id="password"
            v-model="userInformation.password"
            label="Password"
            label-placement="stacked"
            type="password"
            required />
          <IonInput
            id="ConfPassword"
            v-model="userInformation.confirmPassword"
            label="Confirm password"
            label-placement="stacked"
            type="password"
            required />
          <IonToggle
            v-model="userInformation.sharingChoice"
            :checked="true"
            label-placement="end">
            Share user information with other attendees
          </IonToggle><br><br>
          <IonButton
            type="submit"
            expand="block">
            Sign up
          </IonButton>
        </form>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonInput, IonButton, IonToggle } from '@ionic/vue';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import backend from '../../../backend.config';

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
