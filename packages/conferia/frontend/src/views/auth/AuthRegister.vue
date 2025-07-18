<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="signup-container">
        <div class="signup-header">
          <h1>Sign up</h1>
        </div>
        <form id="form" @submit.prevent="sendUserInformation">
          <ion-input
              label="First name"
              label-placement="stacked"
              id="Firstname"
              v-model="userInformation.firstname"
              required
          ></ion-input>
          <ion-input
              label="Surname"
              label-placement="stacked"
              id="Surname"
              v-model="userInformation.lastname"
              required
          ></ion-input>
          <ion-input
              label="Email"
              label-placement="stacked"
              id="emailInput"
              type="email"
              v-model="userInformation.email"
              required
          ></ion-input>
          <ion-input
              label="Password"
              label-placement="stacked"
              id="password"
              type="password" v-model="userInformation.password"
              required
          ></ion-input>
          <ion-input
              label="Confirm password"
              label-placement="stacked"
              id="ConfPassword"
              type="password"
              v-model="userInformation.confirmPassword"
              required
          ></ion-input>
          <ion-toggle :checked="true" v-model="userInformation.sharingChoice" label-placement="end">
            Share user information with other attendees
          </ion-toggle><br /><br />
          <ion-button type="submit" expand="block" @click="trackButtonClick('Sign up Button', 'Auth', 'Feature')">Sign up</ion-button>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonContent, IonInput, IonButton, IonToggle} from "@ionic/vue";
import {computed, onMounted, ref} from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import backend from "../../../backend.config";
import {googleanalytics} from "@/composables/googleanalytics";

const { trackButtonClick } = googleanalytics();

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
})

const loginInformation = ref({
  email: '',
  password: ''
})

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
    const response = await axios.get(backend.construct("account/userDetails"), {
      headers: { Authorization: `Bearer ${setUpToken}` }});
    localStorage.setItem('setUpToken', '');
    console.log(response.data);
    userInformation.value.email = response.data.email;
    userInformation.value.firstname = response.data.firstname;
    userInformation.value.lastname = response.data.lastname;
    userInformation.value.company = response.data.company;
    userInformation.value.country = response.data.country;
  } catch (error) {
    console.error("Failed to fetch user settings:", error);
    await router.push('/auth/login');
  }
};

const sendUserInformation = async () => {
  try {
    const accessToken = Array.isArray(token) ? token[0] : token;
    localStorage.setItem('accessToken', accessToken);
    await axios.post(backend.construct("account/update"), userInformation.value, { headers: { Authorization: `Bearer ${accessToken}` } });
    localStorage.setItem('accessToken', '');
    loginInformation.value.email = userInformation.value.email;
    loginInformation.value.password = userInformation.value.password
    const response = await axios.post(backend.construct("auth/signin"), loginInformation.value);
    console.log(response.data);

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('userId', response.data.userId);
    await router.push('/tabs/home');
  } catch (error) {
    console.error("Failed send user information:", error);
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
  //--color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  margin-bottom: 2rem;
}
ion-toggle {
  font-size: 0.8em;
}
</style>