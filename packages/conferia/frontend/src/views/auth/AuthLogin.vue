<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="login-container">
        <div class="login-header">
          <img
            :src="logo"
            alt="BPM Logo"
            class="logo">
          <IonSegment
            v-model="selectedSegment"
            value="login">
            <IonSegmentButton
              value="login"
              @click="trackButtonClick('Login Segment', 'Auth', 'Navigation')">
              <IonLabel>Log in</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value="register"
              @click="trackButtonClick('Register Segment', 'Auth', 'Navigation')">
              <IonLabel>Register</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
        <form
          v-if="selectedSegment=='login'"
          @submit.prevent="login">
          <IonItem>
            <IonInput
              id="emailInput"
              v-model="loginUser.email"
              label="Your email"
              label-placement="stacked"
              placeholder="email@email.com"
              required />
          </IonItem>
          <IonItem>
            <IonInput
              id="passwordInput"
              v-model="loginUser.password"
              placeholder="password"
              type="password"
              label="Password"
              label-placement="stacked"
              required />
          </IonItem>
          <p class="ion-text-right">
            <RouterLink
              to="/auth/login/resetpassword"
              class="forgot-password"
              @click="trackButtonClick('Forgot Password Link', 'Auth', 'Navigation')">
              Forgot password?
            </RouterLink>
          </p>
          <p class="ion-text-center">
            <IonButton
              type="submit"
              expand="block"
              class="login-button"
              @click="trackButtonClick('Sign in Button', 'Auth', 'Feature')">
              Sign in
            </IonButton>
          </p>
          <!-- Display error message if login fails -->
          <p
            v-if="loginError"
            class="error-message">
            {{ loginError }}
          </p>
        </form>
        <form
          v-else
          @submit.prevent="sendConfirmationEmail">
          <p>You must use the same email address you used to register at the conference.</p>
          <p>Please allow up to 12 hours for emails to be synchronized between the conference registration system and this app.</p>
          <IonItem class="ion-padding-vertical">
            <IonInput
              id="emailInput"
              v-model="registerUser.receiver"
              placeholder="email@email.com"
              type="email"
              label="Your email"
              label-placement="stacked"
              required />
          </IonItem>
          <IonButton
            type="submit"
            expand="block"
            class="ion-margin-top"
            @click="trackButtonClick('Send Confirmation Email Button', 'Auth', 'Feature')">
            Send Confirmation Email
          </IonButton>
          <p
            v-if="registerError"
            class="error-message">
            {{ registerError }}
          </p>
          <p
            v-if="registerSuccess"
            class="success-message">
            {{ registerSuccess }}
          </p>

          <p class="ion-text-right">
            <IonButton
              fill="clear"
              @click="() => { trackButtonClick('Privacy Note Link', 'Auth', 'Feature'); openPrivacy(); }">
              Privacy note
            </IonButton>
          </p>
          <PrivacyNote
            :is-open="isPrivacyOpen"
            @update:is-open="isPrivacyOpen = $event" />
        </form>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="js">
import { IonPage, IonContent, IonButton, IonInput, IonLabel, IonSegment, IonSegmentButton, IonItem } from '@ionic/vue';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import logoLight from '@/assets/images/logo-1.svg';
// import logoDark from '@/assets/images/logo-2.svg';
import backend from '/backend.config.ts';
import PrivacyNote from '@/components/PrivacyNote.vue';
import { googleanalytics } from '@/composables/googleanalytics.ts';

const { trackButtonClick } = googleanalytics();

const logo = computed(() => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? logoLight// logoDark
    : logoLight;
});

const router = useRouter();

const loginError = ref('');
const registerError = ref('');
const registerSuccess = ref('');
const isActiveLogin = ref(true);

const selectedSegment = ref('login');

const loginUser = ref({
  email: '',
  password: ''
});
const registerUser = ref({
  receiver: ''
});

const toggleActive = () => {
  isActiveLogin.value = !isActiveLogin.value;
  registerSuccess.value = '';
};
const login = async () => {
  try {
    const response = await axios.post(backend.construct('auth/signin'), loginUser.value);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('userId', response.data.userId);
    await router.push('/tabs/home');
    loginError.value = '';
    loginUser.value.email = '';
    loginUser.value.password = '';
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    loginError.value = 'Incorrect password or email';
  }
};

const sendConfirmationEmail = async () => {
  try {
    localStorage.setItem('accessToken', '');
    await axios.post(backend.construct('auth/signup'), registerUser.value);
    registerUser.value.receiver = '';
    await router.push('/auth/login');
    registerSuccess.value = 'E-mail sent successfully';
  } catch (error) {
    // Handle error, e.g., display an error message
    console.error('Register error:', error.response ? error.response.data : error.message);
    registerError.value = 'If you registered for the conference, you will receive an e-mail soon';
  }
};

const isPrivacyOpen = ref(false);
const openPrivacy = () => {
  isPrivacyOpen.value = true;
};

</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  text-align: center;
}

.login-header h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.login-toggle {
  background: #383a3e; /* Dark background for the inactive state */
  /*border: 1px solid #ffff; #428cff; Blue border */
  display: flex; /* Align buttons horizontally */
  align-items: center; /* Center the buttons vertically */
  border-radius: 4px; /* Rounded corners for the container */
  max-width: 20rem;
  max-height: 60px;
  margin: auto; /* Center the container */
  overflow: hidden; /* Prevents children from overflowing rounded corners */
  margin-top: 2.5rem;
}

.toggle-button {
  padding:0 2px;
  --background: 0; /* Dark background for the inactive state */
  --border-radius: 4px; /* Rounded corners for the container */
  color: white;
  font-size: 0.8rem;
  flex: 1; /* Optional: make buttons share the space equally */
}

.toggle-button.active {
  --background: #428cff; /* Blue background for the active state */
  color: white; /* Ensure text is visible on the blue background */
}

form {
  text-align: left;
  margin-top: 2rem;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

.success-message {
  color: #428cff;
  margin-top: 1rem;
}
.logo {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 150px;
  width: 150px;
  margin-right: 10px;
  margin-top: 20%;
  margin-bottom: 15px;
}

</style>
